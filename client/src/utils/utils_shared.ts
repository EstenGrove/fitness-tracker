import { ActivityType } from "../features/activity/types";
import { AsyncResponse } from "../features/types";
import { WorkoutType } from "../features/workouts/types";
import { currentEnv, sharedApis } from "./utils_env";

export interface SharedData {
	activityTypes: ActivityType[];
	workoutTypes: WorkoutType[];
}

export type SharedAppResp = AsyncResponse<SharedData>;

const fetchSharedAppData = async (): SharedAppResp => {
	const url = currentEnv.base + sharedApis.getSharedAppData;

	try {
		const request = await fetch(url);
		const response = await request.json();

		return response;
	} catch (error) {
		return error;
	}
};

export { fetchSharedAppData };
