import type { Pool } from "pg";

class SessionService {
	#db: Pool;
	constructor(db: Pool) {
		this.#db = db;
	}

	async create(userID: string, token: string) {
		try {
			const query = `SELECT * FROM create_session($1, $2)`;
			const results = await this.#db.query(query, [token, userID]);
			const row = results?.rows?.[0];

			return row;
		} catch (error) {
			return error;
		}
	}

	async getSessionByUserID(userID: string) {
		try {
			const query = `SELECT * FROM user_sessions WHERE user_id = $1 AND is_active = true`;
			const results = await this.#db.query(query, [userID]);
			const rows = results?.rows?.[0];

			return rows;
		} catch (error) {
			return error;
		}
	}
	async getSessionByID(sessionID: string) {
		try {
			const query = `SELECT * FROM user_sessions WHERE session_id = $1 AND is_active = true`;
			const results = await this.#db.query(query, [sessionID]);
			const rows = results?.rows?.[0];

			return rows;
		} catch (error) {
			return error;
		}
	}
	async getActiveUserSession(userID: string, sessionID: string) {
		try {
			const query = `
        SELECT * FROM user_sessions
        WHERE is_active = true AND user_id = $1 AND session_id $2
        `;
			const results = await this.#db.query(query, [userID, sessionID]);
			const rows = results?.rows?.[0];

			return rows;
		} catch (error) {
			return error;
		}
	}
}

export { SessionService };
