import { useState } from "react";
import styles from "../../css/history/LogStretchWorkout.module.scss";
import { useBackgroundBlur } from "../../hooks/useBackgroundBlur";
import MultiStepModal, { StepItem } from "../shared/MultiStepModal";
import Select from "../shared/Select";
import { StrengthWorkout } from "../../features/workouts/types";

type Props = {};

type WhichProps = {
	values: LogStrengthValues;
	onChange: (name: string, value: string) => void;
	strengthWorkouts: StrengthWorkout[];
};

interface LogStrengthValues {
	workout: string;
}

const WhichWorkoutStep = ({
	values,
	strengthWorkouts,
	onChange,
}: WhichProps) => {
	const options = strengthWorkouts.map((item) => ({
		label: item.workoutName,
		value: String(item.workoutID),
	}));
	return (
		<div className={styles.WhichWorkoutStep}>
			<Select
				id="workout"
				name="workout"
				value={values.workout}
				options={options}
				onChange={onChange}
			/>
		</div>
	);
};
type HowLongProps = {
	values: LogStrengthValues;
	onChange: (name: string, value: string) => void;
};

const HowLongStep = ({ values, onChange }: HowLongProps) => {
	return (
		<div className={styles.HowLongStep}>
			{/*  */}
			{/*  */}
		</div>
	);
};

const LogStretchWorkout = ({}: Props) => {
	useBackgroundBlur();

	const steps: StepItem[] = [
		{
			id: 1,
			title: "Which workout?",
			content: <WhichWorkoutStep />,
		},
	];

	const onClose = () => {
		// do stuff
	};
	const onSave = () => {
		// do stuff
	};

	return (
		<div className={styles.LogStretchWorkout}>
			<MultiStepModal steps={steps} onClose={onClose} onSave={onSave} />
		</div>
	);
};

export default LogStretchWorkout;
