import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/user/userSlice";
import styles from "../css/pages/DashboardPage.module.scss";
import PageContainer from "../components/layout/PageContainer";
import PageHeader from "../components/layout/PageHeader";
import UserBadge from "../components/user/UserBadge";
import QuickActionsButton from "../components/shared/QuickActionsButton";
import { useGetActivityTypesQuery } from "../features/activity/activityApi";
import Loader from "../components/layout/Loader";
import { useGetSharedDataQuery } from "../features/shared/sharedApi";

const DashboardPage = () => {
	const { data: sharedData } = useGetSharedDataQuery();
	const { data, isLoading } = useGetActivityTypesQuery();
	const currentUser = useSelector(selectCurrentUser);

	console.log("data", data);
	console.log("sharedData", sharedData);

	return (
		<PageContainer>
			<PageHeader title="Dashboard">
				<UserBadge currentUser={currentUser} size="SM" />
			</PageHeader>
			<div className={styles.DashboardPage}>
				<div className={styles.DashboardPage_main}>
					{isLoading && (
						<Loader>
							<span>Loading dashboard...</span>
						</Loader>
					)}
				</div>
				<QuickActionsButton />
			</div>
		</PageContainer>
	);
};

export default DashboardPage;
