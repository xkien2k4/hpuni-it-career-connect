import React, { useState } from 'react';
import { Company, Job, Application, ApplicationStatus, JobType, JobCategory } from '../types/hpu';

interface EmployerPortalProps {
  currentCompany: Company;
  jobs: Job[];
  applications: Application[];
  onPostJob: (job: Job) => void;
  onUpdateApplicationStatus: (appId: string, newStatus: ApplicationStatus, interviewDetails?: Application['interviewSchedule'], notes?: string) => void;
  onToggleJobStatus: (jobId: string) => void;
}

export const EmployerPortal: React.FC<EmployerPortalProps> = ({
  currentCompany,
  jobs,
  applications,
  onPostJob,
  onUpdateApplicationStatus,
  onToggleJobStatus
}) => {
  const [activeTab, setActiveTab] = useState<'applicants' | 'jobs' | 'profile'>('applicants');
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [selectedAppForInterview, setSelectedAppForInterview] = useState<Application | null>(null);

  // New Job Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<JobCategory>('software');
  const [jobType, setJobType] = useState<JobType>('internship');
  const [salaryText, setSalaryText] = useState('6.000.000 - 8.000.000 VNĐ/tháng');
  const [location, setLocation] = useState(currentCompany.address);
  const [workMode, setWorkMode] = useState<'On-site' | 'Hybrid' | 'Remote'>('On-site');
  const [slots, setSlots] = useState(5);
  const [deadline, setDeadline] = useState('15/12/2026');
  const [stampSupport, setStampSupport] = useState(true);
  const [flexibleSchedule, setFlexibleSchedule] = useState(true);
  const [requiredSkillsText, setRequiredSkillsText] = useState('C++, Linux, Data Structures');
  const [description, setDescription] = useState('');
  const [requirementsText, setRequirementsText] = useState('Sinh viên năm 3, năm cuối Khoa CNTT ĐH Hải Phòng\nTư duy logic tốt, chăm chỉ học hỏi');
  const [benefitsText, setBenefitsText] = useState('Trợ cấp hàng tháng theo năng lực\nHỗ trợ dấu mộc thực tập tốt nghiệp\nCơ hội làm việc chính thức sau tốt nghiệp');

  // Interview modal states
  const [interviewDate, setInterviewDate] = useState('30/10/2026');
  const [interviewTime, setInterviewTime] = useState('14:00');
  const [interviewLocation, setInterviewLocation] = useState('Văn phòng công ty hoặc Google Meet');
  const [interviewNotes, setInterviewNotes] = useState('Ứng viên chuẩn bị bảng điểm đại học và các bài tập lớn đã thực hiện.');

  const isVerified = currentCompany.verificationStatus === 'verified';
  const companyJobs = jobs.filter(j => j.companyId === currentCompany.id);
  const companyApplications = applications.filter(a => a.companyId === currentCompany.id);

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) {
      alert('Tài khoản của bạn chưa được Admin phê duyệt hoặc đang tạm khóa, không thể đăng tin tuyển dụng.');
      return;
    }

    const newJob: Job = {
      id: `job-${Date.now()}`,
      companyId: currentCompany.id,
      companyName: currentCompany.name,
      companyLogoText: currentCompany.logoText,
      companyColor: currentCompany.logoColor,
      companyVerified: true,
      title,
      category,
      jobType,
      targetAudiences: ['Sinh viên năm 3', 'Sinh viên năm cuối'],
      description: description || `Tuyển dụng ${title} tại ${currentCompany.name}.`,
      requirements: requirementsText.split('\n').filter(Boolean),
      benefits: benefitsText.split('\n').filter(Boolean),
      requiredSkills: requiredSkillsText.split(',').map(s => s.trim()).filter(Boolean),
      preferredSkills: ['Git', 'English'],
      salaryText,
      location,
      workMode,
      slots: Number(slots) || 5,
      deadline,
      postedDate: new Date().toLocaleDateString('vi-VN'),
      approvalStatus: 'approved',
      displayStatus: 'active',
      applicantsCount: 0,
      stampSupport,
      flexibleSchedule
    };

    onPostJob(newJob);
    setShowPostJobModal(false);
  };

  const handleConfirmInterview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppForInterview) return;

    onUpdateApplicationStatus(
      selectedAppForInterview.id,
      'interview',
      {
        date: interviewDate,
        time: interviewTime,
        locationOrLink: interviewLocation,
        notes: interviewNotes
      },
      'Doanh nghiệp đã xếp lịch phỏng vấn sinh viên'
    );
    setSelectedAppForInterview(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">
              Cổng Đối tác Tuyển dụng Khoa CNTT
            </span>
            <span className="text-slate-500">|</span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                isVerified
                  ? 'bg-emerald-800 text-emerald-200'
                  : 'bg-amber-800 text-amber-200'
              }`}
            >
              {isVerified ? 'Tài khoản Đã xác minh' : 'Tài khoản Chờ phê duyệt'}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-['Outfit']">
            {currentCompany.name}
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Đại diện: {currentCompany.representativeName} · MST: {currentCompany.taxCode} · {currentCompany.address}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isVerified ? (
            <button
              type="button"
              onClick={() => setShowPostJobModal(true)}
              className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded text-xs font-bold transition-colors cursor-pointer"
            >
              + Đăng tin tuyển dụng mới
            </button>
          ) : (
            <div className="text-xs text-amber-300 font-medium bg-amber-950 p-2 rounded border border-amber-800">
              Chờ Admin kích hoạt tài khoản để đăng tin
            </div>
          )}
        </div>
      </div>

      {/* Account Inactive Notice */}
      {!isVerified && (
        <div className="p-4 bg-amber-50 border border-amber-300 rounded text-xs text-amber-900 space-y-1">
          <strong>Thông báo quyền hạn:</strong> Tài khoản doanh nghiệp của quý đơn vị đang trong quy trình xác minh pháp lý của Ban Quản trị Khoa CNTT. Theo quy định bảo mật, quý đơn vị chỉ có thể thực hiện đăng tuyển và truy cập hồ sơ sinh viên sau khi được Admin kích hoạt chính thức.
        </div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-300 rounded p-4">
          <div className="text-xs font-bold text-slate-500 uppercase">Tin đang hiển thị</div>
          <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
            {companyJobs.filter(j => j.displayStatus === 'active').length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Vị trí thực tập / việc làm</div>
        </div>

        <div className="bg-white border border-slate-300 rounded p-4">
          <div className="text-xs font-bold text-slate-500 uppercase">Hồ sơ sinh viên đã nộp</div>
          <div className="text-2xl font-bold font-mono text-indigo-900 mt-1">
            {companyApplications.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Ứng viên từ các lớp Khoa CNTT</div>
        </div>

        <div className="bg-white border border-slate-300 rounded p-4">
          <div className="text-xs font-bold text-slate-500 uppercase">Đang xếp lịch phỏng vấn</div>
          <div className="text-2xl font-bold font-mono text-purple-900 mt-1">
            {companyApplications.filter(a => a.status === 'interview').length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Hẹn phỏng vấn trực tiếp / online</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-300 pb-1 text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveTab('applicants')}
          className={`px-4 py-2 rounded ${
            activeTab === 'applicants' ? 'bg-indigo-900 text-white' : 'text-slate-700 hover:bg-slate-200'
          }`}
        >
          Danh sách ứng viên ({companyApplications.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('jobs')}
          className={`px-4 py-2 rounded ${
            activeTab === 'jobs' ? 'bg-indigo-900 text-white' : 'text-slate-700 hover:bg-slate-200'
          }`}
        >
          Tin tuyển dụng của công ty ({companyJobs.length})
        </button>
      </div>

      {activeTab === 'applicants' ? (
        <div className="bg-white border border-slate-300 rounded p-6 space-y-4">
          <div className="pb-3 border-b border-slate-200">
            <h2 className="text-base font-bold text-slate-900">
              Quản lý Hồ sơ Sinh viên Ứng tuyển
            </h2>
            <p className="text-xs text-slate-500">
              Xem xét hồ sơ, xếp lịch phỏng vấn hoặc gửi thư mời thực tập cho sinh viên theo lớp.
            </p>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
                <tr>
                  <th className="p-3">Sinh viên ứng tuyển</th>
                  <th className="p-3">Lớp học</th>
                  <th className="p-3">Điểm GPA</th>
                  <th className="p-3">Vị trí ứng tuyển</th>
                  <th className="p-3">Trạng thái</th>
                  <th className="p-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {companyApplications.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      Chưa có hồ sơ sinh viên nào nộp vào các tin của quý công ty.
                    </td>
                  </tr>
                ) : (
                  companyApplications.map(app => (
                    <tr key={app.id} className="hover:bg-slate-50">
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{app.studentName}</div>
                        <div className="text-[11px] text-slate-500 font-mono">MSSV: {app.studentCode}</div>
                      </td>

                      <td className="p-3 font-bold text-indigo-900">
                        {app.studentClass}
                      </td>

                      <td className="p-3 font-mono font-bold text-indigo-900">
                        {app.studentGpa}
                      </td>

                      <td className="p-3">
                        <span className="font-medium text-slate-800 block line-clamp-1">{app.jobTitle}</span>
                        <span className="text-[11px] text-slate-400">Nộp: {app.appliedDate}</span>
                      </td>

                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-800 border border-slate-300">
                          {app.status}
                        </span>
                      </td>

                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {app.status !== 'interview' && (
                            <button
                              type="button"
                              onClick={() => setSelectedAppForInterview(app)}
                              className="px-2.5 py-1 text-xs font-bold text-purple-900 bg-purple-50 hover:bg-purple-100 rounded border border-purple-200 cursor-pointer"
                            >
                              Hẹn PV
                            </button>
                          )}
                          {app.status !== 'offered' && (
                            <button
                              type="button"
                              onClick={() => onUpdateApplicationStatus(app.id, 'offered', undefined, 'Doanh nghiệp gửi thư mời Offer')}
                              className="px-2.5 py-1 text-xs font-bold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded border border-emerald-200 cursor-pointer"
                            >
                              Gửi Offer
                            </button>
                          )}
                          {app.status !== 'rejected' && (
                            <button
                              type="button"
                              onClick={() => onUpdateApplicationStatus(app.id, 'rejected', undefined, 'Chưa phù hợp đợt tuyển này')}
                              className="px-2 py-1 text-xs text-red-700 hover:underline cursor-pointer font-bold"
                            >
                              Từ chối
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Jobs List */
        <div className="bg-white border border-slate-300 rounded p-6 space-y-4">
          <div className="pb-3 border-b border-slate-200">
            <h2 className="text-base font-bold text-slate-900">
              Danh sách Tin Tuyển dụng của Doanh nghiệp
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {companyJobs.map(job => (
              <div key={job.id} className="border border-slate-300 rounded p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-sm text-slate-900">{job.title}</h3>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold border ${
                      job.approvalStatus === 'approved'
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                        : 'bg-amber-50 text-amber-900 border-amber-300'
                    }`}
                  >
                    {job.approvalStatus === 'approved' ? 'Đã duyệt' : 'Chờ duyệt'}
                  </span>
                </div>

                <div className="text-xs text-slate-600">
                  Lương: <strong>{job.salaryText}</strong> · Hạn: <strong>{job.deadline}</strong> · Đã nộp: <strong>{job.applicantsCount}</strong>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    Trạng thái: {job.displayStatus === 'active' ? 'Đang mở' : 'Đã đóng'}
                  </span>
                  <button
                    type="button"
                    onClick={() => onToggleJobStatus(job.id)}
                    className="text-indigo-900 hover:underline font-bold"
                  >
                    {job.displayStatus === 'active' ? 'Đóng tin' : 'Mở lại tin'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Post Job Modal */}
      {showPostJobModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white rounded max-w-xl w-full p-6 shadow-xl border border-slate-300 space-y-4 text-xs">
            <div className="border-b border-slate-200 pb-2">
              <h2 className="text-base font-bold text-slate-900 font-['Outfit']">
                Đăng tin Tuyển dụng Sinh viên / Thực tập sinh mới
              </h2>
              <p className="text-xs text-slate-500">Tin sẽ được hiển thị cho sinh viên Khoa CNTT sau khi gửi.</p>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-3">
              <div>
                <label className="block text-slate-800 font-bold mb-1">Tiêu đề tin tuyển dụng (*)</label>
                <input
                  type="text"
                  required
                  placeholder="VD: Thực tập sinh Lập trình C/C++ Ô tô"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-800 font-bold mb-1">Lĩnh vực (*)</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as JobCategory)}
                    className="w-full px-3 py-2 border border-slate-300 rounded bg-white"
                  >
                    <option value="software">Phần mềm</option>
                    <option value="testing">Kiểm thử QA/QC</option>
                    <option value="security">Mạng & Bảo mật</option>
                    <option value="ai_data">AI & Dữ liệu</option>
                    <option value="uiux">UI/UX Design</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-800 font-bold mb-1">Loại hình (*)</label>
                  <select
                    value={jobType}
                    onChange={e => setJobType(e.target.value as JobType)}
                    className="w-full px-3 py-2 border border-slate-300 rounded bg-white"
                  >
                    <option value="internship">Thực tập tốt nghiệp</option>
                    <option value="fresher">Fresher</option>
                    <option value="part_time">Bán thời gian</option>
                    <option value="junior">Junior</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-800 font-bold mb-1">Mức lương / Trợ cấp</label>
                  <input
                    type="text"
                    required
                    value={salaryText}
                    onChange={e => setSalaryText(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-800 font-bold mb-1">Hạn nộp hồ sơ</label>
                  <input
                    type="text"
                    required
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-800 font-bold mb-1">Kỹ năng bắt buộc (cách nhau bằng dấu phẩy)</label>
                <input
                  type="text"
                  required
                  value={requiredSkillsText}
                  onChange={e => setRequiredSkillsText(e.target.value)}
                  placeholder="C++, Linux, SQL..."
                  className="w-full px-3 py-2 border border-slate-300 rounded bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="flex items-center gap-2 font-medium text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={stampSupport}
                    onChange={e => setStampSupport(e.target.checked)}
                  />
                  <span>Hỗ trợ xác nhận và đóng dấu mộc thực tập tốt nghiệp</span>
                </label>

                <label className="flex items-center gap-2 font-medium text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={flexibleSchedule}
                    onChange={e => setFlexibleSchedule(e.target.checked)}
                  />
                  <span>Thời gian làm việc linh hoạt theo thời khóa biểu học</span>
                </label>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPostJobModal(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 font-bold"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-900 text-white rounded font-bold hover:bg-indigo-800"
                >
                  Đăng tin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Schedule Interview Modal */}
      {selectedAppForInterview && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white rounded max-w-md w-full p-6 shadow-xl border border-slate-300 space-y-4 text-xs">
            <div className="border-b border-slate-200 pb-2">
              <h3 className="text-base font-bold text-slate-900">
                Xếp lịch Phỏng vấn Sinh viên
              </h3>
              <p className="text-xs text-slate-500">
                Ứng viên: <strong>{selectedAppForInterview.studentName}</strong> ({selectedAppForInterview.studentClass})
              </p>
            </div>

            <form onSubmit={handleConfirmInterview} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Ngày phỏng vấn</label>
                  <input
                    type="text"
                    required
                    value={interviewDate}
                    onChange={e => setInterviewDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Giờ phỏng vấn</label>
                  <input
                    type="text"
                    required
                    value={interviewTime}
                    onChange={e => setInterviewTime(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Địa điểm hoặc Đường link (Meet/Teams)</label>
                <input
                  type="text"
                  required
                  value={interviewLocation}
                  onChange={e => setInterviewLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Ghi chú cho sinh viên</label>
                <textarea
                  rows={2}
                  value={interviewNotes}
                  onChange={e => setInterviewNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded"
                />
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedAppForInterview(null)}
                  className="px-3 py-1.5 border border-slate-300 rounded font-bold text-slate-700"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-900 text-white rounded font-bold hover:bg-indigo-800"
                >
                  Xác nhận gửi lịch hẹn
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
