import React, { useState } from 'react';
import {
  Company,
  Job,
  Application,
  InternshipRecord,
  CareerEvent,
  NewsArticle,
  AuditLog,
  StudentProfile,
  User,
  UserRole
} from '../types/hpu';

interface AdminPortalProps {
  companies: Company[];
  jobs: Job[];
  applications: Application[];
  internships: InternshipRecord[];
  events: CareerEvent[];
  news: NewsArticle[];
  auditLogs: AuditLog[];
  student: StudentProfile;
  users: User[];
  onApproveCompany: (companyId: string) => void;
  onRejectCompany: (companyId: string, reason: string) => void;
  onApproveJob: (jobId: string) => void;
  onRejectJob: (jobId: string, reason: string) => void;
  onToggleUserStatus: (userId: string, reason: string) => void;
  onCreateLecturerAccount: (data: {
    fullName: string;
    email: string;
    password?: string;
    lecturerCode: string;
    phone: string;
    assignedClasses: string[];
  }) => void;
  onCreateCompanyAccount: (data: {
    name: string;
    taxCode: string;
    contactEmail: string;
    password?: string;
    contactPhone: string;
    representativeName: string;
    address: string;
    scale: string;
    status: 'pending' | 'verified';
  }) => void;
  onUpdateCompanyStatus: (
    companyId: string,
    status: 'pending' | 'verified' | 'rejected',
    notes: string
  ) => void;
  onAddNews?: (data: Omit<NewsArticle, 'id'>) => void;
  onUpdateNews?: (data: NewsArticle) => void;
  onDeleteNews?: (id: string) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  companies,
  jobs,
  applications,
  internships,
  events,
  news,
  auditLogs,
  student,
  users,
  onApproveCompany,
  onRejectCompany,
  onApproveJob,
  onRejectJob,
  onToggleUserStatus,
  onCreateLecturerAccount,
  onCreateCompanyAccount,
  onUpdateCompanyStatus,
  onAddNews,
  onUpdateNews,
  onDeleteNews
}) => {
  const [sidebarTab, setSidebarTab] = useState<
    | 'overview'
    | 'users_management'
    | 'employer_accounts'
    | 'lecturer_accounts'
    | 'job_approval'
    | 'students_by_class'
    | 'internships'
    | 'news_management'
  >('overview');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter & Search states
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<string>('all');
  const [userClassFilter, setUserClassFilter] = useState<string>('all');
  const [userStatusFilter, setUserStatusFilter] = useState<string>('all');

  // Modal / Form states
  const [showCreateLecturerModal, setShowCreateLecturerModal] = useState(false);
  const [newLecturerName, setNewLecturerName] = useState('');
  const [newLecturerEmail, setNewLecturerEmail] = useState('');
  const [newLecturerPassword, setNewLecturerPassword] = useState('password123');
  const [showLecturerPassword, setShowLecturerPassword] = useState(false);
  const [newLecturerCode, setNewLecturerCode] = useState('');
  const [newLecturerPhone, setNewLecturerPhone] = useState('');
  const [newLecturerClasses, setNewLecturerClasses] = useState<string[]>(['ĐH CNTT K22A']);

  const [showCreateCompanyModal, setShowCreateCompanyModal] = useState(false);
  const [newCompName, setNewCompName] = useState('');
  const [newCompTax, setNewCompTax] = useState('');
  const [newCompEmail, setNewCompEmail] = useState('');
  const [newCompPassword, setNewCompPassword] = useState('password123');
  const [showCompPassword, setShowCompPassword] = useState(false);
  const [newCompPhone, setNewCompPhone] = useState('');
  const [newCompRep, setNewCompRep] = useState('');
  const [newCompAddress, setNewCompAddress] = useState('');
  const [newCompScale, setNewCompScale] = useState('50-200 nhân viên');

  const [actionReason, setActionReason] = useState('');
  const [pendingTargetId, setPendingTargetId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<'lock_user' | 'reject_comp' | 'reject_job' | null>(null);

  // News Management States
  const [newsSearch, setNewsSearch] = useState('');
  const [newsCategoryFilter, setNewsCategoryFilter] = useState<string>('all');
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsCategory, setNewsCategory] = useState<'cooperation' | 'internship' | 'career_guide' | 'announcement'>('cooperation');
  const [newsAuthor, setNewsAuthor] = useState('Khoa Công nghệ thông tin - HPUni');
  const [newsPublishDate, setNewsPublishDate] = useState(() => {
    const today = new Date();
    return `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
  });
  const [newsExcerpt, setNewsExcerpt] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsFeatured, setNewsFeatured] = useState(false);
  const [viewingNews, setViewingNews] = useState<NewsArticle | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const pendingCompanies = companies.filter(c => c.verificationStatus === 'pending');
  const pendingJobs = jobs.filter(j => j.approvalStatus === 'pending');
  const verifiedCompanies = companies.filter(c => c.verificationStatus === 'verified');
  const activeJobs = jobs.filter(j => j.approvalStatus === 'approved' && j.displayStatus === 'active');

  const availableClasses = [
    'ĐH CNTT K22A',
    'ĐH CNTT K22B',
    'ĐH CNTT K23A',
    'ĐH CNTT K23B',
    'ĐH CNTT K24A',
    'ĐH CNTT K24B'
  ];

  // CSV Export utility (Strictly class-based, no major column)
  const handleExportCSV = (datasetName: string) => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    if (datasetName === 'applications') {
      csvContent += 'Mã đơn,Sinh viên,MSSV,Lớp,Vị trí,Công ty,Ngày nộp,Trạng thái\n';
      applications.forEach(app => {
        csvContent += `"${app.id}","${app.studentName}","${app.studentCode}","${app.studentClass}","${app.jobTitle}","${app.companyName}","${app.appliedDate}","${app.status}"\n`;
      });
    } else if (datasetName === 'internships') {
      csvContent += 'Mã TT,Sinh viên,MSSV,Lớp,Công ty tiếp nhận,Vị trí,Giảng viên hướng dẫn,Điểm\n';
      internships.forEach(i => {
        csvContent += `"${i.id}","${i.studentName}","${i.studentCode}","${i.className}","${i.companyName}","${i.position}","${i.lecturerAdvisor}","${i.evaluationScore || ''}"\n`;
      });
    } else if (datasetName === 'users') {
      csvContent += 'Mã người dùng,Họ tên,Email,Vai trò,Lớp (SV),Trạng thái,Ngày tạo\n';
      users.forEach(u => {
        csvContent += `"${u.id}","${u.fullName}","${u.email}","${u.role}","${u.className || ''}","${u.status}","${u.createdAt || ''}"\n`;
      });
    } else {
      csvContent += 'Mã tin,Tiêu đề,Công ty,Loại hình,Hạn nộp,Trạng thái\n';
      jobs.forEach(j => {
        csvContent += `"${j.id}","${j.title}","${j.companyName}","${j.jobType}","${j.deadline}","${j.approvalStatus}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `HPUni_IT_Report_${datasetName}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Đã xuất tệp dữ liệu ${datasetName}.csv thành công!`);
  };

  const handleCreateLecturerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLecturerName || !newLecturerEmail || !newLecturerCode) {
      alert('Vui lòng điền đủ các thông tin bắt buộc.');
      return;
    }
    onCreateLecturerAccount({
      fullName: newLecturerName.trim(),
      email: newLecturerEmail.trim().toLowerCase(),
      password: newLecturerPassword.trim() || 'password123',
      lecturerCode: newLecturerCode.trim().toUpperCase(),
      phone: newLecturerPhone.trim(),
      assignedClasses: newLecturerClasses
    });
    setShowCreateLecturerModal(false);
    setNewLecturerName('');
    setNewLecturerEmail('');
    setNewLecturerPassword('password123');
    setShowLecturerPassword(false);
    setNewLecturerCode('');
    setNewLecturerPhone('');
    showToast('Đã cấp tài khoản Giảng viên thành công!');
  };

  const handleCreateCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompName || !newCompTax || !newCompEmail) {
      alert('Vui lòng điền đủ tên doanh nghiệp, mã số thuế và email liên hệ.');
      return;
    }
    onCreateCompanyAccount({
      name: newCompName.trim(),
      taxCode: newCompTax.trim(),
      contactEmail: newCompEmail.trim().toLowerCase(),
      password: newCompPassword.trim() || 'password123',
      contactPhone: newCompPhone.trim(),
      representativeName: newCompRep.trim(),
      address: newCompAddress.trim() || 'Hải Phòng',
      scale: newCompScale,
      status: 'verified'
    });
    setShowCreateCompanyModal(false);
    setNewCompName('');
    setNewCompTax('');
    setNewCompEmail('');
    setNewCompPassword('password123');
    setShowCompPassword(false);
    setNewCompPhone('');
    setNewCompRep('');
    setNewCompAddress('');
    showToast('Đã thiết lập và cấp quyền tài khoản Doanh nghiệp thành công!');
  };

  const handleConfirmActionWithReason = () => {
    if (!pendingTargetId || !actionType) return;
    if (actionType === 'lock_user') {
      onToggleUserStatus(pendingTargetId, actionReason || 'Quản trị viên tạm khóa tài khoản');
      showToast('Đã cập nhật trạng thái tài khoản người dùng.');
    } else if (actionType === 'reject_comp') {
      onRejectCompany(pendingTargetId, actionReason || 'Hồ sơ pháp lý chưa đầy đủ');
      showToast('Đã từ chối xác minh tài khoản doanh nghiệp.');
    } else if (actionType === 'reject_job') {
      onRejectJob(pendingTargetId, actionReason || 'Nội dung tuyển dụng chưa đáp ứng quy chuẩn');
      showToast('Đã từ chối tin tuyển dụng.');
    }
    setActionType(null);
    setPendingTargetId(null);
    setActionReason('');
  };

  // News Actions & Handlers
  const handleOpenCreateNews = () => {
    setEditingNewsId(null);
    setNewsTitle('');
    setNewsCategory('cooperation');
    setNewsAuthor('Khoa Công nghệ thông tin - HPUni');
    const today = new Date();
    setNewsPublishDate(`${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`);
    setNewsExcerpt('');
    setNewsContent('');
    setNewsFeatured(false);
    setShowNewsModal(true);
  };

  const handleOpenEditNews = (item: NewsArticle) => {
    setEditingNewsId(item.id);
    setNewsTitle(item.title);
    setNewsCategory(item.category);
    setNewsAuthor(item.author);
    setNewsPublishDate(item.publishDate);
    setNewsExcerpt(item.excerpt);
    setNewsContent(item.content);
    setNewsFeatured(!!item.featured);
    setShowNewsModal(true);
  };

  const handleSaveNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle.trim() || !newsExcerpt.trim() || !newsContent.trim()) {
      showToast('Vui lòng điền đầy đủ tiêu đề, tóm tắt và nội dung bài viết.');
      return;
    }

    if (editingNewsId) {
      if (onUpdateNews) {
        onUpdateNews({
          id: editingNewsId,
          title: newsTitle.trim(),
          category: newsCategory,
          author: newsAuthor.trim() || 'Khoa CNTT - HPUni',
          publishDate: newsPublishDate,
          excerpt: newsExcerpt.trim(),
          content: newsContent.trim(),
          featured: newsFeatured
        });
      }
      showToast('Cập nhật tin tức hoạt động thành công!');
    } else {
      if (onAddNews) {
        onAddNews({
          title: newsTitle.trim(),
          category: newsCategory,
          author: newsAuthor.trim() || 'Khoa CNTT - HPUni',
          publishDate: newsPublishDate,
          excerpt: newsExcerpt.trim(),
          content: newsContent.trim(),
          featured: newsFeatured
        });
      }
      showToast('Đăng tin tức hoạt động mới thành công!');
    }
    setShowNewsModal(false);
  };

  const handleDeleteNewsItem = (id: string, title: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa bài viết: "${title}"?`)) {
      if (onDeleteNews) onDeleteNews(id);
      showToast('Đã xóa bài viết thành công.');
    }
  };

  const handleToggleFeatureNews = (item: NewsArticle) => {
    if (onUpdateNews) {
      onUpdateNews({
        ...item,
        featured: !item.featured
      });
      showToast(item.featured ? 'Đã bỏ ghim nổi bật tin tức.' : 'Đã ghim bài viết lên đầu trang!');
    }
  };

  // Filtered news
  const filteredNews = news.filter(n => {
    const matchSearch =
      n.title.toLowerCase().includes(newsSearch.toLowerCase()) ||
      n.author.toLowerCase().includes(newsSearch.toLowerCase()) ||
      n.excerpt.toLowerCase().includes(newsSearch.toLowerCase());
    const matchCategory = newsCategoryFilter === 'all' || n.category === newsCategoryFilter;
    return matchSearch && matchCategory;
  });

  // Filter users
  const filteredUsers = users.filter(u => {
    const matchSearch =
      u.fullName.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      (u.studentCode && u.studentCode.toLowerCase().includes(userSearch.toLowerCase()));
    const matchRole = userRoleFilter === 'all' || u.role === userRoleFilter;
    const matchClass = userClassFilter === 'all' || u.className === userClassFilter;
    const matchStatus = userStatusFilter === 'all' || u.status === userStatusFilter;
    return matchSearch && matchRole && matchClass && matchStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded shadow-lg border border-slate-700 text-xs font-bold">
          [Thông báo] {toastMessage}
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          {/* THẺ IMG LOGO - CÓ THỂ ĐỔI ĐƯỜNG DẪN ẢNH TẠI ĐÂY */}
          <img
            src="/assets/img/logo.jpg"
            alt="Logo Khoa Công nghệ thông tin - Trường Đại học Hải Phòng (HPUni)"
            className="w-14 h-14 object-contain rounded-full bg-white p-1 border border-slate-700 shadow-sm shrink-0 hidden sm:block"
          />
          <div>
            <span className="text-xs uppercase tracking-wider text-amber-400 font-bold block mb-1">
              Ban Quản trị Khoa Công nghệ thông tin – Trường Đại học Hải Phòng (HPUni)
            </span>
            <h1 className="text-xl sm:text-2xl font-bold font-['Outfit']">
              Trung tâm Quản trị HPUni IT Career Connect
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Quản lý tài khoản người dùng, cấp quyền doanh nghiệp, giảng viên, duyệt tin tuyển dụng và báo cáo theo lớp.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handleExportCSV('applications')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-bold border border-slate-700"
          >
            Xuất CSV Ứng tuyển
          </button>
          <button
            type="button"
            onClick={() => handleExportCSV('users')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-bold border border-slate-700"
          >
            Xuất CSV Tài khoản
          </button>
        </div>
      </div>

      {/* Main Tabs Navigation (Text Only, zero icons) */}
      <div className="flex items-center gap-1 border-b border-slate-300 overflow-x-auto pb-1 text-xs font-bold">
        <button
          type="button"
          onClick={() => setSidebarTab('overview')}
          className={`px-3 py-2 rounded whitespace-nowrap ${
            sidebarTab === 'overview'
              ? 'bg-indigo-900 text-white'
              : 'text-slate-700 hover:bg-slate-200'
          }`}
        >
          Tổng quan hệ thống
        </button>

        <button
          type="button"
          onClick={() => setSidebarTab('users_management')}
          className={`px-3 py-2 rounded whitespace-nowrap ${
            sidebarTab === 'users_management'
              ? 'bg-indigo-900 text-white'
              : 'text-slate-700 hover:bg-slate-200'
          }`}
        >
          Quản lý tài khoản ({users.length})
        </button>

        <button
          type="button"
          onClick={() => setSidebarTab('employer_accounts')}
          className={`px-3 py-2 rounded whitespace-nowrap ${
            sidebarTab === 'employer_accounts'
              ? 'bg-indigo-900 text-white'
              : 'text-slate-700 hover:bg-slate-200'
          }`}
        >
          Quản lý Doanh nghiệp {pendingCompanies.length > 0 && `(Chờ duyệt: ${pendingCompanies.length})`}
        </button>

        <button
          type="button"
          onClick={() => setSidebarTab('lecturer_accounts')}
          className={`px-3 py-2 rounded whitespace-nowrap ${
            sidebarTab === 'lecturer_accounts'
              ? 'bg-indigo-900 text-white'
              : 'text-slate-700 hover:bg-slate-200'
          }`}
        >
          Quản lý Giảng viên
        </button>

        <button
          type="button"
          onClick={() => setSidebarTab('job_approval')}
          className={`px-3 py-2 rounded whitespace-nowrap ${
            sidebarTab === 'job_approval'
              ? 'bg-indigo-900 text-white'
              : 'text-slate-700 hover:bg-slate-200'
          }`}
        >
          Phê duyệt Tin tuyển dụng {pendingJobs.length > 0 && `(Chờ duyệt: ${pendingJobs.length})`}
        </button>

        <button
          type="button"
          onClick={() => setSidebarTab('students_by_class')}
          className={`px-3 py-2 rounded whitespace-nowrap ${
            sidebarTab === 'students_by_class'
              ? 'bg-indigo-900 text-white'
              : 'text-slate-700 hover:bg-slate-200'
          }`}
        >
          Sinh viên theo Lớp
        </button>

        <button
          type="button"
          onClick={() => setSidebarTab('internships')}
          className={`px-3 py-2 rounded whitespace-nowrap ${
            sidebarTab === 'internships'
              ? 'bg-indigo-900 text-white'
              : 'text-slate-700 hover:bg-slate-200'
          }`}
        >
          Quản lý Thực tập ({internships.length})
        </button>

        <button
          type="button"
          onClick={() => setSidebarTab('news_management')}
          className={`px-3 py-2 rounded whitespace-nowrap ${
            sidebarTab === 'news_management'
              ? 'bg-indigo-900 text-white'
              : 'text-slate-700 hover:bg-slate-200'
          }`}
        >
          Đăng tin tức hoạt động ({news.length})
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {sidebarTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white border border-slate-300 rounded">
              <div className="text-xs font-bold text-slate-500 uppercase">Tổng số tài khoản</div>
              <div className="text-2xl font-bold font-mono text-slate-900 mt-1">{users.length}</div>
              <div className="text-[11px] text-slate-500 mt-1">Gồm SV, DN, GV và Ban Quản trị</div>
            </div>

            <div className="p-4 bg-white border border-slate-300 rounded">
              <div className="text-xs font-bold text-slate-500 uppercase">Doanh nghiệp chờ duyệt</div>
              <div className="text-2xl font-bold font-mono text-amber-600 mt-1">{pendingCompanies.length}</div>
              <div className="text-[11px] text-slate-500 mt-1">Cần Admin xác minh pháp lý</div>
            </div>

            <div className="p-4 bg-white border border-slate-300 rounded">
              <div className="text-xs font-bold text-slate-500 uppercase">Tin tuyển dụng chờ duyệt</div>
              <div className="text-2xl font-bold font-mono text-amber-600 mt-1">{pendingJobs.length}</div>
              <div className="text-[11px] text-slate-500 mt-1">Cần phê duyệt nội dung công khai</div>
            </div>

            <div className="p-4 bg-white border border-slate-300 rounded">
              <div className="text-xs font-bold text-slate-500 uppercase">Hồ sơ ứng tuyển</div>
              <div className="text-2xl font-bold font-mono text-indigo-900 mt-1">{applications.length}</div>
              <div className="text-[11px] text-slate-500 mt-1">Sinh viên đã nộp đơn vào các vị trí</div>
            </div>
          </div>

          {/* Quick Tasks Alert */}
          {(pendingCompanies.length > 0 || pendingJobs.length > 0) && (
            <div className="p-4 bg-amber-50 border border-amber-300 rounded text-xs space-y-2 text-amber-950">
              <div className="font-bold uppercase tracking-wide">Yêu cầu xử lý từ Ban Quản trị:</div>
              <ul className="list-disc list-inside space-y-1">
                {pendingCompanies.length > 0 && (
                  <li>
                    Có <strong>{pendingCompanies.length} doanh nghiệp</strong> đang chờ xác minh pháp lý để cấp quyền tuyển dụng.
                  </li>
                )}
                {pendingJobs.length > 0 && (
                  <li>
                    Có <strong>{pendingJobs.length} tin tuyển dụng</strong> đang chờ kiểm duyệt nội dung.
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: USER MANAGEMENT (Requirement VII) */}
      {sidebarTab === 'users_management' && (
        <div className="bg-white border border-slate-300 rounded p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
            <div>
              <h2 className="text-base font-bold text-slate-900">Quản lý Toàn bộ Tài khoản Người dùng</h2>
              <p className="text-xs text-slate-500">
                Tìm kiếm, lọc vai trò, lọc lớp (cho sinh viên) và khóa/mở khóa tài khoản an toàn (lưu trữ mềm).
              </p>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
            <input
              type="text"
              placeholder="Tìm theo tên, email hoặc mã SV..."
              value={userSearch}
              onChange={e => setUserSearch(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded bg-slate-50 focus:outline-none"
            />

            <select
              value={userRoleFilter}
              onChange={e => setUserRoleFilter(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded bg-slate-50 font-medium"
            >
              <option value="all">Tất cả vai trò</option>
              <option value="student">Sinh viên</option>
              <option value="employer">Doanh nghiệp</option>
              <option value="lecturer">Giảng viên</option>
              <option value="admin">Quản trị viên</option>
            </select>

            <select
              value={userClassFilter}
              onChange={e => setUserClassFilter(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded bg-slate-50 font-medium"
            >
              <option value="all">Tất cả lớp (Sinh viên)</option>
              {availableClasses.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={userStatusFilter}
              onChange={e => setUserStatusFilter(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded bg-slate-50 font-medium"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Đang hoạt động</option>
              <option value="locked">Đã tạm khóa</option>
              <option value="pending">Chờ kích hoạt</option>
            </select>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto border border-slate-200 rounded">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
                <tr>
                  <th className="p-3">Họ và tên</th>
                  <th className="p-3">Email liên hệ</th>
                  <th className="p-3">Vai trò</th>
                  <th className="p-3">Lớp (Sinh viên)</th>
                  <th className="p-3">Mã định danh</th>
                  <th className="p-3">Trạng thái</th>
                  <th className="p-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredUsers.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">{u.fullName}</td>
                    <td className="p-3 text-slate-600 font-mono">{u.email}</td>
                    <td className="p-3">
                      <span className="font-bold text-[11px]">
                        {u.role === 'student' && 'Sinh viên'}
                        {u.role === 'employer' && 'Doanh nghiệp'}
                        {u.role === 'lecturer' && 'Giảng viên'}
                        {u.role === 'admin' && 'Admin'}
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-indigo-900">
                      {u.className || (u.assignedClasses ? u.assignedClasses.join(', ') : '—')}
                    </td>
                    <td className="p-3 font-mono text-slate-600">
                      {u.studentCode || u.lecturerCode || '—'}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          u.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : u.status === 'locked'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {u.status === 'active' ? 'Hoạt động' : u.status === 'locked' ? 'Tạm khóa' : 'Chờ kích hoạt'}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {u.role !== 'admin' && (
                        <button
                          type="button"
                          onClick={() => {
                            setPendingTargetId(u.id);
                            setActionType('lock_user');
                          }}
                          className={`px-2.5 py-1 text-xs font-bold rounded ${
                            u.status === 'active'
                              ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                          }`}
                        >
                          {u.status === 'active' ? 'Khóa tài khoản' : 'Mở khóa'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ENTERPRISE MANAGEMENT (Requirement VI) */}
      {sidebarTab === 'employer_accounts' && (
        <div className="bg-white border border-slate-300 rounded p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Quản lý Tài khoản & Hồ sơ Doanh nghiệp Tuyển dụng
              </h2>
              <p className="text-xs text-slate-500">
                Chỉ Admin mới có quyền cấp, kích hoạt hoặc thu hồi tài khoản doanh nghiệp sau khi kiểm tra pháp lý.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowCreateCompanyModal(true)}
              className="px-3.5 py-2 bg-indigo-900 hover:bg-indigo-800 text-white rounded text-xs font-bold whitespace-nowrap"
            >
              + Cấp tài khoản Doanh nghiệp mới
            </button>
          </div>

          <div className="space-y-3">
            {companies.map(comp => (
              <div
                key={comp.id}
                className="p-4 border border-slate-300 rounded flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-400"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-900">{comp.name}</h3>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        comp.verificationStatus === 'verified'
                          ? 'bg-emerald-100 text-emerald-800'
                          : comp.verificationStatus === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {comp.verificationStatus === 'verified'
                        ? 'Đã xác minh / Hoạt động'
                        : comp.verificationStatus === 'pending'
                        ? 'Chờ xét duyệt pháp lý'
                        : 'Bị từ chối'}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 flex flex-wrap gap-x-4 gap-y-1">
                    <span>Mã số thuế: <strong>{comp.taxCode}</strong></span>
                    <span>Đại diện: <strong>{comp.representativeName}</strong></span>
                    <span>Email: <strong>{comp.contactEmail}</strong></span>
                    <span>Điện thoại: <strong>{comp.contactPhone}</strong></span>
                  </div>
                  <div className="text-xs text-slate-500">{comp.address}</div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {comp.verificationStatus === 'pending' && (
                    <>
                      <button
                        type="button"
                        onClick={() => onApproveCompany(comp.id)}
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded"
                      >
                        Chấp thuận & Cấp quyền
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setPendingTargetId(comp.id);
                          setActionType('reject_comp');
                        }}
                        className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-800 text-xs font-bold rounded border border-red-300"
                      >
                        Từ chối
                      </button>
                    </>
                  )}
                  {comp.verificationStatus === 'verified' && (
                    <button
                      type="button"
                      onClick={() => {
                        setPendingTargetId(comp.id);
                        setActionType('reject_comp');
                      }}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-red-50 text-red-700 text-xs font-bold rounded border border-slate-300"
                    >
                      Thu hồi quyền tuyển dụng
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: LECTURER MANAGEMENT (Requirement VIII) */}
      {sidebarTab === 'lecturer_accounts' && (
        <div className="bg-white border border-slate-300 rounded p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Quản lý Tài khoản Giảng viên trong Khoa
              </h2>
              <p className="text-xs text-slate-500">
                Cấp tài khoản công vụ cho giảng viên Khoa CNTT, phân công lớp quản lý thực tập tốt nghiệp.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowCreateLecturerModal(true)}
              className="px-3.5 py-2 bg-indigo-900 hover:bg-indigo-800 text-white rounded text-xs font-bold whitespace-nowrap"
            >
              + Cấp tài khoản Giảng viên mới
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
                <tr>
                  <th className="p-3">Họ và tên</th>
                  <th className="p-3">Mã giảng viên</th>
                  <th className="p-3">Email công vụ</th>
                  <th className="p-3">Điện thoại</th>
                  <th className="p-3">Lớp phụ trách quản lý</th>
                  <th className="p-3">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {users
                  .filter(u => u.role === 'lecturer')
                  .map(lec => (
                    <tr key={lec.id} className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-900">{lec.fullName}</td>
                      <td className="p-3 font-mono font-bold text-indigo-900">{lec.lecturerCode || 'GV-CNTT'}</td>
                      <td className="p-3 font-mono text-slate-600">{lec.email}</td>
                      <td className="p-3 text-slate-600">{lec.phone || '—'}</td>
                      <td className="p-3 font-semibold text-slate-800">
                        {lec.assignedClasses && lec.assignedClasses.length > 0
                          ? lec.assignedClasses.join(', ')
                          : 'ĐH CNTT K22A, ĐH CNTT K22B'}
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          Đang công tác
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: JOB APPROVAL */}
      {sidebarTab === 'job_approval' && (
        <div className="bg-white border border-slate-300 rounded p-6 space-y-4">
          <div className="pb-3 border-b border-slate-200">
            <h2 className="text-base font-bold text-slate-900">Kiểm duyệt Tin tuyển dụng & Thực tập</h2>
            <p className="text-xs text-slate-500">
              Kiểm tra tính xác thực, quyền lợi sinh viên và cam kết mộc thực tập trước khi công khai.
            </p>
          </div>

          <div className="space-y-4">
            {jobs.map(job => (
              <div
                key={job.id}
                className="p-4 border border-slate-300 rounded flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-900">{job.title}</h3>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        job.approvalStatus === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : job.approvalStatus === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {job.approvalStatus === 'approved'
                        ? 'Đã duyệt'
                        : job.approvalStatus === 'pending'
                        ? 'Chờ duyệt'
                        : 'Từ chối'}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 flex flex-wrap gap-x-4">
                    <span>Doanh nghiệp: <strong>{job.companyName}</strong></span>
                    <span>Lương: <strong>{job.salaryText}</strong></span>
                    <span>Địa điểm: <strong>{job.location}</strong></span>
                    <span>Hạn nộp: <strong>{job.deadline}</strong></span>
                  </div>
                  {job.stampSupport && (
                    <div className="text-[11px] text-emerald-700 font-medium">
                      [Có cam kết hỗ trợ đóng dấu mộc thực tập Khoa CNTT]
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {job.approvalStatus === 'pending' && (
                    <>
                      <button
                        type="button"
                        onClick={() => onApproveJob(job.id)}
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded"
                      >
                        Phê duyệt công khai
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setPendingTargetId(job.id);
                          setActionType('reject_job');
                        }}
                        className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-800 text-xs font-bold rounded border border-red-300"
                      >
                        Từ chối
                      </button>
                    </>
                  )}
                  {job.approvalStatus === 'approved' && (
                    <span className="text-xs text-slate-500 font-medium">Đang hiển thị cho sinh viên</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: STUDENTS BY CLASS (Requirement V) */}
      {sidebarTab === 'students_by_class' && (
        <div className="bg-white border border-slate-300 rounded p-6 space-y-6">
          <div className="pb-3 border-b border-slate-200">
            <h2 className="text-base font-bold text-slate-900">
              Quản lý và Thống kê Sinh viên theo Lớp (Không dùng chuyên ngành)
            </h2>
            <p className="text-xs text-slate-500">
              Theo quy định quản lý Khoa CNTT, sinh viên được phân loại và quản lý toàn diện theo Lớp sinh hoạt.
            </p>
          </div>

          {/* Class Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {availableClasses.map(cls => {
              const studentsInClass = users.filter(u => u.role === 'student' && u.className === cls);
              return (
                <div key={cls} className="p-4 bg-slate-50 border border-slate-300 rounded">
                  <div className="font-bold text-sm text-indigo-900">{cls}</div>
                  <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
                    {studentsInClass.length}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Sinh viên đã kích hoạt tài khoản</div>
                </div>
              );
            })}
          </div>

          {/* Student list filtered by selected class */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs uppercase text-slate-700">Danh sách sinh viên chi tiết</h3>
              <select
                value={userClassFilter}
                onChange={e => setUserClassFilter(e.target.value)}
                className="text-xs px-3 py-1.5 border border-slate-300 rounded bg-white"
              >
                <option value="all">Xem tất cả các lớp</option>
                {availableClasses.map(c => (
                  <option key={c} value={c}>
                    Lớp {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
                  <tr>
                    <th className="p-3">Họ và tên</th>
                    <th className="p-3">Mã sinh viên</th>
                    <th className="p-3">Lớp học</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Số điện thoại</th>
                    <th className="p-3">Số đơn ứng tuyển</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {users
                    .filter(u => u.role === 'student')
                    .filter(u => userClassFilter === 'all' || u.className === userClassFilter)
                    .map(stu => {
                      const appCount = applications.filter(a => a.studentCode === stu.studentCode).length;
                      return (
                        <tr key={stu.id} className="hover:bg-slate-50">
                          <td className="p-3 font-semibold text-slate-900">{stu.fullName}</td>
                          <td className="p-3 font-mono font-bold text-slate-800">{stu.studentCode || '—'}</td>
                          <td className="p-3 font-bold text-indigo-900">{stu.className}</td>
                          <td className="p-3 font-mono text-slate-600">{stu.email}</td>
                          <td className="p-3 text-slate-600">{stu.phone || '0988 123 456'}</td>
                          <td className="p-3 font-mono font-bold text-slate-800">{appCount} đơn</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: INTERNSHIPS */}
      {sidebarTab === 'internships' && (
        <div className="bg-white border border-slate-300 rounded p-6 space-y-4">
          <div className="pb-3 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Quản lý Tiến độ Thực tập Tốt nghiệp</h2>
              <p className="text-xs text-slate-500">Theo dõi doanh nghiệp tiếp nhận, giảng viên hướng dẫn và đóng dấu xác nhận.</p>
            </div>
            <button
              type="button"
              onClick={() => handleExportCSV('internships')}
              className="px-3 py-1.5 bg-slate-800 text-white text-xs font-bold rounded"
            >
              Xuất danh sách thực tập CSV
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
                <tr>
                  <th className="p-3">Sinh viên</th>
                  <th className="p-3">Mã SV</th>
                  <th className="p-3">Lớp</th>
                  <th className="p-3">Doanh nghiệp</th>
                  <th className="p-3">Vị trí</th>
                  <th className="p-3">GV Hướng dẫn</th>
                  <th className="p-3">Dấu mộc</th>
                  <th className="p-3">Điểm đánh giá</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {internships.map(i => (
                  <tr key={i.id} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">{i.studentName}</td>
                    <td className="p-3 font-mono">{i.studentCode}</td>
                    <td className="p-3 font-bold text-indigo-900">{i.className}</td>
                    <td className="p-3 text-slate-800">{i.companyName}</td>
                    <td className="p-3 text-slate-700">{i.position}</td>
                    <td className="p-3 text-slate-700">{i.lecturerAdvisor}</td>
                    <td className="p-3">
                      <span className="text-emerald-800 font-bold text-[11px]">
                        {i.stampConfirmed ? 'Đã xác nhận mộc' : 'Chờ xác nhận'}
                      </span>
                    </td>
                    <td className="p-3 font-mono font-bold text-slate-900">
                      {i.evaluationScore ? `${i.evaluationScore}/10` : 'Chưa chấm'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 8: ĐĂNG TIN TỨC HOẠT ĐỘNG */}
      {sidebarTab === 'news_management' && (
        <div className="bg-white border border-slate-300 rounded p-6 space-y-6">
          {/* Header & Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-[#007ACC] text-white text-[11px] font-bold rounded uppercase">
                  Ban Biên tập & Truyền thông
                </span>
                <span className="text-xs text-slate-500 font-bold">
                  Khoa Công nghệ thông tin - HPUni
                </span>
              </div>
              <h2 className="text-base font-bold text-slate-900">
                Quản lý & Đăng tin tức hoạt động ({news.length} bài viết)
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Đăng bài thông báo tuyển dụng, sự kiện ký kết MOU, hoạt động thực tập tốt nghiệp và hướng dẫn việc làm cho sinh viên HPUni.
              </p>
            </div>
            <button
              type="button"
              onClick={handleOpenCreateNews}
              className="px-4 py-2 bg-[#007ACC] hover:bg-[#0062a3] text-white rounded text-xs font-bold shrink-0 cursor-pointer shadow-xs"
            >
              + Đăng tin tức mới
            </button>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Tìm kiếm tin tức theo tiêu đề, tác giả hoặc tóm tắt..."
                value={newsSearch}
                onChange={e => setNewsSearch(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded text-xs focus:outline-none"
              />
            </div>
            <div className="w-full sm:w-64">
              <select
                value={newsCategoryFilter}
                onChange={e => setNewsCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded text-xs bg-white focus:outline-none"
              >
                <option value="all">Tất cả chuyên mục ({news.length})</option>
                <option value="cooperation">Hợp tác doanh nghiệp</option>
                <option value="internship">Thực tập tốt nghiệp</option>
                <option value="career_guide">Cẩm nang nghề nghiệp</option>
                <option value="announcement">Thông báo chung</option>
              </select>
            </div>
          </div>

          {/* News Table / List */}
          <div className="overflow-x-auto border border-slate-200 rounded">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3 w-12 text-center">STT</th>
                  <th className="p-3">Tiêu đề bài viết</th>
                  <th className="p-3 w-36">Chuyên mục</th>
                  <th className="p-3 w-36">Tác giả</th>
                  <th className="p-3 w-28">Ngày đăng</th>
                  <th className="p-3 w-28 text-center">Trạng thái</th>
                  <th className="p-3 w-48 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredNews.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500">
                      Không tìm thấy bài viết tin tức nào phù hợp với bộ lọc tìm kiếm.
                    </td>
                  </tr>
                ) : (
                  filteredNews.map((item, index) => {
                    const categoryBadges: Record<string, { label: string; color: string }> = {
                      cooperation: { label: 'Hợp tác DN', color: 'bg-blue-100 text-blue-900 border-blue-200' },
                      internship: { label: 'Thực tập', color: 'bg-emerald-100 text-emerald-900 border-emerald-200' },
                      career_guide: { label: 'Cẩm nang', color: 'bg-amber-100 text-amber-900 border-amber-200' },
                      announcement: { label: 'Thông báo', color: 'bg-purple-100 text-purple-900 border-purple-200' }
                    };
                    const badge = categoryBadges[item.category] || { label: item.category, color: 'bg-slate-100 text-slate-800 border-slate-200' };

                    return (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 text-center text-slate-500 font-mono">
                          {index + 1}
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-slate-900 line-clamp-2">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                            {item.excerpt}
                          </div>
                        </td>
                        <td className="p-3">
                          <span className={`inline-block px-2 py-0.5 rounded border text-[11px] font-bold ${badge.color}`}>
                            {badge.label}
                          </span>
                        </td>
                        <td className="p-3 text-slate-700 font-medium">
                          {item.author}
                        </td>
                        <td className="p-3 text-slate-600 font-mono text-[11px]">
                          {item.publishDate}
                        </td>
                        <td className="p-3 text-center">
                          {item.featured ? (
                            <span className="inline-block px-2 py-0.5 bg-amber-50 border border-amber-300 text-amber-800 text-[10px] font-bold rounded">
                              [Ghim nổi bật]
                            </span>
                          ) : (
                            <span className="text-[11px] text-slate-400">
                              Thường
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5 flex-wrap">
                            <button
                              type="button"
                              onClick={() => setViewingNews(item)}
                              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-bold cursor-pointer"
                              title="Xem chi tiết nội dung"
                            >
                              Xem
                            </button>
                            <button
                              type="button"
                              onClick={() => handleToggleFeatureNews(item)}
                              className={`px-2 py-1 rounded text-[11px] font-bold cursor-pointer ${
                                item.featured
                                  ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }`}
                              title={item.featured ? 'Bỏ ghim bài viết' : 'Ghim nổi bật lên đầu trang'}
                            >
                              {item.featured ? 'Bỏ ghim' : 'Ghim'}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenEditNews(item)}
                              className="px-2 py-1 bg-blue-50 text-blue-800 hover:bg-blue-100 rounded text-[11px] font-bold cursor-pointer"
                              title="Chỉnh sửa bài viết"
                            >
                              Sửa
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteNewsItem(item.id, item.title)}
                              className="px-2 py-1 bg-red-50 text-red-700 hover:bg-red-100 rounded text-[11px] font-bold cursor-pointer"
                              title="Xóa bài viết"
                            >
                              Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL: CREATE LECTURER ACCOUNT */}
      {showCreateLecturerModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-300 max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="border-b border-slate-200 pb-2">
              <h3 className="text-base font-bold text-slate-900">Cấp tài khoản Giảng viên Khoa CNTT</h3>
              <p className="text-xs text-slate-500">Giảng viên sử dụng tài khoản này để đăng nhập và quản lý thực tập theo lớp.</p>
            </div>

            <form onSubmit={handleCreateLecturerSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Họ và tên giảng viên (*)</label>
                <input
                  type="text"
                  required
                  value={newLecturerName}
                  onChange={e => setNewLecturerName(e.target.value)}
                  placeholder="TS. Trần Văn Bình"
                  className="w-full px-3 py-2 border border-slate-300 rounded"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email công vụ (*)</label>
                <input
                  type="email"
                  required
                  value={newLecturerEmail}
                  onChange={e => setNewLecturerEmail(e.target.value)}
                  placeholder="binhtv@dhhp.edu.vn"
                  className="w-full px-3 py-2 border border-slate-300 rounded"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-bold text-slate-700">Mật khẩu khởi tạo (*)</label>
                  <button
                    type="button"
                    onClick={() => setShowLecturerPassword(p => !p)}
                    className="text-[11px] text-[#007ACC] hover:underline font-semibold cursor-pointer"
                  >
                    {showLecturerPassword ? 'Ẩn' : 'Hiện mật khẩu'}
                  </button>
                </div>
                <input
                  type={showLecturerPassword ? 'text' : 'password'}
                  required
                  value={newLecturerPassword}
                  onChange={e => setNewLecturerPassword(e.target.value)}
                  placeholder="Nhập mật khẩu (mặc định: password123)..."
                  className="w-full px-3 py-2 border border-slate-300 rounded font-mono"
                />
                <span className="text-[11px] text-slate-500 mt-0.5 block">
                  Giảng viên dùng Email/mã GV cùng mật khẩu này để đăng nhập Cổng Giảng viên.
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mã giảng viên (*)</label>
                  <input
                    type="text"
                    required
                    value={newLecturerCode}
                    onChange={e => setNewLecturerCode(e.target.value)}
                    placeholder="GV-CNTT-09"
                    className="w-full px-3 py-2 border border-slate-300 rounded font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Số điện thoại</label>
                  <input
                    type="tel"
                    value={newLecturerPhone}
                    onChange={e => setNewLecturerPhone(e.target.value)}
                    placeholder="0912 345 678"
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Lớp được phân công quản lý</label>
                <div className="grid grid-cols-2 gap-1 p-2 bg-slate-50 border border-slate-200 rounded">
                  {availableClasses.map(c => (
                    <label key={c} className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newLecturerClasses.includes(c)}
                        onChange={e => {
                          if (e.target.checked) setNewLecturerClasses([...newLecturerClasses, c]);
                          else setNewLecturerClasses(newLecturerClasses.filter(x => x !== c));
                        }}
                      />
                      <span>{c}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateLecturerModal(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 font-bold"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-900 text-white rounded font-bold hover:bg-indigo-800"
                >
                  Tạo tài khoản Giảng viên
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREATE COMPANY ACCOUNT */}
      {showCreateCompanyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-300 max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="border-b border-slate-200 pb-2">
              <h3 className="text-base font-bold text-slate-900">Cấp tài khoản Doanh nghiệp Đối tác</h3>
              <p className="text-xs text-slate-500">Cấp tài khoản và quyền đăng tuyển thực tập sau khi kiểm tra thông tin pháp lý.</p>
            </div>

            <form onSubmit={handleCreateCompanySubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Tên doanh nghiệp (*)</label>
                <input
                  type="text"
                  required
                  value={newCompName}
                  onChange={e => setNewCompName(e.target.value)}
                  placeholder="Công ty TNHH Phần mềm ABC Hải Phòng"
                  className="w-full px-3 py-2 border border-slate-300 rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mã số thuế (*)</label>
                  <input
                    type="text"
                    required
                    value={newCompTax}
                    onChange={e => setNewCompTax(e.target.value)}
                    placeholder="0201889977"
                    className="w-full px-3 py-2 border border-slate-300 rounded font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Quy mô nhân sự</label>
                  <select
                    value={newCompScale}
                    onChange={e => setNewCompScale(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  >
                    <option value="20-50 nhân viên">20-50 nhân viên</option>
                    <option value="50-200 nhân viên">50-200 nhân viên</option>
                    <option value="500+ nhân viên">500+ nhân viên</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email liên hệ / đăng nhập (*)</label>
                  <input
                    type="email"
                    required
                    value={newCompEmail}
                    onChange={e => setNewCompEmail(e.target.value)}
                    placeholder="tuyendung@abc.vn"
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Số điện thoại</label>
                  <input
                    type="tel"
                    value={newCompPhone}
                    onChange={e => setNewCompPhone(e.target.value)}
                    placeholder="0225 3888 777"
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-bold text-slate-700">Mật khẩu tài khoản tuyển dụng (*)</label>
                  <button
                    type="button"
                    onClick={() => setShowCompPassword(p => !p)}
                    className="text-[11px] text-[#007ACC] hover:underline font-semibold cursor-pointer"
                  >
                    {showCompPassword ? 'Ẩn' : 'Hiện mật khẩu'}
                  </button>
                </div>
                <input
                  type={showCompPassword ? 'text' : 'password'}
                  required
                  value={newCompPassword}
                  onChange={e => setNewCompPassword(e.target.value)}
                  placeholder="Nhập mật khẩu khởi tạo (mặc định: password123)..."
                  className="w-full px-3 py-2 border border-slate-300 rounded font-mono"
                />
                <span className="text-[11px] text-slate-500 mt-0.5 block">
                  Doanh nghiệp dùng Email liên hệ cùng mật khẩu trên để đăng nhập Cổng Tuyển dụng.
                </span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Người đại diện / Trưởng phòng Nhân sự</label>
                <input
                  type="text"
                  value={newCompRep}
                  onChange={e => setNewCompRep(e.target.value)}
                  placeholder="Ông/Bà..."
                  className="w-full px-3 py-2 border border-slate-300 rounded"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Địa chỉ trụ sở / Nhà máy</label>
                <input
                  type="text"
                  value={newCompAddress}
                  onChange={e => setNewCompAddress(e.target.value)}
                  placeholder="KCN Tràng Duệ, An Dương, Hải Phòng"
                  className="w-full px-3 py-2 border border-slate-300 rounded"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateCompanyModal(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 font-bold"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-900 text-white rounded font-bold hover:bg-indigo-800"
                >
                  Cấp tài khoản & Xác minh
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRMATION WITH REASON MODAL */}
      {actionType && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-300 max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="border-b border-slate-200 pb-2">
              <h3 className="text-base font-bold text-slate-900">
                Xác nhận thao tác quản trị
              </h3>
              <p className="text-xs text-slate-500">
                Vui lòng nhập lý do để ghi vết bảo mật và thông báo tới người dùng.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Lý do thực hiện (*)
                </label>
                <textarea
                  required
                  rows={3}
                  value={actionReason}
                  onChange={e => setActionReason(e.target.value)}
                  placeholder="Nhập lý do cụ thể..."
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setActionType(null);
                    setPendingTargetId(null);
                    setActionReason('');
                  }}
                  className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 font-bold"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleConfirmActionWithReason}
                  className="px-4 py-1.5 bg-red-700 hover:bg-red-800 text-white font-bold rounded"
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ĐĂNG / SỬA TIN TỨC HOẠT ĐỘNG */}
      {showNewsModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg border border-slate-300 max-w-2xl w-full p-6 shadow-xl space-y-4 my-8">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#007ACC] uppercase tracking-wider block">
                  Cổng Thông tin Khoa CNTT - HPUni
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {editingNewsId ? 'Chỉnh sửa bài viết tin tức' : 'Đăng tin tức hoạt động mới'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowNewsModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg px-2 cursor-pointer"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSaveNewsSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Tiêu đề bài viết (*)
                </label>
                <input
                  type="text"
                  required
                  value={newsTitle}
                  onChange={e => setNewsTitle(e.target.value)}
                  placeholder="Ví dụ: Lễ ký kết hợp tác đào tạo và tuyển dụng với LG Electronics Việt Nam..."
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    Chuyên mục (*)
                  </label>
                  <select
                    value={newsCategory}
                    onChange={e => setNewsCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded bg-white focus:outline-none"
                  >
                    <option value="cooperation">Hợp tác doanh nghiệp</option>
                    <option value="internship">Thực tập tốt nghiệp</option>
                    <option value="career_guide">Cẩm nang nghề nghiệp</option>
                    <option value="announcement">Thông báo chung</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    Tác giả / Ban biên tập
                  </label>
                  <input
                    type="text"
                    required
                    value={newsAuthor}
                    onChange={e => setNewsAuthor(e.target.value)}
                    placeholder="Khoa CNTT - HPUni"
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    Ngày đăng bài
                  </label>
                  <input
                    type="text"
                    required
                    value={newsPublishDate}
                    onChange={e => setNewsPublishDate(e.target.value)}
                    placeholder="DD/MM/YYYY"
                    className="w-full px-3 py-2 border border-slate-300 rounded font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800 p-2.5 bg-slate-50 border border-slate-200 rounded">
                  <input
                    type="checkbox"
                    checked={newsFeatured}
                    onChange={e => setNewsFeatured(e.target.checked)}
                    className="rounded text-[#007ACC]"
                  />
                  <span>Ghim bài viết nổi bật lên trang chủ và đầu danh mục tin tức</span>
                </label>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Đoạn trích tóm tắt bài viết (*)
                </label>
                <textarea
                  required
                  rows={2}
                  value={newsExcerpt}
                  onChange={e => setNewsExcerpt(e.target.value)}
                  placeholder="Tóm tắt 1-2 câu ngắn gọn xuất hiện trên thẻ tin và trang chủ..."
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Nội dung chi tiết bài viết (*)
                </label>
                <textarea
                  required
                  rows={6}
                  value={newsContent}
                  onChange={e => setNewsContent(e.target.value)}
                  placeholder="Nội dung đầy đủ của bản tin, sự kiện hoặc hướng dẫn thực tập..."
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none font-sans leading-relaxed"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Có thể xuống dòng để phân tách các đoạn văn rõ ràng.
                </span>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewsModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded text-slate-700 font-bold hover:bg-slate-100 cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#007ACC] hover:bg-[#0062a3] text-white rounded font-bold cursor-pointer shadow-xs"
                >
                  {editingNewsId ? 'Lưu thay đổi bài viết' : 'Xuất bản tin tức hoạt động'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: XEM CHI TIẾT TIN TỨC HOẠT ĐỘNG */}
      {viewingNews && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg border border-slate-300 max-w-2xl w-full p-6 shadow-xl space-y-4 my-8">
            <div className="border-b border-slate-200 pb-3 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="px-2 py-0.5 bg-[#007ACC] text-white text-[10px] font-bold rounded uppercase">
                    Khoa CNTT - HPUni
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    Ngày đăng: {viewingNews.publishDate}
                  </span>
                  {viewingNews.featured && (
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-900 text-[10px] font-bold rounded">
                      Nổi bật
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {viewingNews.title}
                </h3>
                <div className="text-xs text-slate-500 mt-1">
                  Tác giả: <strong>{viewingNews.author}</strong>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewingNews(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg px-2 cursor-pointer"
              >
                ×
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-slate-800">
              <div className="p-3 bg-slate-50 border-l-4 border-[#007ACC] rounded text-slate-700 italic">
                {viewingNews.excerpt}
              </div>
              <div className="whitespace-pre-line text-slate-800 pt-2 space-y-2">
                {viewingNews.content}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setViewingNews(null)}
                className="px-4 py-2 bg-slate-800 text-white rounded text-xs font-bold hover:bg-slate-700 cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
