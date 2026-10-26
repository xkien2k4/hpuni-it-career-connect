import React, { useState } from 'react';
import {
  UserRole,
  User,
  StudentProfile,
  Company,
  Job,
  Application,
  InternshipRecord,
  CareerEvent,
  NewsArticle,
  InAppNotification,
  AuditLog,
  ApplicationStatus
} from './types/hpu';

import {
  INITIAL_USERS,
  INITIAL_STUDENT_PROFILE,
  INITIAL_COMPANIES,
  INITIAL_JOBS,
  INITIAL_APPLICATIONS,
  INITIAL_INTERNSHIPS,
  INITIAL_EVENTS,
  INITIAL_NEWS,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUDIT_LOGS
} from './data/hpuData';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { JobsDirectoryView } from './components/JobsDirectoryView';
import { InternshipsView } from './components/InternshipsView';
import { CompaniesView } from './components/CompaniesView';
import { EventsView } from './components/EventsView';
import { NewsView } from './components/NewsView';
import { StudentPortal } from './components/StudentPortal';
import { EmployerPortal } from './components/EmployerPortal';
import { LecturerPortal } from './components/LecturerPortal';
import { AdminPortal } from './components/AdminPortal';
import { JobDetailModal } from './components/JobDetailModal';
import { ApplyModal } from './components/ApplyModal';
import { AICVReviewModal } from './components/AICVReviewModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { AIMatchedJobsView } from './components/AIMatchedJobsView';
import { LoginView } from './components/LoginView';
import { RegisterView } from './components/RegisterView';

export default function App() {
  // User list with default Admin (tk: admin, mk: admin)
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  // System requires login or register to view pages: initial state is unauthenticated (null)
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<string>('login');

  // Search state passed between Home and JobsDirectory
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');
  const [searchLocation, setSearchLocation] = useState('all');

  // Main Datasets
  const [companies, setCompanies] = useState<Company[]>(INITIAL_COMPANIES);
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [student, setStudent] = useState<StudentProfile>(INITIAL_STUDENT_PROFILE);
  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);
  const [internships, setInternships] = useState<InternshipRecord[]>(INITIAL_INTERNSHIPS);
  const [events, setEvents] = useState<CareerEvent[]>(INITIAL_EVENTS);
  const [news, setNews] = useState<NewsArticle[]>(INITIAL_NEWS);
  const [notifications, setNotifications] = useState<InAppNotification[]>(INITIAL_NOTIFICATIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [savedJobIds, setSavedJobIds] = useState<string[]>(['job-1', 'job-5']);

  // Modals
  const [selectedJobForDetail, setSelectedJobForDetail] = useState<Job | null>(null);
  const [selectedJobForApply, setSelectedJobForApply] = useState<Job | null>(null);
  const [isAICVModalOpen, setIsAICVModalOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

  // Authentication Handlers
  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    const loginLog: AuditLog = {
      id: `log-${Date.now()}`,
      action: 'Đăng nhập hệ thống',
      performedBy: user.email,
      role: user.role,
      timestamp: new Date().toLocaleString('vi-VN'),
      details: `Đăng nhập thành công với vai trò ${user.role} (${user.fullName}).`
    };
    setAuditLogs(prev => [loginLog, ...prev]);

    // Role redirection
    switch (user.role) {
      case 'student':
        setActiveTab('student_portal');
        break;
      case 'employer':
        setActiveTab('employer_portal');
        break;
      case 'lecturer':
        setActiveTab('lecturer_portal');
        break;
      case 'admin':
        setActiveTab('admin_portal');
        break;
      default:
        setActiveTab('home');
    }
  };

  const handleLogout = () => {
    if (currentUser) {
      const logoutLog: AuditLog = {
        id: `log-${Date.now()}`,
        action: 'Đăng xuất',
        performedBy: currentUser.email,
        role: currentUser.role,
        timestamp: new Date().toLocaleString('vi-VN'),
        details: `Người dùng ${currentUser.fullName} đã đăng xuất an toàn.`
      };
      setAuditLogs(prev => [logoutLog, ...prev]);
    }
    setCurrentUser(null);
    setActiveTab('login');
  };

  // Multi-role Registration Handlers
  const handleRegisterStudent = (newUser: User, newProfile: StudentProfile) => {
    setUsers(prev => [newUser, ...prev]);
    setStudent(newProfile);
    setCurrentUser(newUser);

    const regLog: AuditLog = {
      id: `log-${Date.now()}`,
      action: 'Đăng ký tài khoản Sinh viên mới',
      performedBy: newUser.email,
      role: 'student',
      timestamp: new Date().toLocaleString('vi-VN'),
      details: `Sinh viên ${newUser.fullName} (Lớp: ${newUser.className}, MSSV: ${newUser.studentCode}) tạo tài khoản mới.`
    };
    setAuditLogs(prev => [regLog, ...prev]);

    const welcomeNotif: InAppNotification = {
      id: `notif-${Date.now()}`,
      targetRole: 'student',
      title: 'Chào mừng bạn đến với HPUni IT Career Connect!',
      message: `Tài khoản sinh viên lớp ${newUser.className} của bạn đã kích hoạt thành công. Hãy khám phá các cơ hội thực tập và việc làm.`,
      type: 'system',
      read: false,
      createdAt: new Date().toLocaleString('vi-VN'),
      actionTab: 'student_portal'
    };
    setNotifications(prev => [welcomeNotif, ...prev]);

    setActiveTab('student_portal');
  };

  const handleRegisterEmployer = (newUser: User, newCompany: Company) => {
    setUsers(prev => [newUser, ...prev]);
    setCompanies(prev => [newCompany, ...prev]);
    setCurrentUser(newUser);

    const regLog: AuditLog = {
      id: `log-${Date.now()}`,
      action: 'Đăng ký tài khoản Tuyển dụng Doanh nghiệp',
      performedBy: newUser.email,
      role: 'employer',
      timestamp: new Date().toLocaleString('vi-VN'),
      details: `Doanh nghiệp ${newCompany.name} (MST: ${newCompany.taxCode}, Người đại diện: ${newUser.fullName}) đăng ký tài khoản.`
    };
    setAuditLogs(prev => [regLog, ...prev]);

    const welcomeNotif: InAppNotification = {
      id: `notif-${Date.now()}`,
      targetRole: 'employer',
      title: 'Đăng ký tài khoản Doanh nghiệp thành công!',
      message: `Chào mừng ${newCompany.name}. Quý đơn vị có thể bắt đầu đăng tin tuyển dụng và kết nối sinh viên Khoa CNTT.`,
      type: 'system',
      read: false,
      createdAt: new Date().toLocaleString('vi-VN'),
      actionTab: 'employer_portal'
    };
    setNotifications(prev => [welcomeNotif, ...prev]);

    setActiveTab('employer_portal');
  };

  const handleRegisterLecturer = (newUser: User) => {
    setUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);

    const regLog: AuditLog = {
      id: `log-${Date.now()}`,
      action: 'Đăng ký tài khoản Giảng viên Hướng dẫn',
      performedBy: newUser.email,
      role: 'lecturer',
      timestamp: new Date().toLocaleString('vi-VN'),
      details: `Giảng viên ${newUser.fullName} (${newUser.lecturerCode}) đăng ký tài khoản phụ trách: ${newUser.assignedClasses?.join(', ')}.`
    };
    setAuditLogs(prev => [regLog, ...prev]);

    const welcomeNotif: InAppNotification = {
      id: `notif-${Date.now()}`,
      targetRole: 'lecturer',
      title: 'Kích hoạt tài khoản Giảng viên thành công!',
      message: `Chào thầy/cô ${newUser.fullName}. Thầy/cô có thể theo dõi tiến độ thực tập và chấm điểm tốt nghiệp cho các lớp: ${newUser.assignedClasses?.join(', ')}.`,
      type: 'system',
      read: false,
      createdAt: new Date().toLocaleString('vi-VN'),
      actionTab: 'lecturer_portal'
    };
    setNotifications(prev => [welcomeNotif, ...prev]);

    setActiveTab('lecturer_portal');
  };

  // Admin User Management
  const handleToggleUserStatus = (userId: string, reason: string) => {
    setUsers(prev =>
      prev.map(u => {
        if (u.id === userId) {
          const nextStatus = u.status === 'active' ? 'locked' : 'active';
          const log: AuditLog = {
            id: `log-${Date.now()}`,
            action: nextStatus === 'locked' ? 'Khóa tài khoản người dùng' : 'Mở khóa tài khoản',
            performedBy: currentUser?.email || 'admin@hpu.edu.vn',
            role: 'Quản trị viên',
            timestamp: new Date().toLocaleString('vi-VN'),
            details: `Thao tác trên tài khoản ${u.fullName} (${u.email}). Lý do: ${reason}`
          };
          setAuditLogs(l => [log, ...l]);
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  const handleCreateLecturerAccount = (data: {
    fullName: string;
    email: string;
    password?: string;
    lecturerCode: string;
    phone: string;
    assignedClasses: string[];
  }) => {
    const newLecturer: User = {
      id: `lecturer-${Date.now()}`,
      email: data.email,
      password: data.password?.trim() ? data.password.trim() : 'password123',
      fullName: data.fullName,
      role: 'lecturer',
      status: 'active',
      lecturerCode: data.lecturerCode,
      phone: data.phone,
      assignedClasses: data.assignedClasses,
      createdAt: new Date().toLocaleDateString('vi-VN')
    };

    setUsers(prev => [newLecturer, ...prev]);

    setAuditLogs(prev => [
      {
        id: `log-${Date.now()}`,
        action: 'Cấp tài khoản Giảng viên hướng dẫn',
        performedBy: currentUser?.email || 'admin@hpu.edu.vn',
        role: 'Quản trị viên',
        timestamp: new Date().toLocaleString('vi-VN'),
        details: `Cấp tài khoản GV ${data.fullName} (${data.lecturerCode}) phụ trách lớp: ${data.assignedClasses.join(', ')}.`
      },
      ...prev
    ]);
  };

  const handleCreateCompanyAccount = (data: {
    name: string;
    taxCode: string;
    contactEmail: string;
    password?: string;
    contactPhone: string;
    representativeName: string;
    address: string;
    scale: string;
    status: 'pending' | 'verified';
  }) => {
    const compId = `comp-${Date.now()}`;
    const newCompany: Company = {
      id: compId,
      userId: `user-comp-${Date.now()}`,
      name: data.name,
      taxCode: data.taxCode,
      industry: 'Công nghệ thông tin & Viễn thông',
      scale: data.scale,
      address: data.address,
      website: 'https://hpu.edu.vn',
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      representativeName: data.representativeName,
      representativeTitle: 'Trưởng ban Nhân sự',
      logoText: data.name.substring(0, 3).toUpperCase(),
      logoColor: 'bg-indigo-700',
      description: `Doanh nghiệp đối tác tuyển dụng Khoa CNTT - Trường ĐH Hải Phòng.`,
      isPartner: data.status === 'verified',
      verificationStatus: data.status
    };

    const newCompanyUser: User = {
      id: `user-comp-${Date.now()}`,
      email: data.contactEmail,
      password: data.password?.trim() ? data.password.trim() : 'password123',
      fullName: data.representativeName,
      role: 'employer',
      status: 'active',
      companyId: compId,
      companyName: data.name,
      phone: data.contactPhone,
      createdAt: new Date().toLocaleDateString('vi-VN')
    };

    setCompanies(prev => [newCompany, ...prev]);
    setUsers(prev => [newCompanyUser, ...prev]);

    setAuditLogs(prev => [
      {
        id: `log-${Date.now()}`,
        action: 'Tạo tài khoản Doanh nghiệp',
        performedBy: currentUser?.email || 'admin@hpu.edu.vn',
        role: 'Quản trị viên',
        timestamp: new Date().toLocaleString('vi-VN'),
        details: `Tạo hồ sơ và cấp quyền cho doanh nghiệp ${data.name} (MST: ${data.taxCode}, Trạng thái: ${data.status}).`
      },
      ...prev
    ]);
  };

  const handleUpdateCompanyStatus = (
    companyId: string,
    status: 'pending' | 'verified' | 'rejected',
    notes: string
  ) => {
    setCompanies(prev =>
      prev.map(c => {
        if (c.id === companyId) {
          return {
            ...c,
            verificationStatus: status,
            isPartner: status === 'verified',
            verificationNotes: notes
          };
        }
        return c;
      })
    );

    // If verified, verify related jobs; if rejected, update job statuses
    setJobs(prev =>
      prev.map(j => {
        if (j.companyId === companyId) {
          if (status === 'verified') {
            return { ...j, companyVerified: true, approvalStatus: 'approved' };
          } else if (status === 'rejected') {
            return { ...j, companyVerified: false, displayStatus: 'closed' };
          }
        }
        return j;
      })
    );

    setAuditLogs(prev => [
      {
        id: `log-${Date.now()}`,
        action: `Cập nhật trạng thái Doanh nghiệp: ${status}`,
        performedBy: currentUser?.email || 'admin@hpu.edu.vn',
        role: 'Quản trị viên',
        timestamp: new Date().toLocaleString('vi-VN'),
        details: `Cập nhật đối tác ID ${companyId} sang trạng thái ${status}. Ghi chú: ${notes}`
      },
      ...prev
    ]);
  };

  // News & Activities Management
  const handleCreateNews = (newsData: Omit<NewsArticle, 'id'>) => {
    const newArticle: NewsArticle = {
      ...newsData,
      id: `news-${Date.now()}`
    };
    setNews(prev => [newArticle, ...prev]);
    setAuditLogs(prev => [
      {
        id: `log-${Date.now()}`,
        action: 'Đăng tin tức hoạt động mới',
        performedBy: currentUser?.email || 'admin@dhhp.edu.vn',
        role: 'Quản trị viên',
        timestamp: new Date().toLocaleString('vi-VN'),
        details: `Đã đăng tin hoạt động: "${newArticle.title}".`
      },
      ...prev
    ]);
  };

  const handleUpdateNews = (updatedArticle: NewsArticle) => {
    setNews(prev =>
      prev.map(item => (item.id === updatedArticle.id ? updatedArticle : item))
    );
    setAuditLogs(prev => [
      {
        id: `log-${Date.now()}`,
        action: 'Cập nhật tin tức hoạt động',
        performedBy: currentUser?.email || 'admin@dhhp.edu.vn',
        role: 'Quản trị viên',
        timestamp: new Date().toLocaleString('vi-VN'),
        details: `Đã cập nhật bài viết: "${updatedArticle.title}".`
      },
      ...prev
    ]);
  };

  const handleDeleteNews = (newsId: string) => {
    const target = news.find(n => n.id === newsId);
    setNews(prev => prev.filter(item => item.id !== newsId));
    setAuditLogs(prev => [
      {
        id: `log-${Date.now()}`,
        action: 'Xóa tin tức hoạt động',
        performedBy: currentUser?.email || 'admin@dhhp.edu.vn',
        role: 'Quản trị viên',
        timestamp: new Date().toLocaleString('vi-VN'),
        details: `Đã xóa bài viết: "${target?.title || newsId}".`
      },
      ...prev
    ]);
  };

  // Toggle Save Job
  const handleToggleSaveJob = (jobId: string) => {
    setSavedJobIds(prev => {
      const isSaved = prev.includes(jobId);
      const targetJob = jobs.find(j => j.id === jobId);
      if (!isSaved && targetJob) {
        const saveNotif: InAppNotification = {
          id: `notif-${Date.now()}`,
          targetRole: 'student',
          title: 'Đã lưu việc làm vào danh sách theo dõi',
          message: `Bạn đã lưu vị trí "${targetJob.title}" tại ${targetJob.companyName}.`,
          type: 'application',
          read: false,
          createdAt: new Date().toLocaleString('vi-VN'),
          actionTab: 'ai_matched_jobs'
        };
        setNotifications(n => [saveNotif, ...n]);
      }
      return isSaved ? prev.filter(id => id !== jobId) : [...prev, jobId];
    });
  };

  // Search handler from HomeView
  const handleHomeSearchSubmit = (query: string, category: string, location: string) => {
    setSearchQuery(query);
    setSearchCategory(category);
    setSearchLocation(location);
    setActiveTab('jobs');
  };

  // Submit Job Application
  const handleSubmitApplication = (appData: {
    jobId: string;
    jobTitle: string;
    companyId: string;
    companyName: string;
    companyLocation: string;
    studentName: string;
    studentCode: string;
    studentClass: string;
    studentMajor?: string;
    studentGpa: string;
    studentEmail: string;
    studentPhone: string;
    coverLetter: string;
    cvFileName: string;
  }) => {
    const newApp: Application = {
      id: `app-${Date.now()}`,
      jobId: appData.jobId,
      jobTitle: appData.jobTitle,
      companyId: appData.companyId,
      companyName: appData.companyName,
      companyLocation: appData.companyLocation,
      studentId: student.id,
      studentName: appData.studentName,
      studentCode: appData.studentCode,
      studentClass: appData.studentClass,
      studentMajor: '',
      studentGpa: appData.studentGpa,
      studentEmail: appData.studentEmail,
      studentPhone: appData.studentPhone,
      coverLetter: appData.coverLetter,
      cvFileName: appData.cvFileName,
      appliedDate: new Date().toLocaleDateString('vi-VN'),
      status: 'submitted',
      statusHistory: [
        {
          status: 'submitted',
          changedAt: new Date().toLocaleString('vi-VN'),
          changedBy: `${student.fullName} (Sinh viên Khoa CNTT)`
        }
      ]
    };

    setApplications(prev => [newApp, ...prev]);

    setJobs(prev =>
      prev.map(j => (j.id === appData.jobId ? { ...j, applicantsCount: j.applicantsCount + 1 } : j))
    );

    const newNotif: InAppNotification = {
      id: `notif-${Date.now()}`,
      targetRole: 'employer',
      title: 'Hồ sơ sinh viên ứng tuyển mới',
      message: `Sinh viên ${student.fullName} (Lớp: ${student.className}, MSSV: ${student.studentCode}) đã nộp đơn vị trí ${appData.jobTitle}.`,
      type: 'application',
      read: false,
      createdAt: new Date().toLocaleString('vi-VN'),
      actionTab: 'employer_portal'
    };
    setNotifications(prev => [newNotif, ...prev]);

    setAuditLogs(prev => [
      {
        id: `log-${Date.now()}`,
        action: 'Nộp hồ sơ ứng tuyển',
        performedBy: student.email,
        role: 'Sinh viên',
        timestamp: new Date().toLocaleString('vi-VN'),
        details: `Sinh viên ${student.fullName} (Lớp: ${student.className}) ứng tuyển vị trí ${appData.jobTitle} tại ${appData.companyName}.`
      },
      ...prev
    ]);
  };

  // Withdraw Application
  const handleWithdrawApplication = (appId: string) => {
    setApplications(prev =>
      prev.map(app => {
        if (app.id === appId) {
          return {
            ...app,
            status: 'withdrawn',
            statusHistory: [
              ...app.statusHistory,
              {
                status: 'withdrawn',
                changedAt: new Date().toLocaleString('vi-VN'),
                changedBy: `${student.fullName} (Sinh viên đã rút đơn)`
              }
            ]
          };
        }
        return app;
      })
    );
  };

  // Post New Job (Employer)
  const handlePostJob = (newJob: Job) => {
    setJobs(prev => [newJob, ...prev]);

    if (newJob.approvalStatus === 'pending') {
      const adminNotif: InAppNotification = {
        id: `notif-${Date.now()}`,
        targetRole: 'admin',
        title: 'Tin tuyển dụng mới chờ duyệt',
        message: `${newJob.companyName} đã đăng tin "${newJob.title}" cần phê duyệt trước khi công khai.`,
        type: 'job_approval',
        read: false,
        createdAt: new Date().toLocaleString('vi-VN'),
        actionTab: 'admin_portal'
      };
      setNotifications(prev => [adminNotif, ...prev]);
    }

    setAuditLogs(prev => [
      {
        id: `log-${Date.now()}`,
        action: 'Đăng tin tuyển dụng mới',
        performedBy: currentUser?.email || 'employer@company.com',
        role: 'Doanh nghiệp',
        timestamp: new Date().toLocaleString('vi-VN'),
        details: `Đăng tin "${newJob.title}" (Trạng thái: ${newJob.approvalStatus}).`
      },
      ...prev
    ]);
  };

  // Toggle Job Display Status
  const handleToggleJobStatus = (jobId: string) => {
    setJobs(prev =>
      prev.map(j => {
        if (j.id === jobId) {
          const next = j.displayStatus === 'active' ? 'closed' : 'active';
          return { ...j, displayStatus: next };
        }
        return j;
      })
    );
  };

  // Update Application Status (Employer action)
  const handleUpdateApplicationStatus = (
    appId: string,
    newStatus: ApplicationStatus,
    interviewDetails?: Application['interviewSchedule'],
    notes?: string
  ) => {
    setApplications(prev =>
      prev.map(app => {
        if (app.id === appId) {
          return {
            ...app,
            status: newStatus,
            interviewSchedule: interviewDetails || app.interviewSchedule,
            statusHistory: [
              ...app.statusHistory,
              {
                status: newStatus,
                changedAt: new Date().toLocaleString('vi-VN'),
                changedBy: currentUser?.fullName || 'Bộ phận Tuyển dụng',
                notes
              }
            ]
          };
        }
        return app;
      })
    );

    const studentNotif: InAppNotification = {
      id: `notif-${Date.now()}`,
      targetRole: 'student',
      title: `Cập nhật trạng thái ứng tuyển: ${newStatus === 'interview' ? 'Mời phỏng vấn' : newStatus}`,
      message: `Hồ sơ ứng tuyển của bạn đã được chuyển trạng thái sang "${newStatus}". Kiểm tra trang cá nhân để xem chi tiết.`,
      type: newStatus === 'interview' ? 'interview' : 'application',
      read: false,
      createdAt: new Date().toLocaleString('vi-VN'),
      actionTab: 'student_portal'
    };
    setNotifications(prev => [studentNotif, ...prev]);
  };

  // Admin Approve / Reject Company
  const handleApproveCompany = (companyId: string) => {
    handleUpdateCompanyStatus(companyId, 'verified', 'Admin phê duyệt qua cổng quản trị');
  };

  const handleRejectCompany = (companyId: string, reason: string) => {
    handleUpdateCompanyStatus(companyId, 'rejected', reason);
  };

  // Admin Approve / Reject Job
  const handleApproveJob = (jobId: string) => {
    setJobs(prev =>
      prev.map(j => (j.id === jobId ? { ...j, approvalStatus: 'approved' } : j))
    );
    setAuditLogs(prev => [
      {
        id: `log-${Date.now()}`,
        action: 'Phê duyệt Tin tuyển dụng',
        performedBy: currentUser?.email || 'admin@hpu.edu.vn',
        role: 'Quản trị viên',
        timestamp: new Date().toLocaleString('vi-VN'),
        details: `Phê duyệt công khai tin tuyển dụng ID: ${jobId}.`
      },
      ...prev
    ]);
  };

  const handleRejectJob = (jobId: string, reason: string) => {
    setJobs(prev =>
      prev.map(j => (j.id === jobId ? { ...j, approvalStatus: 'rejected' } : j))
    );
    setAuditLogs(prev => [
      {
        id: `log-${Date.now()}`,
        action: 'Từ chối Tin tuyển dụng',
        performedBy: currentUser?.email || 'admin@hpu.edu.vn',
        role: 'Quản trị viên',
        timestamp: new Date().toLocaleString('vi-VN'),
        details: `Từ chối tin tuyển dụng ID: ${jobId}. Lý do: ${reason}`
      },
      ...prev
    ]);
  };

  // Lecturer update grade
  const handleUpdateInternshipGrade = (internshipId: string, score: number) => {
    setInternships(prev =>
      prev.map(i => (i.id === internshipId ? { ...i, evaluationScore: score, status: 'completed' } : i))
    );
    setAuditLogs(prev => [
      {
        id: `log-${Date.now()}`,
        action: 'Chấm điểm Thực tập Tốt nghiệp',
        performedBy: currentUser?.email || 'lecturer@hpu.edu.vn',
        role: 'Giảng viên',
        timestamp: new Date().toLocaleString('vi-VN'),
        details: `Chấm điểm thực tập tốt nghiệp: ${score}/10 cho bản ghi ID ${internshipId}.`
      },
      ...prev
    ]);
  };

  // Event Registration
  const handleToggleEventRegistration = (eventId: string) => {
    setEvents(prev =>
      prev.map(ev => {
        if (ev.id === eventId) {
          const isReg = ev.registeredStudentIds.includes(student.id);
          const updatedIds = isReg
            ? ev.registeredStudentIds.filter(id => id !== student.id)
            : [...ev.registeredStudentIds, student.id];
          return {
            ...ev,
            registeredStudentIds: updatedIds,
            registeredCount: isReg ? Math.max(0, ev.registeredCount - 1) : ev.registeredCount + 1
          };
        }
        return ev;
      })
    );
  };

  const pendingApprovalsCount =
    companies.filter(c => c.verificationStatus === 'pending').length +
    jobs.filter(j => j.approvalStatus === 'pending').length;

  const currentCompany =
    companies.find(c => c.id === currentUser?.companyId) || companies[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-indigo-900 selection:text-white">
      {/* Top Navbar with zero icons and clean text */}
      <Navbar
        currentUser={currentUser}
        onLogout={handleLogout}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        notifications={notifications}
        onOpenNotifications={() => setIsNotificationDrawerOpen(true)}
        onNavigateToLogin={() => setActiveTab('login')}
        onNavigateToRegister={() => setActiveTab('register')}
        pendingApprovalsCount={pendingApprovalsCount}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {!currentUser ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Prominent Institutional Requirement Banner with official img logo tag */}
            <div className="mb-8 p-5 bg-blue-50 border-2 border-[#007ACC] rounded-lg shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                {/* THẺ IMG LOGO - CÓ THỂ ĐỔI ĐƯỜNG DẪN ẢNH TẠI ĐÂY */}
                <img
                  src="/assets/img/logo.jpg"
                  alt="Logo Khoa Công nghệ thông tin - Trường Đại học Hải Phòng (HPUni)"
                  className="w-14 h-14 object-contain rounded-full bg-white p-1 border border-blue-200 shadow-xs shrink-0 hidden sm:block"
                />
                <div>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="px-2.5 py-0.5 bg-[#007ACC] text-white text-[11px] font-bold rounded uppercase tracking-wider">
                      Yêu cầu bảo mật & phân quyền
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      Khoa Công nghệ thông tin – Trường Đại học Hải Phòng (HPUni)
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 font-['Outfit'] mb-1">
                    Vui lòng Đăng nhập hoặc Đăng ký tài khoản để xem nội dung trang
                  </h3>
                  <p className="text-xs text-slate-700 leading-relaxed max-w-3xl">
                    Để bảo vệ thông tin sinh viên, quy trình thực tập tốt nghiệp và mạng lưới tuyển dụng doanh nghiệp Khoa CNTT - ĐH Hải Phòng (HPUni), bạn cần đăng nhập tài khoản hợp lệ hoặc đăng ký tài khoản mới để xem toàn bộ nội dung website HPUni IT Career Connect.
                  </p>

                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className={`px-4 py-2 text-xs font-bold rounded cursor-pointer transition-colors ${
                    activeTab !== 'register'
                      ? 'bg-[#007ACC] text-white shadow-xs'
                      : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Đăng nhập
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('register')}
                  className={`px-4 py-2 text-xs font-bold rounded cursor-pointer transition-colors ${
                    activeTab === 'register'
                      ? 'bg-[#007ACC] text-white shadow-xs'
                      : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Đăng ký tài khoản
                </button>
              </div>
            </div>

            {activeTab === 'register' ? (
              <RegisterView
                existingUsers={users}
                onRegisterStudent={handleRegisterStudent}
                onRegisterEmployer={handleRegisterEmployer}
                onRegisterLecturer={handleRegisterLecturer}
                onNavigateToLogin={() => setActiveTab('login')}
                onNavigateHome={() => setActiveTab('login')}
              />
            ) : (
              <LoginView
                users={users}
                onLoginSuccess={handleLoginSuccess}
                onNavigateToRegister={() => setActiveTab('register')}
                onNavigateHome={() => setActiveTab('login')}
              />
            )}
          </div>
        ) : (
          <>
            {activeTab === 'login' && (
              <LoginView
                users={users}
                onLoginSuccess={handleLoginSuccess}
                onNavigateToRegister={() => setActiveTab('register')}
                onNavigateHome={() => setActiveTab('home')}
              />
            )}

            {activeTab === 'register' && (
              <RegisterView
                existingUsers={users}
                onRegisterStudent={handleRegisterStudent}
                onRegisterEmployer={handleRegisterEmployer}
                onRegisterLecturer={handleRegisterLecturer}
                onNavigateToLogin={() => setActiveTab('login')}
                onNavigateHome={() => setActiveTab('home')}
              />
            )}

            {activeTab === 'home' && (
              <HomeView
                jobs={jobs}
                companies={companies}
                events={events}
                news={news}
                onSelectJob={(job) => setSelectedJobForDetail(job)}
                onApplyJob={(job) => setSelectedJobForApply(job)}
                onNavigateTab={setActiveTab}
                onSearchSubmit={handleHomeSearchSubmit}
              />
            )}

        {activeTab === 'jobs' && (
          <JobsDirectoryView
            jobs={jobs}
            onSelectJob={(job) => setSelectedJobForDetail(job)}
            onApplyJob={(job) => setSelectedJobForApply(job)}
            initialCategory={searchCategory}
            initialQuery={searchQuery}
            initialLocation={searchLocation}
          />
        )}

        {activeTab === 'internships' && (
          <InternshipsView
            jobs={jobs}
            onSelectJob={(job) => setSelectedJobForDetail(job)}
            onApplyJob={(job) => setSelectedJobForApply(job)}
          />
        )}

        {activeTab === 'companies' && (
          <CompaniesView
            companies={companies}
            jobs={jobs}
            onSelectJob={(job) => setSelectedJobForDetail(job)}
          />
        )}

        {activeTab === 'events' && (
          <EventsView
            events={events}
            onToggleRegister={handleToggleEventRegistration}
            currentStudentId={student.id}
          />
        )}

        {activeTab === 'news' && (
          <NewsView news={news} />
        )}

        {activeTab === 'ai_matched_jobs' && (
          <AIMatchedJobsView
            student={student}
            jobs={jobs}
            savedJobIds={savedJobIds}
            onToggleSaveJob={handleToggleSaveJob}
            onSelectJob={(job) => setSelectedJobForDetail(job)}
            onApplyJob={(job) => setSelectedJobForApply(job)}
            onNavigateToProfile={() => setActiveTab('student_portal')}
          />
        )}

        {activeTab === 'student_portal' && (
          currentUser && currentUser.role === 'student' ? (
            <StudentPortal
              student={student}
              applications={applications}
              onUpdateProfile={(updated) => setStudent(updated)}
              onWithdrawApplication={handleWithdrawApplication}
              onOpenAICVModal={() => setIsAICVModalOpen(true)}
              onNavigateTab={setActiveTab}
            />
          ) : (
            <div className="max-w-xl mx-auto my-16 p-8 bg-white border border-slate-300 rounded text-center space-y-4">
              <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded">
                Yêu cầu đăng nhập
              </span>
              <h2 className="text-lg font-bold text-slate-900 font-['Outfit']">
                Khu vực dành cho Sinh viên Khoa CNTT
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Vui lòng đăng nhập với tài khoản sinh viên Trường Đại học Hải Phòng để xem hồ sơ năng lực cá nhân và danh sách đơn ứng tuyển.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className="px-5 py-2 bg-indigo-900 hover:bg-indigo-800 text-white rounded text-xs font-bold"
                >
                  Đến trang Đăng nhập
                </button>
              </div>
            </div>
          )
        )}

        {activeTab === 'employer_portal' && (
          currentUser && currentUser.role === 'employer' ? (
            <EmployerPortal
              currentCompany={currentCompany}
              jobs={jobs}
              applications={applications}
              onPostJob={handlePostJob}
              onUpdateApplicationStatus={handleUpdateApplicationStatus}
              onToggleJobStatus={handleToggleJobStatus}
            />
          ) : (
            <div className="max-w-xl mx-auto my-16 p-8 bg-white border border-slate-300 rounded text-center space-y-4">
              <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded">
                Yêu cầu đăng nhập
              </span>
              <h2 className="text-lg font-bold text-slate-900 font-['Outfit']">
                Khu vực dành cho Doanh nghiệp tuyển dụng
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Vui lòng đăng nhập với tài khoản doanh nghiệp đã được phê duyệt để quản lý hồ sơ ứng viên và đăng tin tuyển dụng.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className="px-5 py-2 bg-indigo-900 hover:bg-indigo-800 text-white rounded text-xs font-bold"
                >
                  Đến trang Đăng nhập
                </button>
              </div>
            </div>
          )
        )}

        {activeTab === 'lecturer_portal' && (
          currentUser && currentUser.role === 'lecturer' ? (
            <LecturerPortal
              currentLecturer={currentUser}
              internships={internships}
              companies={companies}
              onUpdateInternshipGrade={handleUpdateInternshipGrade}
            />
          ) : (
            <div className="max-w-xl mx-auto my-16 p-8 bg-white border border-slate-300 rounded text-center space-y-4">
              <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded">
                Yêu cầu đăng nhập
              </span>
              <h2 className="text-lg font-bold text-slate-900 font-['Outfit']">
                Khu vực dành cho Giảng viên hướng dẫn
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Vui lòng đăng nhập bằng tài khoản giảng viên Khoa CNTT được cấp để quản lý danh sách sinh viên thực tập theo lớp.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className="px-5 py-2 bg-indigo-900 hover:bg-indigo-800 text-white rounded text-xs font-bold"
                >
                  Đến trang Đăng nhập
                </button>
              </div>
            </div>
          )
        )}

        {activeTab === 'admin_portal' && (
          currentUser && currentUser.role === 'admin' ? (
            <AdminPortal
              companies={companies}
              jobs={jobs}
              applications={applications}
              internships={internships}
              events={events}
              news={news}
              auditLogs={auditLogs}
              student={student}
              users={users}
              onApproveCompany={handleApproveCompany}
              onRejectCompany={handleRejectCompany}
              onApproveJob={handleApproveJob}
              onRejectJob={handleRejectJob}
              onToggleUserStatus={handleToggleUserStatus}
              onCreateLecturerAccount={handleCreateLecturerAccount}
              onCreateCompanyAccount={handleCreateCompanyAccount}
              onUpdateCompanyStatus={handleUpdateCompanyStatus}
              onAddNews={handleCreateNews}
              onUpdateNews={handleUpdateNews}
              onDeleteNews={handleDeleteNews}
            />
          ) : (
            <div className="max-w-xl mx-auto my-16 p-8 bg-white border border-slate-300 rounded text-center space-y-4">
              <span className="inline-block px-3 py-1 bg-red-100 text-red-900 text-xs font-bold rounded">
                Truy cập bị hạn chế
              </span>
              <h2 className="text-lg font-bold text-slate-900 font-['Outfit']">
                Khu vực Quản trị Hệ thống Khoa CNTT
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Chức năng quản trị chỉ dành cho tài khoản Admin Khoa Công nghệ Thông tin - Trường Đại học Hải Phòng.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className="px-5 py-2 bg-indigo-900 hover:bg-indigo-800 text-white rounded text-xs font-bold"
                >
                  Đến trang Đăng nhập
                </button>
              </div>
            </div>
          )
        )}
          </>
        )}
      </main>

      {/* Clean Footer */}
      <Footer />

      {/* Modals without icons */}
      <JobDetailModal
        job={selectedJobForDetail}
        onClose={() => setSelectedJobForDetail(null)}
        onApply={(job) => setSelectedJobForApply(job)}
        hasAlreadyApplied={Boolean(
          selectedJobForDetail && applications.some(a => a.jobId === selectedJobForDetail.id && a.status !== 'withdrawn')
        )}
      />

      <ApplyModal
        job={selectedJobForApply}
        student={student}
        isOpen={Boolean(selectedJobForApply)}
        onClose={() => setSelectedJobForApply(null)}
        onSubmitApplication={handleSubmitApplication}
        isAlreadyApplied={Boolean(
          selectedJobForApply && applications.some(a => a.jobId === selectedJobForApply.id && a.status !== 'withdrawn')
        )}
      />

      <AICVReviewModal
        student={student}
        isOpen={isAICVModalOpen}
        onClose={() => setIsAICVModalOpen(false)}
      />

      <NotificationDrawer
        isOpen={isNotificationDrawerOpen}
        onClose={() => setIsNotificationDrawerOpen(false)}
        notifications={notifications}
        onMarkAsRead={(id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))}
        onMarkAllAsRead={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
        onActionClick={(tab) => tab && setActiveTab(tab)}
      />
    </div>
  );
}
