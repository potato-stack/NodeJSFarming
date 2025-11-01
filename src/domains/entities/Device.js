import { Entities } from './Entities.js';
import { Name } from '../value_objets/Name.js';
import { DeviceType } from '../value_objets/DeviceType.js';
import { DeviceStatus } from '../value_objets/DeviceStatus.js';
import { DeviceLocation } from '../value_objets/DeviceLocation.js';
import { DeviceError } from '../../errors/DeviceError.js';
import { v4 as uuidv4 } from 'uuid';

export class Device extends Entities {
  constructor(deviceProps) {
    super();
    this.id = deviceProps?.id ? deviceProps.id : uuidv4();
    this.garden_id = deviceProps?.garden_id ? deviceProps.garden_id : undefined;
    this.type = deviceProps?.type ? new DeviceType(deviceProps.type) : undefined;
    this.name = deviceProps?.name ? new Name(deviceProps.name) : undefined;
    this.location = deviceProps?.location ? new DeviceLocation(deviceProps.location) : undefined;
    this.status = deviceProps?.status ? new DeviceStatus(deviceProps.status) : undefined;
    this.createAt = deviceProps?.createAt ? deviceProps.createAt : undefined;
    this.updatedAt = deviceProps?.updatedAt ? deviceProps.updatedAt : undefined;
    if (this.garden_id === undefined)
      throw DeviceError.BadRequest('Device must belong to a garden !');
    if (this.id === undefined) throw DeviceError.DomainError('Device entity error - no id');
    if (this.type === undefined) throw DeviceError.DomainError('Device entity error - no type');
    if (this.name === undefined) this.name = Name('device' + Date.now());
    if (this.location === undefined)
      throw DeviceError.DomainError('Device entity error - no location');
  }
}
