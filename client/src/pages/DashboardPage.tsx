import IntervalTimer from "../components/timer/IntervalTimer";
import WorkoutTimer from "../components/timer/WorkoutTimer";
import styles from "../css/pages/DashboardPage.module.scss";

const length = 1;

const DashboardPage = () => {
	return (
		<div className={styles.DashboardPage}>
			<h1>Dashboard</h1>
			<div className={styles.DashboardPage_main}>
				{/* <WorkoutTimer title="5 min workout" /> */}
				<IntervalTimer title={`${length} min workout`} interval={length} />
			</div>
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default DashboardPage;
