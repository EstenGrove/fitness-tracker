import PageContainer from "../components/layout/PageContainer";
import PageHeader from "../components/layout/PageHeader";
import IntervalTimer from "../components/timer/IntervalTimer";
import WorkoutTimer from "../components/timer/WorkoutTimer";
import styles from "../css/pages/DashboardPage.module.scss";

const length = 1;

const DashboardPage = () => {
	return (
		<PageContainer>
			<PageHeader title="Dashboard" />
			<div className={styles.DashboardPage}>
				<div className={styles.DashboardPage_main}>
					{/* <WorkoutTimer title="5 min workout" /> */}
					<IntervalTimer title={`${length} min workout`} interval={length} />
				</div>
				{/*  */}
				{/*  */}
				{/*  */}
			</div>
		</PageContainer>
	);
};

export default DashboardPage;
