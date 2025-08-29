import { TelemetryDevices } from '../models/DeviceModel.js';
import { DeviceError } from '../errors/DeviceError.js';
import { HandleServerError } from '../errors/ServerError.js';

export class TelemetryServices {
  async createDevice(props) {
    try {
      const device = await TelemetryDevices.create({ ...props });
      return device;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') throw DeviceError.Conflict();
      HandleServerError(error);
    }
  }

  async getDeviceByID(id) {
    try {
      const device = await TelemetryDevices.findByPk(id);
      if (!device) {
        throw DeviceError.NotFound(`Device with ID ${id} not found`);
      }
      return device;
    } catch (error) {
      HandleServerError(error);
    }
  }

  async getAllDevices() {
    try {
      const devices = await TelemetryDevices.findAll();
      if (devices.length === 0) {
        throw DeviceError.NotFound('No devices found');
      }
      return devices;
    } catch (error) {
      HandleServerError(error);
    }
  }

  async updateDevice(id, props) {
    try {
      const [affectedCount] = await TelemetryDevices.update(id, { ...props });
      if (affectedCount === 0) {
        throw DeviceError.NotFound(`Device with ID ${id} not found`);
      }
      return { status: 'success', message: `Device with ID ${id} updated successfully` };
    } catch (error) {
      HandleServerError(error);
    }
  }

  async deleteDevice(id) {
    try {
      const affectedCount = await TelemetryDevices.destroy({ where: { id } });

      if (affectedCount === 0) {
        throw DeviceError.NotFound();
      }
      return { status: 'success', message: `Device of id: ${id} is deleted sucessfully` };
    } catch (error) {
      HandleServerError(error);
    }
  }
}
