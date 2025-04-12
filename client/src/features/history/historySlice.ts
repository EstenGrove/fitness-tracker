import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateRange, TStatus } from "../types";
import {
	CardioHistory,
	OtherHistory,
	StrengthHistory,
	StretchHistory,
	TimedHistory,
	WalkHistory,
	WorkoutHistory,
} from "./types";
import { formatDate } from "../../utils/utils_dates";
import { getLastXMonthsRange } from "../../utils/utils_calendar";
import { RootState } from "../../store/store";
import { getSelectedHistory } from "./operations";
import { Workout } from "../workouts/types";
import { SelectedHistory } from "../../utils/utils_history";

export interface HistorySlice {
	status: TStatus;
	range: DateRange;
	selectedHistory: {
		entry: WorkoutHistory | null;
		workout: Workout | null;
		recents: WorkoutHistory[];
	};
	history: {
		all: WorkoutHistory[];
		strength: StrengthHistory[];
		walk: WalkHistory[];
		stretch: StretchHistory[];
		cardio: CardioHistory[];
		timed: TimedHistory[];
		other: OtherHistory[];
	};
}

const base = getLastXMonthsRange(3);

const initialState: HistorySlice = {
	status: "IDLE",
	range: {
		startDate: formatDate(base.startDate, "db"),
		endDate: formatDate(base.endDate, "db"),
	},
	selectedHistory: {
		entry: null,
		workout: null,
		recents: [],
	},
	history: {
		all: [],
		strength: [],
		walk: [],
		stretch: [],
		cardio: [],
		timed: [],
		other: [],
	},
};

const historySlice = createSlice({
	name: "workouts",
	initialState: initialState,
	reducers: {
		setHistoryRange(state: HistorySlice, action: PayloadAction<DateRange>) {
			state.range = action.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(getSelectedHistory.pending, (state: HistorySlice) => {
				state.status = "PENDING";
			})
			.addCase(
				getSelectedHistory.fulfilled,
				(state: HistorySlice, action: PayloadAction<SelectedHistory>) => {
					state.status = "FULFILLED";
					state.selectedHistory.entry = action.payload.selectedHistory;
					state.selectedHistory.workout = action.payload.relatedWorkout;
					state.selectedHistory.recents = action.payload.recentHistory;
				}
			);
	},
});

export const { setHistoryRange } = historySlice.actions;

export const selectSelectedHistory = (state: RootState) => {
	return state.history.selectedHistory as {
		entry: WorkoutHistory;
		workout: Workout;
		recents: WorkoutHistory[];
	};
};

export const selectHistoryRange = (state: RootState) => {
	return state.history.range as DateRange;
};

export default historySlice.reducer;
