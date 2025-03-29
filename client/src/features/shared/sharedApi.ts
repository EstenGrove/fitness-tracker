import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { currentEnv } from "../../utils/utils_env";
import { ActivityType } from "../activity/types";
import { WorkoutType } from "../workouts/types";
import { fetchSharedAppData } from "../../utils/utils_shared";
import { AwaitedResponse } from "../types";

export type SharedAppResp = {
	activityTypes: ActivityType[];
	workoutTypes: WorkoutType[];
};

export const sharedApi = createApi({
	reducerPath: "sharedApi",
	baseQuery: fetchBaseQuery({ baseUrl: currentEnv.base }),
	endpoints: (builder) => ({
		getSharedData: builder.query<SharedAppResp, void>({
			queryFn: async () => {
				const response = (await fetchSharedAppData()) as AwaitedResponse<{
					activityTypes: ActivityType[];
					workoutTypes: WorkoutType[];
				}>;
				const data: SharedAppResp = {
					activityTypes: response.Data.activityTypes as ActivityType[],
					workoutTypes: response.Data.workoutTypes as WorkoutType[],
				};
				return { data: data, error: undefined };
			},
		}),
	}),
});

export const { useGetSharedDataQuery } = sharedApi; // ✅ This must match the endpoint name
