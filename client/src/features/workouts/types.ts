import { WeekDayToken } from "../../utils/utils_dates";
import { Activity } from "../activity/types";
import { RepeatType } from "../shared/types";

export type WorkoutStatus = "COMPLETE" | "IN-PROGRESS" | "NOT-COMPLETE";

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

export type WorkoutDetails =
	| StrengthWorkout
	| StretchWorkout
	| CardioWorkout
	| WalkWorkout
	| TimedWorkout
	| OtherWorkout;

export interface WorkoutSchedule {
	userID: string;
	scheduleID: number;
	activityType: Activity;
	workoutID: number;
	startDate: string;
	endDate: string;
	startTime: string;
	endTime: string;
	interval: number;
	frequency: RepeatType;
	byDay: WeekDayToken[];
	byMonth: number;
	byMonthDay: number;
	isActive: boolean;
	createdDate: string;
}

export interface TodaysWorkout {
	userID: string;
	workoutID: number;
	activityType: Activity;
	workoutName: string;
	duration: number;
	startTime: string;
	endTime: string;
	isRecurring: boolean;
	workoutStatus: WorkoutStatus;
	tagColor?: string | null;
}
