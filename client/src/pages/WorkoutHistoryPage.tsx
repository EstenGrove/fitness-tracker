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
import { setHistoryRange } from "../features/history/historySlice";
import { useAppDispatch } from "../store/store";

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
	const params = useQueryParams();
	const dispatch = useAppDispatch();
	const baseRange = getLastXMonthsRange();

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;
		const initialRange = {
			startDate: formatDate(baseRange.startDate, "db"),
			endDate: formatDate(baseRange.endDate, "db"),
		};

		params.setParams(initialRange);
		dispatch(setHistoryRange(initialRange));

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<PageContainer padding="1rem 2rem">
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
