import React, { useState } from 'react';
import { Job, StudentProfile, StudentCareerPreference, JobMatchAnalysis } from '../types/hpu';
import { getRecommendedJobs } from '../utils/aiJobMatching';

interface AIMatchedJobsViewProps {
  jobs: Job[];
  student: StudentProfile;
  savedJobIds: string[];
  onToggleSaveJob: (jobId: string) => void;
  onSelectJob: (job: Job) => void;
  onApplyJob: (job: Job) => void;
  onNavigateToProfile: () => void;
}

export const AIMatchedJobsView: React.FC<AIMatchedJobsViewProps> = ({
  jobs,
  student,
  savedJobIds,
  onToggleSaveJob,
  onSelectJob,
  onApplyJob,
  onNavigateToProfile
}) => {
  const [preferences, setPreferences] = useState<StudentCareerPreference>({
    preferredRoles: ['software', 'testing'],
    preferredLocations: ['Hải Phòng', 'KCN Tràng Duệ', 'KCN Đình Vũ'],
    preferredJobTypes: ['internship', 'fresher'],
    requireStampSupport: true,
    requireFlexibleSchedule: true
  });

  const [showPreferences, setShowPreferences] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState<'all' | 'saved' | 'top_matches'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Run the AI matching engine
  const allAnalyses = getRecommendedJobs(jobs, student, preferences, savedJobIds);

  const displayedAnalyses = allAnalyses.filter(item => {
    if (activeFilterTab === 'saved') return savedJobIds.includes(item.job.id);
    if (activeFilterTab === 'top_matches') return item.overallScore >= 85;
    return true;
  });

  const handleRoleToggle = (role: string) => {
    const current = preferences.preferredRoles;
    const updated = current.includes(role)
      ? current.filter(r => r !== role)
      : [...current, role];
    setPreferences({ ...preferences, preferredRoles: updated });
    showToast('Đã cập nhật ưu tiên lĩnh vực chuyên môn!');
  };

  const handleJobTypeToggle = (type: string) => {
    const current = preferences.preferredJobTypes;
    const updated = current.includes(type)
      ? current.filter(t => t !== type)
      : [...current, type];
    setPreferences({ ...preferences, preferredJobTypes: updated });
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-900 bg-emerald-100 border-emerald-300';
    if (score >= 75) return 'text-indigo-900 bg-indigo-100 border-indigo-300';
    return 'text-amber-900 bg-amber-100 border-amber-300';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded shadow-lg border border-slate-700 text-xs font-bold">
          [Thông báo] {toastMessage}
        </div>
      )}

      {/* Top Banner with Student Profile Context */}
      <div className="bg-slate-900 text-white rounded p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-amber-400 font-bold block">
              Khoa CNTT – ĐH Hải Phòng · Module AI Gợi ý việc làm phù hợp
            </span>
            <h1 className="text-xl sm:text-2xl font-bold font-['Outfit']">
              Việc làm & Cơ hội Thực tập Phù hợp với Tôi
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Hệ thống tự động đối soát hồ sơ năng lực của sinh viên <strong>{student.fullName}</strong> ({student.studentCode} - {student.className}) với yêu cầu thực tế của từng vị trí tuyển dụng, giúp bạn tiết kiệm thời gian và nâng cao tỷ lệ trúng tuyển.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setShowPreferences(!showPreferences)}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-bold border border-slate-700 cursor-pointer"
            >
              {showPreferences ? 'Ẩn bộ điều chỉnh ưu tiên' : 'Điều chỉnh ưu tiên nghề nghiệp'}
            </button>
            <button
              type="button"
              onClick={onNavigateToProfile}
              className="px-3.5 py-2 bg-indigo-900 hover:bg-indigo-800 text-white rounded text-xs font-bold cursor-pointer"
            >
              Cập nhật CV / Kỹ năng
            </button>
          </div>
        </div>
      </div>

      {/* Collapsible Career Preferences Customizer (Requirement 9) */}
      {showPreferences && (
        <div className="bg-white border border-slate-300 rounded p-6 shadow-sm space-y-5">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Tùy chỉnh Trọng số & Ưu tiên Nghề nghiệp của Sinh viên
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Thay đổi các ưu tiên bên dưới để thuật toán tính lại điểm số phù hợp theo thời gian thực.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setPreferences({
                  preferredRoles: ['software', 'testing'],
                  preferredLocations: ['Hải Phòng', 'KCN Tràng Duệ', 'KCN Đình Vũ'],
                  preferredJobTypes: ['internship', 'fresher'],
                  requireStampSupport: true,
                  requireFlexibleSchedule: true
                });
                showToast('Đã đặt lại ưu tiên về mặc định!');
              }}
              className="text-xs text-indigo-900 hover:underline font-bold"
            >
              [Đặt lại mặc định]
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            {/* Preferred roles */}
            <div className="space-y-2">
              <span className="font-bold text-slate-800 block uppercase">
                1. Lĩnh vực công nghệ ưu tiên:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'software', label: 'Lập trình Phần mềm' },
                  { id: 'testing', label: 'Kiểm thử (QA/QC)' },
                  { id: 'security', label: 'Mạng & ATTT' },
                  { id: 'ai_data', label: 'AI & Data' },
                  { id: 'uiux', label: 'Thiết kế UI/UX' }
                ].map(r => {
                  const active = preferences.preferredRoles.includes(r.id);
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => handleRoleToggle(r.id)}
                      className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer transition-colors ${
                        active
                          ? 'bg-indigo-900 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                      }`}
                    >
                      {active ? `✓ ${r.label}` : `+ ${r.label}`}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Preferred job types */}
            <div className="space-y-2">
              <span className="font-bold text-slate-800 block uppercase">
                2. Loại hình mong muốn:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'internship', label: 'Thực tập sinh' },
                  { id: 'fresher', label: 'Fresher (Mới ra trường)' },
                  { id: 'part_time', label: 'Việc làm bán thời gian' },
                  { id: 'junior', label: 'Junior (Kinh nghiệm < 1 năm)' }
                ].map(t => {
                  const active = preferences.preferredJobTypes.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleJobTypeToggle(t.id)}
                      className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer transition-colors ${
                        active
                          ? 'bg-indigo-900 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                      }`}
                    >
                      {active ? `✓ ${t.label}` : `+ ${t.label}`}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Specific HPUni conditions */}
            <div className="space-y-2">
              <span className="font-bold text-slate-800 block uppercase">
                3. Điều kiện học tập HPUni:
              </span>
              <div className="space-y-2 pt-1">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-800">
                  <input
                    type="checkbox"
                    checked={preferences.requireStampSupport}
                    onChange={e =>
                      setPreferences({
                        ...preferences,
                        requireStampSupport: e.target.checked
                      })
                    }
                  />
                  <span>Ưu tiên có xác nhận mộc thực tập Khoa CNTT</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-800">
                  <input
                    type="checkbox"
                    checked={preferences.requireFlexibleSchedule}
                    onChange={e =>
                      setPreferences({
                        ...preferences,
                        requireFlexibleSchedule: e.target.checked
                      })
                    }
                  />
                  <span>Ưu tiên thời gian làm việc linh hoạt theo lịch học</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transparency Disclaimer Notice */}
      <div className="p-4 bg-slate-100 border border-slate-300 rounded text-xs text-slate-700 leading-relaxed">
        <strong>Nguyên tắc minh bạch & Khách quan:</strong> Điểm phù hợp (% Match Score) được tính toán tự động dựa trên mức độ đối khớp giữa các kỹ năng lập trình, dự án đã thực hiện và ưu tiên của sinh viên với yêu cầu thực tế của từng tin tuyển dụng đã phê duyệt. Điểm số là chỉ số gợi ý định hướng học tập, không phải lời cam kết tuyển dụng từ doanh nghiệp và không sử dụng bất kỳ thông tin nhạy cảm nào (giới tính, tôn giáo, xuất thân).
      </div>

      {/* SubTab Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveFilterTab('all')}
            className={`px-3 py-1.5 rounded cursor-pointer ${
              activeFilterTab === 'all'
                ? 'bg-indigo-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Tất cả đề xuất ({allAnalyses.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveFilterTab('top_matches')}
            className={`px-3 py-1.5 rounded cursor-pointer ${
              activeFilterTab === 'top_matches'
                ? 'bg-indigo-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Rất phù hợp (≥ 85%) ({allAnalyses.filter(a => a.overallScore >= 85).length})
          </button>

          <button
            type="button"
            onClick={() => setActiveFilterTab('saved')}
            className={`px-3 py-1.5 rounded cursor-pointer ${
              activeFilterTab === 'saved'
                ? 'bg-indigo-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Đã lưu ({savedJobIds.length})
          </button>
        </div>

        <div className="text-xs text-slate-500 font-mono">
          Hiển thị <strong>{displayedAnalyses.length}</strong> cơ hội
        </div>
      </div>

      {/* Matched Jobs List */}
      {displayedAnalyses.length === 0 ? (
        <div className="bg-white border border-slate-300 rounded p-12 text-center space-y-3">
          <h3 className="text-base font-bold text-slate-800">
            Chưa có vị trí nào thỏa mãn bộ lọc hiện tại
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Hãy thử mở rộng các tùy chọn ưu tiên hoặc bấm vào mục &quot;Tất cả đề xuất&quot; để xem toàn bộ việc làm phù hợp.
          </p>
          <button
            type="button"
            onClick={() => setActiveFilterTab('all')}
            className="mt-2 px-4 py-2 bg-indigo-900 text-white rounded text-xs font-bold hover:bg-indigo-800"
          >
            Xem tất cả đề xuất
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {displayedAnalyses.map(analysis => {
            const { job, overallScore, matchedRequiredSkills, missingRequiredSkills, reasons, recommendations } = analysis;
            const isSaved = savedJobIds.includes(job.id);

            return (
              <div
                key={job.id}
                className="bg-white border border-slate-300 rounded p-6 shadow-sm hover:border-slate-400 transition-all space-y-4"
              >
                {/* Header row: Company, title, match score, save button */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-900">{job.companyName}</h4>
                      {job.companyVerified && (
                        <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded border border-slate-300 font-normal">
                          Đã xác minh
                        </span>
                      )}
                      <span className="text-slate-300">·</span>
                      <span className="text-xs text-slate-500">{job.location}</span>
                    </div>

                    <h2
                      onClick={() => onSelectJob(job)}
                      className="text-base sm:text-lg font-bold text-slate-900 hover:text-indigo-900 cursor-pointer transition-colors font-['Outfit']"
                    >
                      {job.title}
                    </h2>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 pt-1">
                      <span className="font-mono font-bold text-indigo-900">{job.salaryText}</span>
                      <span>·</span>
                      <span>Hình thức: <strong>{job.workMode}</strong></span>
                      <span>·</span>
                      <span>Hạn nộp: <strong className="font-mono text-slate-800">{job.deadline}</strong></span>
                    </div>
                  </div>

                  {/* Match score badge + Save button */}
                  <div className="flex items-center sm:flex-col items-end gap-2 shrink-0">
                    <div
                      className={`px-3 py-1.5 rounded border text-center font-bold ${getScoreColor(
                        overallScore
                      )}`}
                    >
                      <div className="text-lg font-extrabold font-mono tabular-nums leading-none">
                        {overallScore}%
                      </div>
                      <div className="text-[10px] uppercase tracking-wider mt-0.5">
                        {overallScore >= 85 ? 'Rất phù hợp' : overallScore >= 70 ? 'Phù hợp tốt' : 'Tiềm năng'}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        onToggleSaveJob(job.id);
                        showToast(isSaved ? 'Đã bỏ lưu tin tuyển dụng' : 'Đã lưu việc làm vào mục quan tâm');
                      }}
                      className={`text-xs px-2.5 py-1 rounded font-bold transition-colors cursor-pointer border ${
                        isSaved
                          ? 'bg-amber-100 text-amber-900 border-amber-300'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300'
                      }`}
                    >
                      {isSaved ? 'Đã lưu tin' : 'Lưu tin'}
                    </button>
                  </div>
                </div>

                {/* Skills Comparison Box: matched vs missing */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {/* Matched skills */}
                  <div className="p-3 bg-emerald-50 rounded border border-emerald-200 space-y-1.5">
                    <span className="font-bold text-emerald-900 block text-[11px] uppercase tracking-wider">
                      [Kỹ năng bạn đã đáp ứng] ({matchedRequiredSkills.length}):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {matchedRequiredSkills.length > 0 ? (
                        matchedRequiredSkills.map((s, i) => (
                          <span key={i} className="px-2 py-0.5 bg-white text-emerald-900 rounded font-semibold border border-emerald-300">
                            ✓ {s}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-500 italic">Đang phân tích kỹ năng tương đồng...</span>
                      )}
                    </div>
                  </div>

                  {/* Missing skills */}
                  <div className="p-3 bg-amber-50 rounded border border-amber-200 space-y-1.5">
                    <span className="font-bold text-amber-900 block text-[11px] uppercase tracking-wider">
                      [Kỹ năng còn thiếu hoặc cần bổ sung] ({missingRequiredSkills.length}):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {missingRequiredSkills.length > 0 ? (
                        missingRequiredSkills.map((s, i) => (
                          <span key={i} className="px-2 py-0.5 bg-white text-amber-900 rounded font-semibold border border-amber-300">
                            + {s}
                          </span>
                        ))
                      ) : (
                        <span className="text-emerald-800 font-bold">Bạn đã đáp ứng toàn bộ kỹ năng bắt buộc!</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Explanation: Why is this position recommended? */}
                <div className="p-3.5 bg-slate-50 rounded border border-slate-200 text-xs space-y-1">
                  <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">
                    Lý do hệ thống đề xuất vị trí này:
                  </span>
                  <ul className="space-y-1 text-slate-700">
                    {reasons.map((r, i) => (
                      <li key={i} className="leading-relaxed">
                        - {r}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Roadmap Recommendations */}
                <div className="p-3.5 bg-indigo-50/50 rounded border border-indigo-200 text-xs space-y-1">
                  <span className="font-bold text-indigo-950 block text-[11px] uppercase tracking-wider">
                    Gợi ý tối ưu hồ sơ & Đồ án môn học để tăng cơ hội trúng tuyển:
                  </span>
                  <ul className="space-y-1 text-slate-800">
                    {recommendations.map((rec, i) => (
                      <li key={i} className="leading-relaxed">
                        - {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions bottom row */}
                <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    {job.stampSupport && (
                      <span className="text-emerald-800 font-bold text-[11px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Có hỗ trợ đóng dấu mộc thực tập Khoa CNTT
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectJob(job)}
                      className="px-3.5 py-1.5 font-bold text-slate-800 hover:bg-slate-100 rounded border border-slate-300 cursor-pointer"
                    >
                      Xem chi tiết
                    </button>
                    <button
                      type="button"
                      onClick={() => onApplyJob(job)}
                      className="px-4 py-1.5 bg-indigo-900 hover:bg-indigo-800 text-white font-bold rounded cursor-pointer transition-colors"
                    >
                      Ứng tuyển ngay
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
