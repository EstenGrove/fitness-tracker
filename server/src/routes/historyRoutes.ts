import { Hono, type Context } from "hono";
import { historyService } from "../services/index.ts";
import { getResponseError, getResponseOk } from "../utils/api.ts";
import type { Activity } from "../services/types.ts";
import { normalizeHistoryByType } from "../modules/history/history.ts";
import type {
	HistoryDetailsDB,
	HistoryEntryDB,
} from "../modules/history/types.ts";

const app = new Hono();

app.get("/getWorkoutHistoryByRange", async (ctx: Context) => {
	const { userID, startDate, endDate } = ctx.req.query();

	const details = await historyService.getHistoryDetailsForRange(userID, {
		startDate,
		endDate,
	});

	console.log("details", details);

	if (details instanceof Error) {
		const errResp = getResponseError(details, {
			history: [],
		});
		return ctx.json(errResp);
	}

	const resp = getResponseOk({
		history: details,
	});

	return ctx.json(resp);
});
app.get("/getWorkoutHistoryByRangeAndType", async (ctx: Context) => {
	const { userID, activityType, startDate, endDate } = ctx.req.query();
	const type = activityType as Activity;

	const details = (await historyService.getHistoryDetailsForRangeAndType(
		userID,
		{
			type,
			startDate,
			endDate,
		}
	)) as { history: HistoryEntryDB[] };

	console.log("details", details);

	if (details instanceof Error) {
		const errResp = getResponseError(details, {
			history: [],
		});
		return ctx.json(errResp);
	}

	const records = normalizeHistoryByType(type, details.history);

	const resp = getResponseOk({
		history: records,
	});

	return ctx.json(resp);
});

export default app;
