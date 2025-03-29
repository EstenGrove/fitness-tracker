import type { Pool } from "pg";
import type { WorkoutDB } from "./types.ts";

export type WorkoutsResp = Promise<WorkoutDB[] | unknown>;

class WorkoutsService {
	#db: Pool;
	constructor(db: Pool) {
		this.#db = db;
	}

	async getAllUserWorkouts(userID: string): WorkoutsResp {
		try {
			const query = `SELECT * from get_all_user_workouts($1)`;
			const results = await this.#db.query(query, [userID]);
			const rows = results?.rows;
			console.log("rows", rows);
			return rows;
		} catch (error) {
			return error;
		}
	}
	async getAllUserWorkoutsForDate(
		userID: string,
		targetDate: string
	): WorkoutsResp {
		try {
			const query = `SELECT * from get_user_workouts_for_date($1, $2)`;
			const results = await this.#db.query(query, [userID, targetDate]);
			const rows = results?.rows;

			return rows;
		} catch (error) {
			return error;
		}
	}
}

export { WorkoutsService };
