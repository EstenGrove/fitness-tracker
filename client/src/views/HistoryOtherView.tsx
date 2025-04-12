import styles from "../css/views/HistoryOtherView.module.scss";
import { useSelector } from "react-redux";
import { useGetHistoryByRangeAndTypeQuery } from "../features/history/historyApi";
import { selectCurrentUser } from "../features/user/userSlice";
import { getLastXMonthsRange } from "../utils/utils_calendar";
import { formatDate } from "../utils/utils_dates";

const HistoryOtherView = () => {
	const range = getLastXMonthsRange(3);
	const currentUser = useSelector(selectCurrentUser);
	const { data, isLoading, error } = useGetHistoryByRangeAndTypeQuery({
		userID: currentUser.userID,
		activityType: "Other",
		startDate: formatDate(range.startDate, "db"),
		endDate: formatDate(range.endDate, "db"),
	});

	console.log("data", data);
	return (
		<div className={styles.HistoryOtherView}>
			<h2>Other Page</h2>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default HistoryOtherView;
