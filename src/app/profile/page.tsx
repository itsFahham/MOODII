'use client';

import { useRouter } from 'next/navigation';
import BottomNav from '../../components/BottomNav';
import { useRef, useState } from 'react';

const ProfilePage = () => {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [profileImg, setProfileImg] = useState(
        'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
    );

    const handleLogout = () => {
        localStorage.clear();
        router.push('/login');
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            if (reader.result) {
                setProfileImg(reader.result as string);
                // Optional: hier kannst du das Bild später an den Server senden
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-400 to-purple-700 text-white pb-24">
            <h1 className="text-3xl font-bold mb-6">MOODIIS</h1>

            <div className="relative">
                <img
                    src={profileImg}
                    alt="Profil"
                    className="h-28 w-28 rounded-full object-cover border-4 border-white"
                />
                <button
                    title="Profilbild ändern"
                    className="absolute bottom-1 right-1 bg-white p-1 rounded-full"
                    onClick={handleImageClick}
                >
                    ✏️
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>

            <button
                onClick={handleLogout}
                className="bg-pink-500 hover:bg-pink-600 mt-6 px-6 py-2 rounded-lg font-bold text-white"
            >
                Logout
            </button>

            <BottomNav />
        </div>
    );
};

export default ProfilePage;
