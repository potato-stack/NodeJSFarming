import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import os from 'os';
import path from 'path';
dotenv.config();

const tempDbPath = path.join(os.tmpdir(), 'database.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_PATH || tempDbPath,
  username: process.env.DB_USER || 'default_user',
  password: process.env.DB_PASS || null,
  logging: false, //Sqlite is just file so ignore
});

// force since to establish a connection
await sequelize.sync({ force: true });
export { sequelize };
