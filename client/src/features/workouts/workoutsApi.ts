import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { currentEnv } from "../../utils/utils_env";
import { fetchAllUserWorkouts, UserWorkouts } from "../../utils/utils_workouts";
import { AwaitedResponse } from "../types";
import { Workout } from "./types";

export const workoutsApi = createApi({
	reducerPath: "workoutsApi",
	baseQuery: fetchBaseQuery({ baseUrl: currentEnv.base }),
	endpoints: (builder) => ({
		getAllUserWorkouts: builder.query<Workout[], string>({
			queryFn: async (userID) => {
				const response = (await fetchAllUserWorkouts(
					userID
				)) as AwaitedResponse<UserWorkouts>;
				const data = response.Data as UserWorkouts;
				const workouts = data.userWorkouts as Workout[];
				return { data: workouts, error: undefined };
			},
		}),
	}),
});

export const { useGetAllUserWorkoutsQuery } = workoutsApi;
