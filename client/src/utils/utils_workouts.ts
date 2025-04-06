import { Activity, ActivityType } from "../features/activity/types";
import { Effort, WorkoutHistory } from "../features/history/types";
import { AsyncResponse } from "../features/types";
import {
	CardioWorkout,
	OtherWorkout,
	StrengthSet,
	StrengthWorkout,
	StretchWorkout,
	TimedWorkout,
	TodaysWorkout,
	WalkWorkout,
	Workout,
	WorkoutDetails,
	WorkoutSchedule,
} from "../features/workouts/types";
import { currentEnv, workoutApis } from "./utils_env";

export interface AllUserWorkouts {
	userWorkouts: Workout[];
	strengthWorkouts: StrengthWorkout[];
	walkWorkouts: WalkWorkout[];
	stretchWorkouts: StretchWorkout[];
	cardioWorkouts: CardioWorkout[];
	timedWorkouts: TimedWorkout[];
	otherWorkouts: OtherWorkout[];
}

export interface UserWorkouts {
	userWorkouts: Workout[];
}

export interface SelectedWorkout {
	workout: Workout;
	history: WorkoutHistory[];
	activityType: ActivityType;
	schedule: WorkoutSchedule;
}
export interface ActiveWorkout {
	workout: Workout;
	schedule: WorkoutSchedule;
	history: WorkoutHistory[];
}
export type TodaysWorkoutsResp = AsyncResponse<TodaysWorkout[]>;
export type UserWorkoutsResp = AsyncResponse<UserWorkouts>;
export type AllUserWorkoutsResp = AsyncResponse<AllUserWorkouts>;
export type SelectedWorkoutResp = AsyncResponse<SelectedWorkout>;
export type ActiveWorkoutResp = AsyncResponse<ActiveWorkout>;

const fetchTodaysWorkouts = async (
	userID: string,
	targetDate: string
): TodaysWorkoutsResp => {
	let url = currentEnv.base + workoutApis.getTodaysWorkouts;
	url += "?" + new URLSearchParams({ userID, targetDate });

	try {
		const request = await fetch(url);
		const response = await request.json();

		return response;
	} catch (error) {
		return error;
	}
};

const fetchAllUserWorkouts = async (userID: string): UserWorkoutsResp => {
	let url = currentEnv.base + workoutApis.getUserWorkouts;
	url += "?" + new URLSearchParams({ userID });

	try {
		const request = await fetch(url);
		const response = await request.json();

		return response;
	} catch (error) {
		return error;
	}
};
const fetchUserWorkoutsForDate = async (
	userID: string,
	targetDate: string
): UserWorkoutsResp => {
	let url = currentEnv.base + workoutApis.getUserWorkoutsByDate;
	url += "?" + new URLSearchParams({ userID, targetDate });

	try {
		const request = await fetch(url);
		const response = await request.json();

		return response;
	} catch (error) {
		return error;
	}
};
const fetchSelectedWorkout = async (
	userID: string,
	workoutID: number,
	activityType: Activity
): SelectedWorkoutResp => {
	let url = currentEnv.base + workoutApis.getSelectedWorkout;
	url += "?" + new URLSearchParams({ userID });
	url += "&" + new URLSearchParams({ workoutID: String(workoutID) });
	url += "&" + new URLSearchParams({ activityType });

	try {
		const request = await fetch(url);
		const response = await request.json();
		return response;
	} catch (error) {
		return error;
	}
};
const fetchSelectedWorkoutDetails = async (
	userID: string,
	workoutID: number,
	activityType: Activity
): SelectedWorkoutResp => {
	let url = currentEnv.base + workoutApis.getSelectedWorkout;
	url += "?" + new URLSearchParams({ userID });
	url += "&" + new URLSearchParams({ workoutID: String(workoutID) });
	url += "&" + new URLSearchParams({ activityType });

	try {
		const request = await fetch(url);
		const response = await request.json();
		return response;
	} catch (error) {
		return error;
	}
};
const fetchActiveWorkout = async (
	userID: string,
	workoutID: number,
	activityType: Activity
): ActiveWorkoutResp => {
	let url = currentEnv.base + workoutApis.getActiveWorkout;
	url += "?" + new URLSearchParams({ userID });
	url += "&" + new URLSearchParams({ workoutID: String(workoutID) });
	url += "&" + new URLSearchParams({ activityType });

	try {
		const request = await fetch(url);
		const response = await request.json();
		return response;
	} catch (error) {
		return error;
	}
};

const endActiveWorkout = async (userID: string, details: object) => {
	let url = currentEnv.base + workoutApis.endWorkout;
	url += "?" + new URLSearchParams({ userID });

	try {
		const request = await fetch(url, {
			method: "POST",
			body: JSON.stringify(details),
		});
		const response = await request.json();
		return response;
	} catch (error) {
		return error;
	}
};

export interface MarkAsDoneBody {
	userID: string;
	workoutID: number;
	activityType: Activity;
	workoutDate: string;
	effort: Effort;
	workoutLength: number;
}

export type MarkAsDoneResp = AsyncResponse<{
	updatedWorkout: TodaysWorkout;
	history: WorkoutHistory;
}>;

const markWorkoutAsDone = async (
	userID: string,
	details: MarkAsDoneBody
): MarkAsDoneResp => {
	let url = currentEnv.base + workoutApis.markAsDone;
	url += "?" + new URLSearchParams({ userID });

	try {
		const response = await fetch(url, {
			method: "POST",
			body: JSON.stringify(details),
		});
		const request = await response.json();
		return request;
	} catch (error) {
		return error;
	}
};

// Workout Logging Utils

interface LogStrengthSet {
	sets: number;
	reps: number;
	weight: number;
}

const prepareStrengthSets = (sets: LogStrengthSet[]): StrengthSet[] => {
	const loggedSets = sets.map((entry, idx) => ({
		id: idx + 1,
		sets: entry.sets,
		reps: entry.reps,
		weight: entry.weight,
	}));

	return loggedSets;
};

export interface WorkoutLog {
	workoutDate: Date | string;
	startTime: Date | string;
	endTime: Date | string;
	startedAt: Date | string;
	endedAt: Date | string;
	duration: number;
}
export interface StrengthLog extends WorkoutLog {
	sets: LogStrengthSet[];
}

export interface CardioLog extends WorkoutLog {
	exercise: string;
	reps: number;
}
export interface StretchLog extends WorkoutLog {
	exercise: string;
	reps: number;
}
export interface TimedLog extends WorkoutLog {
	exercise: string;
	reps: number;
}
export interface OtherLog extends WorkoutLog {
	exercise: string;
	reps: number;
}
export interface WalkLog extends WorkoutLog {
	steps: number;
	miles: number;
	pace: number;
}

export type WorkoutLogDetails =
	| StrengthLog
	| CardioLog
	| WalkLog
	| StretchLog
	| TimedLog
	| OtherLog;

const generateStrengthSets = (
	workout: Pick<StrengthWorkout, "sets" | "reps" | "weight">
) => {
	const { sets, reps, weight } = workout;
	const workoutSets: StrengthSet[] = [];

	for (let i = 0; i < sets; i++) {
		const entry: StrengthSet = {
			id: i + 1,
			sets: 1,
			reps: reps + i,
			weight,
		};
		workoutSets.push(entry);
	}

	return workoutSets;
};

const prepareBaseWorkoutLog = (workout: Workout, values: WorkoutLogDetails) => {
	const start = values.startTime || values.startedAt;
	const end = values.endTime || values.endedAt;
	const newLog = {
		userID: workout.userID,
		workoutID: workout.workoutID,
		activityType: workout.activityType,
		duration: values.duration,
		workoutDate: values.workoutDate,
		startTime: start,
		endTime: end,
	};

	return newLog;
};
const prepareStrengthLog = (workout: Workout, values: StrengthLog) => {
	const loggedSets = values?.sets;
	if (!loggedSets || !loggedSets.length) {
		const baseLog = prepareBaseWorkoutLog(workout, values);
		const newSets = generateStrengthSets(workout as StrengthWorkout);
		const newLog = {
			...baseLog,
			sets: newSets,
		};

		return newLog;
	} else {
		const baseLog = prepareBaseWorkoutLog(workout, values);
		const newSets = prepareStrengthSets(values.sets);
		const newLog = {
			...baseLog,
			sets: newSets,
		};

		return newLog;
	}
};
const prepareCardioLog = (workout: Workout, values: CardioLog) => {
	const baseLog = prepareBaseWorkoutLog(workout, values);
	const cardioVals = {
		...baseLog,
		exercise: values.exercise,
		reps: values.reps,
	};
	return cardioVals;
};
const prepareStretchLog = (workout: Workout, values: CardioLog) => {
	const baseLog = prepareBaseWorkoutLog(workout, values);
	const cardioVals = {
		...baseLog,
		exercise: values.exercise,
		reps: values.reps,
	};
	return cardioVals;
};
const prepareTimedLog = (workout: Workout, values: TimedLog) => {
	const baseLog = prepareBaseWorkoutLog(workout, values);
	const cardioVals = {
		...baseLog,
		exercise: values.exercise,
		reps: values.reps,
	};
	return cardioVals;
};
const prepareOtherLog = (workout: Workout, values: OtherLog) => {
	const baseLog = prepareBaseWorkoutLog(workout, values);
	const cardioVals = {
		...baseLog,
		exercise: values.exercise,
		reps: values.reps,
	};
	return cardioVals;
};
const prepareWalkLog = (workout: Workout, values: WalkLog) => {
	const baseLog = prepareBaseWorkoutLog(workout, values);
	const cardioVals = {
		...baseLog,
		steps: values.steps,
		miles: values.miles,
		pace: values.pace || values.miles,
	};
	return cardioVals;
};

const prepareWorkoutLog = (workout: Workout, values: WorkoutLogDetails) => {
	const type = workout.activityType;

	switch (type) {
		case "Strength": {
			const log = prepareStrengthLog(workout, values as StrengthLog);
			return log;
		}
		case "Stretch": {
			const log = prepareStretchLog(workout, values as StretchLog);
			return log;
		}
		case "Cardio": {
			const log = prepareCardioLog(workout, values as CardioLog);
			return log;
		}
		case "Walk": {
			const log = prepareWalkLog(workout, values as WalkLog);
			return log;
		}
		case "Timed": {
			const log = prepareTimedLog(workout, values as TimedLog);
			return log;
		}
		case "Other": {
			const log = prepareOtherLog(workout, values as OtherLog);
			return log;
		}

		default:
			throw new Error("Invalid activity type: " + type);
	}
};

export {
	fetchTodaysWorkouts,
	fetchUserWorkoutsForDate,
	fetchAllUserWorkouts,
	fetchSelectedWorkout,
	fetchActiveWorkout,
	fetchSelectedWorkoutDetails,
	endActiveWorkout,
	markWorkoutAsDone,
	// Logging Utils
	generateStrengthSets,
	prepareBaseWorkoutLog,
	prepareStrengthSets,
	prepareStrengthLog,
	prepareCardioLog,
	prepareOtherLog,
	prepareStretchLog,
	prepareTimedLog,
	prepareWalkLog,
	prepareWorkoutLog,
};
