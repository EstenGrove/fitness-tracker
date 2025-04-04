import { dashboardService } from "../../services/index.ts";

const getDashboardSummary = async (userID: string, targetDate: string) => {
	const rawSummary = await dashboardService.getDashboardSummary(
		userID,
		targetDate
	);
};

export { getDashboardSummary };
