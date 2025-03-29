import { Hono, type Context } from "hono";
import { workoutsService } from "../services/index.ts";
import type { WorkoutDB } from "../services/types.ts";
import { getResponseError, getResponseOk } from "../utils/api.ts";
import { normalizeWorkouts } from "../utils/normalize.ts";

const app = new Hono();

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

export default app;
