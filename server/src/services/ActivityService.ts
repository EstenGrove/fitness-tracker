import type { Pool } from "pg";
import type { Activity, ActivityTypeDB } from "./types.ts";

export type ActivityTypesResp = Promise<ActivityTypeDB[] | unknown>;

class ActivityService {
	#db: Pool;
	constructor(db: Pool) {
		this.#db = db;
	}

	async getActivityTypes(): ActivityTypesResp {
		try {
			const query = `SELECT * FROM activity_types WHERE is_active = true`;
			const results = await this.#db.query(query, []);
			const rows = results?.rows;
			return rows;
		} catch (error) {
			return error;
		}
	}
}

export { ActivityService };
