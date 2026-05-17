import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database';
import './models'; // טעינת כל המודלים והקשרים ביניהם מתיקיית המודלים

// ייבוא ה-Routes של המערכת
import userRoutes from './routes/userRoutes'; 
import categoryRoutes from './routes/categoryRoutes';
import subCategoryRoutes from './routes/subCategoryRoutes';
import courseRoutes from './routes/courseRoutes';
import promptRoutes from './routes/promptRoutes';

// טעינת משתני סביבה מקובץ .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// רישום ה-Endpoints של ה-API
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subCategoryRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/prompts', promptRoutes);

// פונקציה לסנכרון בסיס הנתונים והרמת השרת
const startServer = async () => {
  try {
    await sequelize.sync();
    console.log('Database connected successfully.');
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();