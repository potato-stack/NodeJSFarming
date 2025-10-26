export class GardenUserDto {
  constructor({ garden_id, user_id }) {
    this.garden_id = garden_id;
    this.user_id = user_id;
  }
}

export class UserGardenRelationDto extends GardenUserDto {
  constructor({ garden_id, user_id, role }) {
    super({ garden_id, user_id });
    this.role = role;
  }
}

export class RemoveUserFromGardenDto extends GardenUserDto {
  constructor({ garden_id, user_id }) {
    super({ garden_id, user_id });
  }
}

export class AddUserToGardenDto extends UserGardenRelationDto {
  constructor({ garden_id, user_id, role }) {
    super({ garden_id, user_id, role });
  }
}

export class UpdateUserRoleDto extends UserGardenRelationDto {
  constructor({ garden_id, user_id, role }) {
    super({ garden_id, user_id, role });
  }
}

export class GetUserOfGardenDto extends GardenUserDto {
  constructor({ garden_id, user_id }) {
    super({ garden_id, user_id });
  }
}
