import { Hono, type Context } from "hono";
import { sharedDataService } from "../services/index.ts";
import { getResponseError, getResponseOk } from "../utils/api.ts";
import { normalizeSharedData } from "../utils/normalize.ts";
import type { SharedDataDB } from "../services/types.ts";

const app = new Hono();

app.get("/getSharedAppData", async (ctx: Context) => {
	const rawData = (await sharedDataService.getSharedAppData()) as SharedDataDB;

	console.log("rawData", rawData);

	if (rawData instanceof Error) {
		const errResp = getResponseError(rawData, {
			activityTypes: [],
			workoutTypes: [],
		});
		return ctx.json(errResp);
	}

	const sharedData = normalizeSharedData(rawData);
	const resp = getResponseOk(sharedData);

	return ctx.json(resp);
});

export default app;
