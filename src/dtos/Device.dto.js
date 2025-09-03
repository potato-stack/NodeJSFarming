export class CreateDeviceDto {
  constructor({ id, type, name, location, status }) {
    this.id = id;
    this.type = type;
    this.name = name || '';
    this.location = location || 'unknown';
    this.status = status || 'unknown'; // online/offline/unknown
  }
}
export class GetDeviceDto {
  // Only used for practice, this is purelly unecessary
  constructor({ id }) {
    this.id = id;
  }
}
export class DeviceInfoDto extends CreateDeviceDto {
  constructor({ id, type, name, location, status, createAt, updatedAt }) {
    super({ id, type, name, location, status });
    this.createAt = createAt;
    this.updatedAt = updatedAt;
  }
}
