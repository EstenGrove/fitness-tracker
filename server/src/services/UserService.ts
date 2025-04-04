import type { Pool, QueryResult } from "pg";

export interface UserDB {
	user_id: string;
	username: string;
	password: string;
	first_name: string;
	last_name: string;
	is_active: boolean;
	created_date: string;
	last_login_date: string | null;
	user_avatar: string | null;
}
export interface UserClient {
	userID: string;
	username: string;
	password: string;
	firstName: string;
	lastName: string;
	isActive: boolean;
	createdDate: string;
	lastLoginDate: string | null;
	userAvatar: string | null;
}

class UserService {
	#db: Pool;
	constructor(db: Pool) {
		this.#db = db;
	}

	// Updates users record for 'lastLoginDate' and creates a new session record.
	async loginUser(token: string, username: string, password: string) {
		try {
			const query = `SELECT * FROM login_user(
				$1,
				$2,
				$3
			)`;
			const results = await this.#db.query(query, [token, username, password]);
			const rows = results?.rows?.[0];

			return rows;
		} catch (error) {
			return error;
		}
	}

	async getUserByID(userID: string): Promise<UserDB | unknown> {
		try {
			const query = `SELECT * FROM users WHERE user_id = $1`;
			const results = (await this.#db.query(query, [userID])) as QueryResult;
			const row = results?.rows?.[0] as UserDB;

			return row;
		} catch (error) {
			return error;
		}
	}
	async getUserByLogin(
		username: string,
		password: string
	): Promise<UserDB | unknown> {
		try {
			const query = `
        SELECT * FROM users
        WHERE
          username = $1
          AND
          password = $2
          AND is_active = true

      `;
			const results = (await this.#db.query(query, [
				username,
				password,
			])) as QueryResult;
			console.log("results", results);
			const row = results?.rows?.[0] as UserDB;
			console.log("row", row);
			return row;
		} catch (error) {
			return error;
		}
	}
}

export { UserService };
