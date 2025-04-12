import styles from "../css/views/HistoryOtherView.module.scss";
import { useSelector } from "react-redux";
import { useGetHistoryByRangeAndTypeQuery } from "../features/history/historyApi";
import { selectCurrentUser } from "../features/user/userSlice";
import { useHistoryRange } from "../hooks/useHistoryRange";

const HistoryOtherView = () => {
	const range = useHistoryRange();
	const currentUser = useSelector(selectCurrentUser);
	const { data } = useGetHistoryByRangeAndTypeQuery({
		userID: currentUser.userID,
		activityType: "Other",
		...range,
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
