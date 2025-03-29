import type { Pool } from "pg";
import type { SharedDataDB } from "./types.ts";

export type SharedDataResp = Promise<SharedDataDB | unknown>;

class SharedDataService {
	#db: Pool;
	constructor(db: Pool) {
		this.#db = db;
	}

	async getSharedAppData(): SharedDataResp {
		try {
			const query = `SELECT * FROM get_shared_app_data() as data`;
			const results = await this.#db.query(query, []);
			const rows = results?.rows?.[0]?.data;
			console.log("results", results);
			console.log("rows", rows);
			return rows;
		} catch (error) {
			return error;
		}
	}
}

export { SharedDataService };
