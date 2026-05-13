import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
interface UserAttributes {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'user';
  createdAt?: Date;
  updatedAt?: Date;
}

type UserCreationAttributes = Optional<UserAttributes, 'id' | 'role'>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  declare id: number;
  declare name: string;
  declare email: string;
  declare passwordHash: string;
  declare role: 'admin' | 'user';
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('admin', 'user'), defaultValue: 'user' },
  },
  { sequelize, tableName: 'users' }
);
