import { Sequelize } from 'sequelize';
import { config } from '../config/Env.js'
import os from 'os';
import path from 'path';

const tempDbPath = path.join(os.tmpdir(), 'database.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: config.DATABASE.PATH || tempDbPath,
  username: config.DATABASE.USER || 'default_user',
  password: config.DATABASE.PASS || null,
  logging: false, //Sqlite is just file so ignore
});

// force since to establish a connection
await sequelize.sync({ force: true });
export { sequelize };
