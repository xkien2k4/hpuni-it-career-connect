import React, { useState } from 'react';
import { StudentProfile, Application, ApplicationStatus } from '../types/hpu';

interface StudentPortalProps {
  student: StudentProfile;
  applications: Application[];
  onUpdateProfile: (updated: StudentProfile) => void;
  onWithdrawApplication: (appId: string) => void;
  onOpenAICVModal: () => void;
  onNavigateTab?: (tab: string) => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  student,
  applications,
  onUpdateProfile,
  onWithdrawApplication,
  onOpenAICVModal,
  onNavigateTab
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'applications'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<StudentProfile>(student);
  const [newSkill, setNewSkill] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSave = () => {
    onUpdateProfile(formData);
    setIsEditing(false);
    showToast('Đã lưu thông tin hồ sơ sinh viên thành công!');
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skill)
    });
  };

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'submitted':
        return { label: 'Đã nộp hồ sơ', color: 'bg-slate-100 text-slate-800 border-slate-300' };
      case 'reviewing':
        return { label: 'Đang xem xét', color: 'bg-amber-100 text-amber-800 border-amber-300' };
      case 'shortlisted':
        return { label: 'Hồ sơ tiềm năng', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' };
      case 'interview':
        return { label: 'Đã hẹn phỏng vấn', color: 'bg-purple-100 text-purple-800 border-purple-300' };
      case 'offered':
        return { label: 'Đã gửi Offer', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      case 'hired':
        return { label: 'Đã được nhận việc', color: 'bg-emerald-200 text-emerald-900 border-emerald-400 font-bold' };
      case 'rejected':
        return { label: 'Chưa phù hợp', color: 'bg-red-100 text-red-800 border-red-300' };
      case 'withdrawn':
        return { label: 'Đã rút đơn', color: 'bg-slate-200 text-slate-600 border-slate-300' };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded shadow-lg border border-slate-700 text-xs font-bold">
          [Thông báo] {toastMessage}
        </div>
      )}

      {/* Top Banner Card */}
      <div className="bg-white border border-slate-300 rounded p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-slate-900 font-['Outfit']">{formData.fullName}</h1>
            <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold border border-emerald-300">
              Sinh viên chính quy HPUni
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 flex flex-wrap items-center gap-2">
            <span>Mã SV: <strong className="font-mono text-slate-900">{formData.studentCode}</strong></span>
            <span>·</span>
            <span>Lớp: <strong className="text-indigo-900">{formData.className}</strong></span>
            <span>·</span>
            <span>Khóa học: <strong className="text-slate-800">{formData.academicYear}</strong></span>
            <span>·</span>
            <span className="text-indigo-900 font-bold font-mono">GPA: {formData.gpa}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onNavigateTab && (
            <button
              type="button"
              onClick={() => onNavigateTab('ai_matched_jobs')}
              className="px-3.5 py-2 text-xs font-bold text-purple-900 bg-purple-100 hover:bg-purple-200 rounded border border-purple-300 cursor-pointer"
            >
              Xem Việc làm phù hợp (AI Match)
            </button>
          )}
          <button
            type="button"
            onClick={onOpenAICVModal}
            className="px-3.5 py-2 text-xs font-bold text-indigo-900 bg-indigo-50 hover:bg-indigo-100 rounded border border-indigo-200 cursor-pointer"
          >
            Đánh giá CV & Gợi ý ATS
          </button>
          {isEditing ? (
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-700 rounded transition-colors cursor-pointer"
            >
              Lưu thay đổi hồ sơ
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-xs font-bold text-white bg-indigo-900 hover:bg-indigo-800 rounded transition-colors cursor-pointer"
            >
              Chỉnh sửa thông tin
            </button>
          )}
        </div>
      </div>

      {/* Profile Completion Progress Bar */}
      <div className="bg-white border border-slate-300 rounded p-4 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-slate-800">
            Mức độ hoàn thiện hồ sơ sinh viên:
          </span>
          <span className="font-mono text-indigo-900">
            {formData.profileCompletion}%
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded h-2 overflow-hidden">
          <div
            className="bg-indigo-900 h-2 rounded transition-all duration-500"
            style={{ width: `${formData.profileCompletion}%` }}
          ></div>
        </div>
        <p className="text-[11px] text-slate-500">
          Hồ sơ đầy đủ thông tin học tập, dự án và CV giúp bạn nhận được nhiều lời mời phỏng vấn hơn từ các doanh nghiệp tại Hải Phòng.
        </p>
      </div>

      {/* Tabs Selector (Text only) */}
      <div className="flex items-center gap-2 border-b border-slate-300 pb-1 text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded ${
            activeTab === 'profile' ? 'bg-indigo-900 text-white' : 'text-slate-700 hover:bg-slate-200'
          }`}
        >
          Hồ sơ nghề nghiệp & Kỹ năng
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('applications')}
          className={`px-4 py-2 rounded ${
            activeTab === 'applications' ? 'bg-indigo-900 text-white' : 'text-slate-700 hover:bg-slate-200'
          }`}
        >
          Đơn đã ứng tuyển ({applications.length})
        </button>
      </div>

      {activeTab === 'profile' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Academic & CV */}
          <div className="space-y-6">
            {/* Card: Thông tin học vấn Khoa CNTT (No Major, Only Class) */}
            <div className="bg-white border border-slate-300 rounded p-5 space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-200">
                Thông tin Sinh viên & Lớp học
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-500 block">Đơn vị đào tạo:</span>
                  <span className="text-slate-900 font-bold block mt-0.5">Trường Đại học Hải Phòng</span>
                  <span className="text-slate-600 text-[11px]">Khoa Công nghệ Thông tin</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-slate-500 block">Mã sinh viên:</span>
                    <strong className="text-slate-800 font-mono block mt-0.5">{formData.studentCode}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Lớp sinh hoạt:</span>
                    <span className="text-indigo-900 font-bold block mt-0.5">{formData.className}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-slate-500 block">Điểm GPA tích lũy:</span>
                    <strong className="text-indigo-900 font-bold font-mono block mt-0.5">{formData.gpa}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Khóa học:</span>
                    <span className="text-slate-800 block mt-0.5">{formData.academicYear}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-slate-500 block">Email:</span>
                  <span className="text-slate-800 font-mono block mt-0.5">{formData.email}</span>
                </div>

                <div>
                  <span className="text-slate-500 block">Số điện thoại:</span>
                  <span className="text-slate-800 font-mono block mt-0.5">{formData.phone}</span>
                </div>
              </div>
            </div>

            {/* Card: Quản lý CV PDF */}
            <div className="bg-white border border-slate-300 rounded p-5 space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-200">
                Tệp CV Đính kèm (PDF)
              </h3>

              <div className="p-3 bg-slate-50 rounded border border-slate-300 text-xs space-y-2">
                <div>
                  <strong className="text-slate-900 block">{formData.cvFileName}</strong>
                  <span className="text-[11px] text-slate-500">Cập nhật lần cuối: 22/10/2026</span>
                </div>

                <label className="inline-block px-3 py-1.5 bg-indigo-900 text-white text-xs font-bold rounded cursor-pointer hover:bg-indigo-800">
                  Tải lên tệp mới
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={e => {
                      if (e.target.files?.[0]) {
                        setFormData({ ...formData, cvFileName: e.target.files[0].name });
                        showToast(`Đã tải lên tệp: ${e.target.files[0].name}`);
                      }
                    }}
                  />
                </label>
              </div>

              <div className="text-[11px] text-slate-600 flex items-center gap-1.5 pt-1">
                <input
                  type="checkbox"
                  id="public_cv"
                  checked={formData.isPublicForEmployers}
                  onChange={e => setFormData({ ...formData, isPublicForEmployers: e.target.checked })}
                />
                <label htmlFor="public_cv" className="cursor-pointer">
                  Cho phép doanh nghiệp đã xác minh tìm thấy hồ sơ của tôi
                </label>
              </div>
            </div>

            {/* Card: Chứng chỉ */}
            <div className="bg-white border border-slate-300 rounded p-5 space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-200">
                Chứng chỉ & Khen thưởng
              </h3>
              <div className="space-y-2 text-xs">
                {formData.certificates.map((cert, i) => (
                  <div key={i} className="text-slate-800">
                    - {cert}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Skills, Projects */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio & Career Goal */}
            <div className="bg-white border border-slate-300 rounded p-5 space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-200">
                Mục tiêu nghề nghiệp & Giới thiệu bản thân
              </h3>
              {isEditing ? (
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-slate-700 font-bold block mb-1">Mục tiêu nghề nghiệp:</label>
                    <input
                      type="text"
                      value={formData.careerGoal}
                      onChange={e => setFormData({ ...formData, careerGoal: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-700 font-bold block mb-1">Giới thiệu bản thân:</label>
                    <textarea
                      rows={4}
                      value={formData.bio}
                      onChange={e => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded bg-white leading-relaxed"
                    ></textarea>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-xs">
                  <div className="font-bold text-indigo-900">
                    Mục tiêu: {formData.careerGoal}
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {formData.bio}
                  </p>
                </div>
              )}
            </div>

            {/* Skills */}
            <div className="bg-white border border-slate-300 rounded p-5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Kỹ năng Lập trình & Công nghệ
                </h3>
                <span className="text-[11px] text-slate-500 font-mono">
                  {formData.skills.length} kỹ năng
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center gap-2 px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-semibold rounded border border-slate-300"
                  >
                    <span>{skill}</span>
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-red-600 hover:text-red-800 font-bold text-xs"
                      >
                        [Xóa]
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {isEditing && (
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <input
                    type="text"
                    placeholder="Thêm kỹ năng mới (VD: Vue.js, Spring Boot, Linux...)"
                    value={newSkill}
                    onChange={e => setNewSkill(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                    className="px-3 py-1.5 border border-slate-300 rounded text-xs flex-1 bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-4 py-1.5 bg-indigo-900 text-white rounded text-xs font-bold hover:bg-indigo-800"
                  >
                    Thêm kỹ năng
                  </button>
                </div>
              )}
            </div>

            {/* Projects */}
            <div className="bg-white border border-slate-300 rounded p-5 space-y-4">
              <div className="pb-2 border-b border-slate-200">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Dự án Cá nhân & Đồ án Môn học Tiêu biểu
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Minh chứng năng lực thực tế gửi tới Khoa CNTT và Nhà tuyển dụng
                </p>
              </div>

              <div className="space-y-4">
                {formData.projects.map(proj => (
                  <div key={proj.id} className="p-4 bg-slate-50 rounded border border-slate-300 text-xs space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-slate-900 text-sm">{proj.name}</h4>
                      <span className="text-[11px] font-bold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                        Vai trò: {proj.role}
                      </span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      {proj.description}
                    </p>
                    <div className="text-[11px] text-slate-600 pt-1 flex items-center justify-between">
                      <div>
                        <strong>Công nghệ:</strong> {proj.techStack}
                      </div>
                      {proj.demoUrl && (
                        <a
                          href={proj.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-900 font-bold underline"
                        >
                          Xem mã nguồn / Demo
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Applications Tracker SubTab */
        <div className="space-y-4">
          <div className="bg-white border border-slate-300 rounded p-5">
            <h2 className="text-base font-bold text-slate-900 font-['Outfit']">
              Lịch sử Ứng tuyển & Theo dõi Trạng thái Hồ sơ
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Hệ thống cập nhật thời gian thực khi doanh nghiệp xét duyệt hoặc xếp lịch phỏng vấn.
            </p>
          </div>

          {applications.length === 0 ? (
            <div className="bg-white border border-slate-300 rounded p-12 text-center text-xs text-slate-500">
              Bạn chưa có đơn ứng tuyển nào.
            </div>
          ) : (
            applications.map(app => {
              const badge = getStatusBadge(app.status);
              const canWithdraw = app.status === 'submitted' || app.status === 'reviewing';

              return (
                <div
                  key={app.id}
                  className="bg-white border border-slate-300 rounded p-6 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                      <div className="text-xs text-slate-600 mb-1">
                        <strong className="text-slate-900">{app.companyName}</strong> · {app.companyLocation}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
                        {app.jobTitle}
                      </h3>
                      <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                        <span>Ngày nộp: <strong className="font-mono text-slate-800">{app.appliedDate}</strong></span>
                        <span>·</span>
                        <span>CV gửi: <span className="font-mono text-slate-800">{app.cvFileName}</span></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start">
                      <span className={`px-2.5 py-1 rounded text-xs font-bold border ${badge.color}`}>
                        {badge.label}
                      </span>
                      {canWithdraw && (
                        <button
                          type="button"
                          onClick={() => onWithdrawApplication(app.id)}
                          className="px-2.5 py-1 text-xs text-red-700 hover:bg-red-50 rounded border border-red-300 font-bold"
                        >
                          Rút đơn
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Interview Schedule Callout */}
                  {app.interviewSchedule && (
                    <div className="p-4 bg-indigo-50 border border-indigo-200 rounded text-xs space-y-2">
                      <div className="text-indigo-900 font-bold uppercase tracking-wide">
                        LỊCH HẸN PHỎNG VẤN TỪ DOANH NGHIỆP:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-800">
                        <div>
                          Thời gian: <strong className="font-mono">{app.interviewSchedule.time} - {app.interviewSchedule.date}</strong>
                        </div>
                        <div>
                          Địa điểm: <strong>{app.interviewSchedule.locationOrLink}</strong>
                        </div>
                      </div>
                      {app.interviewSchedule.notes && (
                        <p className="text-indigo-900 bg-white p-2 rounded border border-indigo-100">
                          <strong>Ghi chú:</strong> {app.interviewSchedule.notes}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Audit History */}
                  <div className="pt-2 border-t border-slate-100 text-xs">
                    <span className="text-slate-500 block text-[11px] mb-1 font-bold uppercase">
                      Lịch sử xử lý hồ sơ:
                    </span>
                    <div className="space-y-1">
                      {app.statusHistory.map((h, i) => (
                        <div key={i} className="text-slate-600 text-[11px] flex items-center gap-2">
                          <span className="font-mono text-slate-400">{h.changedAt}</span>
                          <span>·</span>
                          <span className="font-bold text-slate-800">{h.changedBy}</span>
                          <span>·</span>
                          <span>Trạng thái: <strong>{h.status}</strong></span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
