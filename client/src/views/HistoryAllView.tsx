import styles from "../css/views/HistoryAllView.module.scss";
import { useSelector } from "react-redux";
import {
	useGetHistoryByRangeAndTypeQuery,
	useGetWorkoutHistoryForRangeQuery,
} from "../features/history/historyApi";
import { selectCurrentUser } from "../features/user/userSlice";
import { getLastXMonthsRange } from "../utils/utils_calendar";
import { formatDate } from "../utils/utils_dates";
import { endOfWeek, startOfWeek } from "date-fns";

const getThisWeek = () => {
	const now = new Date();
	const weekStart = startOfWeek(now);
	const weekEnd = endOfWeek(now);
	const start = formatDate(weekStart, "db");
	const end = formatDate(weekEnd, "db");

	return {
		startDate: start,
		endDate: end,
	};
};

const HistoryAllView = () => {
	const weekRange = getThisWeek();
	const currentUser = useSelector(selectCurrentUser);
	const { data, isLoading, error } = useGetWorkoutHistoryForRangeQuery({
		userID: currentUser.userID,
		...weekRange,
	});
	return (
		<div className={styles.HistoryAllView}>
			<h2>All History</h2>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default HistoryAllView;
