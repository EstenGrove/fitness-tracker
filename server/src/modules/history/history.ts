import type { Activity } from "../../services/types.ts";
import type { CardioHistoryClient, CardioHistoryDB } from "../cardio/types.ts";
import type { OtherHistoryClient, OtherHistoryDB } from "../other/types.ts";
import type { StrengthHistoryClient } from "../strength/types.ts";
import type {
	StretchHistoryClient,
	StretchHistoryDB,
} from "../stretch/types.ts";
import type { TimedHistoryClient, TimedHistoryDB } from "../timed/types.ts";
import type { WalkHistoryClient, WalkHistoryDB } from "../walk/types.ts";
import type {
	HistoryDetailsClient,
	HistoryDetailsDB,
	HistoryEntryClient,
	HistoryEntryDB,
	StrengthHistoryDB,
} from "./types.ts";

const normalizeStrengthHistory = (record: StrengthHistoryDB) => {
	const client: StrengthHistoryClient = {
		userID: record.user_id,
		historyID: record.history_id,
		workoutID: record.workout_id,
		workoutDate: record.workout_date,
		workoutName: record.workout_name,
		duration: record.duration,
		startTime: record.start_time,
		endTime: record.end_time,
		createdDate: record.created_date,
		effort: record.effort,
		sets: record.sets,
	};
	return client;
};
const normalizeCardioHistory = (record: CardioHistoryDB) => {
	const client: CardioHistoryClient = {
		userID: record.user_id,
		historyID: record.history_id,
		workoutID: record.workout_id,
		workoutDate: record.workout_date,
		workoutName: record.workout_name,
		duration: record.duration,
		startTime: record.start_time,
		endTime: record.end_time,
		createdDate: record.created_date,
		exercise: record.exercise,
		reps: record.reps,
		effort: record.effort,
		sets: record.sets,
	};
	return client;
};
const normalizeStretchHistory = (record: StretchHistoryDB) => {
	const client: StretchHistoryClient = {
		userID: record.user_id,
		historyID: record.history_id,
		workoutID: record.workout_id,
		workoutDate: record.workout_date,
		workoutName: record.workout_name,
		duration: record.duration,
		startTime: record.start_time,
		endTime: record.end_time,
		createdDate: record.created_date,
		exercise: record.exercise,
		reps: record.reps,
		effort: record.effort,
	};
	return client;
};
const normalizeWalkHistory = (record: WalkHistoryDB) => {
	const client: WalkHistoryClient = {
		userID: record.user_id,
		historyID: record.history_id,
		workoutID: record.workout_id,
		workoutDate: record.workout_date,
		workoutName: record.workout_name,
		duration: record.duration,
		startTime: record.start_time,
		endTime: record.end_time,
		createdDate: record.created_date,
		effort: record.effort,
		steps: record.steps,
		miles: record.miles,
		pace: record.pace,
	};
	return client;
};
const normalizeTimedHistory = (record: TimedHistoryDB) => {
	const client: TimedHistoryClient = {
		userID: record.user_id,
		historyID: record.history_id,
		workoutID: record.workout_id,
		workoutDate: record.workout_date,
		workoutName: record.workout_name,
		duration: record.duration,
		startTime: record.start_time,
		endTime: record.end_time,
		createdDate: record.created_date,
		effort: record.effort,
		reps: record.reps,
		exercise: record.exercise,
	};
	return client;
};
const normalizeOtherHistory = (record: OtherHistoryDB) => {
	const client: OtherHistoryClient = {
		userID: record.user_id,
		historyID: record.history_id,
		workoutID: record.workout_id,
		workoutDate: record.workout_date,
		workoutName: record.workout_name,
		duration: record.duration,
		startTime: record.start_time,
		endTime: record.end_time,
		createdDate: record.created_date,
		effort: record.effort,
		reps: record.reps,
		exercise: record.exercise,
	};
	return client;
};

const normalizeHistoryByType = (
	type: Activity,
	records: HistoryEntryDB[]
): HistoryEntryClient[] => {
	if (!records || !records.length) return [];

	switch (type) {
		case "Strength": {
			const clientRecords = records.map((entry) =>
				normalizeStrengthHistory(entry as unknown as StrengthHistoryDB)
			);
			return clientRecords as HistoryEntryClient[];
		}
		case "Stretch": {
			const clientRecords = records.map((entry) =>
				normalizeStretchHistory(entry as unknown as StretchHistoryDB)
			);
			return clientRecords as HistoryEntryClient[];
		}
		case "Cardio": {
			const clientRecords = records.map((entry) =>
				normalizeCardioHistory(entry as unknown as CardioHistoryDB)
			);
			return clientRecords as HistoryEntryClient[];
		}
		case "Walk": {
			const clientRecords = records.map((entry) =>
				normalizeWalkHistory(entry as unknown as WalkHistoryDB)
			);
			return clientRecords as HistoryEntryClient[];
		}
		case "Timed": {
			const clientRecords = records.map((entry) =>
				normalizeTimedHistory(entry as unknown as TimedHistoryDB)
			);
			return clientRecords as HistoryEntryClient[];
		}
		case "Other": {
			const clientRecords = records.map((entry) =>
				normalizeOtherHistory(entry as unknown as OtherHistoryDB)
			);
			return clientRecords as HistoryEntryClient[];
		}

		default:
			throw new Error("Invalid activityType: " + type);
	}
};

export {
	normalizeStrengthHistory,
	normalizeCardioHistory,
	normalizeStretchHistory,
	normalizeWalkHistory,
	normalizeTimedHistory,
	normalizeOtherHistory,
	// by type
	normalizeHistoryByType,
};
