import React, { useState } from 'react';
import { User, StudentProfile, Company, UserRole } from '../types/hpu';

interface RegisterViewProps {
  existingUsers: User[];
  onRegisterStudent: (newUser: User, newProfile: StudentProfile) => void;
  onRegisterEmployer: (newUser: User, newCompany: Company) => void;
  onRegisterLecturer: (newUser: User) => void;
  onNavigateToLogin: () => void;
  onNavigateHome: () => void;
}

export const RegisterView: React.FC<RegisterViewProps> = ({
  existingUsers,
  onRegisterStudent,
  onRegisterEmployer,
  onRegisterLecturer,
  onNavigateToLogin,
  onNavigateHome
}) => {
  const [selectedRole, setSelectedRole] = useState<'student' | 'employer' | 'lecturer'>('student');

  // Common credentials
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Student specific fields
  const [studentFullName, setStudentFullName] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentClass, setStudentClass] = useState('ĐH CNTT K22A');
  const [studentCustomClass, setStudentCustomClass] = useState('');
  const [studentPhone, setStudentPhone] = useState('');

  // Employer specific fields
  const [companyName, setCompanyName] = useState('');
  const [taxCode, setTaxCode] = useState('');
  const [repName, setRepName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [companyAddress, setCompanyAddress] = useState('KCN Tràng Duệ, Huyện An Dương, Hải Phòng');
  const [companyScale, setCompanyScale] = useState('100 - 500 nhân sự');

  // Lecturer specific fields
  const [lecturerName, setLecturerName] = useState('');
  const [lecturerCode, setLecturerCode] = useState('');
  const [lecturerEmail, setLecturerEmail] = useState('');
  const [lecturerPhone, setLecturerPhone] = useState('');
  const [selectedAssignedClasses, setSelectedAssignedClasses] = useState<string[]>(['ĐH CNTT K22A', 'ĐH CNTT K22B']);

  const availableClasses = [
    'ĐH CNTT K22A',
    'ĐH CNTT K22B',
    'ĐH CNTT K23A',
    'ĐH CNTT K23B',
    'ĐH CNTT K24A',
    'ĐH CNTT K24B'
  ];

  const handleToggleAssignedClass = (cls: string) => {
    setSelectedAssignedClasses(prev =>
      prev.includes(cls) ? prev.filter(c => c !== cls) : [...prev, cls]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Password validation
    if (!password) {
      setErrorMessage('Vui lòng nhập Mật khẩu bảo mật.');
      return;
    }
    if (password.length < 4) {
      setErrorMessage('Mật khẩu bảo mật phải có ít nhất 4 ký tự.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Mật khẩu xác nhận không trùng khớp với mật khẩu đã nhập.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      if (selectedRole === 'student') {
        const trimmedName = studentFullName.trim();
        const trimmedCode = studentCode.trim().toUpperCase();
        const trimmedEmail = studentEmail.trim().toLowerCase();
        const resolvedClass = studentClass === 'Khác' ? studentCustomClass.trim().toUpperCase() : studentClass;
        const trimmedPhone = studentPhone.trim();

        if (!trimmedName || !trimmedCode || !trimmedEmail || !resolvedClass) {
          setErrorMessage('Vui lòng điền đầy đủ các thông tin bắt buộc của Sinh viên.');
          return;
        }

        const isDuplicateEmail = existingUsers.some(u => u.email.toLowerCase() === trimmedEmail);
        if (isDuplicateEmail) {
          setErrorMessage(`Email ${trimmedEmail} đã được đăng ký trên hệ thống. Vui lòng sử dụng email khác hoặc đăng nhập.`);
          return;
        }

        const isDuplicateCode = existingUsers.some(u => u.studentCode && u.studentCode.toUpperCase() === trimmedCode);
        if (isDuplicateCode) {
          setErrorMessage(`Mã sinh viên ${trimmedCode} đã tồn tại trong cơ sở dữ liệu Khoa CNTT.`);
          return;
        }

        const newId = `user-stu-${Date.now()}`;
        const stuProfileId = `stu-${Date.now()}`;

        const newUser: User = {
          id: newId,
          email: trimmedEmail,
          password,
          fullName: trimmedName,
          role: 'student',
          phone: trimmedPhone || '0988 000 000',
          avatarText: trimmedName.substring(0, 2).toUpperCase(),
          status: 'active',
          studentId: stuProfileId,
          studentCode: trimmedCode,
          className: resolvedClass,
          createdAt: new Date().toLocaleDateString('vi-VN')
        };

        const newProfile: StudentProfile = {
          id: stuProfileId,
          userId: newId,
          studentCode: trimmedCode,
          fullName: trimmedName,
          className: resolvedClass,
          academicYear: 'Khóa 22 (2021 - 2025)',
          gpa: '3.20 / 4.0',
          email: trimmedEmail,
          phone: trimmedPhone || '0988 000 000',
          address: 'TP. Hải Phòng',
          bio: `Sinh viên lớp ${resolvedClass}, Khoa Công nghệ thông tin - Trường Đại học Hải Phòng.`,
          careerGoal: 'Tìm kiếm cơ hội thực tập tốt nghiệp và phát triển năng lực phần mềm.',
          skills: ['C/C++', 'Java', 'SQL', 'Git cơ bản'],
          programmingLanguages: ['C/C++', 'JavaScript', 'SQL'],
          frameworks: ['React', 'Node.js'],
          certificates: ['Chứng chỉ Lập trình CNTT HPUni'],
          projects: [],
          cvFileName: `CV_${trimmedCode}_HPUni.pdf`,
          targetJobTypes: ['Thực tập tốt nghiệp', 'Fresher'],
          isPublicForEmployers: true,
          profileCompletion: 80
        };

        onRegisterStudent(newUser, newProfile);
      } else if (selectedRole === 'employer') {
        const trimmedCompName = companyName.trim();
        const trimmedTax = taxCode.trim();
        const trimmedRep = repName.trim();
        const trimmedEmail = companyEmail.trim().toLowerCase();
        const trimmedPhone = companyPhone.trim();
        const trimmedAddress = companyAddress.trim();

        if (!trimmedCompName || !trimmedTax || !trimmedRep || !trimmedEmail) {
          setErrorMessage('Vui lòng điền đầy đủ các thông tin bắt buộc của Doanh nghiệp.');
          return;
        }

        const isDuplicateEmail = existingUsers.some(u => u.email.toLowerCase() === trimmedEmail);
        if (isDuplicateEmail) {
          setErrorMessage(`Email ${trimmedEmail} đã được đăng ký. Vui lòng đăng nhập hoặc dùng email khác.`);
          return;
        }

        const compId = `comp-${Date.now()}`;
        const userId = `user-emp-${Date.now()}`;

        const newCompany: Company = {
          id: compId,
          userId,
          name: trimmedCompName,
          taxCode: trimmedTax,
          industry: 'Công nghệ thông tin & Viễn thông',
          scale: companyScale,
          address: trimmedAddress || 'Hải Phòng',
          website: 'https://hpu.edu.vn',
          contactEmail: trimmedEmail,
          contactPhone: trimmedPhone,
          representativeName: trimmedRep,
          representativeTitle: 'Trưởng ban Tuyển dụng',
          logoText: trimmedCompName.substring(0, 3).toUpperCase(),
          logoColor: 'bg-indigo-800',
          description: `Đơn vị đối tác tuyển dụng sinh viên Khoa CNTT Trường ĐH Hải Phòng.`,
          isPartner: true,
          verificationStatus: 'verified'
        };

        const newUser: User = {
          id: userId,
          email: trimmedEmail,
          password,
          fullName: trimmedRep,
          role: 'employer',
          phone: trimmedPhone,
          status: 'active',
          companyId: compId,
          companyName: trimmedCompName,
          createdAt: new Date().toLocaleDateString('vi-VN')
        };

        onRegisterEmployer(newUser, newCompany);
      } else if (selectedRole === 'lecturer') {
        const trimmedName = lecturerName.trim();
        const trimmedCode = lecturerCode.trim().toUpperCase();
        const trimmedEmail = lecturerEmail.trim().toLowerCase();
        const trimmedPhone = lecturerPhone.trim();

        if (!trimmedName || !trimmedCode || !trimmedEmail) {
          setErrorMessage('Vui lòng điền đầy đủ thông tin giảng viên hướng dẫn.');
          return;
        }

        if (selectedAssignedClasses.length === 0) {
          setErrorMessage('Vui lòng chọn ít nhất 1 Lớp phụ trách hướng dẫn thực tập.');
          return;
        }

        const isDuplicateEmail = existingUsers.some(u => u.email.toLowerCase() === trimmedEmail);
        if (isDuplicateEmail) {
          setErrorMessage(`Email ${trimmedEmail} đã tồn tại trong hệ thống.`);
          return;
        }

        const userId = `user-lec-${Date.now()}`;

        const newUser: User = {
          id: userId,
          email: trimmedEmail,
          password,
          fullName: trimmedName,
          role: 'lecturer',
          phone: trimmedPhone || '0225 3876 543',
          avatarText: trimmedName.substring(0, 2).toUpperCase(),
          status: 'active',
          lecturerCode: trimmedCode,
          assignedClasses: selectedAssignedClasses,
          createdAt: new Date().toLocaleDateString('vi-VN')
        };

        onRegisterLecturer(newUser);
      }
    }, 350);
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-10 bg-slate-100">
      <div className="w-full max-w-2xl bg-white border border-slate-300 rounded shadow-sm p-6 sm:p-8 space-y-5">
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
            Trường Đại học Hải Phòng (HPUni) · Khoa Công nghệ thông tin
          </div>
          <h1 className="text-xl font-bold text-slate-900 font-['Outfit']">
            Đăng ký Tài khoản & Phân quyền Chức năng
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Chọn vai trò phù hợp để kích hoạt các chức năng tương ứng trên hệ thống
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-2">
            1. Chọn vai trò tài khoản (*):
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => {
                setSelectedRole('student');
                setErrorMessage(null);
              }}
              className={`p-3 text-left border rounded transition-colors cursor-pointer ${
                selectedRole === 'student'
                  ? 'border-indigo-900 bg-indigo-50 text-indigo-950 ring-1 ring-indigo-900'
                  : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="font-bold text-xs">Sinh viên Khoa CNTT</div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Xem việc, AI gợi ý, nộp đơn & theo dõi kết quả
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedRole('employer');
                setErrorMessage(null);
              }}
              className={`p-3 text-left border rounded transition-colors cursor-pointer ${
                selectedRole === 'employer'
                  ? 'border-indigo-900 bg-indigo-50 text-indigo-950 ring-1 ring-indigo-900'
                  : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="font-bold text-xs">Doanh nghiệp Tuyển dụng</div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Đăng tin tuyển dụng, xem ứng viên, hẹn phỏng vấn
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedRole('lecturer');
                setErrorMessage(null);
              }}
              className={`p-3 text-left border rounded transition-colors cursor-pointer ${
                selectedRole === 'lecturer'
                  ? 'border-indigo-900 bg-indigo-50 text-indigo-950 ring-1 ring-indigo-900'
                  : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="font-bold text-xs">Giảng viên Hướng dẫn</div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Quản lý lớp thực tập, kết nối mentor, chấm điểm
              </div>
            </button>
          </div>
        </div>

        {/* Permissions summary badge */}
        <div className="p-3 bg-slate-50 border border-slate-300 rounded text-xs text-slate-700">
          <strong className="text-slate-900">Quyền hạn chức năng sau khi đăng ký: </strong>
          {selectedRole === 'student' && (
            <span>Truy cập Cổng Sinh viên, quản lý CV trực tuyến, nhận gợi ý việc làm AI, nộp đơn ứng tuyển thực tập và việc làm chính thức.</span>
          )}
          {selectedRole === 'employer' && (
            <span>Truy cập Cổng Tuyển dụng Doanh nghiệp, đăng tuyển vị trí thực tập/fresher, duyệt ứng viên theo lớp, xếp lịch phỏng vấn và gửi Offer.</span>
          )}
          {selectedRole === 'lecturer' && (
            <span>Truy cập Cổng Giảng viên Hướng dẫn, theo dõi tiến độ thực tập tốt nghiệp của các lớp phụ trách và chấm điểm đánh giá thang điểm 10.</span>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-300 text-red-900 rounded font-bold">
              [Lỗi đăng ký] {errorMessage}
            </div>
          )}

          {/* Student Fields */}
          {selectedRole === 'student' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Họ và tên sinh viên (*)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={studentFullName}
                    onChange={e => setStudentFullName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Mã số sinh viên (MSSV) (*)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="2210310088"
                    value={studentCode}
                    onChange={e => setStudentCode(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded bg-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Email sinh viên HPUni (*)
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="a.nv22@dhhp.edu.vn"
                    value={studentEmail}
                    onChange={e => setStudentEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Số điện thoại (*)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0988 123 456"
                    value={studentPhone}
                    onChange={e => setStudentPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded bg-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-800 font-bold mb-1">
                  Lớp sinh hoạt Khoa CNTT (*)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {availableClasses.map(cls => (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => setStudentClass(cls)}
                      className={`px-3 py-2 text-xs font-bold rounded border cursor-pointer text-center ${
                        studentClass === cls
                          ? 'bg-indigo-900 text-white border-indigo-900'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {cls}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setStudentClass('Khác')}
                    className={`px-3 py-2 text-xs font-bold rounded border cursor-pointer text-center ${
                      studentClass === 'Khác'
                        ? 'bg-indigo-900 text-white border-indigo-900'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    Lớp khác
                  </button>
                </div>

                {studentClass === 'Khác' && (
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Nhập tên lớp (VD: ĐH CNTT K21A)"
                      value={studentCustomClass}
                      onChange={e => setStudentCustomClass(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded bg-white"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Employer Fields */}
          {selectedRole === 'employer' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Tên Doanh nghiệp / Công ty (*)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Công ty TNHH Phần mềm ABC Hải Phòng"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Mã số thuế (MST) (*)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="0201889988"
                    value={taxCode}
                    onChange={e => setTaxCode(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded bg-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Họ tên Người đại diện / HR (*)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Lê Thị B"
                    value={repName}
                    onChange={e => setRepName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Email tuyển dụng liên hệ (*)
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="tuyendung@abc-tech.vn"
                    value={companyEmail}
                    onChange={e => setCompanyEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded bg-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Số điện thoại liên hệ (*)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0225 3999 888"
                    value={companyPhone}
                    onChange={e => setCompanyPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Quy mô nhân sự
                  </label>
                  <select
                    value={companyScale}
                    onChange={e => setCompanyScale(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded bg-white font-medium"
                  >
                    <option value="Dưới 50 nhân sự">Dưới 50 nhân sự</option>
                    <option value="50 - 100 nhân sự">50 - 100 nhân sự</option>
                    <option value="100 - 500 nhân sự">100 - 500 nhân sự</option>
                    <option value="500+ nhân sự">500+ nhân sự (Tập đoàn lớn)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-800 font-bold mb-1">
                  Địa chỉ văn phòng / Nhà máy tại Hải Phòng (*)
                </label>
                <input
                  type="text"
                  required
                  value={companyAddress}
                  onChange={e => setCompanyAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded bg-white"
                />
              </div>
            </div>
          )}

          {/* Lecturer Fields */}
          {selectedRole === 'lecturer' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Họ và tên giảng viên (*)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="TS. Nguyễn Văn C"
                    value={lecturerName}
                    onChange={e => setLecturerName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Mã cán bộ giảng viên (Mã GV) (*)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="GV-CNTT-12"
                    value={lecturerCode}
                    onChange={e => setLecturerCode(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded bg-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Email công vụ HPUni (@dhhp.edu.vn) (*)
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="nguyenvanc@dhhp.edu.vn"
                    value={lecturerEmail}
                    onChange={e => setLecturerEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-800 font-bold mb-1">
                    Số điện thoại công tác (*)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0912 345 678"
                    value={lecturerPhone}
                    onChange={e => setLecturerPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded bg-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-800 font-bold mb-1">
                  Chọn các Lớp phụ trách hướng dẫn thực tập (*) (chọn nhiều lớp):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {availableClasses.map(cls => {
                    const isChecked = selectedAssignedClasses.includes(cls);
                    return (
                      <button
                        key={cls}
                        type="button"
                        onClick={() => handleToggleAssignedClass(cls)}
                        className={`px-3 py-2 text-xs font-bold rounded border cursor-pointer text-center ${
                          isChecked
                            ? 'bg-indigo-900 text-white border-indigo-900'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        {isChecked ? `[X] ${cls}` : `[ ] ${cls}`}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Password Fields */}
          <div className="pt-2 border-t border-slate-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-800 font-bold mb-1">
                  Mật khẩu bảo mật (*)
                </label>
                <input
                  type="password"
                  required
                  placeholder="Tối thiểu 4 ký tự"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-800 font-bold mb-1">
                  Xác nhận lại Mật khẩu (*)
                </label>
                <input
                  type="password"
                  required
                  placeholder="Nhập lại mật khẩu"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded bg-white font-mono"
                />
              </div>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-indigo-900 hover:bg-indigo-800 disabled:bg-slate-400 text-white font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
            >
              {isSubmitting
                ? 'Đang thiết lập tài khoản & phân quyền...'
                : `Xác nhận Đăng ký tài khoản ${
                    selectedRole === 'student'
                      ? 'Sinh viên'
                      : selectedRole === 'employer'
                      ? 'Doanh nghiệp'
                      : 'Giảng viên'
                  }`}
            </button>
          </div>

          <div className="pt-3 border-t border-slate-200 text-center space-y-2">
            <p className="text-xs text-slate-700 font-medium">
              Đã có tài khoản?{' '}
              <button
                type="button"
                onClick={onNavigateToLogin}
                className="font-bold text-indigo-900 hover:underline cursor-pointer"
              >
                Đăng nhập ngay
              </button>
            </p>
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={onNavigateHome}
                className="text-xs text-slate-500 hover:text-slate-800 underline font-medium cursor-pointer"
              >
                Trở về Trang chủ công khai
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
