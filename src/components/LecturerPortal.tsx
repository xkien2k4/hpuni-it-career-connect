import React, { useState } from 'react';
import { InternshipRecord, Company, User } from '../types/hpu';

interface LecturerPortalProps {
  currentLecturer: User;
  internships: InternshipRecord[];
  companies: Company[];
  onUpdateInternshipGrade: (internshipId: string, score: number) => void;
}

export const LecturerPortal: React.FC<LecturerPortalProps> = ({
  currentLecturer,
  internships,
  companies,
  onUpdateInternshipGrade
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'interns' | 'partners'>('interns');
  const [searchQuery, setSearchQuery] = useState('');
  const [gradingModal, setGradingModal] = useState<InternshipRecord | null>(null);
  const [scoreInput, setScoreInput] = useState<number>(9.0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredInternships = internships.filter(item =>
    item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.studentCode.includes(searchQuery) ||
    item.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.className.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradingModal) return;
    onUpdateInternshipGrade(gradingModal.id, Number(scoreInput));
    setToastMessage(`Đã cập nhật điểm đánh giá thực tập cho sinh viên ${gradingModal.studentName}: ${scoreInput}/10`);
    setGradingModal(null);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded shadow-lg border border-slate-700 text-xs font-bold">
          [Thông báo] {toastMessage}
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-wider text-indigo-300 font-bold block mb-1">
            Khoa Công nghệ Thông tin – Trường Đại học Hải Phòng
          </span>
          <h1 className="text-xl sm:text-2xl font-bold font-['Outfit']">
            Cổng Giảng viên Hướng dẫn Thực tập Tốt nghiệp
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Cán bộ hướng dẫn: <strong className="text-white">{currentLecturer.fullName}</strong> · Mã GV: {currentLecturer.lecturerCode} · Phụ trách lớp: {currentLecturer.assignedClasses?.join(', ') || 'ĐH CNTT K22A, ĐH CNTT K22B'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-800 rounded border border-slate-700 text-center">
            <span className="text-slate-400 block text-[11px]">Sinh viên hướng dẫn</span>
            <strong className="text-lg font-mono text-indigo-300 font-bold">{internships.length} SV</strong>
          </div>
          <div className="p-3 bg-slate-800 rounded border border-slate-700 text-center">
            <span className="text-slate-400 block text-[11px]">Đã có nơi thực tập</span>
            <strong className="text-lg font-mono text-emerald-300 font-bold">100%</strong>
          </div>
        </div>
      </div>

      {/* Sub tabs */}
      <div className="flex items-center gap-2 border-b border-slate-300 pb-1 text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveSubTab('interns')}
          className={`px-4 py-2 rounded ${
            activeSubTab === 'interns' ? 'bg-indigo-900 text-white' : 'text-slate-700 hover:bg-slate-200'
          }`}
        >
          Sinh viên thực tập tốt nghiệp theo Lớp ({internships.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('partners')}
          className={`px-4 py-2 rounded ${
            activeSubTab === 'partners' ? 'bg-indigo-900 text-white' : 'text-slate-700 hover:bg-slate-200'
          }`}
        >
          Doanh nghiệp đối tác tiếp nhận ({companies.filter(c => c.isPartner).length})
        </button>
      </div>

      {activeSubTab === 'interns' ? (
        <div className="bg-white border border-slate-300 rounded p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
            <input
              type="text"
              placeholder="Tìm theo tên SV, mã SV, lớp, công ty..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full sm:w-80 px-3 py-1.5 border border-slate-300 rounded text-xs bg-slate-50"
            />
            <span className="text-xs text-slate-500 font-medium">
              Theo dõi tiến độ và chấm điểm thực tập tốt nghiệp Khóa 22
            </span>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
                <tr>
                  <th className="p-3">Sinh viên (Họ tên & MSSV)</th>
                  <th className="p-3">Lớp học</th>
                  <th className="p-3">Đơn vị tiếp nhận thực tập</th>
                  <th className="p-3">Vị trí & Mentor công ty</th>
                  <th className="p-3">Thời gian thực tập</th>
                  <th className="p-3 text-center">Dấu mộc</th>
                  <th className="p-3 text-right">Điểm đánh giá</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredInternships.map(intern => (
                  <tr key={intern.id} className="hover:bg-slate-50">
                    <td className="p-3">
                      <strong className="text-slate-900 block">{intern.studentName}</strong>
                      <span className="text-[11px] text-slate-500 font-mono">Mã: {intern.studentCode}</span>
                    </td>

                    <td className="p-3 font-bold text-indigo-900">
                      {intern.className}
                    </td>

                    <td className="p-3 font-semibold text-slate-800">
                      {intern.companyName}
                    </td>

                    <td className="p-3">
                      <span className="text-slate-800 block font-medium">{intern.position}</span>
                      <span className="text-[11px] text-slate-500">Mentor: {intern.companyMentor}</span>
                    </td>

                    <td className="p-3 font-mono text-slate-600 text-[11px]">
                      {intern.startDate} - {intern.endDate}
                    </td>

                    <td className="p-3 text-center">
                      {intern.stampConfirmed ? (
                        <span className="text-emerald-800 font-bold text-[11px]">
                          Đã có mộc
                        </span>
                      ) : (
                        <span className="text-amber-800 text-[11px] font-bold">Chờ đóng mộc</span>
                      )}
                    </td>

                    <td className="p-3 text-right">
                      {intern.evaluationScore ? (
                        <button
                          type="button"
                          onClick={() => {
                            setGradingModal(intern);
                            setScoreInput(intern.evaluationScore || 9.0);
                          }}
                          className="font-bold font-mono text-indigo-900 hover:underline cursor-pointer"
                        >
                          {intern.evaluationScore} / 10
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setGradingModal(intern);
                            setScoreInput(8.5);
                          }}
                          className="px-2.5 py-1 text-xs font-bold text-indigo-900 bg-indigo-50 hover:bg-indigo-100 rounded border border-indigo-200 cursor-pointer"
                        >
                          Chấm điểm
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Partners subtab */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {companies.map(comp => (
            <div key={comp.id} className="bg-white border border-slate-300 rounded p-4 space-y-2">
              <div className="border-b border-slate-200 pb-2">
                <h4 className="font-bold text-sm text-slate-900">{comp.name}</h4>
                <span className="text-xs text-indigo-900 font-bold">{comp.industry}</span>
              </div>
              <p className="text-xs text-slate-600 line-clamp-2">{comp.description}</p>
              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                Địa chỉ: {comp.address}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Grading Modal */}
      {gradingModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white rounded max-w-sm w-full p-6 shadow-xl border border-slate-300 space-y-4 text-xs">
            <div className="border-b border-slate-200 pb-2">
              <h3 className="text-base font-bold text-slate-900">
                Chấm điểm Thực tập Tốt nghiệp
              </h3>
              <p className="text-xs text-slate-500">
                Sinh viên: <strong>{gradingModal.studentName}</strong> ({gradingModal.className})
              </p>
            </div>

            <form onSubmit={handleSaveGrade} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Điểm đánh giá (Thang điểm 10):
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  required
                  value={scoreInput}
                  onChange={e => setScoreInput(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded font-mono font-bold text-sm bg-white"
                />
              </div>

              <div className="text-[11px] text-slate-500">
                Điểm số này sẽ được chuyển về Văn phòng Khoa CNTT phục vụ xét tư cách bảo vệ đồ án tốt nghiệp.
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setGradingModal(null)}
                  className="px-3 py-1.5 border border-slate-300 rounded font-bold text-slate-700"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-900 text-white rounded font-bold hover:bg-indigo-800"
                >
                  Lưu điểm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
