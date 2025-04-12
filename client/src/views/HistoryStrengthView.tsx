import { useSelector } from "react-redux";
import styles from "../css/views/HistoryStrengthView.module.scss";
import { useGetHistoryByRangeAndTypeQuery } from "../features/history/historyApi";
import { selectCurrentUser } from "../features/user/userSlice";
import Loader from "../components/layout/Loader";
import { useQueryParams } from "../hooks/useQueryParams";
import { StrengthHistory } from "../features/history/types";
import StrengthHistoryEntry from "../components/history/StrengthHistoryEntry";

const HistoryStrengthView = () => {
	const params = useQueryParams();
	const baseParams = params.getParams() as Record<string, string>;
	const currentUser = useSelector(selectCurrentUser);
	const { data, isLoading } = useGetHistoryByRangeAndTypeQuery({
		userID: currentUser.userID,
		activityType: "Strength",
		startDate: baseParams.startDate,
		endDate: baseParams.endDate,
	});
	const history = data as StrengthHistory[];

	console.log("data", data);
	return (
		<div className={styles.HistoryStrengthView}>
			<div className={styles.HistoryStrengthView_summary}>
				{/*  */}
				{/*  */}
			</div>
			<div className={styles.HistoryStrengthView_main}>
				{isLoading && (
					<Loader>
						<span>Loading...strength records..</span>
					</Loader>
				)}
				{data && (
					<>
						{history.map((entry) => {
							return (
								<StrengthHistoryEntry key={entry.historyID} entry={entry} />
							);
						})}
					</>
				)}
			</div>
		</div>
	);
};

export default HistoryStrengthView;
