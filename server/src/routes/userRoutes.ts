import { Hono, type Context } from "hono";
import { login } from "../modules/auth/auth.ts";
import { getResponseError, getResponseOk } from "../utils/api.ts";
import { normalizeSession, normalizeUser } from "../utils/normalize.ts";

const app = new Hono();

app.post("/login", async (ctx: Context) => {
	const body = await ctx.req.json();
	const { username, password } = body;

	const loginData = await login(username, password);

	if (loginData instanceof Error) {
		const errResp = getResponseError(loginData, {
			currentUser: null,
			currentSession: null,
		});
		return ctx.json(errResp);
	}

	const { user, session } = loginData;
	const currentUser = normalizeUser(user);
	const currentSession = normalizeSession(session);

	const resp = getResponseOk({
		currentUser: currentUser,
		currentSession: currentSession,
	});

	return ctx.json(resp);
});

export default app;
