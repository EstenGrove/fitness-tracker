import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/user/userSlice";
import styles from "../css/pages/DashboardPage.module.scss";
import PageContainer from "../components/layout/PageContainer";
import PageHeader from "../components/layout/PageHeader";
import IntervalTimer from "../components/timer/IntervalTimer";
import WorkoutTimer from "../components/timer/WorkoutTimer";
import UserBadge from "../components/user/UserBadge";
import QuickActionsButton from "../components/shared/QuickActionsButton";

const length = 1;

const DashboardPage = () => {
	const currentUser = useSelector(selectCurrentUser);

	return (
		<PageContainer>
			<PageHeader title="Dashboard">
				<UserBadge currentUser={currentUser} size="XSM" />
			</PageHeader>
			<div className={styles.DashboardPage}>
				<div className={styles.DashboardPage_main}>
					{/* <WorkoutTimer title="5 min workout" /> */}
					<IntervalTimer title={`${length} min workout`} interval={length} />
				</div>
				{/*  */}
				{/*  */}
				{/*  */}
				<QuickActionsButton />
			</div>
		</PageContainer>
	);
};

export default DashboardPage;
