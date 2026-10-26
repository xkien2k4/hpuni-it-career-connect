import React, { useState } from 'react';
import { Company, Job } from '../types/hpu';

interface CompaniesViewProps {
  companies: Company[];
  jobs: Job[];
  onSelectJob: (job: Job) => void;
}

export const CompaniesView: React.FC<CompaniesViewProps> = ({
  companies,
  jobs,
  onSelectJob
}) => {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-300 rounded p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-indigo-900 font-bold block mb-1">
            Mạng lưới Đối tác Doanh nghiệp
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit']">
            Doanh nghiệp Hợp tác cùng Khoa CNTT - ĐH Hải Phòng
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Các tập đoàn đa quốc gia, doanh nghiệp phần mềm và viễn thông ký kết hợp tác đào tạo và tiếp nhận sinh viên HPUni.
          </p>
        </div>
        <span className="text-xs font-bold text-slate-800 bg-slate-100 px-3 py-1.5 rounded border border-slate-300 self-start sm:self-auto font-mono">
          {companies.filter(c => c.verificationStatus === 'verified').length} đối tác đã xác minh
        </span>
      </div>

      {/* Grid of companies (No fake logos, text-based branding) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map(comp => {
          const compJobs = jobs.filter(j => j.companyId === comp.id && j.approvalStatus === 'approved');

          return (
            <div
              key={comp.id}
              className="bg-white border border-slate-300 rounded p-6 hover:border-slate-400 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2 pb-2 border-b border-slate-200">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm leading-snug">{comp.name}</h3>
                    <span className="text-xs text-indigo-900 font-bold block mt-0.5">{comp.industry}</span>
                  </div>

                  <div>
                    {comp.verificationStatus === 'verified' ? (
                      <span className="text-[10px] font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300 whitespace-nowrap">
                        Đã xác minh
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-300 whitespace-nowrap">
                        Chờ xác minh
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-1 text-xs text-slate-600 mt-2">
                  <div>Địa chỉ: {comp.address}</div>
                  <div>Quy mô: {comp.scale}</div>
                  <div>
                    Website:{' '}
                    <a href={comp.website} target="_blank" rel="noreferrer" className="text-indigo-900 hover:underline">
                      {comp.website}
                    </a>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mt-3">
                  {comp.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">
                  {compJobs.length} vị trí đang tuyển
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedCompany(comp)}
                  className="px-3 py-1.5 text-indigo-900 font-bold hover:bg-slate-100 rounded border border-slate-300 transition-colors cursor-pointer"
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Company Detail Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white rounded max-w-2xl w-full p-6 shadow-xl border border-slate-300 space-y-4 text-xs">
            <div className="flex items-start justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900 font-['Outfit']">{selectedCompany.name}</h3>
                <span className="text-slate-500">{selectedCompany.industry} · Quy mô: {selectedCompany.scale}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCompany(null)}
                className="text-slate-700 hover:text-slate-900 text-xs px-2.5 py-1 bg-slate-100 rounded border border-slate-300 font-bold"
              >
                Đóng
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded space-y-1.5 border border-slate-200 text-slate-800">
              <div><strong>Địa chỉ trụ sở / Nhà máy:</strong> {selectedCompany.address}</div>
              <div><strong>Mã số thuế doanh nghiệp:</strong> {selectedCompany.taxCode}</div>
              <div><strong>Đại diện tuyển dụng:</strong> {selectedCompany.representativeName} ({selectedCompany.representativeTitle})</div>
              <div><strong>Email công việc:</strong> {selectedCompany.contactEmail}</div>
              <div><strong>Điện thoại:</strong> {selectedCompany.contactPhone}</div>
              <div><strong>Website chính thức:</strong> {selectedCompany.website}</div>
            </div>

            <p className="text-slate-700 leading-relaxed text-xs">
              {selectedCompany.description}
            </p>

            <div className="space-y-3 pt-2 border-t border-slate-200">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                Việc làm & Thực tập đang tuyển tại {selectedCompany.name}:
              </h4>
              <div className="space-y-2">
                {jobs.filter(j => j.companyId === selectedCompany.id && j.approvalStatus === 'approved').map(job => (
                  <div key={job.id} className="p-3 bg-slate-50 rounded border border-slate-200 flex items-center justify-between">
                    <div>
                      <strong className="text-slate-900 block text-xs">{job.title}</strong>
                      <span className="text-slate-600 text-[11px] font-mono">Lương: {job.salaryText} · Hạn: {job.deadline}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCompany(null);
                        onSelectJob(job);
                      }}
                      className="px-3 py-1 bg-indigo-900 text-white font-bold rounded text-xs hover:bg-indigo-800 cursor-pointer"
                    >
                      Ứng tuyển
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
