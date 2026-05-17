import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// הגדרת הרחבה ל-Request של Express כדי שנוכל לשמור עליו את פרטי המשתמש המחובר
export interface AuthRequest extends Request {
  user?: {
    id: number;
    role: string;
  };
}

// פונקציית הגנה: בודקת שהמשתמש מחובר (יש לו Token בתוקף)
export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
  // שולפים את ה-Token מתוך כותרות הבקשה (Headers)
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    // מפענחים ובודקים את ה-Token באמצעות המפתח הסודי שלנו
    jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret', (err, decoded: any) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
      }

      // אם ה-Token תקין, שומרים את נתוני המשתמש על ה-Request וממשיכים הלאה
      req.user = { id: decoded.id, role: decoded.role };
      return next();
    });
  } else {
    // אם לא נשלח Token בכלל
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
};

// פונקציית הגנה נוספת: בודקת שהמשתמש הוא אשכרה אדמין (Admin)
export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    return next(); // המשתמש אדמין? מצוין, תמשיך לפונקציה הבאה!
  }
  
  return res.status(403).json({ message: 'Require Admin Role!' });
};