import type {
	WorkoutHistoryItemDB,
	WorkoutHistoryItemClient,
} from "../../services/types.ts";

export interface StretchHistoryDB extends WorkoutHistoryItemDB {
	exercise: string;
	reps: number;
}
export interface StretchHistoryClient extends WorkoutHistoryItemClient {
	exercise: string;
	reps: number;
}
