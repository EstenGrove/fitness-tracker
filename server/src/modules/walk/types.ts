import type {
	WorkoutHistoryItemDB,
	WorkoutHistoryItemClient,
} from "../../services/types.ts";

export interface WalkHistoryDB extends WorkoutHistoryItemDB {
	steps: number;
	miles: number;
	pace: number;
}
export interface WalkHistoryClient extends WorkoutHistoryItemClient {
	steps: number;
	miles: number;
	pace: number;
}
