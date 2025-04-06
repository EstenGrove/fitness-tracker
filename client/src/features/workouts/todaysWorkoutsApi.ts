import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { currentEnv } from "../../utils/utils_env";
import { TodaysWorkout } from "./types";
import { UserDateParams } from "./operations";
import {
	fetchTodaysWorkouts,
	MarkAsDoneBody,
	markWorkoutAsDone,
} from "../../utils/utils_workouts";
import { AwaitedResponse } from "../types";
import { WorkoutHistory } from "../history/types";

export const todaysWorkoutsApi = createApi({
	reducerPath: "todaysWorkoutsApi",
	baseQuery: fetchBaseQuery({ baseUrl: currentEnv.base }),
	tagTypes: ["TodaysWorkouts"],
	endpoints: (builder) => ({
		getTodaysWorkouts: builder.query<TodaysWorkout[], UserDateParams>({
			queryFn: async (params) => {
				const { userID, targetDate } = params;
				const response = (await fetchTodaysWorkouts(
					userID,
					targetDate
				)) as AwaitedResponse<{ workouts: TodaysWorkout[] }>;
				const workouts = response.Data.workouts as TodaysWorkout[];

				return { data: workouts || [] };
			},
			providesTags: () => [{ type: "TodaysWorkouts" }],
		}),
		markAsDone: builder.mutation({
			queryFn: async (details: MarkAsDoneBody) => {
				const { userID } = details;
				const response = (await markWorkoutAsDone(
					userID,
					details
				)) as AwaitedResponse<{
					updatedWorkout: TodaysWorkout;
					history: WorkoutHistory;
				}>;
				const data = response.Data.updatedWorkout;

				return { data };
			},
			invalidatesTags: ["TodaysWorkouts"],
		}),
	}),
});

export const { useGetTodaysWorkoutsQuery, useMarkAsDoneMutation } =
	todaysWorkoutsApi;
