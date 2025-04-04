import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserDateParams } from "../workouts/operations";
import { fetchDashboardSummaryForDate } from "../../utils/utils_dashboard";
import { AwaitedResponse } from "../types";
import { DashboardActivity } from "./dashboardSlice";

// Returns:
// - recentMins
// - recentSteps
// - recentCalories
// - recentWorkoutCount,
// - recentWorkouts
const getDashboardSummary = createAsyncThunk(
	"dashboard/getDashboardSummary",
	async (params: UserDateParams) => {
		const { userID, targetDate } = params;
		const response = (await fetchDashboardSummaryForDate(
			userID,
			targetDate
		)) as AwaitedResponse<DashboardActivity>;
		const data = response.Data as DashboardActivity;

		return data as DashboardActivity;
	}
);

export { getDashboardSummary };
