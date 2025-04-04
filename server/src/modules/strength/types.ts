import type {
	WorkoutDB,
	WorkoutClient,
	WorkoutHistoryItemDB,
	WorkoutHistoryItemClient,
} from "../../services/types.ts";

export interface StrengthWorkoutDB extends WorkoutDB {
	sets: number;
	reps: number;
	weight: number;
}
export interface StrengthWorkoutClient extends WorkoutClient {
	sets: number;
	reps: number;
	weight: number;
}

export interface StrengthSet {
	id: number;
	sets: number;
	reps: number;
	weight: number;
}
export interface StrengthHistoryDB extends WorkoutHistoryItemDB {
	sets: StrengthSet[];
}
export interface StrengthHistoryClient extends WorkoutHistoryItemClient {
	sets: StrengthSet[];
}
