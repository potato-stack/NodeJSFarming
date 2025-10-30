export class CreateDeviceDto {
  constructor({ type, name, location, status, garden_id }) {
    this.garden_id = garden_id;
    this.type = type;
    this.name = name || '';
    this.location = location || 'unknown';
    this.status = status || 'unknown'; // online/offline/unknown
  }
}
export class GetDeviceDto {
  // Only used for practice, this is purely unecessary
  constructor({ id }) {
    this.id = id;
  }
}
export class DeviceInfoDto extends CreateDeviceDto {
  constructor({ id, type, name, location, status, createAt, updatedAt }) {
    super({ type, name, location, status });
    this.id = id;
    this.createAt = createAt;
    this.updatedAt = updatedAt;
  }
}
export class updateDeviceDto extends CreateDeviceDto {
  constructor({ device_id, garden_id, type, name, location, status }) {
    super({ type, name, location, status, garden_id });
    this.targetId = device_id;
  }
}
