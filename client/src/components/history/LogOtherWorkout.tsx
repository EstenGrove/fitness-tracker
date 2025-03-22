import { useState } from "react";
import styles from "../../css/history/LogOtherWorkout.module.scss";
import { useBackgroundBlur } from "../../hooks/useBackgroundBlur";
import MultiStepModal, { StepItem } from "../shared/MultiStepModal";

type Props = {};

const LogOtherWorkout = ({}: Props) => {
	useBackgroundBlur();

	const steps: StepItem[] = [];

	const onClose = () => {
		// do stuff
	};
	const onSave = () => {
		// do stuff
	};

	return (
		<div className={styles.LogOtherWorkout}>
			<MultiStepModal steps={steps} onClose={onClose} onSave={onSave} />
		</div>
	);
};

export default LogOtherWorkout;
