import { AsyncResponse } from "../features/types";
import {
	CardioWorkout,
	OtherWorkout,
	StrengthWorkout,
	StretchWorkout,
	TimedWorkout,
	WalkWorkout,
	Workout,
} from "../features/workouts/types";
import { currentEnv, workoutApis } from "./utils_env";

export interface AllUserWorkouts {
	userWorkouts: Workout[];
	strengthWorkouts: StrengthWorkout[];
	walkWorkouts: WalkWorkout[];
	stretchWorkouts: StretchWorkout[];
	cardioWorkouts: CardioWorkout[];
	timedWorkouts: TimedWorkout[];
	otherWorkouts: OtherWorkout[];
}

export interface UserWorkouts {
	userWorkouts: Workout[];
}

export type UserWorkoutsResp = AsyncResponse<UserWorkouts>;
export type AllUserWorkoutsResp = AsyncResponse<AllUserWorkouts>;

const fetchAllUserWorkouts = async (userID: string): UserWorkoutsResp => {
	let url = currentEnv.base + workoutApis.getUserWorkouts;
	url += "?" + new URLSearchParams({ userID });

	try {
		const request = await fetch(url);
		const response = await request.json();

		return response;
	} catch (error) {
		return error;
	}
};

const fetchUserWorkoutsForDate = async (
	userID: string,
	targetDate: string
): UserWorkoutsResp => {
	let url = currentEnv.base + workoutApis.getUserWorkoutsByDate;
	url += "?" + new URLSearchParams({ userID, targetDate });

	try {
		const request = await fetch(url);
		const response = await request.json();

		return response;
	} catch (error) {
		return error;
	}
};

export { fetchUserWorkoutsForDate, fetchAllUserWorkouts };
