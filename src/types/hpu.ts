export type UserRole = 'guest' | 'student' | 'employer' | 'lecturer' | 'admin';

export type AccountStatus = 'active' | 'locked' | 'pending';

export interface User {
  id: string;
  email: string;
  password?: string;
  fullName: string;
  role: UserRole;
  phone?: string;
  avatarText?: string;
  status: AccountStatus;
  companyId?: string; // If employer
  companyName?: string;
  studentId?: string; // If student
  studentCode?: string;
  className?: string; // Lớp sinh viên (ví dụ: ĐH CNTT K22A)
  lecturerCode?: string; // If lecturer
  assignedClasses?: string[]; // Lớp phụ trách (dành cho giảng viên)
  createdAt?: string;
  lastLogin?: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  studentCode: string; // Mã sinh viên: 2110310028...
  fullName: string;
  className: string; // Lớp chính quy HPUni: VD: ĐH CNTT K22A, ĐH CNTT K22B
  academicYear: string; // Khóa học: Khóa 22 (2021-2025), Khóa 23 (2022-2026)
  major?: string; // Không còn sử dụng trên UI - quản lý theo Lớp
  gpa: string; // 3.45 / 4.0
  email: string;
  phone: string;
  address: string;
  bio: string;
  careerGoal: string;
  skills: string[];
  programmingLanguages: string[];
  frameworks: string[];
  certificates: string[];
  projects: {
    id: string;
    name: string;
    role: string;
    techStack: string;
    description: string;
    demoUrl?: string;
  }[];
  githubUrl?: string;
  portfolioUrl?: string;
  cvFileName: string;
  targetJobTypes: string[];
  isPublicForEmployers: boolean;
  profileCompletion: number; // 0 - 100%
}

export interface Company {
  id: string;
  userId: string;
  name: string;
  taxCode: string; // Mã số thuế
  industry: string;
  scale: string; // '50-100 nhân viên', '500+ nhân viên'...
  address: string;
  website: string;
  contactEmail: string;
  contactPhone: string;
  representativeName: string;
  representativeTitle: string;
  description: string;
  logoText: string;
  logoColor: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  verificationNotes?: string;
  isPartner: boolean;
  partnershipYear?: string;
}

export type JobCategory =
  | 'software'
  | 'testing'
  | 'ai_data'
  | 'networking'
  | 'security'
  | 'uiux'
  | 'sysadmin'
  | 'other';

export type JobType =
  | 'internship'
  | 'fresher'
  | 'part_time'
  | 'junior'
  | 'full_time'
  | 'graduation_project';

export interface Job {
  id: string;
  companyId: string;
  companyName: string;
  companyLogoText: string;
  companyColor: string;
  companyVerified: boolean;
  title: string;
  category: JobCategory;
  jobType: JobType;
  targetAudiences: string[]; // 'Sinh viên năm 3', 'Sinh viên năm cuối', 'Mới tốt nghiệp'...
  description: string;
  requirements: string[];
  benefits: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  salaryText: string;
  location: string;
  workMode: 'On-site' | 'Hybrid' | 'Remote';
  slots: number;
  deadline: string;
  postedDate: string;
  approvalStatus: 'pending' | 'approved' | 'rejected';
  displayStatus: 'active' | 'closed' | 'expired';
  applicantsCount: number;
  stampSupport: boolean; // Hỗ trợ đóng dấu mộc thực tập Khoa CNTT
  flexibleSchedule: boolean; // Linh hoạt lịch học ĐH Hải Phòng
  featured?: boolean;
}

export type ApplicationStatus =
  | 'submitted'
  | 'reviewing'
  | 'shortlisted'
  | 'interview'
  | 'offered'
  | 'hired'
  | 'rejected'
  | 'withdrawn';

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  companyId: string;
  companyName: string;
  companyLocation: string;
  studentId: string;
  studentName: string;
  studentCode: string;
  studentClass: string;
  studentMajor?: string;
  studentGpa: string;
  studentEmail: string;
  studentPhone: string;
  appliedDate: string;
  status: ApplicationStatus;
  coverLetter: string;
  cvFileName: string;
  internalNotes?: string;
  interviewSchedule?: {
    date: string;
    time: string;
    locationOrLink: string;
    notes?: string;
  };
  statusHistory: {
    status: ApplicationStatus;
    changedAt: string;
    changedBy: string;
    notes?: string;
  }[];
}

export interface InternshipRecord {
  id: string;
  studentId: string;
  studentName: string;
  studentCode: string;
  className: string;
  major?: string;
  companyId: string;
  companyName: string;
  position: string;
  lecturerAdvisor: string; // Giảng viên hướng dẫn
  startDate: string;
  endDate: string;
  status: 'registered' | 'in_progress' | 'completed' | 'canceled';
  companyMentor: string;
  evaluationScore?: number; // Thang 10
  stampConfirmed: boolean;
}

export interface CareerEvent {
  id: string;
  title: string;
  type: 'job_fair' | 'workshop' | 'company_tour' | 'interview_day' | 'competition';
  organizer: string;
  date: string;
  time: string;
  location: string;
  description: string;
  highlights: string[];
  maxAttendees: number;
  registeredCount: number;
  registeredStudentIds: string[];
  status: 'upcoming' | 'ongoing' | 'finished';
}

export interface NewsArticle {
  id: string;
  title: string;
  category: 'cooperation' | 'career_guide' | 'announcement' | 'internship';
  author: string;
  publishDate: string;
  excerpt: string;
  content: string;
  featured?: boolean;
}

export interface InAppNotification {
  id: string;
  targetRole?: UserRole;
  targetUserId?: string;
  title: string;
  message: string;
  type: 'application' | 'interview' | 'verification' | 'job_approval' | 'event' | 'system';
  read: boolean;
  createdAt: string;
  actionTab?: string;
}

export interface AuditLog {
  id: string;
  action: string;
  performedBy: string;
  role: string;
  timestamp: string;
  details: string;
}

export interface StudentCareerPreference {
  preferredRoles: string[]; // e.g. ['software', 'testing', 'security', 'ai_data']
  preferredLocations: string[]; // e.g. ['Hải Phòng', 'KCN Tràng Duệ', 'KCN Đình Vũ', 'Hà Nội']
  preferredJobTypes: string[]; // e.g. ['internship', 'fresher', 'part_time']
  requireStampSupport: boolean;
  requireFlexibleSchedule: boolean;
}

export interface JobMatchAnalysis {
  job: Job;
  overallScore: number; // 0 - 100
  skillsScore: number; // 0 - 100
  majorScore: number; // 0 - 100
  locationScore: number; // 0 - 100
  matchedRequiredSkills: string[];
  missingRequiredSkills: string[];
  matchedPreferredSkills: string[];
  reasons: string[];
  recommendations: string[];
  isSaved?: boolean;
}
