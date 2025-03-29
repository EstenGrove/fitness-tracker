import { ChangeEvent, useState } from "react";
import styles from "../../css/history/LogStrengthWorkout.module.scss";
import MultiStepModal, { StepItem } from "../shared/MultiStepModal";
import { useBackgroundBlur } from "../../hooks/useBackgroundBlur";

interface SetInfo {
	setID: number;
	weight: number;
	reps: number;
	sets: number;
}

type Props = {
	onClose: () => void;
};

type SetEntryProps = {
	setInfo: SetInfo;
	// updateSet: (idx: number, newData: SetInfo) => void;
	updateSet: () => void;
};

const SelectWorkoutStep = () => {
	return (
		<div className="SelectWorkoutStep">
			{/*  */}
			{/*  */}
		</div>
	);
};

const SetEntry = ({ setInfo, updateSet }: SetEntryProps) => {
	const [values, setValues] = useState<SetInfo>(setInfo);

	const handleChanges = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const newData = {
			...values,
			[name]: Number(value),
		};

		setValues(newData);
	};

	return (
		<div className={styles.SetEntry}>
			<div className={styles.SetEntry_reps}>
				<label htmlFor="reps" className={styles.SetEntry_reps_label}>
					Reps
				</label>
				<input
					type="text"
					name="reps"
					id="reps"
					className={styles.SetEntry_reps_input}
					onChange={handleChanges}
					placeholder="Enter reps..."
				/>
			</div>
			<div className={styles.SetEntry_weight}>
				<label htmlFor="weight" className={styles.SetEntry_weight_label}>
					Weight
				</label>
				<input
					type="text"
					name="weight"
					id="weight"
					className={styles.SetEntry_weight_input}
					onChange={handleChanges}
					placeholder="Enter weight..."
				/>
			</div>
		</div>
	);
};

const AddSetButton = ({ onClick }: { onClick: () => void }) => {
	return (
		<button type="button" onClick={onClick} className={styles.AddSetButton}>
			Add Set
		</button>
	);
};

const LogStrengthWorkout = ({ onClose }: Props) => {
	useBackgroundBlur();
	const [workoutSets, setWorkoutSets] = useState<SetInfo[]>([]);

	const steps: StepItem[] = [
		{
			id: 1,
			title: "Activity Type",
			content: <div>Select Activity Type</div>,
			next: 2,
			validate: () => true,
		},
	];

	const onSave = () => {
		// do stuff
	};

	return (
		<div className={styles.LogStrengthWorkout}>
			<MultiStepModal steps={steps} onClose={onClose} onSave={onSave} />
		</div>
	);
};

export default LogStrengthWorkout;
