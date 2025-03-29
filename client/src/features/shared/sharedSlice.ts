import { createSlice } from "@reduxjs/toolkit";
import { ActivityType } from "../activity/types";
import { WorkoutType } from "../workouts/types";
import { TStatus } from "../types";
import { getSharedAppData } from "./operations";

export interface SharedSlice {
	status: TStatus;
	activityTypes: ActivityType[];
	workoutTypes: WorkoutType[];
}

const initialState: SharedSlice = {
	status: "IDLE",
	activityTypes: [],
	workoutTypes: [],
};

const sharedSlice = createSlice({
	name: "workouts",
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getSharedAppData.pending, (state) => {
				state.status = "IDLE";
			})
			.addCase(getSharedAppData.fulfilled, (state, action) => {
				state.status = "FULFILLED";
				state.activityTypes = action.payload.activityTypes;
				state.workoutTypes = action.payload.workoutTypes;
			});
	},
});

export default sharedSlice.reducer;
