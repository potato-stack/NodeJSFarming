import { Entities } from './Entities.js';
import { Name } from '../value_objets/Name.js';
import { DeviceType } from '../value_objets/DeviceType.js';
import { DeviceStatus } from '../value_objets/DeviceStatus.js';
import { DeviceLocation } from '../value_objets/DeviceLocation.js';
import { DeviceError } from '../../errors/DeviceError.js';

export class Device extends Entities{
  constructor(deviceProps) {
    try {
      super();
      this.type = deviceProps?.type ? new DeviceType(deviceProps.type) : undefined;
      this.name = deviceProps?.name ? new Name(deviceProps.name) : undefined;
      this.location = deviceProps?.location
        ? new DeviceLocation(deviceProps.location)
        : undefined;
      this.status = deviceProps?.status
        ? new DeviceStatus(deviceProps.status)
        : undefined;
    this.createAt = deviceProps?.createAt ? deviceProps.createAt : undefined;
    this.updatedAt = deviceProps?.updatedAt ? deviceProps.updatedAt : undefined;
    } catch (error) {
      throw DeviceError.Validation(error);
    }
  }

}
