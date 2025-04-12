import { useSelector } from "react-redux";
import styles from "../css/views/HistoryWalkView.module.scss";
import { useGetHistoryByRangeAndTypeQuery } from "../features/history/historyApi";
import { selectCurrentUser } from "../features/user/userSlice";
import { useHistoryRange } from "../hooks/useHistoryRange";
import { WalkHistory, WorkoutHistory } from "../features/history/types";
import { sortHistoryByDate } from "../utils/utils_history";
import { useState } from "react";
import { MenuAction } from "../components/shared/MenuDropdown";
import { EMenuAction } from "../features/types";
import Loader from "../components/layout/Loader";
import WalkHistoryEntry from "../components/history/WalkHistoryEntry";
import ModalLG from "../components/shared/ModalLG";
import EditWorkout from "../components/workouts/EditWorkout";
import DeleteWorkout from "../components/workouts/DeleteWorkout";
import ViewHistoryDetails from "../components/history/ViewHistoryDetails";

const HistoryWalkView = () => {
	const range = useHistoryRange();
	const currentUser = useSelector(selectCurrentUser);
	const [modalType, setModalType] = useState<MenuAction | null>(null);
	const [selectedEntry, setSelectedEntry] = useState<WorkoutHistory | null>(
		null
	);
	const { data, isLoading } = useGetHistoryByRangeAndTypeQuery({
		userID: currentUser.userID,
		activityType: "Walk",
		...range,
	});
	const logs = data as WorkoutHistory[];
	const history = sortHistoryByDate(logs);

	const onMenuAction = (action: MenuAction, entry: WorkoutHistory) => {
		setModalType(action);
		setSelectedEntry(entry);
	};
	const closeActionModal = () => {
		setModalType(null);
		setSelectedEntry(null);
	};

	console.log("data", data);
	return (
		<div className={styles.HistoryWalkView}>
			<div className={styles.HistoryWalkView_summary}>
				{/*  */}
				{/*  */}
			</div>
			<div className={styles.HistoryWalkView_main}>
				{isLoading && <Loader>Loading walk history...</Loader>}
				{history &&
					history.map((entry) => {
						return (
							<WalkHistoryEntry
								key={entry.historyID}
								entry={entry as WalkHistory}
								onMenuAction={onMenuAction}
							/>
						);
					})}
			</div>

			{modalType === EMenuAction.VIEW && !!selectedEntry && (
				<ModalLG onClose={closeActionModal}>
					<ViewHistoryDetails
						activityType="Walk"
						historyID={selectedEntry.historyID}
					/>
				</ModalLG>
			)}
			{modalType === EMenuAction.EDIT && !!selectedEntry && (
				<ModalLG onClose={closeActionModal}>
					<EditWorkout
						activityType="Walk"
						workoutID={selectedEntry.workoutID}
					/>
				</ModalLG>
			)}
			{modalType === EMenuAction.DELETE && !!selectedEntry && (
				<ModalLG onClose={closeActionModal}>
					<DeleteWorkout
						activityType="Walk"
						workoutID={selectedEntry.workoutID}
					/>
				</ModalLG>
			)}
		</div>
	);
};

export default HistoryWalkView;
