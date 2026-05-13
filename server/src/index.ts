import express from 'express';
import cors from 'cors';
import sequelize from './config/database';
import './models'; // זה מפעיל את הקשרים שהגדרנו קודם

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await sequelize.sync({ force: false }); // מחבר ומסנכרן את הטבלאות
    console.log('Database connected successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();