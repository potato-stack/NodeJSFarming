export class CreateGardenDto {
  constructor({name}) {
    this.name = name || '';
  }
}
export class GetGardenDto {
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
  constructor({ targetId, type, name, location, status }) {
    super({ type, name, location, status });
    this.id = targetId;
  }
}
