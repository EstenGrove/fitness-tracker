import { Hono, type Context } from "hono";
import { activityService } from "../services/index.ts";
import { getResponseError, getResponseOk } from "../utils/api.ts";
import { normalizeActivityType } from "../utils/normalize.ts";
import type { ActivityTypeDB } from "../services/types.ts";

const app = new Hono();

app.get("/getActivityTypes", async (ctx: Context) => {
	const rawTypes =
		(await activityService.getActivityTypes()) as ActivityTypeDB[];

	if (rawTypes instanceof Error) {
		const errResp = getResponseError(rawTypes, {
			activityTypes: [],
		});

		return ctx.json(errResp);
	}

	const activityTypes = rawTypes.map((type) => normalizeActivityType(type));

	const resp = getResponseOk({
		activityTypes: activityTypes,
	});

	return ctx.json(resp);
});

export default app;
