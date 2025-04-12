import styles from "../css/views/HistoryTimedView.module.scss";
import { useSelector } from "react-redux";
import { useGetHistoryByRangeAndTypeQuery } from "../features/history/historyApi";
import { selectCurrentUser } from "../features/user/userSlice";
import { getLastXMonthsRange } from "../utils/utils_calendar";
import { formatDate } from "../utils/utils_dates";
import { useHistoryRange } from "../hooks/useHistoryRange";

const HistoryTimedView = () => {
	const range = useHistoryRange();
	const currentUser = useSelector(selectCurrentUser);
	const { data, isLoading, error } = useGetHistoryByRangeAndTypeQuery({
		userID: currentUser.userID,
		activityType: "Timed",
		...range,
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
