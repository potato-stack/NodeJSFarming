import { DeviceRepository } from '../infrastructure/repository/DeviceRepository.js';
import { DeviceError } from '../errors/DeviceError.js';
import { Device } from '../domains/entities/Device.js';
import { DeviceInfoDto } from '../dtos/Device.dto.js';

const deviceRepository = new DeviceRepository();

export class TelemetryServices {
  createDevice = async (createDeviceDto) => {
    const device = new Device(createDeviceDto);
    return await deviceRepository.create(device);
  };

  getDeviceByID = async (id) => {
    const device = await deviceRepository.getByID(id);
    if (!device) {
      throw DeviceError.NotFound(`Device with ID ${id} not found`);
    }
    return new DeviceInfoDto(device);
  };

  getAllDevices = async () => {
    const devices = await deviceRepository.get();
    return devices.map((r) => new DeviceInfoDto(r));
  };

  updateDevice = async (UpdateDeviceDto) => {
    const device = new Device(UpdateDeviceDto);
    const id = UpdateDeviceDto.id;
    const affectedCount = await deviceRepository.update(device, { id: id });
    if (affectedCount === 0) {
      throw DeviceError.NotFound(`Device with ID ${id} not found`);
    }
    return { status: 'success', message: `Device with ID ${id} updated successfully` };
  };

  deleteDevice = async (id) => {
    const affectedCount = await deviceRepository.delete({ id: id });

    if (affectedCount === 0) {
      throw DeviceError.NotFound();
    }
    return { status: 'success', message: `Device of id: ${id} is deleted sucessfully` };
  };

  static instance = null;

  static getInstance() {
    if (!TelemetryServices.instance) {
      TelemetryServices.instance = new TelemetryServices();
    }
    return TelemetryServices.instance;
  }
}
