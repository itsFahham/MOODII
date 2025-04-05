import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';  // Stelle sicher, dass hier die richtige Dateiendung verwendet wird


const router = Router();
const SECRET: string = process.env.JWT_SECRET || 'supersecret';

// REGISTER
router.post('/register', async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const role = username === 'admin' ? 'admin' : 'user';

    try {
        const user = await User.create({ username, passwordHash, role });
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        res.status(400).json({ error: 'Username already exists' });
    }
});

// LOGIN
router.post('/login', async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        res.status(400).json({ error: 'Invalid credentials' });
        return;
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
        res.status(400).json({ error: 'Invalid credentials' });
        return;
    }

    const token = jwt.sign({ id: user._id, role: user.role }, SECRET, {
        expiresIn: '1h',
    });

    res.json({ token, username: user.username, role: user.role });
});

// GET /me
router.get('/me', async (req: Request, res: Response): Promise<void> => {
    const auth = req.headers.authorization;
    if (!auth) {
        res.status(401).json({ error: 'No token' });
        return;
    }

    const token = auth.split(' ')[1];
    try {
        const payload = jwt.verify(token, SECRET) as { id: string };
        const user = await User.findById(payload.id).select('-passwordHash');
        res.json(user);
    } catch {
        res.status(401).json({ error: 'Invalid token' });
    }
});

export default router;
