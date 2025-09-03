import { TelemetryDevices } from './sequelize/Device';
import { Device } from '../domains/DeviceModel';

export class deviceRepository {
  getByID = async (id) => {
    const device = await TelemetryDevices.findByPk(id);
    if (!device) return null;
    return new Device(device);
  };

  getAll = async (where) => {
    const devices = await Telemetrydevices.findAll(
      Object.keys(where).length > 0 ? { where } : undefined,
    );
    if (devices.length === 0) return null;
    return devices.map((device) => new Device(device));
  };

  create = async (device) => {
    const newDevice = await TelemetryDevices.create({ ...device });
    return new Device(newDevice);
  };

  updateDevice = async (newDevice, where) => {
    const [affectedCount] = await TelemetryDevices.update(newDevice, { where });
    return affectedCount > 0;
  };

  deleteDevice = async (where) => {
    const affectedCount = await TelemetryDevices.destroy({ where });
    return affectedCount > 0;
  };
}
