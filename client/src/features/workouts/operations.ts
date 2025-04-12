import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	endActiveWorkout,
	fetchActiveWorkout,
	fetchSelectedWorkout,
	fetchSelectedWorkoutDetails,
	fetchTodaysWorkouts,
	fetchUserWorkoutsForDate,
	SelectedWorkout,
} from "../../utils/utils_workouts";
import { AwaitedResponse } from "../types";
import { TodaysWorkout, Workout } from "./types";
import { Activity } from "../activity/types";

export interface UserDateParams {
	userID: string;
	targetDate: string;
}

const getUserWorkoutsByDate = createAsyncThunk(
	"workouts/getUserWorkoutsByDate",
	async (params: UserDateParams) => {
		const { userID, targetDate } = params;
		const response = (await fetchUserWorkoutsForDate(
			userID,
			targetDate
		)) as AwaitedResponse<{ userWorkouts: Workout[] }>;
		const data = response.Data;

		return data.userWorkouts as Workout[];
	}
);

export interface SelectedParams {
	userID: string;
	workoutID: number;
	activityType: Activity;
}

const getSelectedWorkout = createAsyncThunk(
	"workouts/getSelectedWorkout",
	async (params: SelectedParams) => {
		const { userID, workoutID, activityType } = params;
		const response = (await fetchSelectedWorkout(
			userID,
			workoutID,
			activityType
		)) as AwaitedResponse<SelectedWorkout>;
		const data = response.Data as SelectedWorkout;
		console.log("response.Data", response.Data);
		return data as SelectedWorkout;
	}
);
const getSelectedWorkoutDetails = createAsyncThunk(
	"workouts/getSelectedWorkoutDetails",
	async (params: SelectedParams) => {
		const { userID, workoutID, activityType } = params;
		const response = (await fetchSelectedWorkoutDetails(
			userID,
			workoutID,
			activityType
		)) as AwaitedResponse<SelectedWorkout>;
		const data = response.Data as SelectedWorkout;
		console.log("response.Data", response.Data);
		return data as SelectedWorkout;
	}
);
const getActiveWorkout = createAsyncThunk(
	"workouts/getActiveWorkout",
	async (params: SelectedParams) => {
		const { userID, workoutID, activityType } = params;
		const response = (await fetchActiveWorkout(
			userID,
			workoutID,
			activityType
		)) as AwaitedResponse<SelectedWorkout>;
		const data = response.Data as SelectedWorkout;
		console.log("response.Data", response.Data);
		return data as SelectedWorkout;
	}
);

const getTodaysWorkouts = createAsyncThunk(
	"workouts/getTodaysWorkouts",
	async (params: UserDateParams) => {
		const { userID, targetDate } = params;
		const response = (await fetchTodaysWorkouts(
			userID,
			targetDate
		)) as AwaitedResponse<{ workouts: TodaysWorkout[] }>;
		const data = response.Data;

		return data.workouts as TodaysWorkout[];
	}
);

// const endWorkout = createAsyncThunk("workouts/endWorkout", async (params) => {
// 	// const response = await endActiveWorkout(params);
// });

export {
	getUserWorkoutsByDate,
	getSelectedWorkoutDetails,
	getSelectedWorkout,
	getTodaysWorkouts,
	getActiveWorkout,
	// endWorkout,
};
