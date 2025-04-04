import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TStatus } from "../types";
import { WeeklyMinsByDate } from "./types";
import { RootState } from "../../store/store";
import { getDashboardSummary } from "./operations";

export interface DashboardActivity {
	recentMins: WeeklyMinsByDate[];
	recentSteps: number;
	recentCalories: number;
	recentWorkoutCount: number;
}

export interface DashboardSlice {
	status: TStatus;
	recentActivity: DashboardActivity;
}

const initialState: DashboardSlice = {
	status: "IDLE",
	recentActivity: {
		recentMins: [],
		recentSteps: 0,
		recentCalories: 0,
		recentWorkoutCount: 0,
	},
};

const dashboardSlice = createSlice({
	name: "dashboard",
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getDashboardSummary.pending, (state: DashboardSlice) => {
				state.status = "PENDING";
			})
			.addCase(
				getDashboardSummary.fulfilled,
				(state: DashboardSlice, action: PayloadAction<DashboardActivity>) => {
					state.status = "FULFILLED";
					state.recentActivity = action.payload;
				}
			);
	},
});

export const selectRecentActivity = (state: RootState) => {
	return state.dashboard.recentActivity as DashboardActivity;
};

export default dashboardSlice.reducer;
