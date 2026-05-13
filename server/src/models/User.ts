import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface UserAttributes {
  id: number;
  name: string;
  phone: string; // שיניתי ל-string כי מספרי טלפון יכולים להתחיל ב-0
  email: string;
  passwordHash: string;
  role: 'admin' | 'user';
  createdAt?: Date;
  updatedAt?: Date;
}

type UserCreationAttributes = Optional<UserAttributes, 'id' | 'role' | 'phone'>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  declare id: number;
  declare name: string;
  declare phone: string; // <-- זה מה שהיה חסר!
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
    phone: { type: DataTypes.STRING, allowNull: true }, 
  },
  { sequelize, tableName: 'users' }
);