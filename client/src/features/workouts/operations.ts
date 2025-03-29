import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserWorkoutsForDate } from "../../utils/utils_workouts";
import { AwaitedResponse } from "../types";
import { Workout } from "./types";

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

export { getUserWorkoutsByDate };
