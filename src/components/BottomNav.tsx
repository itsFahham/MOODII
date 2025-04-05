'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Home as HomeIcon,
    AccountCircle,
    Newspaper,
} from '@mui/icons-material';

const BottomNav = () => {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 w-full bg-white shadow-lg flex justify-around py-2 z-50">
            <Link href="/news">
                <div className={`flex flex-col items-center ${pathname === '/news' ? 'text-pink-500' : 'text-gray-600'}`}>
                    <Newspaper />
                    <span className="text-xs">News</span>
                </div>
            </Link>
            <Link href="/">
                <div className={`flex flex-col items-center ${pathname === '/' ? 'text-pink-500' : 'text-gray-600'}`}>
                    <HomeIcon />
                    <span className="text-xs">Home</span>
                </div>
            </Link>
            <Link href="/profile">
                <div className={`flex flex-col items-center ${pathname === '/profile' ? 'text-pink-500' : 'text-gray-600'}`}>
                    <AccountCircle />
                    <span className="text-xs">Profil</span>
                </div>
            </Link>
        </nav>
    );
};

export default BottomNav;
