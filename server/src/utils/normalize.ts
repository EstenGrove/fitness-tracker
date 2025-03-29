import type {
	ActivityTypeClient,
	ActivityTypeDB,
	SharedDataClient,
	SharedDataDB,
	WorkoutClient,
	WorkoutDB,
	WorkoutTypeClient,
	WorkoutTypeDB,
} from "../services/types.ts";

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

export {
	normalizeWorkout,
	normalizeWorkouts,
	normalizeActivityType,
	normalizeWorkoutType,
	normalizeSharedData,
};
