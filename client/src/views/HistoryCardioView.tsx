import styles from "../css/views/HistoryCardioView.module.scss";
import { useSelector } from "react-redux";
import { useGetHistoryByRangeAndTypeQuery } from "../features/history/historyApi";
import { selectCurrentUser } from "../features/user/userSlice";
import { useHistoryRange } from "../hooks/useHistoryRange";
import { CardioHistory, WorkoutHistory } from "../features/history/types";
import CardioHistoryEntry from "../components/history/CardioHistoryEntry";
import { MenuAction } from "../components/shared/MenuDropdown";
import { useState } from "react";
import ModalLG from "../components/shared/ModalLG";
import ViewHistoryDetails from "../components/history/ViewHistoryDetails";
import { EMenuAction } from "../features/types";
import EditWorkout from "../components/workouts/EditWorkout";
import DeleteWorkout from "../components/workouts/DeleteWorkout";

const HistoryCardioView = () => {
	const range = useHistoryRange();
	const currentUser = useSelector(selectCurrentUser);
	const [modalType, setModalType] = useState<MenuAction | null>(null);
	const [selectedEntry, setSelectedEntry] = useState<WorkoutHistory | null>(
		null
	);
	const { data } = useGetHistoryByRangeAndTypeQuery({
		userID: currentUser.userID,
		activityType: "Cardio",
		...range,
	});
	const history = data as WorkoutHistory[];

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
		<div className={styles.HistoryCardioView}>
			<div className={styles.HistoryCardioView_summary}>
				{/*  */}
				{/*  */}
				{/*  */}
			</div>
			<div className={styles.HistoryCardioView_main}>
				{history &&
					history.map((entry) => {
						return (
							<CardioHistoryEntry
								key={entry.historyID}
								entry={entry as CardioHistory}
								onMenuAction={onMenuAction}
							/>
						);
					})}
			</div>

			{modalType === EMenuAction.VIEW && !!selectedEntry && (
				<ModalLG onClose={closeActionModal}>
					<ViewHistoryDetails
						activityType="Cardio"
						historyID={selectedEntry.historyID}
					/>
				</ModalLG>
			)}
			{modalType === EMenuAction.EDIT && !!selectedEntry && (
				<ModalLG onClose={closeActionModal}>
					<EditWorkout
						activityType="Cardio"
						workoutID={selectedEntry.workoutID}
					/>
				</ModalLG>
			)}
			{modalType === EMenuAction.DELETE && !!selectedEntry && (
				<ModalLG onClose={closeActionModal}>
					<DeleteWorkout
						activityType="Cardio"
						workoutID={selectedEntry.workoutID}
					/>
				</ModalLG>
			)}

			{/*  */}
			{/*  */}
		</div>
	);
};

export default HistoryCardioView;
