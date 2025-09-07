import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../config/Database.js';

export class Garden extends Model {}

Garden.init(
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
  },
  {
	sequelize, // connect to sequlize from database config
	modelName: 'Garden',
	tableName: 'garden',
	timestamps: true, // We need create/update date
  },
);
