import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../config/Database.js';

export class TelemetryDevices extends Model {}

TelemetryDevices.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    garden_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'garden',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    type: {
      type: DataTypes.ENUM('actuator', 'sensor'),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('online', 'offline', 'unknown'),
      defaultValue: 'unknown',
    },
  },
  {
    sequelize, // connect to sequlize from database config
    modelName: 'TelemetryDevice',
    tableName: 'telemetry_devices',
    timestamps: true, // We need create/update date
  },
);
