import { cache } from 'react';
import { Device } from '../../../../domains/entities/Device';

export class DeviceRepositoryCaching {
  constructor(baseRepo, redisClient) {
    this.baseRepo = baseRepo;
    this.redisClient = redisClient;
  }
  // Method here must be a map 1:1 to repo.
  // Recommend using interface if code in Ts

  async getByID(id) {
    const key = `device:${id}`;
    const cached = await this.redisClient.hgetall(key);
    if (cache && Object.keys(cached).length) return new Device(JSON.parse(cached));

    // Update to Redis
    const device = await this.baseRepo.getByID(id);
    await this.redisClient.hset(key, JSON.stringify({ ...device }));
    const gardenKey = `garden:${device.garden_id}:devices`;
    await this.redisClient.sadd(gardenKey, id);
    return device;
  }

  async update(newEntity, where) {
    const id = where.id;
    const key = `device:${id}`;

    const cached = await this.redisClient.hgetall(key);

    let oldGardenId;
    if (cached && Object.keys(cached).length) {
      oldGardenId = cached.garden_id;
    } else {
      const deviceFromDB = await this.baseRepo.get(where);
      oldGardenId = deviceFromDB.garden_id;
    }

	const newGardenId = newEntity.garden_id ?? oldGardenId;

	const affectedCount = await this.baseRepo.update(newEntity, where);
    if (affectedCount === 0) return affectedCount;

	if (oldGardenId != newGardenId) {
		this.redisClient.srem(`arden:${oldGardenId}:devices`, where.id);
		this.redisClient.sadd(`arden:${newGardenId}:devices`, newEntity.id);
	}

	this.redisClient.hset(key, {...newEntity});
	return affectedCount;
  }

  async create(entity) {
    const device = await this.baseRepo.create(entity);

    const deviceKey = `device:${entity.id}`;
    await this.redisClient.del(deviceKey);
    return device;
  }
}
