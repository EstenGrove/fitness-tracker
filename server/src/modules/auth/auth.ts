import jwt, { type JwtPayload } from "jsonwebtoken";
import type { UserDB } from "../../services/UserService.ts";
import { userService, sessionService } from "../../services/index.ts";
import type { UserSessionDB } from "./types.ts";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_SECRET as string;

// - Get user
// - Generate token
// - Create user login session w/ token

const generateAccessToken = async (
	userID: string
): Promise<string | unknown> => {
	return new Promise((resolve, reject) => {
		jwt.sign({ userID }, JWT_SECRET, { expiresIn: "30m" }, (err, token) => {
			if (err || !token) return reject(err);
			return resolve(token);
		});
	});
};
const generateRefreshToken = async (
	userID: string
): Promise<string | unknown> => {
	return new Promise((resolve, reject) => {
		jwt.sign(
			{ userID },
			JWT_REFRESH_SECRET,
			{
				expiresIn: "120m",
			},
			(err, token) => {
				if (err || !token) return reject(err);
				return resolve(token);
			}
		);
	});
};

const verifyAccessToken = async (token: string): Promise<string | unknown> => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, JWT_SECRET, (err, token) => {
			if (err || !token) return reject(err);
			return resolve(token);
		});
	});
};

const login = async (username: string, password: string) => {
	if (!username || !password) {
		throw new Error(`Invalid credentails: ${username} & ${password}`);
	}

	const existingUser = (await userService.getUserByLogin(
		username,
		password
	)) as UserDB;

	if (!existingUser) {
		throw new Error("User does not exist or credentials are wrong");
	}
	const { user_id } = existingUser;
	const accessToken = (await generateAccessToken(user_id)) as string;
	// const refreshToken = (await generateRefreshToken(user_id)) as string;

	// Create session for user, store token in DB
	const userSession = (await userService.loginUser(
		accessToken,
		username,
		password
	)) as UserSessionDB;

	return {
		user: existingUser,
		session: userSession,
	};
};

const logout = async (userID: string, sessionID: string) => {
	if (!userID) {
		throw new Error("Missing userID: " + userID);
	}

	// const logoutData = await
};

export {
	// JWT handlers
	generateAccessToken,
	generateRefreshToken,
	verifyAccessToken,
	// request handlers
	login,
	logout,
};
