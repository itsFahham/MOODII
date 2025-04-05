import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', {
                username,
                password,
            });

            alert('Registrierung erfolgreich 🎉');
            navigate('/login');
        } catch (error: any) {
            alert('Fehler bei Registrierung: ' + (error.response?.data?.error || 'Unbekannt'));
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-b from-pink-400 to-purple-600">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
                <h2 className="text-2xl font-bold mb-4">Neues Konto erstellen ✨</h2>
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
                    onClick={handleRegister}
                    className="bg-green-500 text-white font-bold py-2 px-4 rounded w-full hover:bg-green-600"
                >
                    Registrieren
                </button>
                <p className="mt-4">
                    Bereits registriert?{' '}
                    <span
                        className="text-pink-500 cursor-pointer"
                        onClick={() => navigate('/login')}
                    >
            Zum Login
          </span>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
