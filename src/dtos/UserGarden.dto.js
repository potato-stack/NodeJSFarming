export class GardenUserDto {
  constructor({ garden_id, user_id }) {
    this.garden_id = garden_id;
    this.user_id = user_id;
  }
}

export class RemoveUserFromGardenDto extends GardenUserDto {
  constructor({ garden_id, user_id }) {
    super({ garden_id, user_id });
  }
}

export class GetUserOfGardenDto extends GardenUserDto {
  constructor({ garden_id, user_id }) {
    super({ garden_id, user_id });
  }
}

//

export class GardenUserRelationDto extends GardenUserDto {
  constructor({ garden_id, user_id, role }) {
    super({ garden_id, user_id });
    this.role = role;
  }
}

export class AddUserToGardenDto extends GardenUserRelationDto {
  constructor({ garden_id, user_id, role }) {
    super({ garden_id, user_id, role });
  }
}

export class UpdateUserRoleDto extends GardenUserRelationDto {
  constructor({ garden_id, user_id, role }) {
    super({ garden_id, user_id, role });
  }
}


