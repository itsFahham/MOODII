import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // <-- HINZUGEFÜGT
import authRoutes from './routes/auth';

// 🌱 .env Variablen laden
dotenv.config();

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
const MONGO_URI = process.env.MONGO_URI;

// 🔍 Prüfe, ob MongoDB URI vorhanden ist
if (!MONGO_URI) {
    console.error('❌ Umgebungsvariable MONGO_URI fehlt!');
    process.exit(1);
}

// 🛠 Middleware
app.use(cors()); // <-- HINZUGEFÜGT
app.use(express.json());

// 🌐 Routen
app.use('/api/auth', authRoutes);

// 🚀 Starte Server nach erfolgreicher Mongo-Verbindung
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ Verbindung zu MongoDB erfolgreich');
        app.listen(PORT, () => {
            console.log(`🚀 Server läuft unter: http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('❌ Fehler beim Verbinden mit MongoDB:', error);
        process.exit(1);
    });
