import { dashboardService } from "../../services/index.ts";
import { getResponseError } from "../../utils/api.ts";

const getDashboardSummary = async (userID: string, targetDate: string) => {
	const rawSummary = await dashboardService.getDashboardSummary(
		userID,
		targetDate
	);

	if (!rawSummary) {
		return null;
	}
};

export { getDashboardSummary };
