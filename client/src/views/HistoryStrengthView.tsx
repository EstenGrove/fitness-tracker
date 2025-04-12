import { useSelector } from "react-redux";
import styles from "../css/views/HistoryStrengthView.module.scss";
import { useGetHistoryByRangeAndTypeQuery } from "../features/history/historyApi";
import { selectCurrentUser } from "../features/user/userSlice";
import Loader from "../components/layout/Loader";
import { StrengthHistory, WorkoutHistory } from "../features/history/types";
import StrengthHistoryEntry from "../components/history/StrengthHistoryEntry";
import { useHistoryRange } from "../hooks/useHistoryRange";
import { sortHistoryByDate } from "../utils/utils_history";
import { MenuAction } from "../components/shared/MenuDropdown";
import { useState } from "react";
import { EMenuAction } from "../features/types";
import ModalLG from "../components/shared/ModalLG";
import ViewWorkout from "../components/workouts/ViewWorkout";
import EditWorkout from "../components/workouts/EditWorkout";
import DeleteWorkout from "../components/workouts/DeleteWorkout";
import ViewWorkoutHistory from "../components/history/ViewWorkoutHistory";
import ViewHistoryDetails from "../components/history/ViewHistoryDetails";

const HistoryStrengthView = () => {
	const baseParams = useHistoryRange();
	const currentUser = useSelector(selectCurrentUser);
	const [modalType, setModalType] = useState<MenuAction | null>(null);
	const [selectedEntry, setSelectedEntry] = useState<WorkoutHistory | null>(
		null
	);
	const { data, isLoading } = useGetHistoryByRangeAndTypeQuery({
		userID: currentUser.userID,
		activityType: "Strength",
		startDate: baseParams.startDate,
		endDate: baseParams.endDate,
	});
	const historyData = data as StrengthHistory[];
	const history = sortHistoryByDate(historyData);

	const onMenuAction = (action: MenuAction, entry: WorkoutHistory) => {
		setModalType(action);
		setSelectedEntry(entry);
	};
	const closeActionModal = () => {
		setModalType(null);
		setSelectedEntry(null);
	};

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
				{history && (
					<>
						{history.map((entry) => {
							return (
								<StrengthHistoryEntry
									key={entry.historyID}
									entry={entry as StrengthHistory}
									onMenuAction={onMenuAction}
								/>
							);
						})}
					</>
				)}
			</div>

			{modalType === EMenuAction.VIEW && !!selectedEntry && (
				<ModalLG onClose={closeActionModal}>
					<ViewHistoryDetails
						activityType="Strength"
						historyID={selectedEntry.historyID}
					/>
				</ModalLG>
			)}
			{modalType === EMenuAction.EDIT && !!selectedEntry && (
				<ModalLG onClose={closeActionModal}>
					<EditWorkout
						activityType="Strength"
						workoutID={selectedEntry.workoutID}
					/>
				</ModalLG>
			)}
			{modalType === EMenuAction.DELETE && !!selectedEntry && (
				<ModalLG onClose={closeActionModal}>
					<DeleteWorkout
						activityType="Strength"
						workoutID={selectedEntry.workoutID}
					/>
				</ModalLG>
			)}
		</div>
	);
};

export default HistoryStrengthView;
