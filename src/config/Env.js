import dotenv from 'dotenv';
dotenv.config();

export const config = {
  SERVER: {
},
PORT: Number(process.env.PORT) || 3000,
  DATABASE: {
    PATH: process.env.DB_PATH,
    USER: process.env.DB_USER || 'root',
    PASS: process.env.DB_PASS || null,
    ADAPTER: process.env.DB_ADAPTER || 'sequelize',
  },
  AUTH: {
    JWT_SECRET: process.env.JWT_SECRET || 'defaultsecret',
    JWT_LIFETIME: process.env.JWT_LIFETIME || '1h',
    COOKIE_SECRET: process.env.COOKIE_SECRET || 'defaultcookie',
  },
  RATE_LIMIT: {
    WINDOW_MS: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    MAX: Number(process.env.RATE_LIMIT_MAX) || 60,
  },
  REDIS: {
	HOST: process.env.REDIS_HOST,
	PORT: process.env.REDIS_PORT,
	PASS: process.env.REDIS_PASS,
  }
};
