import React, { useState } from 'react';
import { Job, JobType } from '../types/hpu';

interface JobsDirectoryViewProps {
  jobs: Job[];
  onSelectJob: (job: Job) => void;
  onApplyJob: (job: Job) => void;
  initialCategory?: string;
  initialQuery?: string;
  initialLocation?: string;
}

export const JobsDirectoryView: React.FC<JobsDirectoryViewProps> = ({
  jobs,
  onSelectJob,
  onApplyJob,
  initialCategory = 'all',
  initialQuery = '',
  initialLocation = 'all'
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedLocation, setSelectedLocation] = useState<string>(initialLocation);
  const [stampOnly, setStampOnly] = useState(false);
  const [flexibleOnly, setFlexibleOnly] = useState(false);

  // Only approved & active jobs can be browsed publicly
  const publicJobs = jobs.filter(j => j.approvalStatus === 'approved' && j.displayStatus === 'active');

  const filteredJobs = publicJobs.filter(job => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === 'all' || job.jobType === selectedType;
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || job.location.includes(selectedLocation);
    const matchesStamp = !stampOnly || job.stampSupport;
    const matchesFlexible = !flexibleOnly || job.flexibleSchedule;

    return matchesSearch && matchesType && matchesCategory && matchesLocation && matchesStamp && matchesFlexible;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedCategory('all');
    setSelectedLocation('all');
    setStampOnly(false);
    setFlexibleOnly(false);
  };

  const getJobTypeLabel = (type: JobType) => {
    switch (type) {
      case 'internship': return 'Thực tập sinh';
      case 'fresher': return 'Fresher';
      case 'part_time': return 'Bán thời gian';
      case 'junior': return 'Junior';
      case 'full_time': return 'Chính thức';
      case 'graduation_project': return 'Đề tài tốt nghiệp';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-300 rounded p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-indigo-900 font-bold block mb-1">
            Khoa CNTT – Trường Đại học Hải Phòng
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit']">
            Cổng Thông tin Việc làm & Cơ hội Thực tập Công nghệ
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Tìm kiếm các cơ hội thực tập, việc làm fresher phù hợp với sinh viên các lớp Khoa Công nghệ thông tin.
          </p>
        </div>
        <span className="text-xs font-bold text-slate-800 bg-slate-100 px-3 py-1.5 rounded border border-slate-300 self-start sm:self-auto font-mono">
          {filteredJobs.length} vị trí đang mở
        </span>
      </div>

      {/* Filter Toolbar (No icons, clean text inputs) */}
      <div className="bg-white border border-slate-300 rounded p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Keyword Search */}
          <div className="sm:col-span-2">
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Từ khóa tìm kiếm
            </label>
            <input
              type="text"
              placeholder="Tìm theo tên công việc, kỹ năng (C++, React, Python, CCNA)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded text-xs bg-slate-50 focus:outline-none focus:border-indigo-900"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Lĩnh vực công nghệ
            </label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full py-2 px-3 border border-slate-300 rounded text-xs bg-white focus:outline-none"
            >
              <option value="all">Tất cả lĩnh vực</option>
              <option value="software">Phát triển Phần mềm</option>
              <option value="testing">Kiểm thử phần mềm (QA/QC)</option>
              <option value="security">Mạng & An toàn thông tin</option>
              <option value="uiux">Thiết kế UI/UX</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Địa điểm làm việc
            </label>
            <select
              value={selectedLocation}
              onChange={e => setSelectedLocation(e.target.value)}
              className="w-full py-2 px-3 border border-slate-300 rounded text-xs bg-white focus:outline-none"
            >
              <option value="all">Tất cả địa điểm</option>
              <option value="Hải Phòng">TP. Hải Phòng</option>
              <option value="Tràng Duệ">KCN Tràng Duệ (An Dương)</option>
              <option value="Đình Vũ">KCN Đình Vũ</option>
              <option value="Hà Nội">Hà Nội</option>
            </select>
          </div>
        </div>

        {/* Segmented controls for Job Type + Checkboxes */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200 text-xs">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded overflow-x-auto">
            <button
              type="button"
              onClick={() => setSelectedType('all')}
              className={`px-3 py-1 font-bold rounded transition-colors whitespace-nowrap cursor-pointer ${
                selectedType === 'all' ? 'bg-indigo-900 text-white' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              Tất cả loại hình
            </button>
            <button
              type="button"
              onClick={() => setSelectedType('internship')}
              className={`px-3 py-1 font-bold rounded transition-colors whitespace-nowrap cursor-pointer ${
                selectedType === 'internship' ? 'bg-indigo-900 text-white' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              Thực tập sinh
            </button>
            <button
              type="button"
              onClick={() => setSelectedType('fresher')}
              className={`px-3 py-1 font-bold rounded transition-colors whitespace-nowrap cursor-pointer ${
                selectedType === 'fresher' ? 'bg-indigo-900 text-white' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              Fresher (0 exp)
            </button>
            <button
              type="button"
              onClick={() => setSelectedType('part_time')}
              className={`px-3 py-1 font-bold rounded transition-colors whitespace-nowrap cursor-pointer ${
                selectedType === 'part_time' ? 'bg-indigo-900 text-white' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              Part-time
            </button>
            <button
              type="button"
              onClick={() => setSelectedType('junior')}
              className={`px-3 py-1 font-bold rounded transition-colors whitespace-nowrap cursor-pointer ${
                selectedType === 'junior' ? 'bg-indigo-900 text-white' : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              Junior
            </button>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-800 font-medium">
              <input
                type="checkbox"
                checked={stampOnly}
                onChange={e => setStampOnly(e.target.checked)}
              />
              <span>Hỗ trợ mộc thực tập Khoa</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-slate-800 font-medium">
              <input
                type="checkbox"
                checked={flexibleOnly}
                onChange={e => setFlexibleOnly(e.target.checked)}
              />
              <span>Linh hoạt thời khóa biểu</span>
            </label>

            {(searchQuery || selectedType !== 'all' || selectedCategory !== 'all' || selectedLocation !== 'all' || stampOnly || flexibleOnly) && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-indigo-900 hover:underline font-bold"
              >
                [Đặt lại bộ lọc]
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length === 0 ? (
        <div className="bg-white border border-slate-300 rounded p-12 text-center space-y-3">
          <h3 className="text-base font-bold text-slate-800">
            Không tìm thấy tin tuyển dụng phù hợp với bộ lọc
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Hãy thử nới lỏng các tiêu chí tìm kiếm hoặc xóa bớt bộ lọc để tiếp cận nhiều cơ hội hơn.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-2 px-4 py-2 text-xs font-bold text-white bg-indigo-900 hover:bg-indigo-800 rounded cursor-pointer"
          >
            Xem tất cả vị trí
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredJobs.map(job => (
            <div
              key={job.id}
              className="bg-white border border-slate-300 rounded p-5 hover:border-slate-400 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2 pb-2 border-b border-slate-100">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      {job.companyName}
                      {job.companyVerified && (
                        <span className="ml-2 text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded border border-slate-300 font-normal">
                          Đã xác minh
                        </span>
                      )}
                    </h4>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {job.location} · {job.workMode}
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                    {getJobTypeLabel(job.jobType)}
                  </span>
                </div>

                <h3
                  onClick={() => onSelectJob(job)}
                  className="text-sm font-bold text-slate-900 hover:text-indigo-900 transition-colors cursor-pointer line-clamp-2 leading-snug mb-2 font-['Outfit']"
                >
                  {job.title}
                </h3>

                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-700 mb-2">
                  <span className="font-mono font-bold text-indigo-900">{job.salaryText}</span>
                  <span className="text-slate-300">·</span>
                  <span>Chỉ tiêu: <strong className="font-mono">{job.slots}</strong></span>
                  <span className="text-slate-300">·</span>
                  <span>Đã nộp: <strong className="font-mono">{job.applicantsCount}</strong></span>
                </div>

                <div className="flex flex-wrap gap-1 mb-2">
                  {job.requiredSkills.slice(0, 4).map((s, i) => (
                    <span key={i} className="px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-medium border border-slate-200">
                      {s}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {job.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
                <div className="text-slate-600 text-[11px]">
                  Hạn nộp: <strong className="font-mono text-slate-800">{job.deadline}</strong>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectJob(job)}
                    className="px-2.5 py-1 text-xs font-bold text-slate-800 hover:bg-slate-100 rounded border border-slate-300"
                  >
                    Chi tiết
                  </button>
                  <button
                    type="button"
                    onClick={() => onApplyJob(job)}
                    className="px-3 py-1 text-xs font-bold text-white bg-indigo-900 hover:bg-indigo-800 rounded transition-colors whitespace-nowrap"
                  >
                    Ứng tuyển
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
