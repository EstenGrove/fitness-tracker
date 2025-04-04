import { ChangeEvent, useState } from "react";
import styles from "../../css/history/LogStrengthWorkout.module.scss";
import {
	StrengthSet,
	StrengthWorkout,
	Workout,
} from "../../features/workouts/types";
import { generateStrengthSets } from "../../utils/utils_workouts";
import { TimeInfo } from "../../hooks/useWorkoutTimer";
import ActivityType from "../activity/ActivityType";

interface WorkoutInfo extends TimeInfo {
	workoutLength: string | number;
	targetLength: string | number;
	totalTime: string;
}

type Props = {
	workout: Workout;
	workoutDetails: WorkoutInfo;
};

const AddSetButton = ({ onClick }: { onClick: () => void }) => {
	return (
		<button type="button" onClick={onClick} className={styles.AddSetButton}>
			Add Set
		</button>
	);
};

type SetEntryProps = {
	idx: number;
	set: StrengthSet;
	updateSet: (idx: number, data: StrengthSet) => void;
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

const SetEntry = ({ idx, set, updateSet }: SetEntryProps) => {
	const setNumber = getSetNumber(idx);
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
				<div>{setNumber} Set:</div>
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
			</div>
		</div>
	);
};

type SummaryProps = {
	workout: Workout;
	workoutDetails: WorkoutInfo;
};

const Summary = ({ workout, workoutDetails }: SummaryProps) => {
	const type = workout.activityType;
	return (
		<div className={styles.Summary}>
			<div className={styles.Summary_type}>
				<ActivityType type={type} />
				<div className={styles.Summary_type_title}>{workout.workoutName}</div>
			</div>
			<div className={styles.Summary_time}>
				Workout Time: <b>{workoutDetails.totalTime}</b>
			</div>
		</div>
	);
};

const LogStrengthWorkout = ({ workout, workoutDetails }: Props) => {
	const [newSet, setNewSet] = useState<StrengthSet | null>(null);
	const [workoutSets, setWorkoutSets] = useState<StrengthSet[]>(
		generateStrengthSets(workout as StrengthWorkout)
	);

	const updateSet = (idx: number, values: StrengthSet) => {
		const newSets = [...workoutSets].map((item, index) => {
			if (idx === index) {
				return { ...item, ...values };
			} else {
				return item;
			}
		});
		setWorkoutSets(newSets);
	};

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

	return (
		<div className={styles.LogStrengthWorkout}>
			<div className={styles.LogStrengthWorkout_top}>
				<Summary workout={workout} workoutDetails={workoutDetails} />
			</div>
			<div className={styles.LogStrengthWorkout_main}>
				{workoutSets &&
					workoutSets.map((set, idx) => {
						return (
							<SetEntry
								key={set.id + idx}
								idx={idx}
								set={set}
								updateSet={updateSet}
							/>
						);
					})}
			</div>
			<AddSetButton onClick={addNewSet} />
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default LogStrengthWorkout;
