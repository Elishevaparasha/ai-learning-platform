import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { SubCategory } from './SubCategory';

interface CourseAttributes {
  id: number;
  title: string;
  description?: string;
  price: number;
  subCategoryId: number;
}

type CourseCreationAttributes = Optional<CourseAttributes, 'id'>;

export class Course extends Model<CourseAttributes, CourseCreationAttributes> implements CourseAttributes {
  declare id: number;
  declare title: string;
  declare description: string;
  declare price: number;
  declare subCategoryId: number;
}

Course.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0.00 },
    subCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SubCategory, // הפנייה ישירה למודל הילד
        key: 'id'
      }
    },
  },
  { sequelize, tableName: 'courses' }
);

// הגדרת הקשרים בצורה המפורשת
SubCategory.hasMany(Course, { foreignKey: 'subCategoryId', as: 'courses' });
Course.belongsTo(SubCategory, { foreignKey: 'subCategoryId', as: 'subCategory' });

export default Course;