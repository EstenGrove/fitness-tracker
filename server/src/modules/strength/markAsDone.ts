import { addMinutes, subMinutes } from "date-fns";
import { workoutsService } from "../../services/index.ts";
import type { StrengthSet, StrengthWorkoutClient } from "./types.ts";
import { formatDate, formatDateTime } from "../../utils/dates.ts";
import type {
	LogWorkoutPayload,
	WorkoutClient,
	WorkoutDetailsClient,
} from "../../services/types.ts";

const generateStrengthSets = (sets: number, reps: number, weight: number) => {
	const newSets: StrengthSet[] = [];

	for (let i = 0; i < sets; i++) {
		const newSet = {
			id: i + 1,
			sets: 1,
			reps: reps,
			weight: weight,
		};
		newSets.push(newSet);
	}

	return newSets;
};

const markStrengthAsDone = async (
	userID: string,
	workout: StrengthWorkoutClient
) => {
	const { sets, reps, weight, duration } = workout;
	const now = new Date();
	const start = formatDateTime(subMinutes(now, duration), "db");
	const end = formatDateTime(addMinutes(start, duration), "db");

	const record: LogWorkoutPayload = {
		userID: userID,
		workoutID: workout.workoutID,
		activityType: workout.activityType,
		startTime: start,
		endTime: end,
		duration: duration,
		effort: "Easy",
		workoutDate: formatDate(new Date(), "db"),
	};

	try {
		const history = await workoutsService.markAsDone(userID, record);
	} catch (error) {}
};

export { markStrengthAsDone };
