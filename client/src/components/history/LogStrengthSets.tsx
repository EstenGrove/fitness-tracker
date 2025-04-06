import { ChangeEvent, useState } from "react";
import sprite from "../../assets/icons/calendar2.svg";
import styles from "../../css/history/LogStrengthSets.module.scss";
import { StrengthSet, StrengthWorkout } from "../../features/workouts/types";
import { generateStrengthSets } from "../../utils/utils_workouts";

type Props = {
	workout: StrengthWorkout;
	onChange: (sets: StrengthSet[]) => void;
};

type SetProps = {
	idx: number;
	set: StrengthSet;
	updateSet: (idx: number, set: StrengthSet) => void;
	deleteSet: () => void;
};

const getSetNumber = (idx: number) => {
	const num = idx + 1;
	const map = {
		1: "1st",
		2: "2nd",
		3: "3rd",
	};
	if (num < 4) {
		return map[num as keyof object];
	} else {
		return num + "th";
	}
};

const SetEntry = ({ idx, set, updateSet, deleteSet }: SetProps) => {
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const values = {
			...set,
			[name]: value,
		};
		updateSet(idx, values);
	};

	return (
		<div className={styles.SetEntry}>
			<div className={styles.SetEntry_title}>
				<div>{idx + 1}</div>
			</div>
			<div className={styles.SetEntry_fields}>
				<div className={styles.SetEntry_item}>
					<input
						type="number"
						name="reps"
						id="reps"
						value={set.reps}
						onChange={onChange}
						onFocus={(ref) => ref.currentTarget.select()}
						className={styles.SetEntry_item_input}
						inputMode="numeric"
					/>
					<label htmlFor="reps">Reps</label>
				</div>
				<div className={styles.divider}>x</div>
				<div className={styles.SetEntry_item}>
					<input
						type="number"
						name="weight"
						id="weight"
						value={set.weight}
						onChange={onChange}
						onFocus={(ref) => ref.currentTarget.select()}
						className={styles.SetEntry_item_input}
						inputMode="numeric"
					/>
					<label htmlFor="weight">lbs.</label>
				</div>
				<button onClick={deleteSet} className={styles.SetEntry_item_delete}>
					<svg className={styles.SetEntry_item_delete_icon}>
						<use xlinkHref={`${sprite}#icon-delete`}></use>
					</svg>
				</button>
			</div>
		</div>
	);
};

const LogStrengthSets = ({ workout }: Props) => {
	const [newSet, setNewSet] = useState<StrengthSet | null>(null);
	const [workoutSets, setWorkoutSets] = useState<StrengthSet[]>(
		generateStrengthSets({
			sets: 4,
			reps: 20,
			weight: 20,
		})
	);

	const addNewSet = () => {
		const lastItem = workoutSets[workoutSets.length - 1];
		const lastID = lastItem.id;
		const newEntry = {
			id: lastID + 1,
			sets: lastItem.sets,
			reps: lastItem.reps,
			weight: lastItem.weight,
		};
		setNewSet(newEntry);
		setWorkoutSets([...workoutSets, newEntry]);
	};

	const updateSet = (idx: number, set: StrengthSet) => {
		const newSets = [...workoutSets].map((entry, i) => {
			if (i === idx) {
				return {
					...entry,
					...set,
				};
			} else {
				return entry;
			}
		});
		setWorkoutSets(newSets);
	};

	const deleteSet = (idx: number) => {
		const newSets = [...workoutSets].filter((_, i) => i !== idx);
		setWorkoutSets(newSets);
	};

	return (
		<div className={styles.LogStrengthSets}>
			{workoutSets &&
				workoutSets.map((set, idx) => {
					return (
						<SetEntry
							idx={idx}
							set={set}
							updateSet={updateSet}
							deleteSet={() => deleteSet(idx)}
						/>
					);
				})}
			<button onClick={addNewSet}>Add Set</button>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default LogStrengthSets;
