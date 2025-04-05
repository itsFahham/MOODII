import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface LoginPageProps {
    onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password,
            });

            // Speichere den JWT-Token und User-Daten im localStorage
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', res.data.username);
            localStorage.setItem('role', res.data.role);

            alert('Login erfolgreich! 👋');

            // Informiere App.tsx über erfolgreichen Login
            onLogin();
        } catch (error: any) {
            if (error.response) {
                alert('Login fehlgeschlagen: ' + error.response.data.error);
            } else {
                alert('Netzwerkfehler: ' + error.message);
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-b from-pink-400 to-purple-600">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
                <h2 className="text-2xl font-bold mb-4">Willkommen zurück 👋</h2>
                <input
                    type="text"
                    placeholder="Benutzername"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border p-2 rounded w-full mb-4"
                />
                <input
                    type="password"
                    placeholder="Passwort"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 rounded w-full mb-4"
                />
                <button
                    onClick={handleLogin}
                    className="bg-indigo-600 text-white font-bold py-2 px-4 rounded w-full hover:bg-indigo-700"
                >
                    Einloggen
                </button>
                <p className="mt-4">
                    Noch kein Konto?{' '}
                    <span
                        className="text-pink-500 cursor-pointer"
                        onClick={() => navigate('/register')}
                    >
                        Jetzt registrieren
                    </span>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
