import type {
	WorkoutHistoryItemDB,
	WorkoutHistoryItemClient,
} from "../../services/types.ts";

export interface OtherHistoryDB extends WorkoutHistoryItemDB {
	exercise: string;
	reps: number;
}
export interface OtherHistoryClient extends WorkoutHistoryItemClient {
	exercise: string;
	reps: number;
}
