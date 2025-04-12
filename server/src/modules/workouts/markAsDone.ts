import { subMinutes } from "date-fns";
import type {
	Activity,
	Effort,
	LogWorkoutPayload,
} from "../../services/types.ts";
import { formatDateTime } from "../../utils/dates.ts";
import { workoutsService } from "../../services/index.ts";

export interface LogWorkoutBody {
	userID: string;
	workoutID: number;
	activityType: Activity;
	workoutDate: string;
	workoutLength: number;
}

const markWorkoutAsDone = async (userID: string, details: LogWorkoutBody) => {
	const { workoutID, activityType, workoutDate, workoutLength } = details;
	const date = new Date(workoutDate);

	const start = formatDateTime(subMinutes(date, workoutLength), "db");
	const end = formatDateTime(date, "db");

	const detailsPayload = {
		userID: userID,
		workoutID: workoutID,
		activityType: activityType,
		workoutDate: workoutDate,
		workoutLength: workoutLength,
		effort: "Easy" as Effort,
		startTime: start,
		endTime: end,
	};

	console.log("[DETAILS]:", detailsPayload);

	try {
		// const response = {};
		const response = await workoutsService.markAsDone(userID, detailsPayload);
		console.log("--RESPONSE--", response);
		return response;
	} catch (error) {
		return error;
	}
};

export interface UndoMarkAsDoneBody {
	userID: string;
	workoutID: number;
	activityType: Activity;
	workoutDate: string;
}

const undoMarkAsDone = async (userID: string, data: UndoMarkAsDoneBody) => {
	const payload = {
		userID,
		workoutID: data.workoutID,
		activityType: data.activityType,
		workoutDate: data.workoutDate,
	};

	try {
		const response = await workoutsService.undoMarkAsDone(userID, payload);
		return response;
	} catch (error) {
		return error;
	}
};

export { markWorkoutAsDone, undoMarkAsDone };
