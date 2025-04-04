import { Hono, type Context } from "hono";
import { workoutsService } from "../services/index.ts";
import type {
	Activity,
	SelectedWorkoutDetailsDB,
	WorkoutDB,
	WorkoutDetailsDB,
} from "../services/types.ts";
import { getResponseError, getResponseOk } from "../utils/api.ts";
import {
	normalizeActiveWorkout,
	normalizeTodaysWorkouts,
	normalizeWorkoutDetails,
	normalizeWorkoutInfo,
	normalizeWorkouts,
} from "../utils/normalize.ts";
import type { WorkoutInfoDB } from "../modules/types.ts";
import type {
	TodaysWorkoutDB,
	WorkoutLogBody,
} from "../modules/workouts/types.ts";
import type {
	ActiveWorkoutDB,
	WorkoutHistoryLog,
} from "../services/WorkoutsService.ts";

const app = new Hono();

app.get("/getTodaysWorkouts", async (ctx: Context) => {
	const { userID, targetDate } = ctx.req.query();

	const workouts = (await workoutsService.getTodaysWorkouts(
		userID,
		targetDate
	)) as TodaysWorkoutDB[];

	if (workouts instanceof Error) {
		const errResp = getResponseError(workouts, {
			workouts: [],
		});
		return ctx.json(errResp);
	}

	const todaysWorkouts = normalizeTodaysWorkouts(workouts);

	const resp = getResponseOk({
		workouts: todaysWorkouts,
	});

	return ctx.json(resp);
});
app.get("/getUserWorkouts", async (ctx: Context) => {
	const { userID } = ctx.req.query();
	const rawWorkouts = (await workoutsService.getAllUserWorkouts(
		userID
	)) as WorkoutDB[];

	if (rawWorkouts instanceof Error) {
		const errResp = getResponseError(rawWorkouts, {
			userWorkouts: [],
		});
		return ctx.json(errResp);
	}

	const userWorkouts = normalizeWorkouts(rawWorkouts);

	const resp = getResponseOk({
		userWorkouts: userWorkouts,
	});

	return ctx.json(resp);
});
app.get("/getSelectedWorkout", async (ctx: Context) => {
	const { userID, workoutID, activityType } = ctx.req.query();
	const selected = (await workoutsService.getSelectedWorkoutDetails(
		userID,
		Number(workoutID),
		activityType as Activity
	)) as WorkoutInfoDB;

	if (selected instanceof Error) {
		const errResp = getResponseError(selected, {
			selectedWorkout: selected,
		});
		return ctx.json(errResp);
	}
	const type = activityType as Activity;
	const selectedWorkout = normalizeWorkoutInfo(type, selected);

	const resp = getResponseOk({ ...selectedWorkout, activityType });

	return ctx.json(resp);
});
app.get("/getSelectedWorkoutDetails", async (ctx: Context) => {
	const { userID, workoutID, activityType } = ctx.req.query();

	const selected = (await workoutsService.getSelectedWorkoutDetails(
		userID,
		Number(workoutID),
		activityType as Activity
	)) as SelectedWorkoutDetailsDB;
	console.log("selected", selected);

	if (selected instanceof Error) {
		const errResp = getResponseError(selected, {
			selectedWorkout: selected,
		});
		return ctx.json(errResp);
	}

	// const selectedWorkout = normalizeWorkoutDetails(selected);

	const resp = getResponseOk({
		selectedWorkout: [],
	});

	return ctx.json(resp);
});
app.get("/getActiveWorkout", async (ctx: Context) => {
	const { userID, workoutID, activityType } = ctx.req.query();
	const active = (await workoutsService.getActiveWorkout(
		userID,
		Number(workoutID),
		activityType as Activity
	)) as ActiveWorkoutDB;

	if (active instanceof Error) {
		const errResp = getResponseError(active, {
			workout: null,
			schedule: null,
		});

		return ctx.json(errResp);
	}

	const details = normalizeActiveWorkout(active);

	const resp = getResponseOk({
		workout: details.workout,
		schedule: details.schedule,
	});

	return ctx.json(resp);
});
app.post("/endWorkout", async (ctx: Context) => {
	const body = (await ctx.req.json()) as WorkoutLogBody;

	const rawHistory = {};

	console.log("body", body);

	// const rawHistory = await workoutsService.endWorkout(body);

	if (rawHistory instanceof Error) {
		const errResp = getResponseError(rawHistory, {
			history: [],
		});
		return ctx.json(errResp);
	}

	const resp = getResponseOk({
		history: [],
	});

	return ctx.json(resp);
});
export default app;
