import styles from "../css/views/HistoryTimedView.module.scss";
import { useSelector } from "react-redux";
import { useGetHistoryByRangeAndTypeQuery } from "../features/history/historyApi";
import { selectCurrentUser } from "../features/user/userSlice";
import { getLastXMonthsRange } from "../utils/utils_calendar";
import { formatDate } from "../utils/utils_dates";

const HistoryTimedView = () => {
	const range = getLastXMonthsRange(3);
	const currentUser = useSelector(selectCurrentUser);
	const { data, isLoading, error } = useGetHistoryByRangeAndTypeQuery({
		userID: currentUser.userID,
		activityType: "Timed",
		startDate: formatDate(range.startDate, "db"),
		endDate: formatDate(range.endDate, "db"),
	});

	console.log("data", data);
	return (
		<div className={styles.HistoryTimedView}>
			<h2>Timed Page</h2>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default HistoryTimedView;
