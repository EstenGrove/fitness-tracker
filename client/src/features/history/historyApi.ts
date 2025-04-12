import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { currentEnv } from "../../utils/utils_env";
import {
	fetchHistoryByRangeAndActivity,
	fetchWorkoutHistoryForRange,
	HistoryDetails,
	HistoryTypeResp,
} from "../../utils/utils_history";
import {
	AwaitedResponse,
	UserRangeActivityParams,
	UserRangeParams,
} from "../types";
import { WorkoutHistory } from "./types";

export const historyApi = createApi({
	reducerPath: "historyApi",
	baseQuery: fetchBaseQuery({ baseUrl: currentEnv.base }),
	endpoints: (builder) => ({
		getWorkoutHistoryForRange: builder.query<HistoryDetails, UserRangeParams>({
			queryFn: async (params: UserRangeParams) => {
				const { userID, startDate, endDate } = params;
				const response = (await fetchWorkoutHistoryForRange(userID, {
					startDate,
					endDate,
				})) as AwaitedResponse<HistoryDetails>;
				const data = response.Data as HistoryDetails;

				return { data };
			},
		}),
		getHistoryByRangeAndType: builder.query({
			queryFn: async (params: UserRangeActivityParams) => {
				const { userID, activityType, startDate, endDate } = params;
				const response = (await fetchHistoryByRangeAndActivity(
					userID,
					activityType,
					{
						startDate,
						endDate,
					}
				)) as AwaitedResponse<{ history: WorkoutHistory[] }>;
				const data = response.Data;
				return { data: data.history };
			},
		}),
	}),
});

export const {
	useGetWorkoutHistoryForRangeQuery,
	useGetHistoryByRangeAndTypeQuery,
} = historyApi;
