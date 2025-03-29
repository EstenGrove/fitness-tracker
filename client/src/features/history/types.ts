import { StrengthSet } from "../workouts/types";

export type Effort =
	| "Easy"
	| "Moderate"
	| "Hard"
	| "Strenuous"
	| "All Out"
	| "None";

export interface WorkoutHistory {
	historyID: number;
	workoutID: number;
	workoutDate: string;
	startTime: string;
	endTime: string;
	duration: number;
	effort: Effort;
	createdDate: string;
}

export interface StrengthHistory extends WorkoutHistory {
	sets: StrengthSet[];
}

export interface StretchHistory extends WorkoutHistory {
	reps: number;
}
export interface CardioHistory extends WorkoutHistory {
	reps: number;
}
export interface TimedHistory extends WorkoutHistory {
	reps: number;
	exercise: string;
}
export interface OtherHistory extends WorkoutHistory {
	reps: number;
	exercise: string;
}
