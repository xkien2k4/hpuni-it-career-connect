import React, { useState } from 'react';
import { NewsArticle } from '../types/hpu';

interface NewsViewProps {
  news: NewsArticle[];
}

export const NewsView: React.FC<NewsViewProps> = ({ news }) => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredNews = news.filter(n => {
    if (filterCategory === 'all') return true;
    return n.category === filterCategory;
  });

  const getCategoryLabel = (category: NewsArticle['category']) => {
    switch (category) {
      case 'cooperation': return 'Hợp tác Doanh nghiệp';
      case 'internship': return 'Thực tập Tốt nghiệp';
      case 'career_guide': return 'Cẩm nang Nghề nghiệp';
      case 'announcement': return 'Thông báo chung';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-300 rounded p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-indigo-900 font-bold block mb-1">
            Khoa CNTT – Trường Đại học Hải Phòng
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit']">
            Tin tức & Hoạt động Hợp tác Doanh nghiệp
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Cập nhật các chương trình ký kết MOU, học bổng doanh nghiệp và thông báo thực tập mới nhất từ Văn phòng Khoa.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded text-xs overflow-x-auto self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1.5 rounded font-bold cursor-pointer whitespace-nowrap ${
              filterCategory === 'all' ? 'bg-indigo-900 text-white' : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            Tất cả
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('cooperation')}
            className={`px-3 py-1.5 rounded font-bold cursor-pointer whitespace-nowrap ${
              filterCategory === 'cooperation' ? 'bg-indigo-900 text-white' : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            Hợp tác MOU
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('internship')}
            className={`px-3 py-1.5 rounded font-bold cursor-pointer whitespace-nowrap ${
              filterCategory === 'internship' ? 'bg-indigo-900 text-white' : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            Kế hoạch Thực tập
          </button>
          <button
            type="button"
            onClick={() => setFilterCategory('career_guide')}
            className={`px-3 py-1.5 rounded font-bold cursor-pointer whitespace-nowrap ${
              filterCategory === 'career_guide' ? 'bg-indigo-900 text-white' : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            Hướng nghiệp
          </button>
        </div>
      </div>

      {selectedArticle ? (
        /* Article detail view */
        <div className="bg-white border border-slate-300 rounded p-6 sm:p-8 space-y-4">
          <button
            type="button"
            onClick={() => setSelectedArticle(null)}
            className="text-xs text-indigo-900 hover:underline cursor-pointer font-bold mb-2"
          >
            ← Quay lại danh sách bài viết
          </button>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200">
              {getCategoryLabel(selectedArticle.category)}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit'] leading-snug">
            {selectedArticle.title}
          </h1>

          <div className="flex items-center gap-4 text-xs text-slate-500 pb-4 border-b border-slate-200">
            <span>Tác giả: <strong>{selectedArticle.author}</strong></span>
            <span>·</span>
            <span>Ngày đăng: <strong className="font-mono">{selectedArticle.publishDate}</strong></span>
          </div>

          <div className="text-sm text-slate-800 leading-relaxed space-y-3 pt-2">
            <p className="font-semibold text-slate-900 leading-relaxed">
              {selectedArticle.excerpt}
            </p>
            <p className="leading-relaxed">
              {selectedArticle.content}
            </p>
          </div>
        </div>
      ) : (
        /* Articles Grid */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredNews.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedArticle(item)}
              className="bg-white border border-slate-300 rounded p-6 hover:border-slate-400 transition-all flex flex-col justify-between cursor-pointer space-y-3"
            >
              <div>
                <span className="text-[11px] font-bold text-indigo-900 uppercase tracking-wider block mb-1">
                  {getCategoryLabel(item.category)}
                </span>
                <h3 className="font-bold text-sm text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mt-2">
                  {item.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>{item.author}</span>
                <span className="font-mono">{item.publishDate}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
