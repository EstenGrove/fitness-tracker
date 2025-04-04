import { Hono, type Context } from "hono";
import { dashboardService } from "../services/index.ts";
import { getResponseError, getResponseOk } from "../utils/api.ts";
import { normalizeRecentMins } from "../utils/normalize.ts";
import type {
	RecentMinsDB,
	RecentMinsClient,
} from "../modules/dashboard/types.ts";

const app = new Hono();

app.get("/getRecentMins", async (ctx: Context) => {
	const { userID, targetDate } = ctx.req.query();

	const mins = (await dashboardService.getRecentMinsForWeek(
		userID,
		targetDate
	)) as RecentMinsDB[];

	if (mins instanceof Error) {
		const errResp = getResponseError(mins, {
			recentMins: [],
		});
		return ctx.json(errResp);
	}

	const recentMins: RecentMinsClient[] = normalizeRecentMins(mins);
	const resp = getResponseOk({
		recentMins: recentMins,
	});

	return ctx.json(resp);
});

app.get("/getDashboardSummary", async (ctx: Context) => {
	const { userID, targetDate } = ctx.req.query();

	const summary = {};

	const resp = getResponseOk({
		summary: {},
	});

	return ctx.json(resp);
});

export default app;
