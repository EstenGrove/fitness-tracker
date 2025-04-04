import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { currentEnv } from "../../utils/utils_env";
import { TodaysWorkout } from "./types";
import { UserDateParams } from "./operations";
import { fetchTodaysWorkouts } from "../../utils/utils_workouts";
import { AwaitedResponse } from "../types";

export const todaysWorkoutsApi = createApi({
	reducerPath: "todaysWorkoutsApi",
	baseQuery: fetchBaseQuery({ baseUrl: currentEnv.base }),
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
		}),
	}),
});

export const { useGetTodaysWorkoutsQuery } = todaysWorkoutsApi;
