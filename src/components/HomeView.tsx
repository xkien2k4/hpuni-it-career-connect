import React, { useState } from 'react';
import { Job, Company, CareerEvent, NewsArticle } from '../types/hpu';

interface HomeViewProps {
  jobs: Job[];
  companies: Company[];
  events: CareerEvent[];
  news: NewsArticle[];
  onSelectJob: (job: Job) => void;
  onApplyJob: (job: Job) => void;
  onNavigateTab: (tab: string) => void;
  onSearchSubmit: (query: string, category: string, location: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  jobs,
  companies,
  events,
  news,
  onSelectJob,
  onApplyJob,
  onNavigateTab,
  onSearchSubmit
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  // Real statistics derived dynamically from data
  const activeJobs = jobs.filter(j => j.approvalStatus === 'approved' && j.displayStatus === 'active');
  const verifiedCompanies = companies.filter(c => c.verificationStatus === 'verified');
  const internshipOpportunities = activeJobs.filter(j => j.jobType === 'internship' || j.stampSupport);
  const totalApplicants = activeJobs.reduce((acc, curr) => acc + curr.applicantsCount, 0);

  const featuredJobs = activeJobs.filter(j => j.featured).slice(0, 4);
  const internshipJobs = activeJobs.filter(j => j.jobType === 'internship').slice(0, 3);
  const upcomingEvents = events.filter(e => e.status === 'upcoming').slice(0, 2);
  const latestNews = news.slice(0, 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(searchTerm, selectedCategory, selectedLocation);
    onNavigateTab('jobs');
  };

  const itCategories = [
    { id: 'software', name: 'Phát triển Phần mềm', desc: 'React, Node, Java, C/C++, Python' },
    { id: 'testing', name: 'Kiểm thử Phần mềm (QA/QC)', desc: 'Manual, Automation, Test Script' },
    { id: 'ai_data', name: 'AI & Khoa học Dữ liệu', desc: 'Machine Learning, Computer Vision' },
    { id: 'networking', name: 'Mạng & Truyền thông', desc: 'CCNA, Routing/Switching, Viễn thông' },
    { id: 'security', name: 'An toàn Thông tin', desc: 'SOC, Bảo mật mạng, Pentest' },
    { id: 'uiux', name: 'Thiết kế UI/UX', desc: 'Figma, Prototype, Design System' }
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white pt-14 pb-18 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 max-w-4xl">
            {/* THẺ IMG LOGO - CÓ THỂ ĐỔI ĐƯỜNG DẪN ẢNH TẠI ĐÂY */}
            <img
              src="/assets/img/logo.jpg"
              alt="Logo Khoa Công nghệ thông tin - Trường Đại học Hải Phòng (HPUni)"
              className="w-20 h-20 object-contain rounded-full bg-white p-1 border border-slate-700 shadow-md shrink-0 hidden sm:block"
            />
            <div>
              <span className="text-xs uppercase tracking-wider text-indigo-300 font-bold block mb-2">
                Khoa Công nghệ thông tin – Trường Đại học Hải Phòng (HPUni)
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-[1.2] font-['Outfit']">
                HPUni IT Career Connect: Kết nối Cơ hội Thực tập & Tuyển dụng Công nghệ
              </h1>
              <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Cổng thông tin tuyển dụng chính thức kết nối sinh viên Khoa CNTT với mạng lưới doanh nghiệp công nghệ tại Hải Phòng và cả nước. 100% tin tuyển dụng được kiểm duyệt chặt chẽ, hỗ trợ đóng dấu mộc thực tập tốt nghiệp.
              </p>
            </div>
          </div>

          {/* Search Form (Zero icons, clear text labels) */}
          <form
            onSubmit={handleSearch}
            className="mt-8 bg-white text-slate-900 p-3 sm:p-4 rounded-lg shadow-sm flex flex-col md:flex-row items-center gap-2 border border-slate-300"
          >
            <div className="flex-1 w-full">
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-0.5">
                Tìm kiếm vị trí hoặc kỹ năng
              </label>
              <input
                type="text"
                placeholder="Nhập vị trí (Embedded, ReactJS, Tester, Mạng...), kỹ năng hoặc công ty..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full text-xs sm:text-sm py-1.5 focus:outline-none bg-slate-50 border border-slate-200 px-3 rounded"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto pt-2 md:pt-4">
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full md:w-44 text-xs py-2 px-2.5 bg-slate-50 border border-slate-300 rounded focus:outline-none font-medium text-slate-700"
              >
                <option value="all">Tất cả lĩnh vực</option>
                <option value="software">Phát triển Phần mềm</option>
                <option value="testing">Kiểm thử (QA/QC)</option>
                <option value="security">An toàn thông tin & Mạng</option>
                <option value="uiux">Thiết kế UI/UX</option>
              </select>

              <select
                value={selectedLocation}
                onChange={e => setSelectedLocation(e.target.value)}
                className="w-full md:w-40 text-xs py-2 px-2.5 bg-slate-50 border border-slate-300 rounded focus:outline-none font-medium text-slate-700"
              >
                <option value="all">Tất cả địa điểm</option>
                <option value="Hải Phòng">Hải Phòng</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="Tràng Duệ">KCN Tràng Duệ</option>
                <option value="Đình Vũ">KCN Đình Vũ</option>
              </select>

              <button
                type="submit"
                className="w-full md:w-auto px-6 py-2 bg-indigo-900 hover:bg-indigo-800 text-white rounded text-xs sm:text-sm font-bold transition-colors whitespace-nowrap cursor-pointer"
              >
                Tìm kiếm
              </button>
            </div>
          </form>

          {/* Real Statistics from actual data */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-8 border-t border-slate-800 text-slate-200">
            <div className="p-4 bg-slate-800/60 rounded border border-slate-700">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-white">
                {activeJobs.length}
              </div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Việc làm đang tuyển</div>
            </div>

            <div className="p-4 bg-slate-800/60 rounded border border-slate-700">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-indigo-300">
                {verifiedCompanies.length}
              </div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Doanh nghiệp đã xác minh</div>
            </div>

            <div className="p-4 bg-slate-800/60 rounded border border-slate-700">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-emerald-300">
                {internshipOpportunities.length}
              </div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Cơ hội thực tập tốt nghiệp</div>
            </div>

            <div className="p-4 bg-slate-800/60 rounded border border-slate-700">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-amber-300">
                {totalApplicants}
              </div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Lượt sinh viên ứng tuyển</div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Job Recommendation Banner Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-lg p-6 sm:p-8 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-block px-3 py-1 bg-purple-950 text-purple-300 border border-purple-800 rounded text-xs font-bold uppercase tracking-wide">
              Module AI Gợi ý việc làm phù hợp cho sinh viên HPUni
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold tracking-tight font-['Outfit']">
              Khám phá Vị trí Thực tập & Tuyển dụng Phù hợp với Năng lực
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Hệ thống tự động đối chiếu hồ sơ sinh viên, kỹ năng đồ án HPUni và ưu tiên cá nhân với tin tuyển dụng đã duyệt. Chỉ ra điểm mạnh, kỹ năng còn thiếu và gợi ý lộ trình dự án cá nhân để tăng cơ hội trúng tuyển.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-300 font-medium">
              <span>[Điểm phù hợp % minh bạch]</span>
              <span>·</span>
              <span>[Báo cáo kỹ năng còn thiếu]</span>
              <span>·</span>
              <span>[Tùy chỉnh ưu tiên nghề nghiệp]</span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
            <button
              type="button"
              onClick={() => onNavigateTab('ai_matched_jobs')}
              className="px-6 py-3 bg-purple-800 hover:bg-purple-700 text-white font-bold text-xs rounded transition-all text-center cursor-pointer uppercase tracking-wider"
            >
              Xem Việc làm phù hợp với tôi (AI Match)
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('student_portal')}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded border border-slate-700 text-center cursor-pointer"
            >
              Cập nhật hồ sơ & kỹ năng HPUni
            </button>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-2 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-['Outfit']">
              Việc làm & Chương trình Tuyển dụng Tiêu biểu
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Các vị trí tuyển dụng chính thức và Fresher từ các đối tác công nghệ lớn tại Hải Phòng
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('jobs')}
            className="text-xs font-bold text-indigo-900 hover:underline cursor-pointer self-start sm:self-auto"
          >
            Xem tất cả {activeJobs.length} việc làm →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {featuredJobs.map(job => (
            <div
              key={job.id}
              className="bg-white border border-slate-300 rounded-lg p-5 hover:border-slate-400 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="text-xs font-bold text-slate-800">
                      {job.companyName}
                      {job.companyVerified && (
                        <span className="ml-2 text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-300 font-normal">
                          Đã xác minh
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      <span>Địa điểm: {job.location}</span>
                      <span className="mx-2">·</span>
                      <span>Hình thức: {job.workMode}</span>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 whitespace-nowrap">
                    {job.jobType === 'internship' ? 'Thực tập' : job.jobType === 'fresher' ? 'Fresher' : 'Tuyển dụng'}
                  </span>
                </div>

                <h3
                  onClick={() => onSelectJob(job)}
                  className="text-sm sm:text-base font-bold text-slate-900 hover:text-indigo-900 transition-colors cursor-pointer line-clamp-1 mb-2 font-['Outfit']"
                >
                  {job.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                  {job.description}
                </p>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 mb-3 pt-2 border-t border-slate-100">
                  <span className="font-mono font-bold text-indigo-900">Mức lương: {job.salaryText}</span>
                  <span className="text-slate-300">·</span>
                  <span>Hạn nộp: <strong className="font-mono text-slate-800">{job.deadline}</strong></span>
                  <span className="text-slate-300">·</span>
                  <span>Chỉ tiêu: <strong className="font-mono">{job.slots}</strong></span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
                <div>
                  {job.stampSupport && (
                    <span className="text-emerald-800 font-medium text-[11px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Hỗ trợ mộc thực tập Khoa CNTT
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectJob(job)}
                    className="px-3 py-1.5 text-xs font-bold text-slate-800 hover:bg-slate-100 rounded border border-slate-300"
                  >
                    Xem chi tiết
                  </button>
                  <button
                    type="button"
                    onClick={() => onApplyJob(job)}
                    className="px-3.5 py-1.5 text-xs font-bold text-white bg-indigo-900 hover:bg-indigo-800 rounded transition-colors"
                  >
                    Ứng tuyển
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Internship Focus Area */}
      <section className="bg-slate-100 border-y border-slate-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-0.5">
                Kỳ thực tập tốt nghiệp Khóa 22 (2021-2025)
              </span>
              <h2 className="text-lg font-bold text-slate-900 font-['Outfit']">
                Cơ hội Thực tập Tốt nghiệp Doanh nghiệp Tiếp nhận
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Các vị trí thực tập chính quy có giảng viên Khoa CNTT bảo trợ và doanh nghiệp cấp dấu xác nhận
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('internships')}
              className="text-xs font-bold text-indigo-900 hover:underline cursor-pointer self-start sm:self-auto"
            >
              Xem trang Quản lý Thực tập →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {internshipJobs.map(job => (
              <div
                key={job.id}
                className="bg-white border border-slate-300 rounded-lg p-5 hover:border-slate-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-slate-700 mb-1">
                    {job.companyName}
                  </div>
                  <h3
                    onClick={() => onSelectJob(job)}
                    className="text-sm font-bold text-slate-900 hover:text-indigo-900 transition-colors cursor-pointer line-clamp-2 leading-snug mb-2 font-['Outfit']"
                  >
                    {job.title}
                  </h3>
                  <div className="text-xs text-slate-700 font-mono font-semibold mb-2">
                    Lương/Trợ cấp: {job.salaryText}
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                    {job.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-800 font-medium text-[11px]">
                    Có hỗ trợ mộc HPUni
                  </span>
                  <button
                    type="button"
                    onClick={() => onApplyJob(job)}
                    className="px-3 py-1 bg-indigo-900 text-white font-bold rounded hover:bg-indigo-800 transition-colors"
                  >
                    Nộp đơn
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IT Categories Grid (Class-aligned, no 'chuyên ngành' text) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 pb-2 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 font-['Outfit']">
            Khám phá theo Lĩnh vực Công nghệ & Nghề nghiệp
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Được cấu trúc bám sát chương trình đào tạo của Khoa Công nghệ thông tin - Trường Đại học Hải Phòng
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {itCategories.map(cat => (
            <div
              key={cat.id}
              onClick={() => {
                onSearchSubmit('', cat.id, 'all');
                onNavigateTab('jobs');
              }}
              className="p-4 bg-white border border-slate-300 rounded hover:border-indigo-900 transition-all cursor-pointer text-center group"
            >
              <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-900 transition-colors font-['Outfit']">
                {cat.name}
              </div>
              <p className="text-[11px] text-slate-600 mt-1 leading-normal">
                {cat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Verified Partner Companies (Typographic, no fake logos) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-['Outfit']">
              Doanh nghiệp Đối tác Đã Xác minh
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Doanh nghiệp đã ký kết thỏa thuận hợp tác đào tạo và tuyển dụng chính thức với Khoa CNTT
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('companies')}
            className="text-xs font-bold text-indigo-900 hover:underline cursor-pointer"
          >
            Tất cả đối tác →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {verifiedCompanies.map(comp => (
            <div
              key={comp.id}
              className="bg-white border border-slate-300 rounded p-4 hover:border-slate-400 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="border-b border-slate-200 pb-2 mb-2">
                  <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{comp.name}</h4>
                  <span className="text-[11px] text-slate-500">{comp.scale}</span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {comp.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between text-xs">
                <span className="text-indigo-900 font-semibold text-[11px]">
                  {comp.isPartner ? 'Đối tác chiến lược' : 'Đã xác minh'}
                </span>
                <span className="text-slate-500 text-[11px] truncate max-w-[120px]">{comp.address}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Events & News Split Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Upcoming Events */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h2 className="text-base font-bold text-slate-900 font-['Outfit']">
              Sự kiện Hướng nghiệp & Job Fair
            </h2>
            <button
              type="button"
              onClick={() => onNavigateTab('events')}
              className="text-xs font-bold text-indigo-900 hover:underline"
            >
              Xem tất cả
            </button>
          </div>

          <div className="space-y-3">
            {upcomingEvents.map(ev => (
              <div
                key={ev.id}
                className="bg-white border border-slate-300 rounded p-4 space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-indigo-900 uppercase text-[11px]">
                    {ev.type === 'job_fair' ? 'Ngày hội việc làm' : 'Workshop công nghệ'}
                  </span>
                  <span className="text-slate-600 font-medium">{ev.date}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900">{ev.title}</h4>
                <p className="text-xs text-slate-600 line-clamp-2">{ev.description}</p>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                  <span className="text-slate-600">Địa điểm: {ev.location}</span>
                  <button
                    type="button"
                    onClick={() => onNavigateTab('events')}
                    className="text-indigo-900 font-bold hover:underline"
                  >
                    Đăng ký tham gia
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Latest News */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h2 className="text-base font-bold text-slate-900 font-['Outfit']">
              Tin tức & Hoạt động Khoa CNTT
            </h2>
            <button
              type="button"
              onClick={() => onNavigateTab('news')}
              className="text-xs font-bold text-indigo-900 hover:underline"
            >
              Xem tất cả tin
            </button>
          </div>

          <div className="space-y-3">
            {latestNews.map(item => (
              <div
                key={item.id}
                className="bg-white border border-slate-300 rounded p-4 space-y-1.5"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-600">
                  <span className="font-semibold text-slate-800">Tác giả: {item.author}</span>
                  <span className="font-mono tabular-nums">{item.publishDate}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 leading-snug">{item.title}</h4>
                <p className="text-xs text-slate-600 line-clamp-2">{item.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2 Call to Action Panels: Students & Enterprises */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-slate-50 border border-slate-300 rounded space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 block">
            Dành cho Sinh viên Khoa CNTT
          </span>
          <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
            Khởi tạo Hồ sơ & Chuẩn hóa CV Sinh viên ngay hôm nay
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Khai báo mã sinh viên, lớp học, kỹ năng lập trình, các dự án bài tập lớn và tải lên CV PDF để tự động kết nối với các cơ hội thực tập có lương tại Hải Phòng.
          </p>
          <button
            type="button"
            onClick={() => onNavigateTab('student_portal')}
            className="px-4 py-2 bg-indigo-900 text-white rounded text-xs font-bold hover:bg-indigo-800 transition-colors cursor-pointer"
          >
            Vào trang Hồ sơ Sinh viên
          </button>
        </div>

        <div className="p-6 bg-slate-900 text-white rounded space-y-3 border border-slate-800">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 block">
            Dành cho Doanh nghiệp Tuyển dụng
          </span>
          <h3 className="text-base font-bold text-white font-['Outfit']">
            Hợp tác & Tiếp cận Hơn 1.200 Sinh viên CNTT HPUni
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Liên hệ Khoa CNTT để được cấp tài khoản doanh nghiệp chính thức, đăng tin tuyển dụng thực tập, đồ án doanh nghiệp và tham gia Ngày hội việc làm thường niên.
          </p>
          <button
            type="button"
            onClick={() => onNavigateTab('employer_portal')}
            className="px-4 py-2 bg-indigo-700 text-white rounded text-xs font-bold hover:bg-indigo-600 transition-colors cursor-pointer"
          >
            Cổng tuyển dụng Doanh nghiệp
          </button>
        </div>
      </section>
    </div>
  );
};
