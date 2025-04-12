import { ReactNode } from "react";
import sprite from "../../assets/icons/main2.svg";
import styles from "../../css/details/WalkDetails.module.scss";
import { WalkWorkout } from "../../features/workouts/types";
import TypeBadge from "../activity/TypeBadge";
import { WalkHistory } from "../../features/history/types";
import DetailsBlock from "./DetailsBlock";
import { formatThousand } from "../../utils/utils_misc";

type Props = { entry: WalkWorkout | WalkHistory };

type DetailsProps = {
	label: string;
	icon: string;
	children?: ReactNode;
};

const icons = {
	sets: "weightlift-2",
	reps: "pushups",
	weight: "weight-pound",
	steps: "walking-2",
	miles: "step-length",
	pace: "time-2",
	exercise: "exercise",
	duration: "time",
};

const DetailsItem = ({ label, icon, children }: DetailsProps) => {
	const iconName = icons[icon as keyof object];
	return (
		<div className={styles.DetailsItem}>
			<div className={styles.DetailsItem_item}>
				<svg className={styles.DetailsItem_item_icon}>
					<use xlinkHref={`${sprite}#icon-${iconName}`}></use>
				</svg>
				<span>{label}</span>
			</div>
			<div className={styles.DetailsItem_main}>{children}</div>
		</div>
	);
};

const WalkDetails = ({ entry }: Props) => {
	const { steps = 0, miles = 0, pace = 0, duration } = entry;
	const mins = duration + ":00";
	const walkSteps = formatThousand(steps);
	const walkMiles = miles;
	const walkPace = pace + `'/sec`;
	return (
		<div className={styles.WalkDetails}>
			<div className={styles.WalkDetails_title}>Workout Details:</div>
			<div className={styles.WalkDetails_details}>
				<DetailsBlock type="Duration" label="Duration" value={mins} />
				<DetailsBlock type="Effort" label="Effort" value="Moderate" />
				<DetailsBlock type="Calories" label="Calories" value={70.22} />
				<DetailsBlock type="Steps" label="Steps" value={walkSteps} />
				<DetailsBlock type="Miles" label="Miles" value={walkMiles} />
				<DetailsBlock type="Pace" label="Pace" value={walkPace} />
			</div>
		</div>
	);
};

export default WalkDetails;
