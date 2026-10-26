import {
  User,
  StudentProfile,
  Company,
  Job,
  Application,
  InternshipRecord,
  CareerEvent,
  NewsArticle,
  InAppNotification,
  AuditLog
} from '../types/hpu';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-stu-1',
    email: 'hoang.nm21@dhhp.edu.vn',
    password: 'password123',
    fullName: 'Nguyễn Minh Hoàng',
    role: 'student',
    phone: '0988 123 456',
    avatarText: 'MH',
    status: 'active',
    studentId: 'stu-1',
    studentCode: '2110310028',
    className: 'ĐH CNTT K22A',
    createdAt: '15/09/2021'
  },
  {
    id: 'user-stu-2',
    email: 'lan.pt22@dhhp.edu.vn',
    password: 'password123',
    fullName: 'Phạm Thị Lan',
    role: 'student',
    phone: '0977 234 567',
    avatarText: 'PL',
    status: 'active',
    studentId: 'stu-2',
    studentCode: '2210310045',
    className: 'ĐH CNTT K22B',
    createdAt: '20/09/2022'
  },
  {
    id: 'user-stu-3',
    email: 'duc.nv23@dhhp.edu.vn',
    password: 'password123',
    fullName: 'Nguyễn Văn Đức',
    role: 'student',
    phone: '0912 888 999',
    avatarText: 'ND',
    status: 'active',
    studentId: 'stu-3',
    studentCode: '2310310112',
    className: 'ĐH CNTT K23A',
    createdAt: '10/09/2023'
  },
  {
    id: 'user-emp-lg',
    email: 'hr.rd@lge.com',
    password: 'password123',
    fullName: 'Phạm Thu Trang (HR Senior Manager)',
    role: 'employer',
    phone: '0225 3888 999',
    avatarText: 'LG',
    status: 'active',
    companyId: 'comp-lg',
    companyName: 'Trung tâm R&D LG Electronics Vietnam (Hải Phòng)',
    createdAt: '10/08/2023'
  },
  {
    id: 'user-emp-fpt',
    email: 'tuyendung.fpt@fpt.com',
    password: 'password123',
    fullName: 'Lê Tuấn Anh (Tech Recruiter)',
    role: 'employer',
    phone: '0904 555 777',
    avatarText: 'FP',
    status: 'active',
    companyId: 'comp-fpt',
    companyName: 'FPT Software Hải Phòng',
    createdAt: '01/03/2024'
  },
  {
    id: 'user-lec-1',
    email: 'binhtv@dhhp.edu.vn',
    password: 'password123',
    fullName: 'TS. Trần Văn Bình',
    role: 'lecturer',
    phone: '0912 345 678',
    avatarText: 'TB',
    status: 'active',
    lecturerCode: 'GV-CNTT-08',
    assignedClasses: ['ĐH CNTT K22A', 'ĐH CNTT K22B'],
    createdAt: '15/01/2020'
  },
  {
    id: 'user-admin-1',
    email: 'admin',
    password: 'admin',
    fullName: 'Ban Quản trị Khoa CNTT - ĐH Hải Phòng',
    role: 'admin',
    phone: '0225 3876 543',
    avatarText: 'HP',
    status: 'active',
    createdAt: '01/01/2020'
  }
];

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  id: 'stu-1',
  userId: 'user-stu-1',
  studentCode: '2110310028',
  fullName: 'Nguyễn Minh Hoàng',
  className: 'ĐH CNTT K22A',
  academicYear: 'Khóa 22 (2021 - 2025)',
  major: 'Kỹ thuật Phần mềm (Software Engineering)',
  gpa: '3.45 / 4.0 (Xếp loại Giỏi)',
  email: 'hoang.nm21@dhhp.edu.vn',
  phone: '0988 123 456',
  address: 'Quận Kiến An, TP. Hải Phòng',
  bio: 'Sinh viên năm 4 chuyên ngành Kỹ thuật Phần mềm, Khoa CNTT - Trường Đại học Hải Phòng. Đam mê phát triển ứng dụng Web Full-Stack, có tư duy giải thuật tốt và mong muốn tìm kiếm cơ hội thực tập tốt nghiệp được hướng dẫn bởi kỹ sư doanh nghiệp.',
  careerGoal: 'Trở thành Lập trình viên Full-Stack Web chuyên nghiệp, làm việc tại các công ty công nghệ tại Hải Phòng hoặc Hà Nội.',
  skills: ['React.js', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS', 'Git & GitHub', 'RESTful API', 'Docker cơ bản'],
  programmingLanguages: ['JavaScript', 'TypeScript', 'C/C++', 'Python', 'SQL'],
  frameworks: ['React', 'Next.js', 'Express', 'TailwindCSS'],
  certificates: ['TOEIC 720 (2025)', 'Chứng chỉ Lập trình Web Full-Stack do Khoa CNTT ĐH Hải Phòng cấp', 'Giải Nhì Olympic Tin học Sinh viên HPUni 2024'],
  projects: [
    {
      id: 'proj-1',
      name: 'Hệ thống Quản lý Đăng ký Đồ án Tốt nghiệp Khoa CNTT',
      role: 'Trưởng nhóm phát triển Full-Stack',
      techStack: 'ReactJS, Node.js, PostgreSQL, TailwindCSS',
      description: 'Ứng dụng phục vụ hơn 400 sinh viên Khoa CNTT Trường ĐH Hải Phòng tra cứu và đăng ký đề tài hướng dẫn với giảng viên.',
      demoUrl: 'https://github.com/hoangnm/hpuni-thesis-manager'
    },
    {
      id: 'proj-2',
      name: 'Cổng thông tin Tìm phòng trọ Sinh viên khu vực Kiến An',
      role: 'Frontend Developer',
      techStack: 'React, Leaflet Maps, Firebase',
      description: 'Hỗ trợ tân sinh viên tìm kiếm phòng trọ an toàn, giá rẻ quanh khuôn viên Đại học Hải Phòng.',
      demoUrl: 'https://github.com/hoangnm/hpuni-stay'
    }
  ],
  githubUrl: 'https://github.com/hoangnm-hpuni',
  portfolioUrl: 'https://hoangnm-dev.id.vn',
  cvFileName: 'CV_NguyenMinhHoang_KTPM_HPUni.pdf',
  targetJobTypes: ['internship', 'fresher'],
  isPublicForEmployers: true,
  profileCompletion: 92
};

export const INITIAL_COMPANIES: Company[] = [
  {
    id: 'comp-lg',
    userId: 'user-emp-lg',
    name: 'Trung tâm R&D LG Electronics Vietnam (Hải Phòng)',
    taxCode: '0201389765',
    industry: 'Phần mềm Nhúng, Ô tô (VS) & Thiết bị Điện tử',
    scale: '1.200+ kỹ sư',
    address: 'KCN Tràng Duệ, Huyện An Dương, TP. Hải Phòng',
    website: 'https://www.lge.com/vn',
    contactEmail: 'hr.rd@lge.com',
    contactPhone: '0225 3888 999',
    representativeName: 'Phạm Thu Trang',
    representativeTitle: 'Trưởng phòng Thu hút Nhân tài',
    description: 'Trung tâm nghiên cứu và phát triển phần mềm ô tô, công nghệ thông tin và giải pháp thông minh của Tập đoàn LG tại Việt Nam, đối tác chiến lược hàng đầu của Khoa CNTT - Trường ĐH Hải Phòng.',
    logoText: 'LG',
    logoColor: 'bg-rose-600',
    verificationStatus: 'verified',
    verificationNotes: 'Doanh nghiệp FDI đối tác chiến lược ký kết hợp tác MOU chính thức với Trường ĐH Hải Phòng.',
    isPartner: true,
    partnershipYear: '2022'
  },
  {
    id: 'comp-fpt',
    userId: 'user-emp-fpt',
    name: 'FPT Software Hải Phòng',
    taxCode: '0101778163',
    industry: 'Gia công & Chuyển đổi số Phần mềm Quốc tế',
    scale: '650+ nhân viên',
    address: 'Tòa nhà FPT, Số 86 Lê Hồng Phong, Quận Ngô Quyền, TP. Hải Phòng',
    website: 'https://fptsoftware.com',
    contactEmail: 'tuyendung.fpt@fpt.com',
    contactPhone: '0904 555 777',
    representativeName: 'Lê Tuấn Anh',
    representativeTitle: 'Trưởng bộ phận Tuyển dụng Fresher',
    description: 'Chi nhánh của công ty dịch vụ công nghệ thông tin lớn nhất Việt Nam, chuyên nhận sinh viên thực tập và tuyển dụng kỹ sư phần mềm tại Hải Phòng.',
    logoText: 'FPT',
    logoColor: 'bg-orange-600',
    verificationStatus: 'verified',
    verificationNotes: 'Đã xác minh qua giấy phép ĐKKD và ký kết thỏa thuận tiếp nhận sinh viên HPUni.',
    isPartner: true,
    partnershipYear: '2023'
  },
  {
    id: 'comp-viettel',
    userId: 'user-emp-viettel',
    name: 'Viettel Hải Phòng - Chi nhánh Tập đoàn Viễn thông Quân đội',
    taxCode: '0100109106-035',
    industry: 'Viễn thông, An toàn Thông tin & Giải pháp Số',
    scale: '400+ nhân sự',
    address: 'Tòa nhà Viettel, Đường Lê Hồng Phong, TP. Hải Phòng',
    website: 'https://vietteltelecom.vn',
    contactEmail: 'tuyendung.viettelhp@viettel.com.vn',
    contactPhone: '0225 6250 178',
    representativeName: 'Vũ Đức Mạnh',
    representativeTitle: 'Phó Giám đốc Kỹ thuật Viettel Hải Phòng',
    description: 'Đơn vị đi đầu về hạ tầng mạng, giải pháp chuyển đổi số cho chính quyền và doanh nghiệp tại Hải Phòng.',
    logoText: 'VTL',
    logoColor: 'bg-red-600',
    verificationStatus: 'verified',
    verificationNotes: 'Tập đoàn nhà nước, đối tác đồng hành cùng các ngày hội việc làm Khoa CNTT.',
    isPartner: true,
    partnershipYear: '2021'
  },
  {
    id: 'comp-pegatron',
    userId: 'user-emp-pega',
    name: 'Pegatron Vietnam (Hải Phòng)',
    taxCode: '0202029988',
    industry: 'Sản xuất Công nghệ Cao & Tự động hóa',
    scale: '5.000+ nhân viên',
    address: 'Khu công nghiệp DEEP C 2A, Khu kinh tế Đình Vũ, Hải Phòng',
    website: 'https://pegatroncorp.com',
    contactEmail: 'recruitment_vn@pegatroncorp.com',
    contactPhone: '0225 3999 111',
    representativeName: 'Trần Thị Mai',
    representativeTitle: 'HR Supervisor',
    description: 'Tập đoàn điện tử đa quốc gia sản xuất thiết bị công nghệ cao, tuyển dụng kỹ sư phần mềm hệ thống và quản trị mạng.',
    logoText: 'PGT',
    logoColor: 'bg-blue-600',
    verificationStatus: 'verified',
    verificationNotes: 'Doanh nghiệp FDI tiêu biểu tại Hải Phòng.',
    isPartner: false
  },
  {
    id: 'comp-pending',
    userId: 'user-emp-techx',
    name: 'Công ty Cổ phần Giải pháp Công nghệ TechX Hải Phòng',
    taxCode: '0202288331',
    industry: 'Thiết kế Web & Giải pháp Thương mại điện tử',
    scale: '25 nhân viên',
    address: 'Số 182 Lạch Tray, Quận Ngô Quyền, TP. Hải Phòng',
    website: 'https://techx-haiphong.vn',
    contactEmail: 'contact@techx-haiphong.vn',
    contactPhone: '0936 999 888',
    representativeName: 'Đỗ Văn Thành',
    representativeTitle: 'Giám đốc Điều hành',
    description: 'Công ty khởi nghiệp công nghệ chuyên phát triển phần mềm ERP và website bán hàng cho doanh nghiệp địa phương.',
    logoText: 'TX',
    logoColor: 'bg-indigo-600',
    verificationStatus: 'pending',
    verificationNotes: 'Mới gửi hồ sơ đăng ký tài khoản ngày 24/10/2026. Đang chờ Ban Quản trị Khoa CNTT xác minh thông tin mã số thuế.',
    isPartner: false
  }
];

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    companyId: 'comp-lg',
    companyName: 'Trung tâm R&D LG Electronics Vietnam (Hải Phòng)',
    companyLogoText: 'LG',
    companyColor: 'bg-rose-600',
    companyVerified: true,
    title: 'Thực tập sinh Phần mềm Nhúng Ô tô (Embedded C/C++ Intern)',
    category: 'software',
    jobType: 'internship',
    targetAudiences: ['Sinh viên năm 3', 'Sinh viên năm cuối'],
    description: 'Tham gia chương trình thực tập sinh tài năng LG R&D Hải Phòng dành riêng cho sinh viên Khoa CNTT - ĐH Hải Phòng. Sinh viên được kèm cặp 1-1 bởi Senior Software Architect và thực hành trực tiếp trên hệ thống mô phỏng ô tô thông minh.',
    requirements: [
      'Sinh viên năm 3 hoặc năm cuối chuyên ngành Kỹ thuật Phần mềm, CNTT hoặc Mạng máy tính ĐH Hải Phòng.',
      'Nắm chắc kiến thức lập trình C/C++, cấu trúc dữ liệu và giải thuật.',
      'Hiểu biết cơ bản về hệ điều hành Linux hoặc lập trình vi điều khiển là lợi thế.',
      'Có khả năng đi thực tập tối thiểu 3 buổi/tuần (Khoa tạo điều kiện xếp lịch).'
    ],
    benefits: [
      'Trợ cấp thực tập hàng tháng: 7.000.000 - 9.000.000 VNĐ/tháng.',
      'Xe buýt đưa đón sinh viên từ khu vực Kiến An tới KCN Tràng Duệ.',
      'Xác nhận dấu mộc thực tập tốt nghiệp và hỗ trợ đề tài luận văn.',
      'Ưu tiên ký hợp đồng tuyển thẳng vào vị trí Junior Embedded Engineer sau tốt nghiệp.'
    ],
    requiredSkills: ['C', 'C++', 'Data Structures', 'Linux'],
    preferredSkills: ['RTOS', 'Git', 'Embedded Systems', 'English'],
    salaryText: '7.000.000 - 9.000.000 VNĐ/tháng',
    location: 'Hải Phòng (KCN Tràng Duệ)',
    workMode: 'On-site',
    slots: 10,
    deadline: '15/11/2026',
    postedDate: '20/10/2026',
    approvalStatus: 'approved',
    displayStatus: 'active',
    applicantsCount: 14,
    stampSupport: true,
    flexibleSchedule: true,
    featured: true
  },
  {
    id: 'job-2',
    companyId: 'comp-fpt',
    companyName: 'FPT Software Hải Phòng',
    companyLogoText: 'FPT',
    companyColor: 'bg-orange-600',
    companyVerified: true,
    title: 'Fresher / Thực tập sinh Lập trình Web Full-Stack (ReactJS & Node.js)',
    category: 'software',
    jobType: 'fresher',
    targetAudiences: ['Sinh viên năm cuối', 'Mới tốt nghiệp'],
    description: 'Chương trình Fresher Academy đào tạo 3 tháng có trả lương, tiếp nhận sinh viên chuyên ngành Kỹ thuật Phần mềm và CNTT của Đại học Hải Phòng tham gia các dự án chuyển đổi số doanh nghiệp trong và ngoài nước.',
    requirements: [
      'Sinh viên chuẩn bị tốt nghiệp hoặc đã tốt nghiệp Khoa CNTT - ĐH Hải Phòng.',
      'Nắm vững JavaScript, TypeScript, HTML/CSS và ReactJS cơ bản.',
      'Tư duy logic tốt, có ít nhất 1 dự án môn học hoặc cá nhân trên GitHub.',
      'Cam kết làm việc toàn thời gian sau khi kết thúc khóa đào tạo 3 tháng.'
    ],
    benefits: [
      'Thu nhập trong thời gian đào tạo: 6.000.000 VNĐ/tháng. Lương chính thức sau 3 tháng: 10.000.000 - 15.000.000 VNĐ.',
      'Cung cấp trang thiết bị laptop, phụ cấp ăn trưa tại FPT Complex Hải Phòng.',
      'Ký hợp đồng lao động chính thức, bảo hiểm FPT Care cao cấp.',
      'Được hướng dẫn đồ án tốt nghiệp và đóng dấu xác nhận thực tập.'
    ],
    requiredSkills: ['JavaScript', 'React.js', 'Node.js', 'SQL'],
    preferredSkills: ['TypeScript', 'Tailwind CSS', 'Docker', 'RESTful API'],
    salaryText: '6.000.000 - 15.000.000 VNĐ/tháng',
    location: 'Hải Phòng (Lê Hồng Phong, Ngô Quyền)',
    workMode: 'Hybrid',
    slots: 15,
    deadline: '30/11/2026',
    postedDate: '22/10/2026',
    approvalStatus: 'approved',
    displayStatus: 'active',
    applicantsCount: 28,
    stampSupport: true,
    flexibleSchedule: true,
    featured: true
  },
  {
    id: 'job-3',
    companyId: 'comp-viettel',
    companyName: 'Viettel Hải Phòng - Chi nhánh Viễn thông Quân đội',
    companyLogoText: 'VTL',
    companyColor: 'bg-red-600',
    companyVerified: true,
    title: 'Thực tập sinh Quản trị Mạng & An toàn Thông tin',
    category: 'security',
    jobType: 'internship',
    targetAudiences: ['Sinh viên năm 3', 'Sinh viên năm cuối'],
    description: 'Thực tập tại Trung tâm Điều hành Mạng lưới Viễn thông & CNTT Viettel Hải Phòng. Tiếp cận hệ thống định tuyến băng rộng, giám sát an ninh mạng SOC và các thiết bị viễn thông cấp tỉnh.',
    requirements: [
      'Sinh viên chuyên ngành Mạng máy tính, An toàn thông tin, CNTT Trường ĐH Hải Phòng.',
      'Hiểu biết về mô hình OSI, TCP/IP, Routing & Switching (tương đương CCNA).',
      'Có kiến thức về bảo mật mạng, tường lửa (Firewall) và hệ điều hành Linux/Windows Server.',
      'Tính cẩn thận, kỷ luật và có trách nhiệm cao.'
    ],
    benefits: [
      'Mức hỗ trợ: 5.000.000 VNĐ/tháng + Thưởng hoàn thành dự án.',
      'Được tiếp cận hệ thống thực tế của nhà mạng lớn nhất Việt Nam.',
      'Đóng dấu mộc thực tập Khoa CNTT và cơ hội vào làm việc tại Viettel sau tốt nghiệp.'
    ],
    requiredSkills: ['Networking', 'TCP/IP', 'Linux', 'Network Security'],
    preferredSkills: ['CCNA', 'Wireshark', 'Python Scripting'],
    salaryText: '5.000.000 VNĐ/tháng',
    location: 'Hải Phòng (Đường Lê Hồng Phong)',
    workMode: 'On-site',
    slots: 6,
    deadline: '25/11/2026',
    postedDate: '18/10/2026',
    approvalStatus: 'approved',
    displayStatus: 'active',
    applicantsCount: 9,
    stampSupport: true,
    flexibleSchedule: true,
    featured: false
  },
  {
    id: 'job-4',
    companyId: 'comp-pegatron',
    companyName: 'Pegatron Vietnam (Hải Phòng)',
    companyLogoText: 'PGT',
    companyColor: 'bg-blue-600',
    companyVerified: true,
    title: 'Kỹ sư Phần mềm Tự động hóa & Kiểm thử Sản xuất (Junior/Fresher)',
    category: 'testing',
    jobType: 'junior',
    targetAudiences: ['Sinh viên năm cuối', 'Mới tốt nghiệp'],
    description: 'Phát triển các chương trình tự động hóa kiểm thử bo mạch điện tử, viết script thu thập dữ liệu sản xuất và tích hợp với hệ thống MES nhà máy Pegatron Đình Vũ.',
    requirements: [
      'Tốt nghiệp hoặc sinh viên năm cuối Khoa CNTT ĐH Hải Phòng.',
      'Thành thạo lập trình Python hoặc C# (.NET).',
      'Biết giao tiếp cơ bản tiếng Anh hoặc tiếng Trung là lợi thế rất lớn.',
      'Có thể làm việc theo ca sản xuất khi cần.'
    ],
    benefits: [
      'Lương khởi điểm: 11.000.000 - 14.000.000 VNĐ/tháng.',
      'Xe đưa đón nhân viên các tuyến trong nội thành Hải Phòng.',
      'Hỗ trợ cơm trưa, thưởng thâm niên và các chế độ đãi ngộ chuẩn FDI.'
    ],
    requiredSkills: ['Python', 'C#', '.NET', 'Software Testing'],
    preferredSkills: ['SQL Server', 'English', 'Chinese'],
    salaryText: '11.000.000 - 14.000.000 VNĐ/tháng',
    location: 'Hải Phòng (KCN DEEP C 2A Đình Vũ)',
    workMode: 'On-site',
    slots: 8,
    deadline: '10/12/2026',
    postedDate: '24/10/2026',
    approvalStatus: 'approved',
    displayStatus: 'active',
    applicantsCount: 11,
    stampSupport: true,
    flexibleSchedule: false,
    featured: false
  },
  {
    id: 'job-5',
    companyId: 'comp-pending',
    companyName: 'Công ty Cổ phần Giải pháp Công nghệ TechX Hải Phòng',
    companyLogoText: 'TX',
    companyColor: 'bg-indigo-600',
    companyVerified: false,
    title: 'Thực tập sinh Thiết kế Giao diện Web UI/UX & Frontend Part-time',
    category: 'uiux',
    jobType: 'part_time',
    targetAudiences: ['Sinh viên năm 2', 'Sinh viên năm 3', 'Sinh viên năm cuối'],
    description: 'Hỗ trợ thiết kế wireframe, prototype trên Figma và chuyển đổi sang giao diện HTML/CSS/React cho các website doanh nghiệp vừa và nhỏ tại Hải Phòng.',
    requirements: [
      'Sinh viên đang theo học tại ĐH Hải Phòng có khiếu thẩm mỹ tốt.',
      'Thành thạo công cụ Figma, Canva và hiểu nguyên tắc thiết kế UI/UX.',
      'Biết cơ bản về HTML/CSS/Tailwind là lợi thế.'
    ],
    benefits: [
      'Lương theo ca: 30.000 - 45.000 VNĐ/giờ (khoảng 3 - 5 triệu/tháng).',
      'Thời gian làm việc cực kỳ linh hoạt theo ca sáng/chiều/tối.',
      'Có hỗ trợ đóng dấu mộc thực tập.'
    ],
    requiredSkills: ['Figma', 'UI/UX Design', 'HTML/CSS'],
    preferredSkills: ['Tailwind CSS', 'React basics'],
    salaryText: '30.000 - 45.000 VNĐ/giờ',
    location: 'Hải Phòng (Lạch Tray, Ngô Quyền)',
    workMode: 'Hybrid',
    slots: 4,
    deadline: '20/12/2026',
    postedDate: '25/10/2026',
    approvalStatus: 'pending', // Pending Admin approval!
    displayStatus: 'active',
    applicantsCount: 0,
    stampSupport: true,
    flexibleSchedule: true,
    featured: false
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-1',
    jobId: 'job-1',
    jobTitle: 'Thực tập sinh Phần mềm Nhúng Ô tô (Embedded C/C++ Intern)',
    companyId: 'comp-lg',
    companyName: 'Trung tâm R&D LG Electronics Vietnam (Hải Phòng)',
    companyLocation: 'Hải Phòng (KCN Tràng Duệ)',
    studentId: 'stu-1',
    studentName: 'Nguyễn Minh Hoàng',
    studentCode: '2110310028',
    studentClass: 'ĐH CNTT K22A',
    studentMajor: 'Kỹ thuật Phần mềm',
    studentGpa: '3.45',
    studentEmail: 'hoang.nm21@dhhp.edu.vn',
    studentPhone: '0988 123 456',
    appliedDate: '22/10/2026',
    status: 'interview',
    coverLetter: 'Kính gửi Ban Tuyển dụng LG Electronics R&D Hải Phòng. Em là sinh viên năm 4 chuyên ngành Kỹ thuật Phần mềm Khoa CNTT - ĐH Hải Phòng. Em có thế mạnh về C/C++, cấu trúc dữ liệu và rất đam mê mảng phần mềm ô tô thông minh. Em mong muốn được thực tập tốt nghiệp và cống hiến cho công ty.',
    cvFileName: 'CV_NguyenMinhHoang_KTPM_HPUni.pdf',
    internalNotes: 'Sinh viên ĐH Hải Phòng có GPA cao (3.45), đã đạt giải Olympic Tin học trường. Phù hợp vòng phỏng vấn kỹ thuật.',
    interviewSchedule: {
      date: '29/10/2026',
      time: '14:00',
      locationOrLink: 'Phòng Hội thảo Tầng 2, Tòa nhà R&D LG Electronics (KCN Tràng Duệ, Hải Phòng) hoặc qua MS Teams',
      notes: 'Ứng viên chuẩn bị mang theo bảng điểm đại học và giới thiệu về các bài tập lớn đã làm.'
    },
    statusHistory: [
      {
        status: 'submitted',
        changedAt: '22/10/2026 09:15',
        changedBy: 'Nguyễn Minh Hoàng (Sinh viên)'
      },
      {
        status: 'reviewing',
        changedAt: '23/10/2026 10:30',
        changedBy: 'Phạm Thu Trang (HR LG)'
      },
      {
        status: 'interview',
        changedAt: '24/10/2026 15:00',
        changedBy: 'Phạm Thu Trang (HR LG)',
        notes: 'Xếp lịch phỏng vấn trực tiếp tại văn phòng LG Tràng Duệ.'
      }
    ]
  },
  {
    id: 'app-2',
    jobId: 'job-2',
    jobTitle: 'Fresher / Thực tập sinh Lập trình Web Full-Stack',
    companyId: 'comp-fpt',
    companyName: 'FPT Software Hải Phòng',
    companyLocation: 'Hải Phòng (Lê Hồng Phong)',
    studentId: 'stu-1',
    studentName: 'Nguyễn Minh Hoàng',
    studentCode: '2110310028',
    studentClass: 'ĐH CNTT K22A',
    studentMajor: 'Kỹ thuật Phần mềm',
    studentGpa: '3.45',
    studentEmail: 'hoang.nm21@dhhp.edu.vn',
    studentPhone: '0988 123 456',
    appliedDate: '24/10/2026',
    status: 'reviewing',
    coverLetter: 'Em ứng tuyển vị trí Fresher Web Developer tại FPT Software Hải Phòng với nền tảng React và Node.js.',
    cvFileName: 'CV_NguyenMinhHoang_KTPM_HPUni.pdf',
    statusHistory: [
      {
        status: 'submitted',
        changedAt: '24/10/2026 11:20',
        changedBy: 'Nguyễn Minh Hoàng (Sinh viên)'
      },
      {
        status: 'reviewing',
        changedAt: '25/10/2026 08:45',
        changedBy: 'Lê Tuấn Anh (HR FPT)'
      }
    ]
  }
];

export const INITIAL_INTERNSHIPS: InternshipRecord[] = [
  {
    id: 'intern-1',
    studentId: 'stu-1',
    studentName: 'Nguyễn Minh Hoàng',
    studentCode: '2110310028',
    className: 'ĐH CNTT K22A',
    major: 'Kỹ thuật Phần mềm',
    companyId: 'comp-lg',
    companyName: 'Trung tâm R&D LG Electronics Vietnam',
    position: 'Thực tập sinh Embedded C/C++',
    lecturerAdvisor: 'TS. Trần Văn Bình (Trưởng BM KTPM)',
    startDate: '01/11/2026',
    endDate: '15/02/2027',
    status: 'in_progress',
    companyMentor: 'KS. Hoàng Anh Dũng (Team Lead)',
    evaluationScore: 9.0,
    stampConfirmed: true
  },
  {
    id: 'intern-2',
    studentId: 'stu-2',
    studentName: 'Vũ Thị Phương Thảo',
    studentCode: '2110310056',
    className: 'ĐH CNTT K22B',
    major: 'Công nghệ Thông tin',
    companyId: 'comp-fpt',
    companyName: 'FPT Software Hải Phòng',
    position: 'Thực tập sinh Frontend ReactJS',
    lecturerAdvisor: 'ThS. Nguyễn Thị Lan (Phó Trưởng Khoa)',
    startDate: '15/10/2026',
    endDate: '15/01/2027',
    status: 'in_progress',
    companyMentor: 'Nguyễn Văn Hùng (Senior Dev)',
    evaluationScore: 8.5,
    stampConfirmed: true
  },
  {
    id: 'intern-3',
    studentId: 'stu-3',
    studentName: 'Đặng Tuấn Kiệt',
    studentCode: '2110310072',
    className: 'ĐH CNTT K22A',
    major: 'Mạng máy tính & ATTT',
    companyId: 'comp-viettel',
    companyName: 'Viettel Hải Phòng',
    position: 'Thực tập sinh Network & Security',
    lecturerAdvisor: 'ThS. Phạm Quốc Tuấn (Phụ trách TT Tin học HPUni)',
    startDate: '01/10/2026',
    endDate: '31/12/2026',
    status: 'in_progress',
    companyMentor: 'Vũ Đức Mạnh (Phó GĐ Kỹ thuật)',
    stampConfirmed: true
  }
];

export const INITIAL_EVENTS: CareerEvent[] = [
  {
    id: 'ev-1',
    title: 'Hội chợ Việc làm CNTT & Công nghệ Hải Phòng 2026 (HPUni IT Career Day)',
    type: 'job_fair',
    organizer: 'Khoa Công nghệ thông tin - Trường Đại học Hải Phòng (HPUni)',
    date: '15/11/2026',
    time: '08:00 - 17:00',
    location: 'Hội trường Lớn A1 & Quảng trường Trung tâm, Trường ĐH Hải Phòng (171 Phan Đăng Lưu, Kiến An)',
    description: 'Sự kiện thường niên lớn nhất của Khoa CNTT với sự tham gia của hơn 25 doanh nghiệp công nghệ tại Hải Phòng và Hà Nội. Cơ hội phỏng vấn nhận việc trực tiếp, sửa CV 1-1 cùng chuyên gia nhân sự và bốc thăm quà tặng công nghệ.',
    highlights: [
      'Gặp gỡ trực tiếp nhà tuyển dụng LG R&D, FPT Software, Viettel, Pegatron, USI...',
      'Hơn 600 chỉ tiêu thực tập tốt nghiệp và việc làm fresher có trả lương.',
      'Khu vực tư vấn hướng nghiệp và phỏng vấn thử nghiệm cho sinh viên năm 3, năm cuối.',
      'Lễ ký kết biên bản ghi nhớ hợp tác đào tạo giữa Khoa CNTT và các doanh nghiệp.'
    ],
    maxAttendees: 800,
    registeredCount: 462,
    registeredStudentIds: ['stu-1'],
    status: 'upcoming'
  },
  {
    id: 'ev-2',
    title: 'Workshop: "Hành trang Kỹ sư Phần mềm Ô tô thông minh cùng Chuyên gia LG"',
    type: 'workshop',
    organizer: 'Trung tâm R&D LG Electronics Vietnam & Bộ môn Kỹ thuật Phần mềm HPUni',
    date: '05/11/2026',
    time: '14:00 - 16:30',
    location: 'Hội trường Tầng 3, Nhà C1 - Giảng đường Khoa CNTT, ĐH Hải Phòng',
    description: 'Chia sẻ thực tế về kiến trúc phần mềm trên xe hơi hiện đại, các tiêu chuẩn an toàn AUTOSAR, quy trình viết code nhúng chuẩn mực và định hướng nghề nghiệp cho sinh viên HPUni.',
    highlights: [
      'Trực tiếp giao lưu cùng Trưởng phòng Kỹ thuật Phần mềm LG R&D Hải Phòng.',
      'Giải đáp thắc mắc về bài test tuyển dụng và kỹ năng phỏng vấn tiếng Anh.',
      'Nhận template tài liệu ôn tập phỏng vấn C/C++ chuẩn quốc tế.'
    ],
    maxAttendees: 200,
    registeredCount: 178,
    registeredStudentIds: ['stu-1'],
    status: 'upcoming'
  },
  {
    id: 'ev-3',
    title: 'Company Tour: Một ngày trải nghiệm công nghệ tại Tổ hợp Sản xuất Pegatron',
    type: 'company_tour',
    organizer: 'Ban Hỗ trợ Khởi nghiệp & Hợp tác Doanh nghiệp Khoa CNTT',
    date: '20/11/2026',
    time: '08:30 - 14:30',
    location: 'Nhà máy Pegatron Vietnam, Khu kinh tế Đình Vũ, Hải Phòng',
    description: 'Chuyến xe đưa đón 50 sinh viên xuất sắc Khoa CNTT tham quan dây chuyền sản xuất tự động hóa thông minh, trung tâm điều hành mạng và hệ thống IoT công nghiệp.',
    highlights: [
      'Xe buýt đưa đón hai chiều từ cổng Trường ĐH Hải Phòng.',
      'Trải nghiệm bữa trưa miễn phí tại canteen công ty.',
      'Đặc quyền nộp hồ sơ thực tập trực tiếp không qua vòng hồ sơ online.'
    ],
    maxAttendees: 50,
    registeredCount: 48,
    registeredStudentIds: [],
    status: 'upcoming'
  }
];

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Khoa CNTT - Trường ĐH Hải Phòng ký kết thỏa thuận hợp tác đào tạo và tiếp nhận thực tập với LG Electronics',
    category: 'cooperation',
    author: 'Ban Truyền thông Khoa CNTT',
    publishDate: '15/10/2026',
    excerpt: 'Lễ ký kết đánh dấu bước phát triển quan trọng trong việc đưa chương trình đào tạo của Khoa gắn liền với tiêu chuẩn công nghệ quốc tế, cam kết tiếp nhận hàng trăm sinh viên HPUni thực tập mỗi năm.',
    content: 'Sáng ngày 15/10/2026, tại Hội trường A1 Trường Đại học Hải Phòng đã diễn ra Lễ ký kết thỏa thuận hợp tác (MOU) giữa Khoa Công nghệ thông tin và Trung tâm R&D LG Electronics Vietnam. Theo thỏa thuận, LG sẽ tài trợ thiết bị phòng thí nghiệm thực hành, cử chuyên gia cùng tham gia giảng dạy các chuyên đề công nghệ mới và tiếp nhận sinh viên năm cuối của Khoa thực tập tốt nghiệp có trợ cấp.',
    featured: true
  },
  {
    id: 'news-2',
    title: 'Thông báo Kế hoạch Thực tập Tốt nghiệp và Hướng dẫn Đăng ký Khóa 22 (2021-2025)',
    category: 'internship',
    author: 'Văn phòng Khoa CNTT',
    publishDate: '10/10/2026',
    excerpt: 'Khoa CNTT thông báo tới toàn thể sinh viên Khóa 22 lịch trình nộp hồ sơ, chọn doanh nghiệp thực tập và phân công giảng viên hướng dẫn đợt 1 năm học 2026-2027.',
    content: 'Sinh viên Khóa 22 các chuyên ngành Kỹ thuật Phần mềm, CNTT và Mạng máy tính cần hoàn tất đăng ký đơn vị thực tập trước ngày 15/11/2026 qua cổng HPUni IT Career Connect. Các đơn vị tiếp nhận phải có dấu mộc pháp nhân và cử cán bộ hướng dẫn chuyên môn.'
  },
  {
    id: 'news-3',
    title: 'Bí quyết viết CV Chinh phục Nhà tuyển dụng Công nghệ dành cho Sinh viên HPUni',
    category: 'career_guide',
    author: 'TS. Trần Văn Bình - Trưởng BM Kỹ thuật Phần mềm',
    publishDate: '05/10/2026',
    excerpt: 'Hướng dẫn chi tiết cách trình bày dự án học tập, chứng chỉ và kỹ năng lập trình trên CV theo chuẩn định dạng ATS giúp sinh viên nổi bật ngay từ vòng sơ tuyển.',
    content: 'Đối với sinh viên công nghệ thông tin chưa có nhiều năm kinh nghiệm làm việc chính thức, điểm mấu chốt để ghi điểm với nhà tuyển dụng là minh chứng năng lực thông qua các bài tập lớn, đồ án môn học và các link demo/GitHub cụ thể...'
  }
];

export const INITIAL_NOTIFICATIONS: InAppNotification[] = [
  {
    id: 'notif-1',
    targetRole: 'student',
    targetUserId: 'user-stu-1',
    title: 'Lịch phỏng vấn mới từ LG Electronics R&D',
    message: 'Bạn có lịch hẹn phỏng vấn vị trí Thực tập sinh Embedded C/C++ vào 14:00 ngày 29/10/2026 tại LG Tràng Duệ.',
    type: 'interview',
    read: false,
    createdAt: '24/10/2026 15:05',
    actionTab: 'student_portal'
  },
  {
    id: 'notif-2',
    targetRole: 'employer',
    targetUserId: 'user-emp-lg',
    title: 'Hồ sơ ứng tuyển mới',
    message: 'Sinh viên Nguyễn Minh Hoàng (ĐH Hải Phòng - GPA 3.45) đã ứng tuyển vị trí Embedded C/C++ Intern.',
    type: 'application',
    read: true,
    createdAt: '22/10/2026 09:20',
    actionTab: 'employer_portal'
  },
  {
    id: 'notif-3',
    targetRole: 'admin',
    title: 'Yêu cầu xác minh doanh nghiệp mới',
    message: 'Công ty Cổ phần Giải pháp Công nghệ TechX Hải Phòng đã gửi hồ sơ đăng ký tài khoản cần xét duyệt.',
    type: 'verification',
    read: false,
    createdAt: '25/10/2026 08:30',
    actionTab: 'admin_portal'
  },
  {
    id: 'notif-4',
    targetRole: 'admin',
    title: 'Tin tuyển dụng mới chờ duyệt',
    message: 'TechX Hải Phòng vừa đăng tin "Thực tập sinh Thiết kế UI/UX & Frontend Part-time" đang chờ kiểm duyệt.',
    type: 'job_approval',
    read: false,
    createdAt: '25/10/2026 09:00',
    actionTab: 'admin_portal'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    action: 'Duyệt xác minh Doanh nghiệp',
    performedBy: 'fit.admin@dhhp.edu.vn',
    role: 'Admin Khoa CNTT',
    timestamp: '20/10/2026 14:30',
    details: 'Đã xác minh tư cách đối tác cho Trung tâm R&D LG Electronics Vietnam (Hải Phòng).'
  },
  {
    id: 'log-2',
    action: 'Phê duyệt Tin tuyển dụng',
    performedBy: 'fit.admin@dhhp.edu.vn',
    role: 'Admin Khoa CNTT',
    timestamp: '20/10/2026 15:10',
    details: 'Phê duyệt công khai tin tuyển dụng "Embedded C/C++ Intern" của LG Electronics.'
  },
  {
    id: 'log-3',
    action: 'Xếp lịch phỏng vấn sinh viên',
    performedBy: 'hr.rd@lge.com',
    role: 'Doanh nghiệp',
    timestamp: '24/10/2026 15:00',
    details: 'LG Electronics đã xếp lịch phỏng vấn cho sinh viên Nguyễn Minh Hoàng (2110310028).'
  }
];
