'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import BottomNav from '../../components/BottomNav';
import {
    SentimentSatisfied,
    SentimentVerySatisfied,
    SentimentNeutral,
    SentimentVeryDissatisfied,
    Delete,
    CheckCircle,
} from '@mui/icons-material';

interface MoodEntry {
    id: number;
    date: string;
    mood: string;
    text: string;
}

const moodOptions = [
    {
        emoji: <SentimentVerySatisfied fontSize="inherit" className="text-yellow-400" />,
        value: 'happy',
    },
    {
        emoji: <SentimentSatisfied fontSize="inherit" className="text-green-400" />,
        value: 'good',
    },
    {
        emoji: <SentimentNeutral fontSize="inherit" className="text-blue-400" />,
        value: 'neutral',
    },
    {
        emoji: <SentimentVeryDissatisfied fontSize="inherit" className="text-red-400" />,
        value: 'sad',
    },
];

const MoodiPage = () => {
    const router = useRouter();
    const [mood, setMood] = useState<string>('happy');
    const [text, setText] = useState('');
    const [moods, setMoods] = useState<MoodEntry[]>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [isSelectMode, setIsSelectMode] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) router.push('/login');
    }, [router]);

    const handleSubmit = () => {
        if (!text) return alert('Bitte etwas schreiben!');
        const newEntry: MoodEntry = {
            id: Date.now(),
            date: new Date().toLocaleString(),
            mood,
            text,
        };
        setMoods([newEntry, ...moods]);
        setText('');
    };

    const toggleSelect = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((selId) => selId !== id) : [...prev, id]
        );
    };

    const deleteSelected = () => {
        if (!confirm('Einträge wirklich löschen?')) return;
        setMoods((prev) => prev.filter((entry) => !selectedIds.includes(entry.id)));
        setSelectedIds([]);
        setIsSelectMode(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-400 via-purple-500 to-blue-600 text-white p-4 pb-[100px]">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-white">MOODIIS</h1>
                <div
                    className="cursor-pointer"
                    onClick={() => router.push('/profile')}
                    title="Zum Profil"
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                        alt="Profil"
                        className="h-10 w-10 rounded-full border-2 border-white shadow"
                    />
                </div>
            </div>

            {/* Mood Eingabe */}
            <div className="bg-white text-black rounded-xl p-4 shadow mb-6">
                <p className="mb-2 font-semibold">Wie fühlst du dich?</p>
                <div className="flex justify-between mb-4 text-4xl">
                    {moodOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => setMood(option.value)}
                            className={`transition-all ${
                                mood === option.value ? 'scale-125' : 'opacity-50'
                            }`}
                        >
                            {option.emoji}
                        </button>
                    ))}
                </div>
                <textarea
                    className="w-full p-2 rounded border border-gray-300 mb-4"
                    rows={3}
                    placeholder="Möchtest du uns etwas mitteilen?"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button
                    onClick={handleSubmit}
                    className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded w-full"
                >
                    SUBMIT
                </button>
            </div>

            {/* Mood Verlauf */}
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-white font-bold text-lg">RECENT MOODIIS</h2>
                <button
                    onClick={() => {
                        if (isSelectMode) {
                            deleteSelected();
                        } else {
                            setIsSelectMode(true);
                        }
                    }}
                    className="text-sm px-3 py-1 bg-pink-500 rounded-full text-white font-bold flex items-center gap-1"
                >
                    {isSelectMode ? (
                        <>
                            <Delete fontSize="small" /> Löschen
                        </>
                    ) : (
                        <>
                            <CheckCircle fontSize="small" /> SELECT
                        </>
                    )}
                </button>
            </div>

            <div className="space-y-4">
                {moods.map((entry) => (
                    <div
                        key={entry.id}
                        className={`bg-white text-black rounded-xl shadow p-4 border-2 ${
                            selectedIds.includes(entry.id)
                                ? 'border-yellow-400'
                                : 'border-transparent'
                        }`}
                        onClick={() => isSelectMode && toggleSelect(entry.id)}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-gray-500">{entry.date}</span>
                            <span className="text-2xl">
                {moodOptions.find((m) => m.value === entry.mood)?.emoji}
              </span>
                        </div>
                        <p className="text-sm text-gray-700">{entry.text}</p>
                    </div>
                ))}
            </div>

            {/* Bottom Navigation */}
            <BottomNav />
        </div>
    );
};

export default MoodiPage;
