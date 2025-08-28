import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const hashPassword = async (pass) => {
	return await bcrypt.hash(pass, 12);
}

export const comparePassword = async (pass, hashedPass) => {
	return await bcrypt.compare(pass, hashedPass);
}

export const createJWT = (payload, expireTime) => {
	return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: expireTime})
}

export const verifyJWT = (token) => {
	return jwt.verify(token, process.env.JWT_SECRET)
}