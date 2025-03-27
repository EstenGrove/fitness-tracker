// Custom Shapes

import { Activity } from "../activity/types";

export interface RecentWorkout {
	historyID: number;
	workoutID: number;
	workoutName: string;
	activityType: Activity;
	targetDuration: number;
	recordedDuration: number;
	workoutDate: string;
	startTime: string;
	endTime: string;
}
export interface RecentMinsByDate {
	date: string;
	mins: number;
}
export type WeeklyMinsByDate = RecentMinsByDate & {
	weekDay: string;
};

export interface RecentStepsByDate {
	date: string;
	steps: number;
}
export interface RecentCaloriesByDate {
	date: string;
	calories: number;
}
