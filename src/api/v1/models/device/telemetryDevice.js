import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../../config/database.js";

export class TelemetryDevices extends Model { }

TelemetryDevices.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
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
    }

);