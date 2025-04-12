import type {
	UserSessionClient,
	UserSessionDB,
} from "../modules/auth/types.ts";
import type {
	CardioHistoryClient,
	CardioHistoryDB,
} from "../modules/cardio/types.ts";
import type { DashboardSummaryDB } from "../modules/dashboard/types.ts";
import type {
	OtherHistoryClient,
	OtherHistoryDB,
} from "../modules/other/types.ts";
import type {
	StrengthHistoryClient,
	StrengthHistoryDB,
} from "../modules/strength/types.ts";
import type {
	StretchHistoryClient,
	StretchHistoryDB,
} from "../modules/stretch/types.ts";
import type {
	TimedHistoryClient,
	TimedHistoryDB,
} from "../modules/timed/types.ts";
import type {
	WorkoutHistoryByTypeClient,
	WorkoutHistoryByTypeDB,
	WorkoutInfoDB,
} from "../modules/types.ts";
import type {
	WalkHistoryClient,
	WalkHistoryDB,
} from "../modules/walk/types.ts";
import type {
	TodaysWorkoutClient,
	TodaysWorkoutDB,
} from "../modules/workouts/types.ts";
import type {
	Activity,
	ActivityTypeClient,
	ActivityTypeDB,
	CardioWorkout,
	OtherWorkout,
	RecentMinsClient,
	RecentMinsDB,
	SharedDataClient,
	SharedDataDB,
	StrengthSet,
	StrengthWorkout,
	StretchWorkout,
	TimedWorkout,
	WalkWorkout,
	WorkoutClient,
	WorkoutDB,
	WorkoutDetailsClient,
	WorkoutDetailsDB,
	WorkoutHistoryClient,
	WorkoutHistoryDB,
	WorkoutHistoryItemClient,
	WorkoutHistoryItemDB,
	WorkoutScheduleClient,
	WorkoutScheduleDB,
	WorkoutTypeClient,
	WorkoutTypeDB,
} from "../services/types.ts";
import type { UserClient, UserDB } from "../services/UserService.ts";
import type { ActiveWorkoutDB } from "../services/WorkoutsService.ts";

const normalizeUser = (user: UserDB): UserClient => {
	const client: UserClient = {
		userID: user.user_id,
		username: user.username,
		password: user.password,
		firstName: user.first_name,
		lastName: user.last_name,
		userAvatar: user.user_avatar,
		lastLoginDate: user.last_login_date,
		isActive: user.is_active,
		createdDate: user.created_date,
	};
	return client;
};

const normalizeSession = (session: UserSessionDB): UserSessionClient => {
	const client: UserSessionClient = {
		userID: session.user_id,
		sessionID: session.session_id,
		sessionStart: session.session_start,
		sessionEnd: session.session_end,
		sessionToken: session.session_token,
		lastUpdated: session.last_updated,
		isActive: session.is_active,
	};

	return client;
};

const normalizeTodaysWorkout = (
	workout: TodaysWorkoutDB
): TodaysWorkoutClient => {
	const client: TodaysWorkoutClient = {
		userID: workout.user_id,
		workoutID: workout.workout_id,
		workoutName: workout.workout_name,
		activityType: workout.activity_type,
		duration: workout.duration,
		startTime: workout.start_time,
		endTime: workout.end_time,
		isRecurring: workout.is_recurring,
		workoutStatus: workout.workout_status,
	};

	return client;
};

const normalizeTodaysWorkouts = (
	workouts: TodaysWorkoutDB[]
): TodaysWorkoutClient[] => {
	if (!workouts || !workouts?.length) return [];

	return workouts.map((workout) => normalizeTodaysWorkout(workout));
};

const normalizeWorkout = (workout: WorkoutDB): WorkoutClient => {
	const clientWorkout: WorkoutClient = {
		userID: workout.user_id,
		workoutID: workout.workout_id,
		activityType: workout?.activity_type,
		workoutName: workout.workout_name,
		workoutDesc: workout.workout_desc,
		duration: workout.duration,
		tagColor: workout.tag_color,
		startTime: workout.start_time,
		endTime: workout.end_time,
		isRecurring: workout.is_recurring,
		status: workout.status,
	};

	return clientWorkout;
};

const normalizeWorkoutByType = (
	activityType: Activity,
	workout: WorkoutDetailsDB
) => {
	console.log("type:", activityType);
	console.log("workout", workout);
	switch (activityType) {
		case "Strength": {
			const casted = workout as StrengthWorkout;
			return {
				userID: casted.user_id,
				workoutID: casted.workout_id,
				workoutName: casted.workout_name,
				workoutDesc: casted.workout_desc,
				duration: casted.duration,
				tagColor: casted.tag_color,
				reps: casted.reps,
				sets: casted.sets,
				weight: casted.weight,
			};
		}
		case "Cardio": {
			const casted = workout as CardioWorkout;
			return {
				userID: casted.user_id,
				workoutID: casted.workout_id,
				workoutName: casted.workout_name,
				workoutDesc: casted.workout_desc,
				duration: casted.duration,
				tagColor: casted.tag_color,
				exercise: casted.exercise,
				reps: casted.reps,
			};
		}
		case "Stretch": {
			const casted = workout as StretchWorkout;

			return {
				userID: casted.user_id,
				workoutID: casted.workout_id,
				workoutName: casted.workout_name,
				workoutDesc: casted.workout_desc,
				duration: casted.duration,
				tagColor: casted.tag_color,
				exercise: casted.exercise,
				reps: casted.reps,
			};
		}
		case "Walk": {
			const casted = workout as WalkWorkout;
			return {
				userID: casted.user_id,
				workoutID: casted.workout_id,
				workoutName: casted.workout_name,
				workoutDesc: casted.workout_desc,
				duration: casted.duration,
				tagColor: casted.tag_color,
				steps: casted.steps,
				miles: casted.miles,
				pace: casted.pace,
			};
		}
		case "Timed": {
			const casted = workout as TimedWorkout;
			return {
				userID: casted.user_id,
				workoutID: casted.workout_id,
				workoutName: casted.workout_name,
				workoutDesc: casted.workout_desc,
				duration: casted.duration,
				tagColor: casted.tag_color,
				exercise: casted.exercise,
				reps: casted.reps,
			};
		}
		case "Other": {
			const casted = workout as OtherWorkout;
			return {
				userID: casted.user_id,
				workoutID: casted.workout_id,
				workoutName: casted.workout_name,
				workoutDesc: casted.workout_desc,
				duration: casted.duration,
				tagColor: casted.tag_color,
				exercise: casted.exercise,
				reps: casted.reps,
			};
		}

		default:
			throw new Error("Invalid activity type: " + activityType);
	}
};

const normalizeWorkouts = (workouts: WorkoutDB[]) => {
	if (!workouts || !workouts.length) return [];

	return workouts.map((entry) => normalizeWorkout(entry));
};

const normalizeActivityType = (type: ActivityTypeDB): ActivityTypeClient => {
	const client: ActivityTypeClient = {
		activityID: type.activity_id,
		activityType: type.activity_type,
		activityDesc: type.activity_desc,
		activityKey: type.activity_key,
		isActive: type.is_active,
		createdDate: type.created_date,
	};

	return client;
};

const normalizeWorkoutType = (type: WorkoutTypeDB): WorkoutTypeClient => {
	const client: WorkoutTypeClient = {
		typeID: type.type_id,
		activityID: type.activity_id,
		typeName: type.type_name,
		typeDesc: type.type_desc,
		isActive: type.is_active,
		createdDate: type.created_date,
	};

	return client;
};

const normalizeSharedData = (shared: SharedDataDB): SharedDataClient => {
	const sharedClient: SharedDataClient = {
		activityTypes: shared.activity_types.map((type) =>
			normalizeActivityType(type)
		),
		workoutTypes: shared.workout_types.map((type) =>
			normalizeWorkoutType(type)
		),
	};

	return sharedClient;
};

const normalizeStrengthSets = (sets: StrengthSet[]): StrengthSet[] => {
	if (!sets || !sets.length) return [];

	return sets.map((set) => ({
		id: Number(set.id),
		sets: Number(set.sets),
		reps: Number(set.reps),
		weight: Number(set.weight),
	}));
};

const normalizeWorkoutSchedule = (
	schedule: WorkoutScheduleDB
): WorkoutScheduleClient => {
	if (!schedule) return {} as WorkoutScheduleClient;
	const client: WorkoutScheduleClient = {
		scheduleID: schedule.schedule_id,
		activityType: schedule.activity_type,
		workoutID: schedule.workout_id,
		startDate: schedule.start_date,
		endDate: schedule.end_date,
		startTime: schedule.start_time,
		endTime: schedule.end_time,
		interval: schedule.interval,
		frequency: schedule.frequency,
		byDay: schedule.by_day,
		byMonth: schedule.by_month,
		byMonthDay: schedule.by_month_day,
		isActive: schedule.is_active,
		createdDate: schedule.created_date,
	};
	return client;
};

const normalizeWorkoutHistory = (
	history: WorkoutHistoryItemDB
): WorkoutHistoryItemClient => {
	const client: WorkoutHistoryItemClient = {
		userID: history.user_id,
		historyID: history.history_id,
		workoutID: history.workout_id,
		workoutDate: history.workout_date,
		workoutName: history.workout_name,
		startTime: history.start_time,
		endTime: history.end_time,
		effort: history.effort,
		duration: history.duration,
		createdDate: history.created_date,
	};

	return client;
};

const normalizeHistoryByType = (
	activityType: Activity,
	history: WorkoutHistoryItemDB
): WorkoutHistoryByTypeClient => {
	switch (activityType) {
		case "Strength": {
			const casted = history as StrengthHistoryDB;
			const newSets = normalizeStrengthSets(casted.sets);
			const standardHistory = normalizeWorkoutHistory(casted);

			const client: StrengthHistoryClient = {
				...standardHistory,
				sets: newSets,
			};
			return client;
		}
		case "Stretch": {
			const casted = history as StretchHistoryDB;
			const standardHistory = normalizeWorkoutHistory(casted);

			const client: StretchHistoryClient = {
				...standardHistory,
				exercise: casted.exercise,
				reps: casted.reps,
			};
			return client;
		}
		case "Cardio": {
			const casted = history as CardioHistoryDB;
			const standardHistory = normalizeWorkoutHistory(casted);

			const client: CardioHistoryClient = {
				...standardHistory,
				exercise: casted.exercise,
				reps: casted.reps,
			};
			return client;
		}
		case "Walk": {
			const casted = history as WalkHistoryDB;
			const standardHistory = normalizeWorkoutHistory(casted);

			const client: WalkHistoryClient = {
				...standardHistory,
				steps: casted.steps,
				miles: casted.miles,
				pace: casted.pace,
			};
			return client;
		}
		case "Timed": {
			const casted = history as TimedHistoryDB;
			const standardHistory = normalizeWorkoutHistory(casted);

			const client: TimedHistoryClient = {
				...standardHistory,
				exercise: casted.exercise,
				reps: casted.reps,
			};
			return client;
		}
		case "Other": {
			const casted = history as OtherHistoryDB;
			const standardHistory = normalizeWorkoutHistory(casted);

			const client: OtherHistoryClient = {
				...standardHistory,
				exercise: casted.exercise,
				reps: casted.reps,
			};
			return client;
		}

		default:
			throw new Error(`Invalid activity type: ${activityType}`);
	}
};

// Normalizes: workout, history & schedule for ALL activity types
const normalizeWorkoutInfo = (
	activityType: Activity,
	workoutInfo: WorkoutInfoDB
) => {
	const { workout, history, schedule } = workoutInfo;
	const newSchedule = normalizeWorkoutSchedule(schedule);
	const newWorkout = normalizeWorkoutDetails({
		...workout,
		activity_type: activityType,
	});
	const newHistory =
		history?.map((item) => normalizeHistoryByType(activityType, item)) ?? [];

	return {
		workout: newWorkout,
		schedule: newSchedule,
		history: newHistory,
	};
};

// Normalizes the custom workout table records w/ their respective fields
const normalizeWorkoutDetails = (workout: WorkoutDetailsDB) => {
	const { activity_type } = workout;

	switch (activity_type) {
		case "Strength": {
			const casted = workout as StrengthWorkout;
			return {
				...normalizeWorkout(casted),
				reps: casted.reps || 0,
				sets: casted.sets || 0,
				weight: casted.weight || 0,
			};
		}
		case "Stretch": {
			const casted = workout as StretchWorkout;
			return {
				...normalizeWorkout(casted),
				exercise: casted.exercise,
				reps: casted.reps || 0,
			};
		}
		case "Cardio": {
			const casted = workout as CardioWorkout;
			return {
				...normalizeWorkout(casted),
				exercise: casted.exercise,
				reps: casted.reps || 0,
			};
		}
		case "Walk": {
			const casted = workout as WalkWorkout;
			return {
				...normalizeWorkout(casted),
				steps: casted.steps || 0,
				miles: casted.miles || 0,
				pace: casted.pace || 0,
			};
		}
		case "Timed": {
			const casted = workout as TimedWorkout;
			return {
				...normalizeWorkout(workout),
				exercise: casted.exercise,
			};
		}
		case "Other": {
			const casted = workout as OtherWorkout;
			return {
				...normalizeWorkout(casted),
				exercise: casted.exercise,
			};
		}

		default:
			throw new Error(`Invalid 'activity_type': ${activity_type}`);
	}
};

const normalizeRecentMins = (recentMins: RecentMinsDB[]) => {
	if (!recentMins || !recentMins?.length) return [];
	const clients: RecentMinsClient[] = recentMins.map((entry) => ({
		date: entry.date,
		mins: entry.mins,
		weekDay: entry.week_day,
	}));

	return clients;
};

// ##TODOS:
// - Update this to handle different activity type workouts
const normalizeActiveWorkout = (details: ActiveWorkoutDB) => {
	const { activeWorkout, activeSchedule } = details;
	const type = activeSchedule.activity_type;
	const workout = normalizeWorkoutByType(
		type as Activity,
		activeWorkout as WorkoutDetailsDB
	);
	// const workout = {
	// 	workoutID: activeWorkout.workout_id,
	// 	workoutName: activeWorkout.workout_name,
	// 	workoutDesc: activeWorkout.workout_desc,
	// 	duration: activeWorkout.duration,
	// 	tagColor: activeWorkout.tag_color,
	// 	userID: activeWorkout.user_id,
	// };
	const schedule = normalizeWorkoutSchedule(activeSchedule);

	return {
		workout,
		schedule,
	};
};

const normalizeDashboardSummary = (summary: DashboardSummaryDB) => {
	const { recentSteps, recentCalories, recentWorkouts, recentWorkoutCount } =
		summary;

	const steps = {
		startDate: recentSteps.start_date,
		endDate: recentSteps.end_date,
		totalSteps: recentSteps.total_steps,
	};
	const count = {
		startDate: recentWorkoutCount.start_date,
		endDate: recentWorkoutCount.end_date,
		totalWorkouts: recentWorkoutCount.total_workouts,
	};
	const kcals = {
		startDate: recentCalories.start_date,
		endDate: recentCalories.end_date,
		totalWorkouts: recentCalories.total_calories,
	};

	return {
		recentSteps: steps,
		recentCalories: kcals,
		recentWorkoutCount: count,
		recentWorkouts: [],
	};
};

export {
	normalizeUser,
	normalizeSession,
	normalizeWorkout,
	normalizeWorkouts,
	normalizeActivityType,
	normalizeWorkoutType,
	normalizeSharedData,
	normalizeStrengthSets,
	normalizeWorkoutDetails,
	normalizeWorkoutSchedule,
	normalizeWorkoutHistory,
	normalizeHistoryByType,
	normalizeWorkoutInfo,
	normalizeTodaysWorkout,
	normalizeTodaysWorkouts,
	normalizeRecentMins,
	normalizeActiveWorkout,
	normalizeDashboardSummary,
};
