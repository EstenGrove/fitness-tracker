import type {
	WorkoutDetailsDB,
	WorkoutScheduleDB,
	WorkoutHistoryItemDB,
	WorkoutDetailsClient,
	WorkoutScheduleClient,
	WorkoutHistoryItemClient,
	StrengthWorkout,
	StretchWorkout,
	WalkWorkout,
	CardioWorkout,
	TimedWorkout,
	OtherWorkout,
} from "../services/types.ts";
import type { CardioHistoryClient, CardioHistoryDB } from "./cardio/types.ts";
import type { OtherHistoryClient, OtherHistoryDB } from "./other/types.ts";
import type {
	StrengthHistoryClient,
	StrengthHistoryDB,
} from "./strength/types.ts";
import type {
	StretchHistoryClient,
	StretchHistoryDB,
} from "./stretch/types.ts";
import type { TimedHistoryClient, TimedHistoryDB } from "./timed/types.ts";
import type { WalkHistoryClient, WalkHistoryDB } from "./walk/types.ts";

export interface WorkoutInfoDB {
	workout: WorkoutDetailsDB;
	history: WorkoutHistoryItemDB[];
	schedule: WorkoutScheduleDB;
}
export interface WorkoutInfoClient {
	workout: WorkoutDetailsClient;
	history: WorkoutHistoryItemClient[];
	schedule: WorkoutScheduleClient;
}

export type WorkoutByType =
	| StrengthWorkout
	| StretchWorkout
	| WalkWorkout
	| CardioWorkout
	| TimedWorkout
	| OtherWorkout;

export type WorkoutHistoryByTypeDB =
	| StrengthHistoryDB
	| StretchHistoryDB
	| WalkHistoryDB
	| CardioHistoryDB
	| TimedHistoryDB
	| OtherHistoryDB;

export type WorkoutHistoryByTypeClient =
	| StrengthHistoryClient
	| StretchHistoryClient
	| WalkHistoryClient
	| CardioHistoryClient
	| TimedHistoryClient
	| OtherHistoryClient;
