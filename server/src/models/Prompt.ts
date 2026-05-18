import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { Category } from './Category';
import { SubCategory } from './SubCategory';
import { User } from './User';

interface PromptAttributes {
  id: number;
  userId: number;
  categoryId: number;
  subCategoryId: number;
  prompt: string;
  response: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type PromptCreationAttributes = Optional<PromptAttributes, 'id'>;

export class Prompt extends Model<PromptAttributes, PromptCreationAttributes> implements PromptAttributes {
  declare id: number;
  declare userId: number;
  declare categoryId: number;
  declare subCategoryId: number;
  declare prompt: string;
  declare response: string;
}

Prompt.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    categoryId: { type: DataTypes.INTEGER, allowNull: false },
    subCategoryId: { type: DataTypes.INTEGER, allowNull: false },
    prompt: { type: DataTypes.TEXT, allowNull: false },
    response: { type: DataTypes.TEXT, allowNull: false },
  },
  { sequelize, tableName: 'prompts' }
);

User.hasMany(Prompt, { foreignKey: 'userId', as: 'Prompts' });
Prompt.belongsTo(User, { foreignKey: 'userId', as: 'User' });

Category.hasMany(Prompt, { foreignKey: 'categoryId', as: 'Prompts' });
Prompt.belongsTo(Category, { foreignKey: 'categoryId', as: 'Category' });

SubCategory.hasMany(Prompt, { foreignKey: 'subCategoryId', as: 'Prompts' });
Prompt.belongsTo(SubCategory, { foreignKey: 'subCategoryId', as: 'SubCategory' });
