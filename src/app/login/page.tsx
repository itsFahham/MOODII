'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
    BookmarkAdd,
    Bookmark,
    AddCircle,
    AccountCircle,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import BottomNav from '../../components/BottomNav';

interface NewsItem {
    id: number;
    title: string;
    description: string;
    date: string;
    tag: string;
    image?: string;
}

const dummyNews: NewsItem[] = [
    {
        id: 1,
        title: 'NEUER MITARBEITER MANUELLSON',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at velit maximus.',
        date: '2025-04-05',
        tag: '#news',
        image: 'https://images.unsplash.com/photo-1603415526960-f8f61e02fdb4?auto=format&fit=crop&w=300&q=80',
    },
    {
        id: 2,
        title: 'UPDATE FÜR MOODIIS SYSTEM',
        description:
            'System-Update erfolgreich durchgeführt. Neue Features verfügbar.',
        date: '2025-04-06',
        tag: '#update',
        image: 'https://images.unsplash.com/photo-1581091870622-2c61c7aa6ad9?auto=format&fit=crop&w=300&q=80',
    },
    {
        id: 3,
        title: '🎉 TEAM-EVENT GEPLANT!',
        description:
            'Nächsten Freitag feiern wir unser Sommerfest – Essen, Musik und Spaß!',
        date: '2025-04-07',
        tag: '#event',
        image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=300&q=80',
    },
];

const NewsPage: React.FC = () => {
    const [selectedTag, setSelectedTag] = useState<string>('Alle');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [savedIds, setSavedIds] = useState<number[]>([]);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const [showSavedOnly, setShowSavedOnly] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        const saved = localStorage.getItem('savedNews');
        if (saved) {
            setSavedIds(JSON.parse(saved));
        }

        const role = localStorage.getItem('userRole');
        setIsAdmin(role === 'admin');
    }, [router]);

    const toggleSave = (id: number) => {
        const updated = savedIds.includes(id)
            ? savedIds.filter((savedId) => savedId !== id)
            : [...savedIds, id];
        setSavedIds(updated);
        localStorage.setItem('savedNews', JSON.stringify(updated));
    };

    const filteredNews = useMemo(() => {
        return dummyNews.filter((item) => {
            const matchesTag =
                selectedTag === 'Alle' ||
                item.tag.toLowerCase().includes(selectedTag.toLowerCase());
            const matchesSearch =
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase());
            const isSaved = savedIds.includes(item.id);
            return matchesTag && matchesSearch && (!showSavedOnly || isSaved);
        });
    }, [selectedTag, searchQuery, savedIds, showSavedOnly]);

    const tags = ['Alle', 'news', 'update', 'event'];

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-400 via-purple-500 to-blue-600 text-white p-4 pb-[100px]">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                    <AccountCircle className="text-white" fontSize="large" />
                    <h1 className="text-2xl font-bold">NEWSII</h1>
                </div>
                {isAdmin && (
                    <AddCircle className="text-white cursor-pointer" fontSize="large" />
                )}
            </div>

            {/* Search Input */}
            <input
                type="text"
                placeholder="search"
                className="w-full p-2 rounded text-black mb-4 border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Tags + Bookmark Filter */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2 flex-wrap">
                    {tags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`px-3 py-1 rounded-full text-xs ${
                                selectedTag === tag
                                    ? 'bg-white text-black font-bold'
                                    : 'bg-orange-300 text-white'
                            }`}
                        >
                            #{tag}
                        </button>
                    ))}
                </div>
                <button onClick={() => setShowSavedOnly(!showSavedOnly)}>
                    <Bookmark
                        className={`${
                            showSavedOnly ? 'text-yellow-400' : 'text-white opacity-50'
                        }`}
                    />
                </button>
            </div>

            {/* News List */}
            <div className="space-y-4">
                {filteredNews.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white text-black rounded-xl shadow-lg p-4"
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <div className="flex gap-1 flex-wrap mb-1">
                  <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                    {item.tag.toUpperCase()}
                  </span>
                                </div>
                                <span className="text-sm text-gray-500">{item.date}</span>
                                <h2 className="font-bold mt-1 text-lg">{item.title}</h2>
                                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                            </div>
                            <div className="ml-4 text-right">
                                {item.image && (
                                    <img
                                        src={item.image}
                                        alt="News"
                                        loading="lazy"
                                        className="w-16 h-16 object-cover rounded cursor-pointer"
                                        onClick={() => setActiveImage(item.image ?? '')}
                                    />
                                )}
                                <button
                                    onClick={() => toggleSave(item.id)}
                                    className="mt-2"
                                    title="Merken"
                                >
                                    {savedIds.includes(item.id) ? (
                                        <Bookmark className="text-yellow-400" />
                                    ) : (
                                        <BookmarkAdd className="text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Image Modal */}
            {activeImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                    onClick={() => setActiveImage(null)}
                >
                    <img
                        src={activeImage}
                        alt="Zoom"
                        className="max-w-full max-h-full rounded-lg shadow-xl"
                    />
                </div>
            )}

            {/* Bottom Navigation */}
            <BottomNav />
        </div>
    );
};

export default NewsPage;
