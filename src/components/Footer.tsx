import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#007ACC] text-white text-sm mt-20 border-t-4 border-[#005f9e] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              {/* THẺ IMG LOGO - CÓ THỂ ĐỔI ĐƯỜNG DẪN ẢNH TẠI ĐÂY */}
              <img
                src="/assets/img/logo.jpg"
                alt="Logo Khoa Công nghệ thông tin - Trường Đại học Hải Phòng (HPUni)"
                className="w-12 h-12 object-contain rounded-full bg-white p-1 shrink-0 shadow-sm"
              />
              <div>
                <span className="text-white font-black text-base tracking-tight font-['Outfit'] block">
                  HPUni IT Career Connect
                </span>
                <span className="text-blue-100 text-[11px] block">
                  Khoa CNTT – Trường ĐH Hải Phòng (HPUni)
                </span>
              </div>
            </div>
            <p className="text-xs text-blue-100 leading-relaxed mb-4">
              Cổng thông tin tuyển dụng và kết nối doanh nghiệp chính thức của Khoa Công nghệ thông tin – Trường Đại học Hải Phòng. Cầu nối vững chắc giữa sinh viên và thị trường lao động công nghệ.
            </p>
            <div className="text-xs text-blue-150 text-blue-100/90 space-y-1">
              <div>Văn phòng Khoa: Nhà C1 & C2, Giảng đường HPUni</div>
              <div>Số 171 Phan Đăng Lưu, Quận Kiến An, TP. Hải Phòng</div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs tracking-wider uppercase mb-3 pb-1 border-b border-white/20">
              Dành cho Sinh viên HPUni
            </h4>
            <ul className="space-y-2 text-xs text-blue-100">
              <li><span className="hover:text-white cursor-pointer transition-colors">Đăng ký thực tập tốt nghiệp Khóa 22</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Tuyển dụng Fresher công nghệ tại Hải Phòng</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Việc làm bán thời gian theo thời khóa biểu</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Tạo hồ sơ và CV sinh viên chuẩn ATS</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Đề tài đồ án doanh nghiệp bảo trợ</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs tracking-wider uppercase mb-3 pb-1 border-b border-white/20">
              Dành cho Doanh nghiệp & Giảng viên
            </h4>
            <ul className="space-y-2 text-xs text-blue-100">
              <li><span className="hover:text-white cursor-pointer transition-colors">Đăng ký xác minh tài khoản doanh nghiệp</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Đăng tin tuyển dụng thực tập & Fresher</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Tìm kiếm ứng viên theo lớp và kỹ năng</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Tổ chức Campus Job Fair & Workshop kỹ thuật</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Ký kết thỏa thuận hợp tác đào tạo (MOU)</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs tracking-wider uppercase mb-3 pb-1 border-b border-white/20">
              Doanh nghiệp Đối tác Tiêu biểu
            </h4>
            <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-blue-100 mb-4">
              <span>LG Electronics R&D</span>
              <span>·</span>
              <span>FPT Software Hải Phòng</span>
              <span>·</span>
              <span>Viettel Hải Phòng</span>
              <span>·</span>
              <span>Pegatron Vietnam</span>
              <span>·</span>
              <span>VNPT Hải Phòng</span>
              <span>·</span>
              <span>USI Vietnam</span>
            </div>
            <div className="pt-3 border-t border-white/20 text-xs">
              <span className="text-white font-semibold">Hỗ trợ sinh viên & Nhà tuyển dụng:</span>
              <p className="text-blue-100 mt-1">fit@dhhp.edu.vn · (0225) 3876 543</p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between text-xs text-blue-150 text-blue-200 gap-4">
          <p>© 2026 Khoa Công nghệ thông tin – Trường Đại học Hải Phòng. Bảo lưu mọi quyền.</p>
          <div className="flex items-center gap-4 text-blue-100">
            <span className="hover:text-white cursor-pointer">Quy chế Thực tập tốt nghiệp</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer">Chính sách bảo mật dữ liệu sinh viên</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer">Điều khoản sử dụng</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
