export interface RecentCaloriesDB {
	start_date: string;
	end_date: string;
	total_calories: number;
}
export interface RecentCaloriesClient {
	startDate: string;
	endDate: string;
	totalCalories: number;
}

export interface RecentStepsDB {
	start_date: string;
	end_date: string;
	total_steps: number;
}
export interface RecentStepsClient {
	startDate: string;
	endDate: string;
	totalSteps: number;
}

export interface RecentWorkoutsCountDB {
	start_date: string;
	end_date: string;
	total_workouts: number;
}

export interface RecentWorkoutsCountClient {
	startDate: string;
	endDate: string;
	totalWorkouts: number;
}

export interface DashboardSummaryDB {
	recentSteps: RecentStepsDB;
	recentMins: RecentMinsDB[];
	recentCalories: RecentCaloriesDB;
	recentWorkouts: RecentWorkoutsCountDB;
	recentWorkoutCount: RecentWorkoutsCountDB;
}
export interface DashboardSummaryClient {
	recentSteps: RecentStepsClient;
	recentMins: RecentMinsClient[];
	recentCalories: RecentCaloriesClient;
	recentWorkouts: RecentWorkoutsCountClient;
	recentWorkoutCount: RecentWorkoutsCountClient;
}

export interface RecentMinsDB {
	date: string;
	mins: number;
	week_day: string;
}
export interface RecentMinsClient {
	date: string;
	mins: number;
	weekDay: string;
}

export interface DashboardActivityDB {
	recent_mins: RecentMinsDB[];
	recent_calories: number;
	recent_workout_count: number;
}
