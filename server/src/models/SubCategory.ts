import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { Category } from './Category';

interface SubCategoryAttributes {
  id: number;
  name: string;
  categoryId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type SubCategoryCreationAttributes = Optional<SubCategoryAttributes, 'id'>;

export class SubCategory extends Model<SubCategoryAttributes, SubCategoryCreationAttributes> implements SubCategoryAttributes {
  declare id: number;
  declare name: string;
  declare categoryId: number;
}

SubCategory.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    categoryId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Category, key: 'id' } },
  },
  { sequelize, tableName: 'sub_categories' }
);

Category.hasMany(SubCategory, { foreignKey: 'categoryId' });
SubCategory.belongsTo(Category, { foreignKey: 'categoryId' });
