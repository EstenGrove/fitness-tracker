import activityRoutes from "../routes/activityRoutes.ts";
import workoutRoutes from "../routes/workoutRoutes.ts";
import sharedRoutes from "../routes/sharedRoutes.ts";

const allRoutes = {
	activity: activityRoutes,
	workouts: workoutRoutes,
	shared: sharedRoutes,
};

export { allRoutes };
