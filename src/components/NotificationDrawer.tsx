import React from 'react';
import { InAppNotification } from '../types/hpu';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: InAppNotification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onActionClick: (actionTab?: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onActionClick
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col border-l border-slate-300">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 text-sm font-['Outfit']">
              Thông báo Hệ thống
            </h3>
            <span className="text-xs px-2 py-0.5 rounded bg-indigo-50 text-indigo-900 font-bold font-mono border border-indigo-200">
              {notifications.filter(n => !n.read).length} mới
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onMarkAllAsRead}
              className="text-[11px] text-indigo-900 hover:underline font-bold cursor-pointer"
            >
              Đánh dấu tất cả đã đọc
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-2 py-1 text-xs font-bold text-slate-600 hover:text-slate-900 rounded border border-slate-300"
            >
              Đóng
            </button>
          </div>
        </div>

        {/* List of notifications */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              Không có thông báo mới.
            </div>
          ) : (
            notifications.map(n => (
              <div
                key={n.id}
                onClick={() => {
                  onMarkAsRead(n.id);
                  if (n.actionTab) {
                    onActionClick(n.actionTab);
                    onClose();
                  }
                }}
                className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer text-xs space-y-1.5 ${
                  !n.read ? 'bg-indigo-50/50' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className={`font-bold leading-snug ${!n.read ? 'text-indigo-900' : 'text-slate-800'}`}>
                    {n.title}
                  </h4>
                  {!n.read && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 bg-indigo-700 text-white rounded shrink-0">
                      Mới
                    </span>
                  )}
                </div>

                <p className="text-slate-600 text-xs leading-relaxed">
                  {n.message}
                </p>

                <div className="text-[11px] text-slate-400 font-mono tabular-nums pt-1">
                  {n.createdAt}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
