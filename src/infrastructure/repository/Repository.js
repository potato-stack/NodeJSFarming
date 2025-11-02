import { sequelize } from '../../config/Database.js';
import { ServerError } from '../../errors/ServerError.js';
export class BaseRepository {
  constructor(model, DomainClass) {
    this.model = model;
    this.DomainClass = DomainClass;
  }

  async getByID(id) {
    try {
      const record = await this.model.findByPk(id);
      return record ? new this.DomainClass(record) : null;
    } catch (error) {
      throw ServerError.InfraError(`Cannot get entity with ${id}`);
    }
  }

  async get(where = {}) {
    try {
      const records = await this.model.findAll(
        Object.keys(where).length > 0 ? { where } : undefined,
      );
      return records.length ? records.map((r) => new this.DomainClass(r)) : null;
    } catch (error) {
      throw ServerError.InfraError(`Cannot get entity with ${error}`);
    }
  }

  async create(entity) {
    try {
      await sequelize.sync();
      const payload = Object.fromEntries(
        Object.entries(entity.value()).filter(([_, v]) => v !== undefined),
      );
      const record = await this.model.create(payload);
      return new this.DomainClass(record);
    } catch (error) {
      throw ServerError.InfraError(`Cannot create entity ${entity} with error ${error}`);
    }
  }

  async update(newEntity, where) {
    try {
      const payload = Object.fromEntries(
        Object.entries(newEntity.value()).filter(([_, v]) => v !== undefined),
      );
      const [affectedCount] = await this.model.update(payload, { where });
      return affectedCount > 0;
    } catch (error) {
      throw ServerError.InfraError(`Cannot update entity with error ${error}`);
    }
  }

  async delete(where) {
    try {
      const affectedCount = await this.model.destroy({ where });
      return affectedCount > 0;
    } catch (error) {
      throw ServerError.InfraError(`Cannot delete entity with error ${error}`);
    }
  }
}
