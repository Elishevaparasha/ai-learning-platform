import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { Category } from './Category';

interface SubCategoryAttributes {
  id: number;
  name: string;
  description?: string;
  categoryId: number;
}

type SubCategoryCreationAttributes = Optional<SubCategoryAttributes, 'id'>;

export class SubCategory extends Model<SubCategoryAttributes, SubCategoryCreationAttributes> implements SubCategoryAttributes {
  declare id: number;
  declare name: string;
  declare description: string;
  declare categoryId: number;
}

SubCategory.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    categoryId: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      references: {
        model: Category, // החזרנו למודל ישירות, זה עובד טוב יותר עם הגדרת הקשר למטה
        key: 'id'
      }
    },
  },
  { sequelize, tableName: 'sub_categories' }
);

// הגדרת הקשרים בצורה המפורשת והנקייה ביותר
Category.hasMany(SubCategory, { foreignKey: 'categoryId', as: 'subCategories' });
SubCategory.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

export default SubCategory;