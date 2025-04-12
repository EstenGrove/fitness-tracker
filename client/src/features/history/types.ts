import { StrengthSet } from "../workouts/types";

export type Effort =
	| "Easy"
	| "Moderate"
	| "Hard"
	| "Strenuous"
	| "All Out"
	| "None";

export interface WorkoutHistory {
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

export interface WalkHistory extends WorkoutHistory {
	steps: number;
	miles: number;
	pace: number;
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
