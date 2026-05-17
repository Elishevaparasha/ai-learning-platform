import express from 'express';
import cors from 'cors';
import sequelize from './config/database';
import './models'; 
import userRoutes from './routes/userRoutes'; 
import categoryRoutes from './routes/categoryRoutes';
import subCategoryRoutes from './routes/subCategoryRoutes';
import promptRoutes from './routes/promptRoutes';
import './models/User';
import './models/Category'; 
import './models/SubCategory';
import './models/Course';
import courseRoutes from './routes/courseRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subCategoryRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/prompts', promptRoutes);

const startServer = async () => {
  try {
await sequelize.sync();
    console.log('Database connected successfully.');
    app.listen(5000, () => console.log('Server is running on port 5000'));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};


startServer();