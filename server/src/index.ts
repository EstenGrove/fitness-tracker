import dotenv from "dotenv";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { allRoutes } from "./routes/index.ts";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
dotenv.config();

const SERVER = {
	host: process.env.API_HOST,
	port: Number(process.env.API_PORT),
};

const app = new Hono().basePath("/api/v1");

app.use(logger());
app.use(cors());

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.route("user", allRoutes.user);
app.route("shared", allRoutes.shared);
app.route("activity", allRoutes.activity);
app.route("workouts", allRoutes.workouts);
app.route("dashboard", allRoutes.dashboard);

serve({
	fetch: app.fetch,
	hostname: SERVER.host,
	port: SERVER.port,
});

console.log(`\n✅ - Server is running on http://${SERVER.host}:${SERVER.port}`);
