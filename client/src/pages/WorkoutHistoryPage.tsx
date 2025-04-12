import { Outlet } from "react-router";
import sprite from "../assets/icons/calendar2.svg";
import HistoryTabs from "../components/history/HistoryTabs";
import PageContainer from "../components/layout/PageContainer";
import PageHeader from "../components/layout/PageHeader";
import styles from "../css/pages/WorkoutHistoryPage.module.scss";
import { useQueryParams } from "../hooks/useQueryParams";
import { getLastXMonthsRange } from "../utils/utils_calendar";
import { useEffect } from "react";
import { formatDate } from "../utils/utils_dates";

const CalendarIcon = () => {
	return (
		<button className={styles.CalendarIcon}>
			<svg className={styles.CalendarIcon_icon}>
				<use xlinkHref={`${sprite}#icon-date_range`}></use>
			</svg>
		</button>
	);
};

const WorkoutHistoryPage = () => {
	const baseRange = getLastXMonthsRange();
	const params = useQueryParams();

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		params.setParams({
			startDate: formatDate(baseRange.startDate, "db"),
			endDate: formatDate(baseRange.endDate, "db"),
		});

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<PageContainer>
			<div className={styles.WorkoutHistoryPage}>
				<div className={styles.WorkoutHistoryPage_header}>
					<PageHeader title="History">
						<CalendarIcon />
					</PageHeader>
					<HistoryTabs />
				</div>
				<div className={styles.WorkoutHistoryPage_main}>
					<Outlet />
				</div>
			</div>
		</PageContainer>
	);
};

export default WorkoutHistoryPage;
