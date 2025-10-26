export class CreateGardenDto {
  constructor({ name }) {
    this.name = name || '';
  }
}

export class GardenInfoDto extends CreateGardenDto {
  constructor({ id, name, createdAt, updatedAt }) {
    super({ name });
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
export class updateGardenDto extends CreateGardenDto {
  constructor({ targetId, name }) {
    super({ name });
    this.targetId = targetId;
  }
}


