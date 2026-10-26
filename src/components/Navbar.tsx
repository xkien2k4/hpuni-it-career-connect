import React, { useState } from 'react';
import { User, InAppNotification } from '../types/hpu';

interface NavbarProps {
  currentUser: User | null;
  onLogout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  notifications: InAppNotification[];
  onOpenNotifications: () => void;
  onNavigateToLogin: () => void;
  onNavigateToRegister: () => void;
  pendingApprovalsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onLogout,
  activeTab,
  setActiveTab,
  notifications,
  onOpenNotifications,
  onNavigateToLogin,
  onNavigateToRegister,
  pendingApprovalsCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const getRoleLabel = (role?: string) => {
    switch (role) {
      case 'student':
        return 'Sinh viên HPUni';
      case 'employer':
        return 'Doanh nghiệp';
      case 'lecturer':
        return 'Giảng viên';
      case 'admin':
        return 'Quản trị viên';
      default:
        return 'Khách truy cập';
    }
  };

  const handleNav = (tab: string) => {
    if (!currentUser && tab !== 'login' && tab !== 'register') {
      setActiveTab('login');
      setMobileMenuOpen(false);
      return;
    }
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-300 w-full">
      {/* Top Banner Bar: Khoa CNTT - ĐH Hải Phòng institutional identification with #007ACC */}
      <div className="bg-[#007ACC] text-white px-4 py-2 text-xs w-full shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <span className="font-bold text-white tracking-wide">
              KHOA CÔNG NGHỆ THÔNG TIN – TRƯỜNG ĐẠI HỌC HẢI PHÒNG
            </span>
            <span className="text-blue-200 hidden sm:inline">|</span>
            <span className="text-blue-100 hidden md:inline text-[11px]">
              Số 171 Phan Đăng Lưu, Kiến An, Hải Phòng · fit@dhhp.edu.vn
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <span className="text-blue-100 text-[11px]">Đang đăng nhập:</span>
                <span className="font-bold text-white">{currentUser.fullName}</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-white/20 text-white font-bold border border-white/30">
                  {getRoleLabel(currentUser.role)}
                </span>
                <button
                  type="button"
                  onClick={onLogout}
                  className="ml-2 text-red-200 hover:text-white text-[11px] underline font-bold cursor-pointer"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] bg-white/20 text-white font-semibold border border-white/30 hidden md:inline">
                  Cần đăng nhập / đăng ký để xem trang
                </span>
                <button
                  type="button"
                  onClick={onNavigateToLogin}
                  className="px-2.5 py-1 bg-white text-[#007ACC] hover:bg-blue-50 text-xs font-bold rounded cursor-pointer transition-colors"
                >
                  Đăng nhập
                </button>
                <button
                  type="button"
                  onClick={onNavigateToRegister}
                  className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded border border-white/40 cursor-pointer transition-colors"
                >
                  Đăng ký
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Bar: Brand Logo + Navigation Links + Action Buttons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[64px] py-2 gap-4 flex-wrap lg:flex-nowrap">
          {/* Brand Wordmark with Official Faculty of Information Technology Logo */}
          <button
            type="button"
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 text-left shrink-0 cursor-pointer"
          >
            {/* THẺ IMG LOGO - CÓ THỂ ĐỔI ĐƯỜNG DẪN ẢNH TẠI ĐÂY */}
            <img
              src="/assets/img/logo.jpg"
              alt="Logo Khoa Công nghệ thông tin - Trường Đại học Hải Phòng (HPUni)"
              className="w-12 h-12 object-contain rounded-full bg-white p-0.5 border border-slate-200 shadow-sm shrink-0"
            />
            <div className="min-w-0">
              <div className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 leading-tight font-['Outfit']">
                HPUni IT Career Connect
              </div>
              <div className="text-[11px] text-slate-600 font-medium hidden sm:block">
                Cổng Tuyển dụng & Hợp tác Doanh nghiệp Khoa CNTT
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links (Text only, responsive wrapping) */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-slate-700 flex-wrap">
            <button
              type="button"
              onClick={() => handleNav('home')}
              className={`py-1.5 transition-colors cursor-pointer ${
                activeTab === 'home'
                  ? 'text-[#007ACC] font-extrabold border-b-2 border-[#007ACC]'
                  : 'hover:text-[#007ACC]'
              }`}
            >
              Trang chủ {!currentUser && <span className="text-[10px] text-slate-400 font-normal">(Khóa)</span>}
            </button>

            <button
              type="button"
              onClick={() => handleNav('jobs')}
              className={`py-1.5 transition-colors cursor-pointer ${
                activeTab === 'jobs'
                  ? 'text-[#007ACC] font-extrabold border-b-2 border-[#007ACC]'
                  : 'hover:text-[#007ACC]'
              }`}
            >
              Việc làm & Tuyển dụng {!currentUser && <span className="text-[10px] text-slate-400 font-normal">(Khóa)</span>}
            </button>

            <button
              type="button"
              onClick={() => handleNav('internships')}
              className={`py-1.5 transition-colors cursor-pointer ${
                activeTab === 'internships'
                  ? 'text-[#007ACC] font-extrabold border-b-2 border-[#007ACC]'
                  : 'hover:text-[#007ACC]'
              }`}
            >
              Thực tập tốt nghiệp {!currentUser && <span className="text-[10px] text-slate-400 font-normal">(Khóa)</span>}
            </button>

            <button
              type="button"
              onClick={() => handleNav('companies')}
              className={`py-1.5 transition-colors cursor-pointer ${
                activeTab === 'companies'
                  ? 'text-[#007ACC] font-extrabold border-b-2 border-[#007ACC]'
                  : 'hover:text-[#007ACC]'
              }`}
            >
              Doanh nghiệp đối tác {!currentUser && <span className="text-[10px] text-slate-400 font-normal">(Khóa)</span>}
            </button>

            <button
              type="button"
              onClick={() => handleNav('events')}
              className={`py-1.5 transition-colors cursor-pointer ${
                activeTab === 'events'
                  ? 'text-[#007ACC] font-extrabold border-b-2 border-[#007ACC]'
                  : 'hover:text-[#007ACC]'
              }`}
            >
              Sự kiện nghề nghiệp {!currentUser && <span className="text-[10px] text-slate-400 font-normal">(Khóa)</span>}
            </button>

            <button
              type="button"
              onClick={() => handleNav('news')}
              className={`py-1.5 transition-colors cursor-pointer ${
                activeTab === 'news'
                  ? 'text-[#007ACC] font-extrabold border-b-2 border-[#007ACC]'
                  : 'hover:text-[#007ACC]'
              }`}
            >
              Tin tức hoạt động {!currentUser && <span className="text-[10px] text-slate-400 font-normal">(Khóa)</span>}
            </button>

            {/* Role specific portals */}
            {currentUser?.role === 'student' && (
              <>
                <button
                  type="button"
                  onClick={() => handleNav('ai_matched_jobs')}
                  className={`py-1.5 px-2.5 rounded text-xs font-bold transition-colors cursor-pointer ${
                    activeTab === 'ai_matched_jobs'
                      ? 'bg-purple-900 text-white'
                      : 'bg-purple-50 text-purple-900 hover:bg-purple-100 border border-purple-200'
                  }`}
                >
                  Việc làm phù hợp (AI)
                </button>

                <button
                  type="button"
                  onClick={() => handleNav('student_portal')}
                  className={`py-1.5 transition-colors cursor-pointer ${
                    activeTab === 'student_portal'
                      ? 'text-indigo-900 font-extrabold border-b-2 border-indigo-900'
                      : 'text-indigo-800 font-bold hover:text-indigo-950'
                  }`}
                >
                  Hồ sơ sinh viên
                </button>
              </>
            )}

            {currentUser?.role === 'employer' && (
              <button
                type="button"
                onClick={() => handleNav('employer_portal')}
                className={`py-1.5 transition-colors cursor-pointer ${
                  activeTab === 'employer_portal'
                    ? 'text-indigo-900 font-extrabold border-b-2 border-indigo-900'
                    : 'text-indigo-800 font-bold hover:text-indigo-950'
                }`}
              >
                Cổng tuyển dụng Doanh nghiệp
              </button>
            )}

            {currentUser?.role === 'lecturer' && (
              <button
                type="button"
                onClick={() => handleNav('lecturer_portal')}
                className={`py-1.5 transition-colors cursor-pointer ${
                  activeTab === 'lecturer_portal'
                    ? 'text-indigo-900 font-extrabold border-b-2 border-indigo-900'
                    : 'text-indigo-800 font-bold hover:text-indigo-950'
                }`}
              >
                Quản lý thực tập (Giảng viên)
              </button>
            )}

            {currentUser?.role === 'admin' && (
              <button
                type="button"
                onClick={() => handleNav('admin_portal')}
                className={`py-1.5 px-2.5 rounded text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                  activeTab === 'admin_portal'
                    ? 'bg-amber-900 text-white'
                    : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-300'
                }`}
              >
                <span>Quản trị Khoa CNTT</span>
                {pendingApprovalsCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded bg-amber-600 text-white text-[10px]">
                    {pendingApprovalsCount}
                  </span>
                )}
              </button>
            )}
          </nav>

          {/* Right Action buttons: Notifications & Login/Portal */}
          <div className="flex items-center gap-3 shrink-0">
            {currentUser && (
              <button
                type="button"
                onClick={onOpenNotifications}
                className="px-2.5 py-1 text-xs font-bold border border-slate-300 rounded bg-slate-50 hover:bg-slate-100 text-slate-800"
              >
                Thông báo {unreadCount > 0 && `(${unreadCount})`}
              </button>
            )}

            {currentUser ? (
              <button
                type="button"
                onClick={() => {
                  if (currentUser.role === 'student') handleNav('student_portal');
                  else if (currentUser.role === 'employer') handleNav('employer_portal');
                  else if (currentUser.role === 'lecturer') handleNav('lecturer_portal');
                  else if (currentUser.role === 'admin') handleNav('admin_portal');
                }}
                className="px-3 py-1.5 text-xs font-bold text-white bg-[#007ACC] hover:bg-[#0060a0] rounded transition-colors cursor-pointer"
              >
                Trang của tôi ({getRoleLabel(currentUser.role)})
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onNavigateToLogin}
                  className="px-3 py-1.5 text-xs font-bold text-slate-800 border border-slate-300 hover:bg-slate-50 rounded cursor-pointer"
                >
                  Đăng nhập
                </button>
                <button
                  type="button"
                  onClick={onNavigateToRegister}
                  className="px-3 py-1.5 text-xs font-bold text-white bg-[#007ACC] hover:bg-[#0060a0] rounded cursor-pointer transition-colors"
                >
                  Đăng ký
                </button>
              </div>
            )}

            {/* Mobile / Compact Menu Button (Uses text 'Menu' - NO ICONS) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden px-3 py-1.5 text-xs font-bold border border-slate-300 rounded bg-slate-50 hover:bg-slate-100 text-slate-900"
            >
              {mobileMenuOpen ? 'Đóng Menu' : 'Menu'}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu (No icons, pure clear text links) */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-3 space-y-1 bg-white">
            <button
              type="button"
              onClick={() => handleNav('home')}
              className={`block w-full text-left px-3 py-2 text-xs font-bold ${
                activeTab === 'home' ? 'bg-indigo-50 text-indigo-900' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Trang chủ
            </button>

            <button
              type="button"
              onClick={() => handleNav('jobs')}
              className={`block w-full text-left px-3 py-2 text-xs font-bold ${
                activeTab === 'jobs' ? 'bg-indigo-50 text-indigo-900' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Việc làm & Tuyển dụng
            </button>

            <button
              type="button"
              onClick={() => handleNav('internships')}
              className={`block w-full text-left px-3 py-2 text-xs font-bold ${
                activeTab === 'internships' ? 'bg-indigo-50 text-indigo-900' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Thực tập tốt nghiệp
            </button>

            <button
              type="button"
              onClick={() => handleNav('companies')}
              className={`block w-full text-left px-3 py-2 text-xs font-bold ${
                activeTab === 'companies' ? 'bg-indigo-50 text-indigo-900' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Doanh nghiệp đối tác
            </button>

            <button
              type="button"
              onClick={() => handleNav('events')}
              className={`block w-full text-left px-3 py-2 text-xs font-bold ${
                activeTab === 'events' ? 'bg-indigo-50 text-indigo-900' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Sự kiện nghề nghiệp
            </button>

            <button
              type="button"
              onClick={() => handleNav('news')}
              className={`block w-full text-left px-3 py-2 text-xs font-bold ${
                activeTab === 'news' ? 'bg-indigo-50 text-indigo-900' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Tin tức hoạt động
            </button>

            {currentUser?.role === 'student' && (
              <>
                <button
                  type="button"
                  onClick={() => handleNav('ai_matched_jobs')}
                  className={`block w-full text-left px-3 py-2 text-xs font-bold ${
                    activeTab === 'ai_matched_jobs' ? 'bg-purple-100 text-purple-900' : 'text-purple-800 hover:bg-purple-50'
                  }`}
                >
                  Việc làm phù hợp với tôi (AI)
                </button>

                <button
                  type="button"
                  onClick={() => handleNav('student_portal')}
                  className={`block w-full text-left px-3 py-2 text-xs font-bold ${
                    activeTab === 'student_portal' ? 'bg-indigo-100 text-indigo-900' : 'text-indigo-800 hover:bg-indigo-50'
                  }`}
                >
                  Hồ sơ sinh viên HPUni
                </button>
              </>
            )}

            {currentUser?.role === 'employer' && (
              <button
                type="button"
                onClick={() => handleNav('employer_portal')}
                className={`block w-full text-left px-3 py-2 text-xs font-bold ${
                  activeTab === 'employer_portal' ? 'bg-indigo-100 text-indigo-900' : 'text-indigo-800 hover:bg-indigo-50'
                }`}
              >
                Cổng tuyển dụng Doanh nghiệp
              </button>
            )}

            {currentUser?.role === 'lecturer' && (
              <button
                type="button"
                onClick={() => handleNav('lecturer_portal')}
                className={`block w-full text-left px-3 py-2 text-xs font-bold ${
                  activeTab === 'lecturer_portal' ? 'bg-indigo-100 text-indigo-900' : 'text-indigo-800 hover:bg-indigo-50'
                }`}
              >
                Quản lý thực tập (Giảng viên)
              </button>
            )}

            {currentUser?.role === 'admin' && (
              <button
                type="button"
                onClick={() => handleNav('admin_portal')}
                className={`block w-full text-left px-3 py-2 text-xs font-bold ${
                  activeTab === 'admin_portal' ? 'bg-amber-100 text-amber-900' : 'text-amber-800 hover:bg-amber-50'
                }`}
              >
                Quản trị Khoa CNTT {pendingApprovalsCount > 0 && `(Chờ duyệt: ${pendingApprovalsCount})`}
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
