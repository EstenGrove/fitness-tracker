import { Activity } from "../features/activity/types";
import {
	CardioHistory,
	OtherHistory,
	StrengthHistory,
	StretchHistory,
	TimedHistory,
	WalkHistory,
	WorkoutHistory,
} from "../features/history/types";
import { AsyncResponse, DateRange } from "../features/types";
import { Workout } from "../features/workouts/types";
import { currentEnv, historyApis } from "./utils_env";

export interface HistoryDetails {
	all: WorkoutHistory[];
	strength: StrengthHistory[];
	walk: WalkHistory[];
	stretch: StretchHistory[];
	cardio: CardioHistory[];
	timed: TimedHistory[];
	other: OtherHistory[];
}

export interface SelectedHistory {
	selectedHistory: WorkoutHistory;
	relatedWorkout: Workout;
	recentHistory: WorkoutHistory[];
}

export type HistoryDetailsRep = AsyncResponse<HistoryDetails>;
export type HistoryTypeResp = AsyncResponse<{ history: WorkoutHistory[] }>;
export type SelectedHistoryResp = AsyncResponse<SelectedHistory>;

const fetchWorkoutHistoryForRange = async (
	userID: string,
	range: DateRange
): HistoryDetailsRep => {
	let url = currentEnv.base + historyApis.getByRange;
	url += "?" + new URLSearchParams({ userID });
	url += "&" + new URLSearchParams({ ...range });

	try {
		const request = await fetch(url);
		const response = await request.json();

		return response;
	} catch (error) {
		return error;
	}
};

const fetchHistoryByRangeAndActivity = async (
	userID: string,
	activityType: Activity,
	range: DateRange
): HistoryTypeResp => {
	let url = currentEnv.base + historyApis.getByRangeAndActivity;
	url += "?" + new URLSearchParams({ userID });
	url += "&" + new URLSearchParams({ activityType });
	url += "&" + new URLSearchParams({ ...range });

	try {
		const request = await fetch(url);
		const response = await request.json();

		return response;
	} catch (error) {
		return error;
	}
};

const fetchSelectedHistory = async (
	userID: string,
	historyID: number,
	activityType: Activity
): SelectedHistoryResp => {
	let url = currentEnv.base + historyApis.getSelectedHistory;
	url += "?" + new URLSearchParams({ userID });
	url += "&" + new URLSearchParams({ activityType });
	url += "&" + new URLSearchParams({ historyID: String(historyID) });

	try {
		const request = await fetch(url);
		const response = await request.json();
		return response;
	} catch (error) {
		return error;
	}
};

const sortHistoryByDate = (history: WorkoutHistory[]) => {
	if (!history || !history.length) return [];

	return [...history].sort((a: WorkoutHistory, b: WorkoutHistory) => {
		const startA = a.startTime;
		const startB = b.startTime;
		const timeA = new Date(startA).getTime();
		const timeB = new Date(startB).getTime();
		return timeB - timeA;
	});
};

export {
	fetchSelectedHistory,
	fetchWorkoutHistoryForRange,
	fetchHistoryByRangeAndActivity,
	sortHistoryByDate,
};
