export class CreateGardenDto {
  constructor({ name }) {
    this.name = name || '';
  }
}

export class GardensUserQueryDto {
  constructor({ garden_id, user_id }) {
    this.garden_id = garden_id;
    this.user_id = user_id || null;
  }
}

export class GardenInfoDto extends CreateGardenDto {
  constructor({ id, name, createAt, updatedAt }) {
    super({ name });
    this.id = id;
    this.createAt = createAt;
    this.updatedAt = updatedAt;
  }
}
export class updateGardenDto extends CreateGardenDto {
  constructor({ targetId, name }) {
    super({ name });
    this.targetId = targetId;
  }
}

export class GardensOfUserResponseDto extends GardenInfoDto {
  constructor({ id, name, createAt, updatedAt, role }) {
    super({ id, name, createAt, updatedAt });
    this.role = role;
  }
}
