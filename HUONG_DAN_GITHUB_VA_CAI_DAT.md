# HƯỚNG DẪN CÀI ĐẶT, CHẠY CỤC BỘ, CHỈNH SỬA VÀ ĐẨY LÊN GITHUB
## Dự án: HPUni IT Career Connect – Khoa Công nghệ thông tin, Trường Đại học Hải Phòng

Tài liệu này hướng dẫn chi tiết từ A-Z cách tải mã nguồn về máy tính, cài đặt môi trường, chạy thử nghiệm, chỉnh sửa logo/nội dung và đẩy toàn bộ mã nguồn lên GitHub cá nhân của bạn.

---

## 1. YÊU CẦU MÔI TRƯỜNG TRÊN MÁY TÍNH

Trước khi bắt đầu, đảm bảo máy tính của bạn đã cài đặt các công cụ sau:
1. **Node.js:** Phiên bản 18 trở lên (Khuyến nghị bản LTS mới nhất từ [https://nodejs.org](https://nodejs.org)).
   - Kiểm tra bằng lệnh: `node -v`
   - Kiểm tra npm: `npm -v`
2. **Git:** Công cụ quản lý mã nguồn (Tải từ [https://git-scm.com](https://git-scm.com)).
   - Kiểm tra bằng lệnh: `git --version`
3. **Trình soạn thảo mã nguồn (Khuyến nghị):** [Visual Studio Code (VS Code)](https://code.visualstudio.com/).

---

## 2. CÁC BƯỚC CÀI ĐẶT VÀ CHẠY DỰ ÁN CỤC BỘ (LOCAL)

### Bước 1: Mở thư mục dự án
Mở ứng dụng Terminal (macOS/Linux) hoặc Command Prompt / PowerShell / Git Bash (Windows) và điều hướng đến thư mục chứa mã nguồn:
```bash
cd duong-dan-toi-thu-muc-du-an
```
*(Nếu mở bằng VS Code: Chọn `File` -> `Open Folder...` -> Chọn thư mục dự án, sau đó mở Terminal tích hợp bằng tổ hợp phím ``Ctrl + ` `` hoặc ``Cmd + ` ``).*

### Bước 2: Cài đặt các gói phụ thuộc (Dependencies)
Chạy lệnh sau để tải và cài đặt toàn bộ các thư viện cần thiết:
```bash
npm install
```

### Bước 3: Chạy môi trường phát triển (Development Server)
Khởi động máy chủ thử nghiệm cục bộ:
```bash
npm run dev
```
Sau khi lệnh chạy, màn hình sẽ hiển thị đường dẫn cục bộ (thường là `http://localhost:3000` hoặc `http://localhost:5173`).  
Mở trình duyệt web (Chrome, Edge, Firefox, Cốc Cốc) và truy cập vào địa chỉ trên để sử dụng website.

### Bước 4: Kiểm tra và đóng gói sản phẩm (Production Build)
Để kiểm tra lỗi cú pháp và đóng gói dự án trước khi đưa vào vận hành thực tế:
```bash
# Kiểm tra lỗi TypeScript
npm run lint

# Đóng gói sản phẩm vào thư mục /dist
npm run build
```

---

## 3. HƯỚNG DẪN TÙY BIẾN VÀ CHỈNH SỬA MÃ NGUỒN

### 3.1. Cách thay đổi Logo Khoa Công nghệ thông tin (HPUni)
Tất cả các vị trí hiển thị logo trên hệ thống đều sử dụng thẻ chuẩn HTML `<img>` kèm theo chú thích rõ ràng để bạn có thể thay thế dễ dàng:

- **Vị trí file ảnh logo hiện tại:**  
  `public/assets/aistudio/image_12d99917.png`
- **Cách 1: Thay thế trực tiếp file ảnh:**  
  Bạn chỉ cần lấy file ảnh logo mới của mình, đổi tên thành `image_12d99917.png` và sao chép đè vào thư mục `public/assets/aistudio/`.
- **Cách 2: Đổi đường dẫn trong mã nguồn:**  
  Bạn có thể đặt file ảnh logo mới vào thư mục `public/` (ví dụ `public/logo-fit.png`) và tìm kiếm đoạn mã `src="/assets/img/logo.png"` để đổi thành `src="/logo-fit.png"`.  
  Các file chứa thẻ `<img>` logo:
  1. `src/components/Navbar.tsx` (Thanh menu điều hướng trên cùng)
  2. `src/components/Footer.tsx` (Chân trang website)
  3. `src/components/LoginView.tsx` (Giao diện đăng nhập)
  4. `src/components/RegisterView.tsx` (Giao diện đăng ký tài khoản)
  5. `src/components/HomeView.tsx` (Phần banner trang chủ)
  6. `src/components/AdminPortal.tsx` (Giao diện Trung tâm Quản trị Khoa)
  7. `src/App.tsx` (Banner yêu cầu xác thực tài khoản)

### 3.2. Đổi màu sắc chủ đạo của hệ thống
Hệ thống đang sử dụng tông màu xanh nhận diện công nghệ: **`#007ACC`**.  
Nếu bạn muốn đổi sang tông màu khác (ví dụ `#0056b3` hoặc màu xanh tím):
- Mở VS Code, dùng chức năng tìm kiếm toàn cục (`Ctrl + Shift + F` hoặc `Cmd + Shift + F`).
- Tìm `#007ACC` và thay thế bằng mã màu mới mong muốn.

### 3.3. Quản lý và chỉnh sửa dữ liệu mẫu (Database Mock)
Toàn bộ dữ liệu ban đầu về danh sách người dùng, lớp học, tin tuyển dụng, doanh nghiệp đối tác, bài viết tin tức được đặt trong file:
- **Đường dẫn:** `src/data/hpuData.ts`
- Bạn có thể mở file này để:
  - Thêm, bớt danh sách sinh viên các lớp (`K22A`, `K22B`, `K23A`, `K24A`...).
  - Thêm doanh nghiệp đối tác tại Hải Phòng (LG, FPT, Viettel, Pegatron, USI...).
  - Thêm hoặc sửa các bài viết tin tức mẫu trong mảng `INITIAL_NEWS`.

### 3.4. Quản lý & Đăng tin tức hoạt động ngay trên giao diện
Bạn không cần sửa code mỗi khi muốn đăng tin mới!  
Chỉ cần đăng nhập với tài khoản Quản trị viên (`admin` / `admin`):
1. Vào mục **Trung tâm Quản trị** trên thanh menu.
2. Chọn tab **"Đăng tin tức hoạt động"**.
3. Bấm nút **"+ Đăng tin tức mới"**.
4. Điền tiêu đề, chuyên mục, tóm tắt, nội dung chi tiết và chọn ghim nổi bật. Bấm **"Xuất bản tin tức hoạt động"** để tin lập tức hiển thị trên website.

---

## 4. HƯỚNG DẪN KHỞI TẠO GIT VÀ ĐẨY MÃ NGUỒN LÊN GITHUB

### Bước 1: Thiết lập danh tính Git trên máy tính của bạn (Nếu chưa thiết lập)
Mở Terminal và chạy 2 lệnh sau (thay bằng tên và email tài khoản GitHub của bạn):
```bash
git config --global user.name "Nguyen Van A"
git config --global user.email "email-cua-ban@gmail.com"
```

### Bước 2: Tạo một Repository (Kho chứa) mới trên GitHub
1. Truy cập vào trang web [https://github.com](https://github.com) và đăng nhập vào tài khoản của bạn.
2. Nhấn vào dấu **`+`** ở góc trên cùng bên phải và chọn **New repository** (hoặc truy cập trực tiếp [https://github.com/new](https://github.com/new)).
3. Điền các thông tin:
   - **Repository name:** `hpuni-it-career-connect` (hoặc tên tùy thích).
   - **Description:** `Website Tuyển dụng và Kết nối Doanh nghiệp - Khoa CNTT, Trường Đại học Hải Phòng (HPUni)`
   - **Visibility:** Chọn **Public** (công khai) hoặc **Private** (riêng tư).
   - **Lưu ý quan trọng:** **KHÔNG** tích chọn *Add a README file*, *Add .gitignore*, hoặc *Choose a license* (vì dự án của chúng ta đã có sẵn các file này).
4. Nhấn nút **Create repository**.
5. Sau khi tạo xong, GitHub sẽ hiển thị đường link của repository, có dạng:  
   `https://github.com/<ten-tai-khoan-cua-ban>/hpuni-it-career-connect.git`

### Bước 3: Đẩy mã nguồn từ máy tính lên GitHub
Mở Terminal tại thư mục dự án và thực hiện tuần tự các lệnh sau:

```bash
# 1. Khởi tạo Git repository trong thư mục
git init

# 2. Thêm toàn bộ các file vào danh sách chuẩn bị lưu trữ
git add .

# 3. Tạo bản commit đầu tiên
git commit -m "Khoi tao website HPUni IT Career Connect - Khoa CNTT DH Hai Phong"

# 4. Đổi tên nhánh chính thành main
git branch -M main

# 5. Kết nối thư mục máy tính với repository trên GitHub vừa tạo
# (Thay đường link bên dưới bằng link repository thật của bạn)
git remote add origin https://github.com/<ten-tai-khoan-cua-ban>/hpuni-it-career-connect.git

# 6. Đẩy toàn bộ mã nguồn lên GitHub
git push -u origin main
```

*(Lưu ý: Nếu GitHub yêu cầu đăng nhập, trình duyệt sẽ tự động bật lên cửa sổ để bạn bấm xác nhận "Authorize Git Credential Manager", hoặc bạn có thể nhập GitHub Personal Access Token nếu sử dụng xác thực qua mã bảo mật).*

---

## 5. CÁCH CẬP NHẬT MÃ NGUỒN LÊN GITHUB SAU KHI CHỈNH SỬA
Trong quá trình phát triển tiếp theo, mỗi khi bạn sửa code, đổi logo hoặc bổ sung tính năng mới, bạn chỉ cần chạy 3 lệnh sau để cập nhật lên GitHub:

```bash
# 1. Gom tất cả các thay đổi vừa sửa
git add .

# 2. Ghi chú nội dung đã sửa
git commit -m "Cap nhat giao dien va bo sung tinh nang dang tin tuc"

# 3. Day cap nhat len GitHub
git push
```

---

## 6. HƯỚNG DẪN TRIỂN KHAI (DEPLOY) LÊN INTERNET MIỄN PHÍ

Sau khi đẩy mã nguồn lên GitHub, bạn có thể đưa website hoạt động online hoàn toàn miễn phí trên nền tảng **Vercel** chỉ với 3 phút:

1. Truy cập [https://vercel.com](https://vercel.com) và đăng nhập bằng nút **"Continue with GitHub"**.
2. Tại bảng điều khiển Vercel, nhấn nút **"Add New..."** -> chọn **"Project"**.
3. Danh sách các kho chứa GitHub của bạn sẽ xuất hiện. Tìm repository `hpuni-it-career-connect` và nhấn nút **"Import"**.
4. Cấu hình triển khai:
   - **Framework Preset:** Chọn `Vite`.
   - **Root Directory:** Giữ nguyên `./`.
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Nhấn nút **"Deploy"**.
6. Chờ khoảng 40 - 60 giây để Vercel tự động xây dựng. Khi màn hình xuất hiện pháo hoa chúc mừng, bạn sẽ nhận được đường link web chính thức (dạng `https://hpuni-it-career-connect.vercel.app`) để gửi cho thầy cô, bạn bè hoặc doanh nghiệp trải nghiệm trực tiếp!

---

## 7. TÀI LIỆU LIÊN QUAN
- Xem toàn bộ danh sách tài khoản kiểm thử và phân quyền tại: **`taikhoan.md`**
- Liên hệ hỗ trợ kỹ thuật Khoa CNTT - Trường Đại học Hải Phòng: `fit@dhhp.edu.vn`
