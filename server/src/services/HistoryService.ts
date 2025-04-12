import type { Pool } from "pg";
import type { Activity, DateRange, WorkoutHistoryDB } from "./types.ts";
import type {
	HistoryDetailsDB,
	StrengthHistoryDB,
} from "../modules/history/types.ts";

class HistoryService {
	#db: Pool;
	constructor(db: Pool) {
		this.#db = db;
	}

	async getHistoryDetailsForRange(userID: string, range: DateRange) {
		const { startDate, endDate } = range;
		try {
			const query = `SELECT * FROM get_history_details_for_range(
        $1,
        $2,
        $3
      ) as data`;
			const results = await this.#db.query(query, [userID, startDate, endDate]);
			const rows = results?.rows?.[0]?.data;

			return rows;
		} catch (error) {
			return error;
		}
	}
	async getHistoryDetailsForRangeAndType(
		userID: string,
		params: { type: Activity; startDate: string; endDate: string }
	): Promise<{ history: HistoryDetailsDB[] } | unknown> {
		const { type, startDate, endDate } = params;
		try {
			const query = `SELECT * FROM get_history_for_range_and_activity(
        $1,
        $2,
        $3,
        $4
      ) as data`;
			const results = await this.#db.query(query, [
				userID,
				type,
				startDate,
				endDate,
			]);
			console.log("results", results);
			const rows = results?.rows?.[0]?.data;

			return rows;
		} catch (error) {
			return error;
		}
	}
}

export { HistoryService };
