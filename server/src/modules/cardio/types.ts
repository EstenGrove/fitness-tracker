import type {
	WorkoutHistoryItemDB,
	WorkoutHistoryItemClient,
} from "../../services/types.ts";

export interface CardioHistoryDB extends WorkoutHistoryItemDB {
	exercise: string;
	reps: number;
}
export interface CardioHistoryClient extends WorkoutHistoryItemClient {
	exercise: string;
	reps: number;
}
