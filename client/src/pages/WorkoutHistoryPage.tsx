import sprite from "../assets/icons/calendar2.svg";
import PageContainer from "../components/layout/PageContainer";
import PageHeader from "../components/layout/PageHeader";
import styles from "../css/pages/WorkoutHistoryPage.module.scss";

const Settings = () => {
	return (
		<svg className={styles.Settings}>
			<use xlinkHref={`${sprite}#icon-settings`}></use>
		</svg>
	);
};

const WorkoutHistoryPage = () => {
	return (
		<PageContainer>
			<div className={styles.WorkoutHistoryPage}>
				<PageHeader title="History">
					<Settings />
				</PageHeader>
			</div>
		</PageContainer>
	);
};

export default WorkoutHistoryPage;
