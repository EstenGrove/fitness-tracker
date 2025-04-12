import db from "../db/db.ts";
import { ActivityService } from "./ActivityService.ts";
import { DashboardService } from "./DashboardService.ts";
import { HistoryService } from "./HistoryService.ts";
import { SessionService } from "./SessionService.ts";
import { SharedDataService } from "./SharedDataService.ts";
import { UserService } from "./UserService.ts";
import { WorkoutsService } from "./WorkoutsService.ts";

// Services
const userService = new UserService(db);
const historyService = new HistoryService(db);
const sessionService = new SessionService(db);
const workoutsService = new WorkoutsService(db);
const activityService = new ActivityService(db);
const dashboardService = new DashboardService(db);
const sharedDataService = new SharedDataService(db);

const allServices = {
	user: userService,
	history: historyService,
	dashboard: dashboardService,
	activity: activityService,
	workouts: workoutsService,
	shared: sharedDataService,
	session: sessionService,
};

export {
	userService,
	sessionService,
	workoutsService,
	activityService,
	dashboardService,
	sharedDataService,
	historyService,
	allServices,
};
