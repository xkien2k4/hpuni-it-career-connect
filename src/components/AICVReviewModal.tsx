import React, { useState } from 'react';
import { StudentProfile } from '../types/hpu';

interface AICVReviewModalProps {
  student: StudentProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const AICVReviewModal: React.FC<AICVReviewModalProps> = ({
  student,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const [targetRole, setTargetRole] = useState('Embedded C/C++ Developer (LG R&D)');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>({
    score: 92,
    summary: `Hồ sơ sinh viên Khoa CNTT - ĐH Hải Phòng có nền tảng học vấn vững vàng (GPA ${student.gpa}), lớp ${student.className} rất sát với tiêu chuẩn tuyển dụng thực tập sinh công nghệ tại Hải Phòng.`,
    strengths: [
      `Mã sinh viên ${student.studentCode} - Lớp ${student.className} chính quy HPUni với điểm GPA ${student.gpa} thuộc nhóm sinh viên Giỏi của Khoa.`,
      `Có ${student.projects.length} đồ án thực tế (${student.projects.map(p => p.name).join(', ')}) giải quyết bài toán cụ thể và có link demo/mã nguồn minh bạch.`,
      `Bộ kỹ năng cốt lõi (${student.skills.slice(0, 5).join(', ')}) hoàn toàn tương thích với các vị trí tuyển dụng của LG Electronics, FPT Software và Viettel Hải Phòng.`,
      `Đạt chứng chỉ ngoại ngữ và giải thưởng học thuật chuyên môn của Khoa CNTT.`
    ],
    improvements: [
      'Nên lượng hóa thêm kết quả đồ án: Bổ sung số liệu thực tế (VD: "Phục vụ 400+ sinh viên Khoa CNTT", "Tối ưu hóa thời gian truy vấn SQL nhanh hơn 40%").',
      'Làm nổi bật kỹ năng lập trình hướng đối tượng OOP và Clean Code trong phần mô tả bài tập lớn C/C++ / React.',
      'Ghi rõ thời gian có thể bắt đầu thực tập tốt nghiệp để HR doanh nghiệp sắp xếp cán bộ hướng dẫn kịp thời.'
    ],
    atsKeywords: [
      'Embedded C/C++', 'Linux Kernel', 'Data Structures', 'Algorithms', 'ReactJS', 'Node.js', 'PostgreSQL', 'Git Flow'
    ],
    samplePitch: `Em là ${student.fullName}, sinh viên lớp ${student.className} Khoa CNTT - Trường Đại học Hải Phòng (GPA ${student.gpa}). Với nền tảng lập trình vững vàng và kinh nghiệm thực chiến từ các đồ án khoa, em tự tin sẽ nhanh chóng hòa nhập và hoàn thành tốt nhiệm vụ tại doanh nghiệp.`
  });

  const handleReanalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        score: Math.min(96, Math.floor(Math.random() * 8) + 89),
        summary: `Đã đánh giá lại hồ sơ theo tiêu chuẩn tuyển dụng vị trí ${targetRole} tại các doanh nghiệp đối tác HPUni.`,
        strengths: [
          `Học vấn loại Giỏi tại Khoa CNTT Trường ĐH Hải Phòng.`,
          `Kỹ năng thực hành sát với yêu cầu thực tế của các doanh nghiệp tại KCN Tràng Duệ & Đình Vũ.`,
          `Ngoại ngữ tốt giúp dễ dàng đọc hiểu tài liệu kỹ thuật chuyên sâu.`
        ],
        improvements: [
          `Đối với vị trí ${targetRole}, nên bổ sung thêm chứng chỉ chuyên môn quốc tế nếu có.`,
          'Thêm liên kết GitHub cá nhân vào đầu CV để HR kiểm tra mã nguồn nhanh chóng.'
        ],
        atsKeywords: targetRole.includes('Embedded')
          ? ['C', 'C++', 'RTOS', 'Linux', 'Device Drivers', 'Microcontroller', 'Git']
          : ['React', 'TypeScript', 'State Management', 'REST API', 'Tailwind', 'Unit Test'],
        samplePitch: `Em là sinh viên lớp ${student.className} Khoa CNTT - ĐH Hải Phòng, mong muốn được đóng góp năng lực và tiếp tục phát triển chuyên sâu trong mảng ${targetRole}.`
      });
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 flex items-center justify-center p-4">
      <div className="bg-white rounded max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-300">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-start justify-between">
          <div>
            <span className="text-[11px] text-indigo-300 font-bold uppercase tracking-wider block mb-1">
              Khoa CNTT - ĐH Hải Phòng · Mô-đun AI
            </span>
            <h2 className="text-base font-bold font-['Outfit']">
              Trợ lý AI Đánh giá CV Sinh viên & Tối ưu ATS
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-bold text-slate-300 hover:text-white rounded border border-slate-700 hover:bg-slate-800"
          >
            Đóng
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-xs text-slate-700">
          {/* Target Role Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-slate-50 rounded border border-slate-300">
            <span className="font-bold text-slate-800">Vị trí mục tiêu muốn đánh giá:</span>
            <div className="flex items-center gap-2">
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="px-3 py-1.5 border border-slate-300 rounded bg-white text-xs font-bold text-slate-800"
              >
                <option value="Embedded C/C++ Developer (LG R&D)">Kỹ sư Phần mềm Nhúng Ô tô (LG R&D Hải Phòng)</option>
                <option value="Web Full-Stack Fresher (FPT Software)">Fresher Web Full-Stack (FPT Software Hải Phòng)</option>
                <option value="Network & Cyber Security (Viettel)">Kỹ sư Mạng & An ninh mạng (Viettel Hải Phòng)</option>
                <option value="QA / Software Tester (Pegatron)">Kỹ sư Kiểm thử Phần mềm (Pegatron Hải Phòng)</option>
              </select>
              <button
                type="button"
                onClick={handleReanalyze}
                disabled={isAnalyzing}
                className="px-3 py-1.5 bg-indigo-900 text-white rounded font-bold hover:bg-indigo-800 disabled:opacity-50 cursor-pointer whitespace-nowrap"
              >
                {isAnalyzing ? 'Đang phân tích...' : 'Phân tích lại'}
              </button>
            </div>
          </div>

          {/* Score & Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 bg-indigo-50/60 rounded border border-indigo-200 items-center">
            <div className="text-center sm:border-r sm:border-indigo-200 pr-2">
              <span className="text-[11px] font-bold text-indigo-900 block mb-0.5">Điểm tương thích</span>
              <span className="text-3xl font-bold font-mono text-indigo-900 tabular-nums">
                {analysisResult.score}/100
              </span>
              <span className="text-[10px] text-emerald-800 font-bold block mt-0.5">Xếp loại: Xuất sắc</span>
            </div>
            <div className="sm:col-span-3 text-slate-700 leading-relaxed text-xs">
              <strong className="text-slate-900 block mb-1">Nhận định chuyên môn:</strong>
              {analysisResult.summary}
            </div>
          </div>

          {/* Strengths */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Điểm mạnh nổi bật của sinh viên HPUni:
            </h3>
            <div className="space-y-1.5">
              {analysisResult.strengths.map((s: string, i: number) => (
                <div key={i} className="p-2.5 bg-emerald-50 rounded border border-emerald-200 text-emerald-950 font-medium">
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Improvements */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Gợi ý tối ưu để nâng cao tỷ lệ trúng tuyển:
            </h3>
            <div className="space-y-1.5">
              {analysisResult.improvements.map((imp: string, i: number) => (
                <div key={i} className="p-2.5 bg-amber-50 rounded border border-amber-300 text-amber-950 font-medium">
                  {imp}
                </div>
              ))}
            </div>
          </div>

          {/* ATS Keywords */}
          <div>
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2">
              Từ khóa chuẩn ATS nên đưa vào CV của bạn:
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {analysisResult.atsKeywords.map((kw: string, i: number) => (
                <span key={i} className="px-2.5 py-1 bg-slate-100 rounded text-slate-800 font-mono text-[11px] font-bold border border-slate-300">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Sample Pitch */}
          <div className="p-3.5 bg-slate-100 rounded border border-slate-300">
            <span className="font-bold text-slate-900 block mb-1 text-[11px] uppercase tracking-wider">
              Gợi ý câu mở đầu Cover Letter ấn tượng:
            </span>
            <p className="italic text-slate-700 leading-relaxed">
              "{analysisResult.samplePitch}"
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-300 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors cursor-pointer"
          >
            Đóng lại
          </button>
        </div>
      </div>
    </div>
  );
};
