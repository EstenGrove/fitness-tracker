import { useState } from "react";
import styles from "../../css/history/LogWorkoutModal.module.scss";
import { useBackgroundBlur } from "../../hooks/useBackgroundBlur";
import MultiStepModal, { StepItem } from "../shared/MultiStepModal";
import { Workout } from "../../features/workouts/types";

type Props = {};

type FindWorkoutStepProps = {
	allWorkouts: Workout[];
};

const FindWorkoutStep = ({ allWorkouts }: FindWorkoutStepProps) => {
	// activity types
	// select one, then
	return (
		<div className={styles.FindWorkoutStep}>
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

const LogWorkoutModal = ({}: Props) => {
	useBackgroundBlur();

	const steps: StepItem[] = [];

	const onClose = () => {
		// do stuff
	};
	const onSave = () => {
		// do stuff
	};

	return (
		<div className={styles.LogWorkoutModal}>
			<MultiStepModal steps={steps} onClose={onClose} onSave={onSave} />
		</div>
	);
};

export default LogWorkoutModal;
