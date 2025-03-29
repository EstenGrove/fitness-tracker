import { ActivityType } from "./types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchActivityTypes } from "../../utils/utils_activity";
import { currentEnv } from "../../utils/utils_env";

export const activityApi = createApi({
	reducerPath: "activityApi",
	baseQuery: fetchBaseQuery({ baseUrl: currentEnv.base }),
	endpoints: (builder) => ({
		getActivityTypes: builder.query<ActivityType[], void>({
			queryFn: async () => {
				const response = (await fetchActivityTypes()) as {
					activityTypes: ActivityType[];
				};
				const types = response.activityTypes as ActivityType[];
				return { data: types, error: undefined };
			},
		}),
	}),
});

export const { useGetActivityTypesQuery } = activityApi;
