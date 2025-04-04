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
	recent_mins: RecentMinsDB[];
	recent_calories: RecentCaloriesDB;
	recent_workouts: RecentWorkoutsCountDB;
}
export interface DashboardSummaryClient {
	recentMins: RecentMinsClient[];
	recentCalories: RecentCaloriesClient;
	recentWorkouts: RecentWorkoutsCountClient;
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
