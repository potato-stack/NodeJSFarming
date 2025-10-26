import { sequelize } from '../../config/Database.js';
export class BaseRepository {
  constructor(model, DomainClass) {
    this.model = model;
    this.DomainClass = DomainClass;
  }

  async getByID(id) {
    const record = await this.model.findByPk(id);
    return record ? new this.DomainClass(record) : null;
  }

  async get(where = {}) {
    const records = await this.model.findAll(Object.keys(where).length > 0 ? { where } : undefined);
    return records.length ? records.map((r) => new this.DomainClass(r)) : null;
  }

  async create(entity) {
    await sequelize.sync();
    const payload = Object.fromEntries(
      Object.entries(entity.value()).filter(([_, v]) => v !== undefined),
    );
    const record = await this.model.create(payload);
    return new this.DomainClass(record);
  }

  async update(newEntity, where) {
    const payload = Object.fromEntries(
      Object.entries(newEntity.value()).filter(([_, v]) => v !== undefined),
    );
    const [affectedCount] = await this.model.update(payload, { where });
    return affectedCount > 0;
  }

  async delete(where) {
    const affectedCount = await this.model.destroy({where});
    return affectedCount > 0;
  }
}
