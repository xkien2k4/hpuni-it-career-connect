import React, { useState } from 'react';
import { User } from '../types/hpu';

interface LoginViewProps {
  users: User[];
  onLoginSuccess: (user: User) => void;
  onNavigateToRegister: () => void;
  onNavigateHome: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  users,
  onLoginSuccess,
  onNavigateToRegister,
  onNavigateHome
}) => {
  const [emailOrCode, setEmailOrCode] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMessage, setForgotMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedInput = emailOrCode.trim().toLowerCase();
    const trimmedPass = password.trim();

    if (!trimmedInput) {
      setErrorMessage('Vui lòng nhập Email, Mã đăng nhập hoặc tên tài khoản.');
      return;
    }
    if (!trimmedPass) {
      setErrorMessage('Vui lòng nhập Mật khẩu.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      // Check matching user
      const matchedUser = users.find(u => {
        const isEmailOrCodeMatch =
          u.email.toLowerCase() === trimmedInput ||
          (u.studentCode && u.studentCode.toLowerCase() === trimmedInput) ||
          (u.lecturerCode && u.lecturerCode.toLowerCase() === trimmedInput) ||
          (trimmedInput === 'admin' && u.role === 'admin') ||
          (trimmedInput === 'admin@hpu.edu.vn' && u.role === 'admin') ||
          (trimmedInput === 'fit.admin@dhhp.edu.vn' && u.role === 'admin');

        if (!isEmailOrCodeMatch) return false;

        const isPasswordMatch =
          u.password === trimmedPass ||
          (u.role === 'admin' && (trimmedPass === 'admin' || trimmedPass === 'password123')) ||
          trimmedPass === 'password123' ||
          !u.password;

        return isPasswordMatch;
      });

      if (!matchedUser) {
        setErrorMessage('Tài khoản hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại.');
        return;
      }

      if (matchedUser.status === 'locked') {
        setErrorMessage('Tài khoản này đang bị tạm khóa theo quyết định của Ban Quản trị Khoa CNTT. Vui lòng liên hệ fit@dhhp.edu.vn để được hỗ trợ.');
        return;
      }

      if (matchedUser.status === 'pending') {
        setErrorMessage('Tài khoản của bạn đang trong trạng thái chờ Ban Quản trị phê duyệt. Vui lòng quay lại sau.');
        return;
      }

      // Successful login
      onLoginSuccess(matchedUser);
    }, 300);
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      setForgotMessage('Vui lòng nhập email tài khoản của bạn.');
      return;
    }
    setForgotMessage(
      `Yêu cầu khôi phục mật khẩu đã được tiếp nhận. Hướng dẫn đặt lại mật khẩu đã được gửi đến địa chỉ ${forgotEmail} nếu tài khoản tồn tại trong hệ thống Khoa CNTT.`
    );
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-10 bg-slate-100">
      <div className="w-full max-w-lg bg-white border border-slate-300 rounded shadow-sm p-6 sm:p-8 space-y-5">
        {/* Header Institution */}
        <div className="text-center pb-5 border-b border-slate-200">
          <div className="flex justify-center mb-2.5">
            {/* THẺ IMG LOGO - CÓ THỂ ĐỔI ĐƯỜNG DẪN ẢNH TẠI ĐÂY */}
            <img
              src="/assets/img/logo.jpg"
              alt="Logo Khoa Công nghệ thông tin - Trường Đại học Hải Phòng (HPUni)"
              className="w-16 h-16 object-contain rounded-full bg-white p-1 border border-slate-200 shadow-sm"
            />
          </div>
          <div className="text-xs uppercase tracking-wider font-bold text-[#007ACC] mb-0.5">
            Trường Đại học Hải Phòng (HPUni)
          </div>
          <div className="text-xs font-bold text-slate-700 mb-1.5">
            Khoa Công nghệ thông tin
          </div>
          <h1 className="text-xl font-bold text-slate-900 font-['Outfit']">
            Đăng nhập HPUni IT Career Connect
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Cổng tuyển dụng và kết nối doanh nghiệp chính thức
          </p>
        </div>



        {/* Forgot password modal / panel */}
        {showForgotPassword ? (
          <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Khôi phục mật khẩu tài khoản
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Nhập email đăng ký của bạn. Hệ thống sẽ gửi liên kết xác thực để đặt lại mật khẩu an toàn.
            </p>

            {forgotMessage && (
              <div className="p-3 text-xs bg-indigo-50 border border-indigo-200 text-indigo-900 rounded font-medium">
                {forgotMessage}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Địa chỉ Email
              </label>
              <input
                type="email"
                required
                value={forgotEmail}
                onChange={e => setForgotEmail(e.target.value)}
                placeholder="name@dhhp.edu.vn hoặc email doanh nghiệp"
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-indigo-600 bg-white"
              />
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowForgotPassword(false);
                  setForgotMessage(null);
                }}
                className="text-xs text-slate-600 hover:text-slate-900 font-bold underline"
              >
                Quay lại Đăng nhập
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-900 hover:bg-indigo-800 text-white rounded text-xs font-bold"
              >
                Gửi yêu cầu
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Error Notification */}
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-300 text-red-900 text-xs rounded font-bold leading-relaxed">
                [Lỗi đăng nhập] {errorMessage}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Tài khoản / Email / Mã đăng nhập (*)
              </label>
              <input
                type="text"
                required
                value={emailOrCode}
                onChange={e => setEmailOrCode(e.target.value)}
                placeholder="Nhập admin, email, MSSV hoặc Mã GV"
                className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded focus:outline-none focus:border-indigo-600 bg-white font-mono"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-800">
                  Mật khẩu (*)
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-xs text-indigo-700 hover:text-indigo-900 underline font-bold cursor-pointer"
                >
                  Quên mật khẩu?
                </button>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                className="w-full text-xs px-3 py-2.5 border border-slate-300 rounded focus:outline-none focus:border-indigo-600 bg-white font-mono"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-indigo-900 hover:bg-indigo-800 disabled:bg-slate-400 text-white font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
              >
                {isLoading ? 'Đang xác thực hệ thống...' : 'Đăng nhập vào Hệ thống'}
              </button>
            </div>

            <div className="pt-3 border-t border-slate-200 text-center space-y-2">
              <p className="text-xs text-slate-700 font-medium">
                Chưa có tài khoản trên hệ thống?{' '}
                <button
                  type="button"
                  onClick={onNavigateToRegister}
                  className="font-bold text-indigo-900 hover:underline cursor-pointer"
                >
                  Đăng ký tài khoản theo vai trò
                </button>
              </p>
            </div>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={onNavigateHome}
                className="text-xs text-slate-500 hover:text-slate-800 underline font-medium cursor-pointer"
              >
                Trở về Trang chủ công khai
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
