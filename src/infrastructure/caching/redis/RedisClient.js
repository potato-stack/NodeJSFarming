import Redis from "ioredis";
import { config } from "../../../config/Env";

export const redisClient = new Redis({
	host: config.REDIS.HOST,
	port: config.REDIS.PORT,
	password: config.REDIS.PASS || undefined,
	tls: config.REDIS.TLS ? {} : undefined, // to be set latter ? 
})