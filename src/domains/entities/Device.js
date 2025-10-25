import { Name } from '../value_objets/Name.js';
import { DeviceType } from '../value_objets/DeviceType.js';
import { DeviceStatus } from '../value_objets/DeviceStatus.js';
import { DeviceLocation } from '../value_objets/DeviceLocation.js';
import { DeviceError } from '../../errors/DeviceError.js';

export class Device {
  constructor(deviceProps) {
    try {
      this.type = deviceProps?.type ? new DeviceType(deviceProps.type).value : undefined;
      this.name = deviceProps?.name ? new Name(deviceProps.name).value : undefined;
      this.location = deviceProps?.location
        ? new DeviceLocation(deviceProps.location).value
        : undefined;
      this.status = deviceProps?.status
        ? new DeviceStatus(deviceProps.status).value
        : undefined;
    this.createAt = deviceProps?.createAt ? deviceProps.createAt : undefined;
    this.updatedAt = deviceProps?.updatedAt ? deviceProps.updatedAt : undefined;
    } catch (error) {
      throw DeviceError.Validation(error);
    }
  }
}
