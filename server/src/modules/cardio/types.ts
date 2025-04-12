import type {
	WorkoutHistoryItemDB,
	WorkoutHistoryItemClient,
} from "../../services/types.ts";

export interface CardioSet {
	id: number;
	reps: number;
	sets: number;
}

export interface CardioHistoryDB extends WorkoutHistoryItemDB {
	exercise: string;
	reps: number;
	sets: CardioSet[];
}
export interface CardioHistoryClient extends WorkoutHistoryItemClient {
	exercise: string;
	reps: number;
	sets: CardioSet[];
}
