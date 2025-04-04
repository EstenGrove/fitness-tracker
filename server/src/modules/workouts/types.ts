import type { Activity } from "../../services/types.ts";
import type { StrengthSet } from "../strength/types.ts";

export type WorkoutStatus = "COMPLETE" | "NOT-COMPLETE" | "IN-PROGRESS";

export interface TodaysWorkoutDB {
	user_id: string;
	workout_id: number;
	activity_type: Activity;
	workout_name: string;
	duration: number;
	start_time: string;
	end_time: string;
	is_recurring: boolean;
	workout_status: WorkoutStatus;
}

export interface TodaysWorkoutClient {
	userID: string;
	workoutID: number;
	activityType: Activity;
	workoutName: string;
	duration: number;
	startTime: string;
	endTime: string;
	isRecurring: boolean;
	workoutStatus: WorkoutStatus;
}

// Data payload when ending/saving a workout history entry
export interface WorkoutLogBody {
	userID: string;
	workoutID: number;
	activityType: Activity;
	workoutDate: string;
	startTime: string;
	endTime: string;
	duration: number;
	exercise: string;
	reps: number;
	sets: StrengthSet[];
}
