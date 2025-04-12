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

export type HistoryDetailsRep = AsyncResponse<HistoryDetails>;
export type HistoryTypeResp = AsyncResponse<{ history: WorkoutHistory[] }>;

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

export { fetchWorkoutHistoryForRange, fetchHistoryByRangeAndActivity };
