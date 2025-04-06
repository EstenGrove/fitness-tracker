import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/user/userSlice";
import styles from "../css/pages/DashboardPage.module.scss";
import { useGetActivityTypesQuery } from "../features/activity/activityApi";
import { useGetSharedDataQuery } from "../features/shared/sharedApi";
import { useGetDashboardSummaryQuery } from "../features/dashboard/summaryApi";
import { useWeekHeader } from "../hooks/useWeekHeader";
import { WeeklyMinsByDate } from "../features/dashboard/types";
import Loader from "../components/layout/Loader";
import RecentActivity from "../components/dashboard/RecentActivity";
import WeeklyHeader from "../components/layout/WeeklyHeader";
import PageHeader from "../components/layout/PageHeader";
import UserBadge from "../components/user/UserBadge";
import QuickActionsButton from "../components/shared/QuickActionsButton";

const DashboardPage = () => {
	const base = new Date();
	const baseDate: string = base.toString();
	const header = useWeekHeader(baseDate);
	// const baseDate: string = formatDate(base, "db");
	const currentUser = useSelector(selectCurrentUser);
	const { data: sharedData } = useGetSharedDataQuery();
	const { data, isLoading } = useGetActivityTypesQuery();
	const recentMins = [] as WeeklyMinsByDate[];
	// const { data: summary } = useGetDashboardSummaryQuery({
	// 	userID: currentUser.userID,
	// 	targetDate: baseDate,
	// });

	return (
		<div className={styles.DashboardPage}>
			<div className={styles.DashboardPage_header}>
				<PageHeader title="Dashboard">
					<UserBadge currentUser={currentUser} size="SM" />
				</PageHeader>
			</div>
			<div className={styles.DashboardPage_week}>
				<WeeklyHeader
					baseDate={baseDate}
					onSelect={header.selectDate}
					selectedDate={header.selectedDate}
				/>
			</div>
			<div className={styles.DashboardPage_main}>
				{isLoading && (
					<Loader>
						<span>Loading dashboard...</span>
					</Loader>
				)}
				<div className={styles.Dashboard_main_row}>
					<RecentActivity title="Recent Mins." activityData={recentMins} />
				</div>
			</div>
			<QuickActionsButton />
		</div>
	);
};

export default DashboardPage;
