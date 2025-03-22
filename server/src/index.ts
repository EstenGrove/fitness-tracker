import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono().basePath("/api/v1");

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

serve({
	fetch: app.fetch,
	port: 3000,
});

console.log("Server is running on http://localhost:3000");
