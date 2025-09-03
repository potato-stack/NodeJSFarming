import { BaseRepository } from './Repository.js';
import { TelemetryDevices } from '../persistence/sequelize/Device.js';
import { Device } from '../../domains/entities/Device.js'

export class DeviceRepository extends BaseRepository {
  constructor() {
    super(TelemetryDevices, Device);
  }
}
