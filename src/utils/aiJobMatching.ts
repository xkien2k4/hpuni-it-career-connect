import { Job, StudentProfile, StudentCareerPreference, JobMatchAnalysis } from '../types/hpu';

// Helper to normalize skill strings for fuzzy matching
function normalizeSkill(skill: string): string {
  return skill
    .toLowerCase()
    .replace(/[.\s\-_/]/g, '')
    .trim();
}

function skillsMatch(studentSkill: string, targetSkill: string): boolean {
  const norm1 = normalizeSkill(studentSkill);
  const norm2 = normalizeSkill(targetSkill);

  if (norm1 === norm2) return true;
  if (norm1.includes(norm2) || norm2.includes(norm1)) return true;

  // Domain synonym mappings
  const synonyms: Record<string, string[]> = {
    react: ['reactjs', 'react.js', 'frontend', 'react'],
    cplusplus: ['c', 'c++', 'c/c++', 'embeddedc', 'cplusplus'],
    nodejs: ['node', 'nodejs', 'node.js', 'backend', 'express'],
    python: ['python', 'py', 'django', 'fastapi'],
    sql: ['postgresql', 'mysql', 'sqlserver', 'sql', 'database'],
    networking: ['ccna', 'routing', 'switching', 'tcpip', 'network', 'mang'],
    security: ['attt', 'cybersecurity', 'networksecurity', 'firewall', 'soc', 'pentest'],
    testing: ['qa', 'qc', 'softwaretesting', 'manualtest', 'automationtest', 'kiemthu'],
    uiux: ['figma', 'canva', 'uiux', 'wireframe', 'design']
  };

  for (const group of Object.values(synonyms)) {
    const s1InGroup = group.some(item => norm1.includes(normalizeSkill(item)));
    const s2InGroup = group.some(item => norm2.includes(normalizeSkill(item)));
    if (s1InGroup && s2InGroup) return true;
  }

  return false;
}

export function analyzeJobMatch(
  job: Job,
  student: StudentProfile,
  preferences?: StudentCareerPreference,
  savedJobIds: string[] = []
): JobMatchAnalysis {
  // Aggregate all skills from student
  const studentSkillBank = [
    ...student.skills,
    ...student.programmingLanguages,
    ...student.frameworks,
    ...student.projects.map(p => p.techStack)
  ];

  // 1. Analyze Required Skills (Weight: 45%)
  const matchedRequiredSkills: string[] = [];
  const missingRequiredSkills: string[] = [];

  job.requiredSkills.forEach(req => {
    const isMatched = studentSkillBank.some(s => skillsMatch(s, req));
    if (isMatched) {
      matchedRequiredSkills.push(req);
    } else {
      missingRequiredSkills.push(req);
    }
  });

  const skillsScore =
    job.requiredSkills.length > 0
      ? (matchedRequiredSkills.length / job.requiredSkills.length) * 100
      : 80;

  // 2. Analyze Preferred Skills (Weight: 15%)
  const matchedPreferredSkills: string[] = [];
  job.preferredSkills.forEach(pref => {
    const isMatched = studentSkillBank.some(s => skillsMatch(s, pref));
    if (isMatched) {
      matchedPreferredSkills.push(pref);
    }
  });

  const preferredScore =
    job.preferredSkills.length > 0
      ? (matchedPreferredSkills.length / job.preferredSkills.length) * 100
      : 70;

  // 3. Class & Career Goal Match (Weight: 20%)
  let majorScore = 75;
  const classLower = (student.className || '').toLowerCase();
  const goalLower = (student.careerGoal || '').toLowerCase();
  const titleLower = job.title.toLowerCase();

  if (
    (job.category === 'software' && (classLower.includes('cntt') || classLower.includes('ktpm'))) ||
    (job.category === 'security' && (classLower.includes('mmt') || classLower.includes('attt') || classLower.includes('cntt'))) ||
    (job.category === 'testing' && classLower.includes('cntt'))
  ) {
    majorScore += 15;
  }

  if (
    (goalLower.includes('web') && titleLower.includes('web')) ||
    (goalLower.includes('full-stack') && titleLower.includes('full-stack')) ||
    (goalLower.includes('nhúng') && (titleLower.includes('nhúng') || titleLower.includes('embedded')))
  ) {
    majorScore = Math.min(100, majorScore + 10);
  }

  // 4. Location Match (Weight: 10%)
  let locationScore = 80;
  if (job.location.toLowerCase().includes('hải phòng')) {
    locationScore = 100;
  } else if (job.workMode === 'Hybrid' || job.workMode === 'Remote') {
    locationScore = 90;
  }

  // 5. Special Student Condition Match (Weight: 10%)
  let studentConditionScore = 80;
  if (job.stampSupport) studentConditionScore += 10;
  if (job.flexibleSchedule) studentConditionScore += 10;
  studentConditionScore = Math.min(100, studentConditionScore);

  // Preference adjustments if customized by student
  let preferenceBonus = 0;
  if (preferences) {
    if (preferences.preferredRoles.includes(job.category)) preferenceBonus += 5;
    if (preferences.preferredJobTypes.includes(job.jobType)) preferenceBonus += 5;
    if (preferences.requireStampSupport && job.stampSupport) preferenceBonus += 5;
    if (preferences.requireFlexibleSchedule && job.flexibleSchedule) preferenceBonus += 5;
  }

  // Weighted total score formula
  const rawScore =
    skillsScore * 0.45 +
    preferredScore * 0.15 +
    majorScore * 0.20 +
    locationScore * 0.10 +
    studentConditionScore * 0.10 +
    preferenceBonus;

  const overallScore = Math.min(98, Math.max(45, Math.round(rawScore)));

  // Generate detailed reasoning
  const reasons: string[] = [];
  if (matchedRequiredSkills.length > 0) {
    reasons.push(
      `Bộ kỹ năng của bạn trùng khớp ${matchedRequiredSkills.length}/${job.requiredSkills.length} yêu cầu bắt buộc: ${matchedRequiredSkills.join(', ')}.`
    );
  }
  if (majorScore >= 85) {
    reasons.push(
      `Vị trí rất phù hợp với định hướng đào tạo lớp ${student.className} và mục tiêu nghề nghiệp của bạn tại Khoa CNTT - ĐH Hải Phòng.`
    );
  }
  if (job.stampSupport) {
    reasons.push(
      'Doanh nghiệp có cam kết xác nhận đóng dấu mộc thực tập tốt nghiệp cho sinh viên Khoa CNTT.'
    );
  }
  if (job.location.includes('Hải Phòng')) {
    reasons.push(
      `Địa điểm làm việc tại ${job.location}, thuận tiện di chuyển trong khu vực Hải Phòng.`
    );
  }

  // Generate actionable roadmap recommendations
  const recommendations: string[] = [];
  if (missingRequiredSkills.length > 0) {
    recommendations.push(
      `Nên củng cố và đưa thêm từ khóa ${missingRequiredSkills.join(', ')} vào phần kỹ năng hoặc tóm tắt CV.`
    );
  }

  if (job.category === 'software' && !studentSkillBank.some(s => s.toLowerCase().includes('docker'))) {
    recommendations.push(
      'Nên bổ sung 1 bài tập lớn hoặc đồ án môn học có sử dụng Git Flow và quy trình Clean Code để ghi điểm với nhà tuyển dụng.'
    );
  }

  if (job.category === 'security' && !studentSkillBank.some(s => s.toLowerCase().includes('linux'))) {
    recommendations.push(
      'Nên thực hành cấu hình mạng trên môi trường ảo hóa Linux/GNS3 và bổ sung vào mục dự án môn học.'
    );
  }

  if (recommendations.length === 0) {
    recommendations.push(
      'Hồ sơ của bạn đã đáp ứng rất tốt các tiêu chí cốt lõi! Hãy viết một thư giới thiệu (Cover Letter) chỉn chu và ứng tuyển ngay.'
    );
  }

  return {
    job,
    overallScore,
    skillsScore: Math.round(skillsScore),
    majorScore: Math.round(majorScore),
    locationScore: Math.round(locationScore),
    matchedRequiredSkills,
    missingRequiredSkills,
    matchedPreferredSkills,
    reasons,
    recommendations,
    isSaved: savedJobIds.includes(job.id)
  };
}

export function getRecommendedJobs(
  jobs: Job[],
  student: StudentProfile,
  preferences?: StudentCareerPreference,
  savedJobIds: string[] = []
): JobMatchAnalysis[] {
  // Only evaluate approved, active jobs with valid deadlines
  const eligibleJobs = jobs.filter(
    j => j.approvalStatus === 'approved' && j.displayStatus === 'active'
  );

  const analyses = eligibleJobs.map(job =>
    analyzeJobMatch(job, student, preferences, savedJobIds)
  );

  // Sort descending by match score
  return analyses.sort((a, b) => b.overallScore - a.overallScore);
}
