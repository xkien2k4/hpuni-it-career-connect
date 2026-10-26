import React, { useState } from 'react';
import { Job, StudentProfile } from '../types/hpu';

interface ApplyModalProps {
  job: Job | null;
  student: StudentProfile;
  isOpen: boolean;
  onClose: () => void;
  onSubmitApplication: (applicationData: {
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
  }) => void;
  isAlreadyApplied: boolean;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  job,
  student,
  isOpen,
  onClose,
  onSubmitApplication,
  isAlreadyApplied
}) => {
  if (!isOpen || !job) return null;

  const [studentName, setStudentName] = useState(student.fullName);
  const [studentCode, setStudentCode] = useState(student.studentCode);
  const [studentClass, setStudentClass] = useState(student.className);
  const [studentGpa, setStudentGpa] = useState(student.gpa);
  const [studentEmail, setStudentEmail] = useState(student.email);
  const [studentPhone, setStudentPhone] = useState(student.phone);
  const [coverLetter, setCoverLetter] = useState(
    `Kính gửi Ban Tuyển dụng ${job.companyName},\n\nEm là ${student.fullName}, sinh viên lớp ${student.className} Khoa CNTT - Trường Đại học Hải Phòng. Em rất quan tâm đến vị trí ${job.title} và mong muốn có cơ hội được thực tập, học hỏi kinh nghiệm thực tế cũng như đóng góp cho công ty.\n\nTrân trọng cảm ơn quý công ty!`
  );
  const [selectedCV, setSelectedCV] = useState<string>(student.cvFileName || 'CV_NguyenMinhHoang_HPUni.pdf');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAlreadyApplied) return;

    setIsSubmitting(true);

    setTimeout(() => {
      onSubmitApplication({
        jobId: job.id,
        jobTitle: job.title,
        companyId: job.companyId,
        companyName: job.companyName,
        companyLocation: job.location,
        studentName,
        studentCode,
        studentClass,
        studentMajor: '',
        studentGpa,
        studentEmail,
        studentPhone,
        coverLetter,
        cvFileName: selectedCV
      });
      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1400);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 flex items-center justify-center p-4">
      <div className="bg-white rounded max-w-xl w-full shadow-2xl border border-slate-300 overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-900 text-white p-5 flex items-start justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-indigo-200 uppercase tracking-wider block mb-1">
              Khoa CNTT - ĐH Hải Phòng · Nộp đơn ứng tuyển
            </span>
            <h2 className="text-base font-bold text-white font-['Outfit'] leading-snug">
              {job.title}
            </h2>
            <p className="text-xs text-indigo-100 mt-1">
              Đơn vị tiếp nhận: {job.companyName} · {job.location}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-bold text-indigo-200 hover:text-white rounded border border-indigo-700 hover:bg-indigo-800 transition-colors"
          >
            Đóng
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded">
              THÀNH CÔNG
            </span>
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
              Nộp đơn Ứng tuyển thành công!
            </h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              Hồ sơ sinh viên của bạn đã được chuyển tới Ban Tuyển dụng của {job.companyName}. Bạn có thể theo dõi tiến độ xét duyệt tại mục "Đơn đã ứng tuyển".
            </p>
          </div>
        ) : isAlreadyApplied ? (
          <div className="p-8 text-center space-y-3">
            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded">
              ĐÃ NỘP HỒ SƠ
            </span>
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
              Bạn đã nộp đơn vào vị trí này
            </h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              Theo quy chế tuyển dụng của Khoa CNTT, mỗi sinh viên chỉ nộp 1 hồ sơ hoạt động cho mỗi tin tuyển dụng để nhà tuyển dụng thuận tiện quản lý.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 px-4 py-2 bg-slate-900 text-white rounded text-xs font-bold"
            >
              Đóng lại
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            {/* Student Info Group */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Họ và tên sinh viên (*)
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded text-xs bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Mã số sinh viên (MSSV) (*)
                </label>
                <input
                  type="text"
                  required
                  value={studentCode}
                  onChange={(e) => setStudentCode(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded text-xs font-mono bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Lớp sinh hoạt Khoa CNTT (*)
                </label>
                <input
                  type="text"
                  required
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded text-xs font-bold text-indigo-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Điểm trung bình tích lũy (GPA) (*)
                </label>
                <input
                  type="text"
                  required
                  placeholder="3.65"
                  value={studentGpa}
                  onChange={(e) => setStudentGpa(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded text-xs font-mono font-bold bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Số điện thoại (*)
                </label>
                <input
                  type="text"
                  required
                  value={studentPhone}
                  onChange={(e) => setStudentPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded text-xs font-mono bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Email sinh viên HPUni (*)
                </label>
                <input
                  type="email"
                  required
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded text-xs font-mono bg-white"
                />
              </div>
            </div>

            {/* CV Selector */}
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Tệp CV ứng tuyển đính kèm (*)
              </label>
              <div className="p-3 border border-indigo-200 bg-indigo-50/40 rounded flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block text-xs">
                    [Tệp PDF]: {selectedCV}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Tệp CV tải từ hồ sơ sinh viên HPUni
                  </span>
                </div>
                <label className="cursor-pointer text-[11px] font-bold text-indigo-900 bg-white px-2.5 py-1 rounded border border-indigo-300">
                  Đổi tệp
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setSelectedCV(e.target.files[0].name);
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Cover letter */}
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Thư giới thiệu bản thân / Cover Letter
              </label>
              <textarea
                rows={3}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded text-xs leading-relaxed bg-white"
              ></textarea>
            </div>

            {/* Submit buttons */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 text-xs font-bold text-white bg-indigo-900 hover:bg-indigo-800 disabled:opacity-50 rounded transition-colors cursor-pointer"
              >
                {isSubmitting ? 'Đang nộp hồ sơ...' : 'Xác nhận Nộp đơn'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
