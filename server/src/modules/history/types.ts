import type { Effort } from "../../services/types.ts";
import type { StrengthSet } from "../strength/types.ts";

export interface HistoryDB {
	user_id: string;
	history_id: number;
	workout_id: number;
	workout_name: string;
	workout_date: string;
	start_time: string;
	end_time: string;
	duration: number;
	target_duration: number;
	effort: Effort;
	created_date: string;
}

export interface HistoryClient {
	userID: string;
	historyID: number;
	workoutID: number;
	workoutName: string;
	workoutDate: string;
	startTime: string;
	endTime: string;
	duration: number;
	targetDuration: number;
	effort: Effort;
	createdDate: string;
}

export interface WalkHistoryDB extends HistoryDB {
	steps: number;
	miles: number;
	pace: number;
}
export interface StrengthHistoryDB extends HistoryDB {
	sets: StrengthSet[];
}
export interface StretchHistoryDB extends HistoryDB {
	reps: number;
}
export interface CardioHistoryDB extends HistoryDB {
	reps: number;
}
export interface TimedHistoryDB extends HistoryDB {
	reps: number;
	exercise: string;
}
export interface OtherHistoryDB extends HistoryDB {
	reps: number;
	exercise: string;
}
export interface WalkHistoryClient extends HistoryClient {
	steps: number;
	miles: number;
	pace: number;
}
export interface StrengthHistoryClient extends HistoryClient {
	sets: StrengthSet[];
}
export interface StretchHistoryClient extends HistoryClient {
	reps: number;
}
export interface CardioHistoryClient extends HistoryClient {
	reps: number;
}
export interface TimedHistoryClient extends HistoryClient {
	reps: number;
	exercise: string;
}
export interface OtherHistoryClient extends HistoryClient {
	reps: number;
	exercise: string;
}

export type HistoryEntryDB =
	| StrengthHistoryDB
	| CardioHistoryDB
	| WalkHistoryDB
	| StretchHistoryDB
	| TimedHistoryDB
	| OtherHistoryDB;
export type HistoryEntryClient =
	| StrengthHistoryClient
	| CardioHistoryClient
	| WalkHistoryClient
	| StretchHistoryClient
	| TimedHistoryClient
	| OtherHistoryClient;

export interface HistoryDetailsDB {
	all: HistoryDB[];
	strength: StrengthHistoryDB[];
	stretch: StretchHistoryDB[];
	walk: WalkHistoryDB[];
	cardio: CardioHistoryDB[];
	timed: TimedHistoryDB[];
	other: OtherHistoryDB[];
}
export interface HistoryDetailsClient {
	all: HistoryClient[];
	strength: StrengthHistoryClient[];
	stretch: StretchHistoryClient[];
	walk: WalkHistoryClient[];
	cardio: CardioHistoryClient[];
	timed: TimedHistoryClient[];
	other: OtherHistoryClient[];
}
