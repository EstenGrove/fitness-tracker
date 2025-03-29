import { createSlice } from "@reduxjs/toolkit";
import { TStatus } from "../types";
import { Workout } from "./types";
import { RootState } from "../../store/store";

export interface WorkoutsSlice {
	status: TStatus;
	workouts: Workout[];
	activeWorkout: {
		record: Workout | null;
		history: Workout[];
	};
}

const initialState: WorkoutsSlice = {
	status: "IDLE",
	workouts: [],
	activeWorkout: {
		record: null,
		history: [],
	},
};

const workoutsSlice = createSlice({
	name: "workouts",
	initialState: initialState,
	reducers: {},
});

export const selectWorkouts = (state: RootState) => {
	return state.workouts.workouts as Workout[];
};

export default workoutsSlice.reducer;
