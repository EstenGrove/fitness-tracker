import { useState } from "react";
import styles from "../../css/history/LogTimedWorkout.module.scss";
import { useBackgroundBlur } from "../../hooks/useBackgroundBlur";
import MultiStepModal, { StepItem } from "../shared/MultiStepModal";

type Props = {};

const LogTimedWorkout = ({}: Props) => {
	useBackgroundBlur();

	const steps: StepItem[] = [];

	const onClose = () => {
		// do stuff
	};
	const onSave = () => {
		// do stuff
	};

	return (
		<div className={styles.LogTimedWorkout}>
			<MultiStepModal steps={steps} onClose={onClose} onSave={onSave} />
		</div>
	);
};

export default LogTimedWorkout;
