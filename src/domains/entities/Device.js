import { Name } from '../value_objets/Name.js';
import { DeviceType } from '../value_objets/DeviceType.js';
import { DeviceStatus } from '../value_objets/DeviceStatus.js';
import { DeviceLocation } from '../value_objets/DeviceLocation.js';
import { DeviceError } from '../../errors/DeviceError.js';

export class Device {
  constructor(createDeviceDto) {
    try {
      this.type = new DeviceType(createDeviceDto.type).value; 
      this.name = new Name(createDeviceDto.name).value;
      this.location = new DeviceLocation(createDeviceDto.location).value;
      this.status = new DeviceStatus(createDeviceDto.status).value;
    } catch (error) {
      throw DeviceError.Validation(error);
    }
  }
}
