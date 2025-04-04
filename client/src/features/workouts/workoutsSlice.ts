import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { TStatus } from "../types";
import { TodaysWorkout, Workout, WorkoutSchedule } from "./types";
import { RootState } from "../../store/store";
import {
	getActiveWorkout,
	getSelectedWorkout,
	getTodaysWorkouts,
} from "./operations";
import { WorkoutHistory } from "../history/types";
import { SelectedWorkout } from "../../utils/utils_workouts";

export interface ActiveWorkout {
	workout: Workout;
	schedule: WorkoutSchedule;
	history: Workout[];
}
export interface WorkoutsSlice {
	status: TStatus;
	error: Error | string | null | SerializedError;
	workouts: Workout[];
	todaysWorkouts: TodaysWorkout[];
	activeWorkout: {
		workout: Workout | null;
		schedule: WorkoutSchedule | null;
		history: Workout[];
	};
	selectedWorkout: {
		workout: Workout | null;
		schedule: WorkoutSchedule | null;
		history: WorkoutHistory[];
	};
}

const initialState: WorkoutsSlice = {
	status: "IDLE",
	error: null,
	workouts: [],
	todaysWorkouts: [],
	activeWorkout: {
		workout: null,
		schedule: null,
		history: [],
	},
	selectedWorkout: {
		workout: null,
		schedule: null,
		history: [],
	},
};

const workoutsSlice = createSlice({
	name: "workouts",
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getSelectedWorkout.pending, (state: WorkoutsSlice) => {
				state.status = "PENDING";
			})
			.addCase(
				getSelectedWorkout.fulfilled,
				(state: WorkoutsSlice, action: PayloadAction<SelectedWorkout>) => {
					state.status = "FULFILLED";
					state.selectedWorkout.workout = action.payload.workout;
					state.selectedWorkout.history = action.payload.history;
					state.selectedWorkout.schedule = action.payload.schedule;
				}
			)
			.addCase(getSelectedWorkout.rejected, (state, action) => {
				state.status = "REJECTED";
				state.error = action.error;
			});

		builder
			.addCase(getActiveWorkout.pending, (state: WorkoutsSlice) => {
				state.status = "PENDING";
			})
			.addCase(getActiveWorkout.fulfilled, (state, action) => {
				state.status = "FULFILLED";
				state.activeWorkout.workout = action.payload.workout;
				state.activeWorkout.schedule = action.payload.schedule;
			});

		builder
			.addCase(getTodaysWorkouts.pending, (state: WorkoutsSlice) => {
				state.status = "PENDING";
			})
			.addCase(
				getTodaysWorkouts.fulfilled,
				(state: WorkoutsSlice, action: PayloadAction<TodaysWorkout[]>) => {
					state.status = "FULFILLED";
					state.todaysWorkouts = action.payload;
				}
			);
	},
});

export const selectWorkoutError = (state: RootState) => {
	return state.workouts.error;
};

export const selectLoadingWorkout = (state: RootState) => {
	return state.workouts.status === "PENDING";
};

export const selectWorkouts = (state: RootState) => {
	return state.workouts.workouts as Workout[];
};

export const selectSelectedWorkout = (state: RootState) => {
	return state.workouts.selectedWorkout as SelectedWorkout;
};

export const selectActiveWorkout = (state: RootState) => {
	return state.workouts.activeWorkout;
};

export default workoutsSlice.reducer;
