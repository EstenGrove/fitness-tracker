import type { Pool, QueryResult } from "pg";
import type {
	Activity,
	SelectedWorkoutDetailsDB,
	WorkoutDB,
	WorkoutDetailsDB,
	WorkoutScheduleDB,
} from "./types.ts";
import type { WorkoutInfoDB } from "../modules/types.ts";
import type { StrengthSet } from "../modules/strength/types.ts";
import type { WorkoutLogBody } from "../modules/workouts/types.ts";

export interface ActiveWorkoutDB {
	activeWorkout: WorkoutDB;
	activeSchedule: WorkoutScheduleDB;
}

export type WorkoutsResp = Promise<WorkoutDB[] | unknown>;
export type SelectedWorkoutDB = Promise<WorkoutDetailsDB | unknown>;
export type SelectedWorkoutDetailsResp = Promise<WorkoutInfoDB | unknown>;
export type ActiveWorkoutResp = Promise<ActiveWorkoutDB | unknown>;

class WorkoutsService {
	#db: Pool;
	constructor(db: Pool) {
		this.#db = db;
	}

	async getTodaysWorkouts(userID: string, targetDate: string) {
		try {
			const query = `SELECT * FROM get_todays_workouts(
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

	async getSelectedWorkout(
		userID: string,
		workoutID: number,
		activityType: Activity
	): SelectedWorkoutDB {
		try {
			const query = `SELECT * FROM get_selected_workout($1, $2, $3)`;
			const results = await this.#db.query(query, [
				userID,
				workoutID,
				activityType,
			]);
			const rows = results?.rows;

			return rows;
		} catch (error) {
			return error;
		}
	}

	async getSelectedWorkoutDetails(
		userID: string,
		workoutID: number,
		activityType: Activity
	): SelectedWorkoutDetailsResp {
		try {
			const query = `SELECT * FROM get_selected_workout_details($1, $2, $3)`;
			const results = (await this.#db.query(query, [
				userID,
				workoutID,
				activityType,
			])) as QueryResult;
			const rows = results?.rows?.[0]?.get_selected_workout_details;
			// console.log("results", results);
			console.log("rows", rows);
			console.log("WORKOUT:", rows.workout);
			console.log("SCHEDULE:", rows.schedule);
			return {
				history: rows.history,
				schedule: rows.schedule?.[0],
				workout: rows.workout?.[0],
			};
			return rows;
		} catch (error) {
			return error;
		}
	}

	async getActiveWorkout(
		userID: string,
		workoutID: number,
		activityType: Activity
	): ActiveWorkoutResp {
		try {
			const query = `SELECT * FROM get_active_workout(
				$1,
				$2,
				$3
			)`;
			const results = await this.#db.query(query, [
				userID,
				workoutID,
				activityType,
			]);
			console.log("results", results);
			const rows = results?.rows?.[0]?.get_active_workout;
			console.log("rows", rows);
			return rows;
		} catch (error) {
			return error;
		}
	}

	async endWorkout(workoutLog: WorkoutLogBody) {
		try {
			const query = `SELECT * FROM end_workout(
				$1
			)`;
			const results = await this.#db.query(query, [workoutLog]);
			const rows = results?.rows;
			console.log("results", results);
			console.log("rows", rows);
			return rows;
		} catch (error) {
			return error;
		}
	}
}

export { WorkoutsService };
