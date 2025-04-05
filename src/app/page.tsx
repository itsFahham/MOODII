'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            router.push('/news'); // ✅ Weiterleitung falls eingeloggt
        } else {
            router.push('/login'); // Falls nicht eingeloggt
        }
    }, [router]);

    return null; // zeigt nichts, da direkt redirect
};

export default HomePage;
