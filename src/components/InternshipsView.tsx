import React from 'react';
import { Job } from '../types/hpu';

interface InternshipsViewProps {
  jobs: Job[];
  onSelectJob: (job: Job) => void;
  onApplyJob: (job: Job) => void;
}

export const InternshipsView: React.FC<InternshipsViewProps> = ({
  jobs,
  onSelectJob,
  onApplyJob
}) => {
  const internshipJobs = jobs.filter(
    j => (j.jobType === 'internship' || j.stampSupport) && j.approvalStatus === 'approved' && j.displayStatus === 'active'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded p-8 shadow-sm">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold block mb-1">
            Khoa Công nghệ Thông tin – Trường Đại học Hải Phòng
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-['Outfit'] mb-2">
            Chuyên trang Thực tập Tốt nghiệp Doanh nghiệp
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Hỗ trợ sinh viên Khóa 22 và các khóa tiếp theo lựa chọn đơn vị thực tập chất lượng, có kỹ sư kèm cặp 1-1, hỗ trợ dấu mộc pháp nhân phục vụ bảo vệ đồ án tốt nghiệp và mở rộng cơ hội việc làm sau khi ra trường.
          </p>
        </div>

        {/* 3 Steps of Internship */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-800 text-xs">
          <div className="p-4 bg-slate-800 rounded border border-slate-700 space-y-1.5">
            <div className="font-bold text-amber-400 text-xs uppercase">
              Bước 1: Chọn Vị trí Thực tập
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Duyệt các vị trí thực tập thuộc doanh nghiệp đối tác tại Hải Phòng và nộp hồ sơ qua hệ thống.
            </p>
          </div>

          <div className="p-4 bg-slate-800 rounded border border-slate-700 space-y-1.5">
            <div className="font-bold text-amber-400 text-xs uppercase">
              Bước 2: Phân công Giảng viên
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Khoa CNTT tiếp nhận thông tin và phân công Giảng viên hướng dẫn song hành cùng Mentor công ty.
            </p>
          </div>

          <div className="p-4 bg-slate-800 rounded border border-slate-700 space-y-1.5">
            <div className="font-bold text-amber-400 text-xs uppercase">
              Bước 3: Đánh giá & Dấu mộc
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Hoàn thành báo cáo thực tập, nhận xác nhận đóng dấu mộc từ doanh nghiệp và bảo vệ đồ án tốt nghiệp.
            </p>
          </div>
        </div>
      </div>

      {/* Available Internship Positions */}
      <div>
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-['Outfit']">
              Các Vị trí Thực tập Tốt nghiệp Đang Tiếp nhận
            </h2>
            <p className="text-xs text-slate-600">
              Có trợ cấp hàng tháng và đóng dấu mộc cho sinh viên Khoa CNTT - ĐH Hải Phòng
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-900 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-300 font-mono">
            {internshipJobs.length} vị trí mở
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {internshipJobs.map(job => (
            <div
              key={job.id}
              className="bg-white border border-slate-300 rounded p-5 hover:border-slate-400 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2 pb-2 border-b border-slate-100">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{job.companyName}</h4>
                    <span className="text-[11px] text-slate-500">
                      Địa điểm: {job.location}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Thực tập
                  </span>
                </div>

                <h3
                  onClick={() => onSelectJob(job)}
                  className="text-sm font-bold text-slate-900 hover:text-indigo-900 transition-colors cursor-pointer line-clamp-2 leading-snug mb-2 font-['Outfit']"
                >
                  {job.title}
                </h3>

                <div className="text-xs font-mono font-bold text-indigo-900 mb-2">
                  Trợ cấp: {job.salaryText}
                </div>

                <div className="flex flex-wrap gap-1 mb-2">
                  {job.requiredSkills.map((s, i) => (
                    <span key={i} className="px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-medium border border-slate-200">
                      {s}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
                <span className="text-emerald-900 font-bold text-[11px]">
                  [Có mộc Khoa CNTT]
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectJob(job)}
                    className="px-2.5 py-1 text-xs font-bold text-slate-800 hover:bg-slate-100 rounded border border-slate-300 cursor-pointer"
                  >
                    Xem chi tiết
                  </button>
                  <button
                    type="button"
                    onClick={() => onApplyJob(job)}
                    className="px-3.5 py-1 text-xs font-bold text-white bg-indigo-900 hover:bg-indigo-800 rounded transition-colors cursor-pointer"
                  >
                    Đăng ký ngay
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
