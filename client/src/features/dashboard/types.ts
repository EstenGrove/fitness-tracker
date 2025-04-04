import { Activity } from "../activity/types";

export interface StreakDay {
	date: Date | string;
	mins: number;
	goal: number;
	weekDay: string;
}

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

export interface DashboardSummary {
	recentSteps: number; // steps for a given date
	recentCalories: number; // calories for given date
	recentWorkoutCount: number; // workouts for given date
	recentMins: WeeklyMinsByDate[]; // weekly streak basically, for bar chart
	recentWorkouts: RecentWorkout[];
	weeklyStreak: StreakDay[];
}
