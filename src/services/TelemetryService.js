import { DeviceRepository } from '../infrastructure/repository/DeviceRepository.js';
import { DeviceError } from '../errors/DeviceError.js';
import { HandleServerError } from '../errors/ServerError.js';
import { Device } from '../domains/entities/Device.js';

const deviceRepository = new DeviceRepository();

export class TelemetryServices {
  async createDevice(createDeviceDto) {
    try {
      const device = new Device(createDeviceDto);
      return await deviceRepository.create(device);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') throw DeviceError.Conflict();
      HandleServerError(error);
    }
  }

  async getDeviceByID(GetDeviceDto) {
    try {
      const id = GetDeviceDto.id;
      const device = await deviceRepository.getByID(id);
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
      const devices = await deviceRepository.get();
      if (!devices) {
        throw DeviceError.NotFound('No devices found');
      }
      return devices;
    } catch (error) {
      HandleServerError(error);
    }
  }

  async updateDevice(props) {
    try {
      const device = new Device(props);
      const [affectedCount] = await deviceRepository.update(device);
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
      const affectedCount = await deviceRepository.delete(id);

      if (affectedCount === 0) {
        throw DeviceError.NotFound();
      }
      return { status: 'success', message: `Device of id: ${id} is deleted sucessfully` };
    } catch (error) {
      HandleServerError(error);
    }
  }
}
