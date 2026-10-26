# DANH SÁCH TÀI KHOẢN HỆ THỐNG HPUni IT CAREER CONNECT
### Cổng Tuyển Dụng & Kết Nối Doanh Nghiệp – Khoa CNTT, Trường Đại Học Hải Phòng (HPUni)

> **Lưu ý bảo mật:** File này tổng hợp toàn bộ danh sách tài khoản phục vụ mục đích kiểm thử, demo và quản trị nội bộ hệ thống. Toàn bộ thông tin tài khoản mặc định và nút chọn nhanh đã được gỡ bỏ khỏi giao diện công khai để đảm bảo tính thẩm mỹ và bảo mật chuyên nghiệp.

---

## 1. BẢNG TỔNG HỢP TÀI KHOẢN THEO VAI TRÒ

| STT | Vai trò | Tên đăng nhập / Email / Mã số | Mật khẩu | Họ và tên / Đơn vị | Lớp / Mã đại diện | Quyền hạn chính |
|:---:|:---|:---|:---:|:---|:---|:---|
| **1** | **Quản trị viên (Admin)** | `admin` *(hoặc `admin@hpu.edu.vn`)* | **`admin`** | **Ban Quản trị Khoa CNTT - ĐH Hải Phòng** | FIT-HPUni | Toàn quyền quản trị hệ thống, cấp/khóa tài khoản, phê duyệt DN & tin tuyển dụng, **đăng tin tức hoạt động**, xuất báo cáo theo lớp. |
| **2** | **Sinh viên (K22)** | `hoang.nm21@dhhp.edu.vn`<br>*(hoặc mã SV: `2110310028`)* | **`password123`** | **Nguyễn Minh Hoàng** | ĐH CNTT K22A | Xem tin tuyển dụng, gợi ý việc làm AI, nộp hồ sơ, quản lý thực tập tốt nghiệp, đăng ký sự kiện kết nối DN. |
| **3** | **Sinh viên (K22)** | `lan.pt22@dhhp.edu.vn`<br>*(hoặc mã SV: `2210310045`)* | **`password123`** | **Phạm Thị Lan** | ĐH CNTT K22B | Tạo hồ sơ kỹ năng, tìm việc thực tập, nộp hồ sơ trực tuyến, xem lịch phỏng vấn. |
| **4** | **Sinh viên (K23)** | `duc.nv23@dhhp.edu.vn`<br>*(hoặc mã SV: `2310310112`)* | **`password123`** | **Nguyễn Văn Đức** | ĐH CNTT K23A | Tìm kiếm việc làm bán thời gian, định hướng nghề nghiệp, theo dõi sự kiện của Khoa. |
| **5** | **Doanh nghiệp 1** | `hr.rd@lge.com` | **`password123`** | **Phạm Thu Trang (HR Senior Manager)** | LG Electronics R&D VN (comp-lg) | Đăng tin tuyển dụng thực tập/Fresher, quản lý ứng viên, gửi lời mời phỏng vấn, duyệt tiếp nhận thực tập tốt nghiệp. |
| **6** | **Doanh nghiệp 2** | `tuyendung.fpt@fpt.com` | **`password123`** | **Lê Tuấn Anh (Tech Recruiter)** | FPT Software Hải Phòng (comp-fpt) | Đăng tuyển vị trí lập trình viên React/Node/.NET, lọc hồ sơ sinh viên, liên hệ phỏng vấn. |
| **7** | **Giảng viên** | `binhtv@dhhp.edu.vn`<br>*(hoặc mã GV: `GV-CNTT-08`)* | **`password123`** | **TS. Trần Văn Bình** | Phụ trách: ĐH CNTT K22A & K22B | Quản lý danh sách sinh viên thực tập theo lớp phân công, xác nhận mộc doanh nghiệp, chấm điểm thực tập tốt nghiệp. |

---

## 2. CHI TIẾT PHÂN QUYỀN VÀ TRÁCH NHIỆM

### 2.1. Quản trị viên Khoa CNTT (`role: admin`)
- **Tài khoản:** `admin` / **Mật khẩu:** `admin`
- **Các chức năng chính:**
  - **Tổng quan thống kê:** Xem số liệu sinh viên, doanh nghiệp đối tác, tin tuyển dụng và tiến độ thực tập.
  - **Quản lý tài khoản:** Xem toàn bộ người dùng, tìm kiếm theo tên/email/lớp, khóa hoặc mở khóa tài khoản người dùng có ghi vết lý do.
  - **Phê duyệt & Cấp tài khoản doanh nghiệp:** Xem hồ sơ pháp lý, mã số thuế, quyết định xác minh hoặc cấp tài khoản đối tác mới trực tiếp kèm mật khẩu khởi tạo tùy chọn (mặc định: `password123`).
  - **Cấp tài khoản Giảng viên:** Cấp mã giảng viên, email công vụ, thiết lập mật khẩu đăng nhập khởi tạo và phân công quản lý theo các lớp (K22A, K22B, v.v.).
  - **Phê duyệt tin tuyển dụng:** Kiểm duyệt nội dung mô tả, chế độ đãi ngộ, yêu cầu kỹ năng trước khi tin được công bố cho sinh viên.
  - **Quản lý sinh viên theo lớp:** Xem danh sách phân nhóm sinh viên nghiêm ngặt theo lớp chuyên ngành (K22A, K22B,...), xuất dữ liệu CSV.
  - **Giám sát thực tập tốt nghiệp:** Theo dõi tình trạng tiếp nhận, mộc doanh nghiệp và điểm số của sinh viên toàn Khoa.
  - **Đăng tin tức hoạt động:** Tạo mới, chỉnh sửa, ghim bài nổi bật hoặc xóa các bản tin, hoạt động hợp tác DN, cẩm nang và thông báo chính thức của Khoa.

---

### 2.2. Doanh nghiệp tuyển dụng (`role: employer`)
- **Tài khoản:** `hr.rd@lge.com` / **Mật khẩu:** `password123` (LG Electronics R&D Hải Phòng)
- **Tài khoản:** `tuyendung.fpt@fpt.com` / **Mật khẩu:** `password123` (FPT Software Hải Phòng)
- **Các chức năng chính:**
  - Quản lý hồ sơ công ty: Giới thiệu, địa chỉ văn phòng/nhà máy tại Hải Phòng, quy mô nhân sự, lĩnh vực công nghệ.
  - Đăng tin tuyển dụng thực tập & việc làm Fresher/Junior với yêu cầu kỹ năng cụ thể.
  - Quản lý hồ sơ ứng tuyển: Xem CV sinh viên, cập nhật trạng thái (Chờ duyệt, Duyệt hồ sơ, Mời phỏng vấn, Trúng tuyển, Từ chối).
  - Quản lý thực tập tốt nghiệp: Xác nhận sinh viên đang thực tập tại đơn vị, đóng dấu mộc xác nhận và phản hồi đánh giá.

---

### 2.3. Sinh viên Khoa CNTT (`role: student`)
- **Tài khoản:** `hoang.nm21@dhhp.edu.vn` (Mã SV: `2110310028`) / **Mật khẩu:** `password123`
- **Các chức năng chính:**
  - Quản lý hồ sơ năng lực cá nhân: Thông tin lớp, điểm GPA, kỹ năng lập trình, dự án cá nhân, chứng chỉ.
  - **AI Gợi ý việc làm phù hợp:** Tự động đối chiếu kỹ năng hồ sơ với yêu cầu tin tuyển dụng để tính điểm Match score (%) và giải thích kỹ năng còn thiếu.
  - Ứng tuyển trực tuyến: Nộp hồ sơ và ghi chú nguyện vọng trực tiếp cho doanh nghiệp.
  - Đăng ký và theo dõi thực tập tốt nghiệp: Báo cáo vị trí thực tập, giảng viên hướng dẫn, theo dõi trạng thái đóng mộc và xem điểm tổng kết.
  - Đăng ký tham gia Ngày hội việc làm (Job Fair), Workshop công nghệ của Khoa.

---

### 2.4. Giảng viên phụ trách (`role: lecturer`)
- **Tài khoản:** `binhtv@dhhp.edu.vn` (Mã GV: `GV-CNTT-08`) / **Mật khẩu:** `password123`
- **Các chức năng chính:**
  - Quản lý sinh viên thực tập thuộc các lớp được phân công (`ĐH CNTT K22A`, `ĐH CNTT K22B`).
  - Kiểm tra thông tin doanh nghiệp tiếp nhận sinh viên.
  - Xác nhận tính hợp lệ của mộc thực tập (dấu tròn doanh nghiệp).
  - Đánh giá và nhập điểm số thực tập tốt nghiệp (thang điểm 10) cho sinh viên.
  - Xuất danh sách điểm và báo cáo tiến độ nộp về Văn phòng Khoa.

---

## 3. CÁCH ĐĂNG NHẬP VÀO HỆ THỐNG

1. Mở website hệ thống (trên máy tính hoặc thiết bị di động).
2. Khi chưa đăng nhập, hệ thống sẽ yêu cầu đăng nhập để bảo vệ thông tin.
3. Bấm **Đăng nhập** trên thanh điều hướng hoặc banner.
4. Bạn có thể đăng nhập bằng một trong các hình thức:
   - **Tài khoản Admin:** Nhập `admin` và mật khẩu `admin`.
   - **Tài khoản Sinh viên:** Nhập Email (`hoang.nm21@dhhp.edu.vn`) **HOẶC** Mã sinh viên (`2110310028`), mật khẩu `password123`.
   - **Tài khoản Doanh nghiệp:** Nhập Email (`hr.rd@lge.com`), mật khẩu `password123`.
   - **Tài khoản Giảng viên:** Nhập Email (`binhtv@dhhp.edu.vn`) **HOẶC** Mã giảng viên (`GV-CNTT-08`), mật khẩu `password123`.
5. Bấm nút **"Đăng nhập hệ thống"**.
