import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';

// --- פונקציית הרשמה (Register) ---
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, phone, email, passwordHash } = req.body;

    // בדיקה שכל השדות הגיעו
    if (!name || !email || !passwordHash) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    // הצפנת הסיסמה
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(passwordHash, salt);

    // יצירת המשתמש במסד הנתונים
    const newUser = await User.create({ 
      name, 
      phone, 
      email, 
      passwordHash: encryptedPassword 
    });

    return res.status(201).json({
      message: 'User created successfully',
      user: { id: newUser.id, name: newUser.name, email: newUser.email }
    });

  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// --- פונקציית התחברות (Login) ---
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // חיפוש המשתמש
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // השוואת סיסמה רגילה להאש השמור
    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.status(200).json({
      message: 'Login successful',
      user: { id: user.id, name: user.name, email: user.email }
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};