import dashboardRoutes from "../routes/dashboardRoutes.ts";
import activityRoutes from "../routes/activityRoutes.ts";
import workoutRoutes from "../routes/workoutRoutes.ts";
import historyRoutes from "../routes/historyRoutes.ts";
import sharedRoutes from "../routes/sharedRoutes.ts";
import userRoutes from "../routes/userRoutes.ts";

const allRoutes = {
	dashboard: dashboardRoutes,
	activity: activityRoutes,
	workouts: workoutRoutes,
	history: historyRoutes,
	shared: sharedRoutes,
	user: userRoutes,
};

export { allRoutes };
