import React, { useState } from 'react';
import { CareerEvent } from '../types/hpu';

interface EventsViewProps {
  events: CareerEvent[];
  onToggleRegister: (eventId: string) => void;
  currentStudentId?: string;
}

export const EventsView: React.FC<EventsViewProps> = ({ events, onToggleRegister, currentStudentId = 'stu-1' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredEvents = events.filter(e => {
    if (selectedCategory === 'all') return true;
    return e.type === selectedCategory;
  });

  const handleRegisterClick = (event: CareerEvent) => {
    const isRegistered = event.registeredStudentIds.includes(currentStudentId);
    onToggleRegister(event.id);
    if (!isRegistered) {
      setToastMessage('Đã đăng ký tham gia sự kiện thành công! Vé mời điện tử đã được ghi nhận.');
    } else {
      setToastMessage('Đã hủy đăng ký sự kiện.');
    }
    setTimeout(() => setToastMessage(null), 3000);
  };

  const getEventTypeLabel = (type: CareerEvent['type']) => {
    switch (type) {
      case 'job_fair':
        return 'Ngày hội Việc làm (Job Fair)';
      case 'workshop':
        return 'Workshop Kỹ thuật';
      case 'company_tour':
        return 'Tham quan Doanh nghiệp (Tour)';
      case 'interview_day':
        return 'Phỏng vấn Trực tiếp';
      case 'competition':
        return 'Cuộc thi Chuyên môn';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded shadow-lg border border-slate-700 text-xs font-bold">
          [Thông báo] {toastMessage}
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-white border border-slate-300 rounded p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-indigo-900 font-bold block mb-1">
            Khoa CNTT – Trường Đại học Hải Phòng
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit']">
            Sự kiện Hướng nghiệp, Job Fair & Hoạt động Doanh nghiệp 2026
          </h1>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl">
            Gặp gỡ trực tiếp nhà tuyển dụng tại khuôn viên Trường ĐH Hải Phòng, tham gia các buổi chia sẻ công nghệ và đăng ký chuyến xe tham quan thực tế tại các KCN Hải Phòng.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded text-xs overflow-x-auto self-start md:self-auto">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded font-bold cursor-pointer whitespace-nowrap ${
              selectedCategory === 'all' ? 'bg-indigo-900 text-white' : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            Tất cả sự kiện
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('job_fair')}
            className={`px-3 py-1.5 rounded font-bold cursor-pointer whitespace-nowrap ${
              selectedCategory === 'job_fair' ? 'bg-indigo-900 text-white' : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            Job Fair
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('workshop')}
            className={`px-3 py-1.5 rounded font-bold cursor-pointer whitespace-nowrap ${
              selectedCategory === 'workshop' ? 'bg-indigo-900 text-white' : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            Workshop
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('company_tour')}
            className={`px-3 py-1.5 rounded font-bold cursor-pointer whitespace-nowrap ${
              selectedCategory === 'company_tour' ? 'bg-indigo-900 text-white' : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            Company Tour
          </button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map(event => {
          const isRegistered = event.registeredStudentIds.includes(currentStudentId);

          return (
            <div
              key={event.id}
              className="bg-white border border-slate-300 rounded p-6 hover:border-slate-400 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-100 text-xs">
                  <span className="font-bold text-indigo-900">
                    {getEventTypeLabel(event.type)}
                  </span>
                  <span className="text-slate-600 font-medium">
                    Đơn vị tổ chức: {event.organizer}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 font-['Outfit'] leading-snug mb-2">
                  {event.title}
                </h3>

                <div className="space-y-1 text-xs text-slate-700 mb-3">
                  <div>
                    Thời gian: <strong className="text-slate-900">{event.date} ({event.time})</strong>
                  </div>
                  <div>
                    Địa điểm: <strong className="text-slate-900">{event.location}</strong>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {event.description}
                </p>

                {/* Highlights list */}
                <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs space-y-1 mb-3">
                  <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">
                    Điểm nổi bật:
                  </span>
                  {event.highlights.map((item, idx) => (
                    <div key={idx} className="text-slate-700">
                      - {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="text-slate-600">
                  Đã đăng ký: <strong className="font-mono text-slate-900">{event.registeredCount}</strong> / {event.maxAttendees} chỗ
                </div>

                <button
                  type="button"
                  onClick={() => handleRegisterClick(event)}
                  className={`px-4 py-2 text-xs font-bold rounded transition-colors cursor-pointer ${
                    isRegistered
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 hover:bg-emerald-200'
                      : 'bg-indigo-900 text-white hover:bg-indigo-800'
                  }`}
                >
                  {isRegistered ? 'Đã nhận vé (Hủy vé)' : 'Đăng ký tham gia miễn phí'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
