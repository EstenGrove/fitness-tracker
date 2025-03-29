import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getActivityTypes } from "./operations";
import { TStatus } from "../types";
import { Activity } from "./types";
import { RootState } from "../../store/store";

interface ActivitySlice {
	status: TStatus;
	types: Activity[];
}

const initialState: ActivitySlice = {
	types: [],
	status: "IDLE",
};

const activitySlice = createSlice({
	name: "activity",
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getActivityTypes.pending, (state: ActivitySlice) => {
				state.status = "PENDING";
			})
			.addCase(
				getActivityTypes.fulfilled,
				(state: ActivitySlice, action: PayloadAction<Activity[]>) => {
					state.status = "FULFILLED";
					state.types = action.payload;
				}
			);
	},
});

export const selectActivityTypes = (state: RootState) => {
	return state.activity.types as Activity[];
};

export default activitySlice.reducer;
