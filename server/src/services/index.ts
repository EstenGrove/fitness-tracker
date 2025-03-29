import db from "../db/db.ts";
import { ActivityService } from "./ActivityService.ts";
import { SharedDataService } from "./SharedDataService.ts";
import { WorkoutsService } from "./WorkoutsService.ts";

// Services
const workoutsService = new WorkoutsService(db);
const activityService = new ActivityService(db);
const sharedDataService = new SharedDataService(db);

const allServices = {
	activity: activityService,
	workouts: workoutsService,
	shared: sharedDataService,
};

export { workoutsService, activityService, sharedDataService, allServices };
