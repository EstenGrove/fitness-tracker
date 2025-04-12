import React from "react";
import styles from "../../css/history/HistoryEntry.module.scss";
import { WorkoutHistory } from "../../features/history/types";

type Props = { history: WorkoutHistory };

const HistoryEntry = ({ history }: Props) => {
	console.log("history", history);
	const name = history?.workoutName;
	const id = history?.workoutID;
	return (
		<div className={styles.HistoryEntry}>
			<h2>{name}</h2>
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default HistoryEntry;
