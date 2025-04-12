import React, { ChangeEvent } from "react";
import styles from "../../css/workouts/MarkAsDone.module.scss";
import { Effort } from "../../features/history/types";
import Select from "../shared/Select";

type Props = {
	onChange: (name: string, value: string | number) => void;
	values: {
		workoutLength: number;
		effort: Effort;
		startTime: string;
		endTime: string;
	};
};

const effortLevels: Effort[] = [
	"Easy",
	"Moderate",
	"Hard",
	"Strenuous",
	"All Out",
	"None",
];
const levels = effortLevels.map((item) => ({
	label: item,
	value: item,
}));

const MarkAsDone = ({ values, onChange }: Props) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		return onChange(name, value);
	};
	return (
		<div className={styles.MarkAsDone}>
			<div className={styles.MarkAsDone_field}>
				<label htmlFor="workoutLength">Effort</label>
				<Select
					name="effort"
					id="effort"
					value={values.effort}
					options={levels}
					onChange={onChange}
				/>
			</div>
			<div className={styles.MarkAsDone_field}>
				<label htmlFor="workoutLength">Duration</label>
				<input
					type="number"
					name="workoutLength"
					id="workoutLength"
					onChange={handleChange}
					className={styles.MarkAsDone_field_mins}
				/>
			</div>
		</div>
	);
};

export default MarkAsDone;
