import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { currentEnv } from "../../utils/utils_env";
import { fetchDashboardSummaryForDate } from "../../utils/utils_dashboard";
import { DashboardActivity } from "./dashboardSlice";
import { UserDateParams } from "../workouts/operations";
import { AwaitedResponse } from "../types";

export const summaryApi = createApi({
	reducerPath: "summaryApi",
	baseQuery: fetchBaseQuery({ baseUrl: currentEnv.base }),
	endpoints: (builder) => ({
		getDashboardSummary: builder.query<DashboardActivity, UserDateParams>({
			queryFn: async (params) => {
				const { userID, targetDate } = params;
				const response = (await fetchDashboardSummaryForDate(
					userID,
					targetDate
				)) as AwaitedResponse<DashboardActivity>;
				const data = response.Data;
				const summary = data as DashboardActivity;
				return { data: summary };
			},
		}),
	}),
});

export const { useGetDashboardSummaryQuery } = summaryApi;
