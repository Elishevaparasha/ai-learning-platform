import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// --- פונקציית הרשמה (Register) ---
export const registerUser = async (req: Request, res: Response) => {
  try {
    // הדפסה לטרמינל כדי שנוכל לראות מה מגיע בזמן אמת
    console.log('--- Register Body Received: ---', req.body);

    // תמיכה רחבה: בודק גם אם שלחת password וגם אם שלחת passwordHash
    const { name, phone, email, password, passwordHash, role } = req.body;
    const finalPassword = password || passwordHash;

    // בדיקה שכל השדות הגיעו
    if (!name || !email || !finalPassword) {
      return res.status(400).json({ 
        message: 'Name, email and password are required',
        received: { name, email, hasPassword: !!finalPassword }
      });
    }

    // בדיקה האם המשתמש כבר קיים
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // הצפנת הסיסמה
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(finalPassword, salt);

    // יצירת המשתמש במסד הנתונים
    const newUser = await User.create({ 
      name, 
      phone, 
      email, 
      passwordHash: encryptedPassword,
      role: role || 'admin' // נגדיר כ-admin כברירת מחדל כדי להקל על הבדיקות שלך!
    });

    return res.status(201).json({
      message: 'User created successfully',
      user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role }
    });

  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Internal server error', error: String(error) });
  }
};

// --- פונקציית התחברות (Login) ---
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password, passwordHash } = req.body;
    const finalPassword = password || passwordHash;

    if (!email || !finalPassword) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // חיפוש המשתמש
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // השוואת סיסמה
    const isMatch = await bcrypt.compare(finalPassword, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // יצירת ה-JWT Token המיוחל למעבר שומרי הסף!
    const token = jwt.sign(
      { id: user.id, role: user.role || 'admin' },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};