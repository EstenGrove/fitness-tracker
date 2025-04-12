import { createSlice } from "@reduxjs/toolkit";
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

export interface HistorySlice {
	status: TStatus;
	range: DateRange;
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
	reducers: {},
});

export default historySlice.reducer;
