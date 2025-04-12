import styles from "../../css/history/CardioHistoryEntry.module.scss";
import HistoryEntry from "./HistoryEntry";
import { CardioHistory, WorkoutHistory } from "../../features/history/types";
import { MenuAction } from "../shared/MenuDropdown";

type Props = {
	entry: CardioHistory;
	onMenuAction: (action: MenuAction, entry: WorkoutHistory) => void;
};

const CardioHistoryEntry = ({ entry, onMenuAction }: Props) => {
	const reps = entry.reps || 0;
	return (
		<HistoryEntry entry={entry} onMenuAction={onMenuAction}>
			<div className={styles.CardioHistoryEntry}>{reps} reps</div>
		</HistoryEntry>
	);
};

export default CardioHistoryEntry;
