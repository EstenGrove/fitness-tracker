import type {
	WorkoutHistoryItemDB,
	WorkoutHistoryItemClient,
} from "../../services/types.ts";

export interface TimedHistoryDB extends WorkoutHistoryItemDB {
	exercise: string;
	reps: number;
}
export interface TimedHistoryClient extends WorkoutHistoryItemClient {
	exercise: string;
	reps: number;
}
