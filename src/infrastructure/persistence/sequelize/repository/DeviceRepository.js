import { BaseRepository } from './Repository.js';
import { Devices } from '../SequelizeIndex.js';
import { Device } from '../../../../domains/entities/Device.js'

export class DeviceRepository extends BaseRepository {
  constructor() {
    super(Devices, Device);
  }
}
