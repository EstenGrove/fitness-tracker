import type { Pool } from "pg";
import type { RecentMinsDB } from "./types.ts";
import type { RecentMinsClient } from "../modules/dashboard/types.ts";

class DashboardService {
	#db: Pool;
	constructor(db: Pool) {
		this.#db = db;
	}

	async getDashboardSummary(userID: string, targetDate: string) {
		try {
			const query = `SELECT * FROM get_dashboard_summary(
        $1,
        $2
      )`;
			const results = await this.#db.query(query, [userID, targetDate]);
			const rows = results?.rows;

			return rows;
		} catch (error) {
			return error;
		}
	}

	async getTotalMinsForWeek(userID: string, targetDate: string) {
		try {
			const query = `SELECT * FROM get_total_mins_for_week(
        $1,
        $2
      )`;
			const results = await this.#db.query(query, [userID, targetDate]);
			const rows = results?.rows;
			return rows;
		} catch (error) {
			return error;
		}
	}
	async getRecentMinsForWeek(userID: string, targetDate: string) {
		try {
			const query = `SELECT * FROM get_recent_mins_for_week(
        $1,
        $2
      )`;
			const results = await this.#db.query(query, [userID, targetDate]);
			const rows = results?.rows;
			return rows;
		} catch (error) {
			return error;
		}
	}
}

export { DashboardService };
