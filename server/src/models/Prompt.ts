import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { SubCategory } from './SubCategory';
import { User } from './User';

interface PromptAttributes {
  id: number;
  title: string;
  content: string;
  subCategoryId: number;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type PromptCreationAttributes = Optional<PromptAttributes, 'id'>;

export class Prompt extends Model<PromptAttributes, PromptCreationAttributes> implements PromptAttributes {
  declare id: number;
  declare title: string;
  declare content: string;
  declare subCategoryId: number;
  declare userId: number;
}

Prompt.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    subCategoryId: { type: DataTypes.INTEGER, allowNull: false, references: { model: SubCategory, key: 'id' } },
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
  },
  { sequelize, tableName: 'prompts' }
);

SubCategory.hasMany(Prompt, { foreignKey: 'subCategoryId' });
Prompt.belongsTo(SubCategory, { foreignKey: 'subCategoryId' });

User.hasMany(Prompt, { foreignKey: 'userId' });
Prompt.belongsTo(User, { foreignKey: 'userId' });
