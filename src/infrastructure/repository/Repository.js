import { sequelize } from '../../config/Database.js';
export class BaseRepository {
  constructor(model, DomainClass) {
    this.model = model;
    this.DomainClass = DomainClass;
  }

  getByID  = async (id) => {
    const record = await this.model.findByPk(id);
    return record ? new this.DomainClass(record) : null;
  }

  get = async (where = {}) => {
    const records = await this.model.findAll(Object.keys(where).length > 0 ? { where } : undefined);
    return records.length ? records.map((r) => new this.DomainClass(r)) : null;
  }

  create = async (entity) => {
    await sequelize.sync({ force: true });
    const record = await this.model.create({ ...entity });
    return new this.DomainClass(record);
  }

  update = async (newEntity, where) => {
    const payload = Object.fromEntries(Object.entries(newEntity).filter(([_, v]) => v !== undefined));
    const [affectedCount] = await this.model.update(payload, { where: { where } });
    return affectedCount > 0;
  }

  delete = async (where) => {
    const affectedCount = await this.model.destroy({ where: { where } });
    return affectedCount > 0;
  }
}
