import { DeviceRepository } from '../infrastructure/repository/DeviceRepository.js';
import { DeviceError } from '../errors/DeviceError.js';
import { HandleServerError } from '../errors/ServerError.js';
import { Device } from '../domains/entities/Device.js';
import { DeviceInfoDto, updateDeviceDto } from '../dtos/Device.dto.js';

const deviceRepository = new DeviceRepository();

export class TelemetryServices {
  createDevice = async (createDeviceDto) => {
    try {
      const device = new Device(createDeviceDto);
      return await deviceRepository.create(device);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') throw DeviceError.Conflict();
      HandleServerError(error);
    }
  };

  getDeviceByID = async (GetDeviceDto) => {
    try {
      const id = GetDeviceDto.id;
      const device = await deviceRepository.getByID(id);
      if (!device) {
        throw DeviceError.NotFound(`Device with ID ${id} not found`);
      }
      return new DeviceInfoDto(device);
    } catch (error) {
      HandleServerError(error);
    }
  };

  getAllDevices = async () => {
    try {
      const devices = await deviceRepository.get();
      return devices.map((r) => new DeviceInfoDto(r));
    } catch (error) {
      HandleServerError(error);
    }
  };

  updateDevice = async (UpdateDeviceDto) => {
    try {
      const device = new Device(UpdateDeviceDto);
      const targetId = UpdateDeviceDto.targetId;
      const affectedCount = await deviceRepository.update(device, {id: targetId});
      if (affectedCount === 0) {
        throw DeviceError.NotFound(`Device with ID ${targetId} not found`);
      }
      return { status: 'success', message: `Device with ID ${targetId} updated successfully` };
    } catch (error) {
      HandleServerError(error);
    }
  };

  deleteDevice = async (id) => {
    try {
      const affectedCount = await deviceRepository.delete({id: id});

      if (affectedCount === 0) {
        throw DeviceError.NotFound();
      }
      return { status: 'success', message: `Device of id: ${id} is deleted sucessfully` };
    } catch (error) {
      HandleServerError(error);
    }
  };
}
