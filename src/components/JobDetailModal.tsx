import React from 'react';
import { Job } from '../types/hpu';

interface JobDetailModalProps {
  job: Job | null;
  onClose: () => void;
  onApply: (job: Job) => void;
  hasAlreadyApplied?: boolean;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  onClose,
  onApply,
  hasAlreadyApplied = false
}) => {
  if (!job) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 flex items-center justify-center p-4">
      <div className="bg-white rounded max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-300">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-300 p-6 flex items-start justify-between gap-4 z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-bold text-slate-800">
                {job.companyName}
              </span>
              {job.companyVerified && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                  Đã xác minh
                </span>
              )}
              <span className="text-slate-300">|</span>
              <span className="text-xs text-slate-500 uppercase font-bold">{job.category}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-['Outfit']">{job.title}</h2>
            {/* Unboxed metadata */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 mt-2">
              <span>Địa điểm: <strong className="text-slate-900">{job.location}</strong></span>
              <span className="text-slate-300">|</span>
              <span>Hình thức: <strong className="text-slate-900">{job.workMode}</strong></span>
              <span className="text-slate-300">|</span>
              <span>Loại tuyển dụng: <strong className="text-slate-900 capitalize">{job.jobType}</strong></span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 rounded border border-slate-300 hover:bg-slate-100 transition-colors"
          >
            Đóng
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 space-y-6 text-sm text-slate-700">
          {/* Key Student Factors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded border border-slate-300">
            <div>
              <span className="text-xs text-slate-500 font-bold block mb-1">Mức hỗ trợ / Lương</span>
              <p className="font-bold text-indigo-900 font-mono tabular-nums text-base">
                {job.salaryText}
              </p>
            </div>
            <div>
              <span className="text-xs text-slate-500 font-bold block mb-1">Dấu mộc Thực tập tốt nghiệp</span>
              <p className="font-bold text-slate-900 text-xs">
                {job.stampSupport ? 'Có hỗ trợ đóng mộc thực tập Khoa CNTT' : 'Không bắt buộc dấu mộc'}
              </p>
            </div>
            <div>
              <span className="text-xs text-slate-500 font-bold block mb-1">Lịch học Trường ĐH Hải Phòng</span>
              <p className="font-bold text-slate-900 text-xs">
                {job.flexibleSchedule ? 'Linh hoạt xếp ca theo thời khóa biểu sinh viên' : 'Cố định giờ hành chính'}
              </p>
            </div>
          </div>

          {/* Required Skills */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Kỹ năng yêu cầu
            </h3>
            <div className="flex flex-wrap gap-2 text-xs text-slate-700">
              {job.requiredSkills.map((skill, i) => (
                <span key={i} className="px-2.5 py-1 bg-slate-100 rounded border border-slate-300 font-bold">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Mô tả công việc & Chương trình tuyển dụng
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {/* Requirements */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Yêu cầu đối với sinh viên Khoa CNTT
            </h3>
            <ul className="space-y-1.5 text-slate-600 text-xs list-disc list-inside">
              {job.requirements.map((item, index) => (
                <li key={index} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Quyền lợi dành cho sinh viên
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {job.benefits.map((benefit, index) => (
                <div key={index} className="p-2.5 bg-indigo-50/50 rounded border border-indigo-200 text-xs text-indigo-950 font-medium">
                  {benefit}
                </div>
              ))}
            </div>
          </div>

          {/* Deadline & Slots */}
          <div className="flex items-center justify-between p-4 bg-amber-50 rounded border border-amber-300 text-xs">
            <div className="text-amber-900 font-bold">
              Hạn chót nộp hồ sơ: <span className="font-mono">{job.deadline}</span>
            </div>
            <div className="text-amber-900 font-medium">
              Chỉ tiêu tuyển: <span className="font-bold font-mono">{job.slots}</span> sinh viên (Đã nhận {job.applicantsCount} hồ sơ)
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-slate-100 border-t border-slate-300 p-4 px-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-200 rounded transition-colors cursor-pointer"
          >
            Đóng lại
          </button>
          <div>
            {hasAlreadyApplied ? (
              <span className="px-4 py-2 bg-emerald-100 text-emerald-800 text-xs font-bold rounded border border-emerald-300">
                Bạn đã nộp đơn vào vị trí này
              </span>
            ) : (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onApply(job);
                }}
                className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-900 hover:bg-indigo-800 rounded transition-colors cursor-pointer"
              >
                Ứng tuyển vị trí này ngay
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
