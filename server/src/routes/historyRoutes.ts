import { Hono, type Context } from "hono";
import { historyService } from "../services/index.ts";
import { getResponseError, getResponseOk } from "../utils/api.ts";
import type { Activity } from "../services/types.ts";
import { normalizeHistoryByType } from "../modules/history/history.ts";
import type {
	HistoryDetailsDB,
	HistoryEntryDB,
	SelectedHistoryDB,
} from "../modules/history/types.ts";
import { normalizeWorkout } from "../utils/normalize.ts";

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
app.get("/getSelectedHistory", async (ctx: Context) => {
	const { userID, historyID, activityType } = ctx.req.query();

	const id = Number(historyID);
	const type = activityType as Activity;

	const details = (await historyService.getSelectedHistoryDetails(
		userID,
		id,
		type
	)) as SelectedHistoryDB;

	if (details instanceof Error) {
		const errResp = getResponseError(details, {
			recentHistory: [],
			relatedWorkout: null,
			selectedHistory: null,
		});
		return ctx.json(errResp);
	}

	const recents = details.recentHistory;
	const workout = details.relatedWorkout;
	const selected = details.selectedHistory;

	const relatedWorkout = normalizeWorkout(workout);
	const history = normalizeHistoryByType(type, [selected]);
	const recentHistory = normalizeHistoryByType(type, recents);

	const resp = getResponseOk({
		recentHistory: recentHistory,
		relatedWorkout: relatedWorkout,
		selectedHistory: history[0],
	});

	return ctx.json(resp);
});

export default app;
