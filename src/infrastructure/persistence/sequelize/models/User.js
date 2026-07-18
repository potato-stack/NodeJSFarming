import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../../config/Database.js';

export class Users extends Model {}

Users.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // connect to sequlize from database config
    modelName: 'User',
    tableName: 'user',
    timestamps: true, // We need create/update date
  },
);
