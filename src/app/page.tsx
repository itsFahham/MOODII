'use client';

import { useState } from 'react';
import NewsPage from './news/page';
import Page from './profile/page';

export default function Home() {
  const [page, setPage] = useState<'news' | 'profile'>('news');

  return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 to-purple-700 text-white p-6">
        {/* Navigation */}
        <nav className="flex justify-center gap-6 mb-8">
          <button
              className={`px-4 py-2 rounded-full font-semibold transition ${
                  page === 'news'
                      ? 'bg-white text-pink-600 shadow-md'
                      : 'bg-pink-600 hover:bg-pink-700'
              }`}
              onClick={() => setPage('news')}
          >
            📰 News
          </button>
          <button
              className={`px-4 py-2 rounded-full font-semibold transition ${
                  page === 'profile'
                      ? 'bg-white text-pink-600 shadow-md'
                      : 'bg-pink-600 hover:bg-pink-700'
              }`}
              onClick={() => setPage('profile')}
          >
            👤 Profil
          </button>
        </nav>

        {/* Page Content */}
        <main>
          {page === 'news' ? <NewsPage /> : <Page />}
        </main>
      </div>
  );
}
