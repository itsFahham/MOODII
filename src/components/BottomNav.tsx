'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Newspaper,
    EmojiEmotions,
    ChatBubbleOutline,
} from '@mui/icons-material';

const BottomNav = () => {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 w-full bg-white shadow-lg flex justify-around items-center py-2 z-50 rounded-t-3xl">
            {/* Linke Seite: MOODI */}
            <Link href="/moodi">
                <div
                    className={`flex flex-col items-center ${
                        pathname === '/moodi' ? 'text-pink-500' : 'text-gray-600'
                    }`}
                >
                    <EmojiEmotions fontSize="large" />
                    <span className="text-xs font-semibold">MOODI</span>
                </div>
            </Link>

            {/* Mitte: NEWSII */}
            <Link href="/news">
                <div
                    className={`flex flex-col items-center ${
                        pathname === '/news' ? 'text-pink-500' : 'text-gray-600'
                    }`}
                >
                    <Newspaper fontSize="large" />
                    <span className="text-xs font-bold">NEWSII</span>
                </div>
            </Link>

            {/* Rechte Seite: SOCIAL */}
            <Link href="/social">
                <div
                    className={`flex flex-col items-center ${
                        pathname === '/social' ? 'text-pink-500' : 'text-gray-600'
                    }`}
                >
                    <ChatBubbleOutline fontSize="large" />
                    <span className="text-xs font-semibold">SOCIAL</span>
                </div>
            </Link>
        </nav>
    );
};

export default BottomNav;
