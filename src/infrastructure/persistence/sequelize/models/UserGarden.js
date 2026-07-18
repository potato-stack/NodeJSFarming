import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../../config/Database.js';

export class UserGardens extends Model { }

UserGardens.init(
  {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    garden_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Garden',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    role: {
      type: DataTypes.ENUM('owner', 'member', 'guest'),
      allowNull: false,
      defaultValue: 'guest',
    },
  },
  {
    sequelize, // connect to sequlize from database config
    modelName: 'UserGardens',
    tableName: 'user_gardens',
    timestamps: false, // We need create/update date
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'garden_id'], // ensures one user-garden pair only once
      },
    ],
  },
);
