import { Activity } from "../activity/types";

export type WorkoutStatus = "COMPLETED" | "IN-PROGRESS" | "NOT-COMPLETE";

// Workout Types & Activity Types
// - Defines a given exercise for a given activity type.
export interface WorkoutType {
	typeID: number;
	typeName: string;
	typeDesc: string;
	activityID: number;
	isActive: boolean;
	createdDate: string;
}

// Generic Workout Type
export interface Workout {
	userID: string;
	workoutID: number;
	workoutName: string;
	activityType: Activity;
	workoutDesc: string;
	duration: number;
	tagColor: string | null;
	startTime: string;
	endTime: string;
	isRecurring: boolean;
	status: WorkoutStatus;
}
// Workouts By Activity Type
export interface StrengthWorkout extends Workout {
	sets: number;
	reps: number;
	weight: number;
}
export interface WalkWorkout extends Workout {
	steps: number;
	miles: number;
	pace: number;
}
export interface StretchWorkout extends Workout {
	exercise: number;
	reps: number;
}
export interface CardioWorkout extends Workout {
	exercise: number;
	reps: number;
}
export interface TimedWorkout extends Workout {
	exercise: number;
}
export interface OtherWorkout extends Workout {
	exercise: number;
}
// Strength Workout Set Info
export interface StrengthSet {
	id: number;
	sets: number;
	reps: number;
	weight: number;
}
