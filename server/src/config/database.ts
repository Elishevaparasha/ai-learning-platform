import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// אם הוא לא מוצא את המשתנה ב-env, הוא ישתמש בכתובת המקומית של XAMPP כברירת מחדל
const dbUrl = process.env.DATABASE_URL || 'mysql://root:@localhost:3306/ai_learning';

const sequelize = new Sequelize(dbUrl, {
  dialect: 'mysql',
  logging: false,
});

export default sequelize;