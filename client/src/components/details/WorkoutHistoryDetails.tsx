import sprite from "../../assets/icons/main2.svg";
import styles from "../../css/details/WorkoutHistoryDetails.module.scss";
import { WorkoutHistory } from "../../features/history/types";
import { addEllipsis } from "../../utils/utils_misc";
import ProgressCircle from "../ui/ProgressCircle";
import { Activity } from "../../features/activity/types";
import StrengthDetails from "./StrengthDetails";

type Props = {
	history: WorkoutHistory;
};

const icons = {
	steps: "step-length",
	miles: "walking-2",
	pace: "",
	reps: "weight-pound",
	sets: "",
	weight: "",
	mins: "time",
	kcals: "campfire",
	effort: "effort",
};

interface BlockSet {
	icon: string;
	color: string;
}

const blockMap = {
	Effort: {
		icon: "effort",
		color: "var(--blueGrey500)",
	},
	Calories: {
		icon: "gas-industry",
		color: "var(--accent-red)",
	},
	Reps: {
		icon: "weight-pound",
		color: "var(--accent-blue)",
	},
	Sets: {
		icon: "recurring-appointment",
		color: "#ff1a75",
	},
	Stretch: {
		icon: "stretching",
		color: "var(--accent)",
	},
	Steps: {
		icon: "walking-2",
		color: "var(--accent-green)",
	},
	Duration: {
		icon: "time",
		color: "var(--accent-red-alt)",
	},
	Miles: {
		icon: "step-length",
		color: "var(--accent-yellow)",
	},
	WorkoutType: {
		icon: "goal",
		color: "var(--accent-yellow)",
	},
	Weight: {
		icon: "dumbbell-2",
		color: "var(--main-accent)",
	},
} as const;

type BlockProps = {
	type: BlockType;
	title: string;
	icon: string;
	value: string;
};

type BlockType = keyof typeof blockMap;

const Block = ({ type, title, value }: BlockProps) => {
	const blockStyles = blockMap[type as keyof object] as BlockSet;
	const iconName = blockStyles.icon;
	return (
		<div className={styles.Block}>
			<div className={styles.Block_left}>
				<div className={styles.Block_left_square}>
					<svg
						className={styles.Block_left_square_icon}
						style={{ fill: blockStyles.color }}
					>
						<use xlinkHref={`${sprite}#icon-${iconName}`}></use>
						{/* <use xlinkHref={`${sprite}#icon-${blockStyles.icon}`}></use> */}
					</svg>
				</div>
			</div>
			<div className={styles.Block_main}>
				<div
					className={styles.Block_main_value}
					// style={{ color: "var(--accent-blue)" }}
					style={{ color: blockStyles.color }}
				>
					{value}
				</div>
				<div className={styles.Block_main_title}>{title}</div>
			</div>
		</div>
	);
};

const WorkoutHistoryDetails = ({ history }: Props) => {
	const {
		workoutID,
		workoutName,
		workoutDate,
		duration,
		effort,
		startTime,
		endTime,
	} = history;
	const title = addEllipsis(workoutName, 35);
	return (
		<div className={styles.WorkoutHistoryDetails}>
			<div className={styles.WorkoutHistoryDetails_completed}>
				<svg className={styles.WorkoutHistoryDetails_completed_icon}>
					<use xlinkHref={`${sprite}#icon-guarantee-2`}></use>
				</svg>
				<h3>Completed Workout!</h3>
			</div>
			<div className={styles.WorkoutHistoryDetails_header}>
				<div className={styles.WorkoutHistoryDetails_header_title}>{title}</div>
			</div>
			<div className={styles.WorkoutHistoryDetails_details_blocks}>
				<StrengthDetails workout={history} />
				{/* <Block type="Duration" icon="mins" title="Duration" value="26:35" />
				<Block type="Calories" icon="kcals" title="Calories" value="275.6" />
				<Block type="Effort" icon="effort" title="Effort" value="275.6" />
				<Block type="Reps" icon="reps" title="Strength" value="25 reps" />
				<Block type="Steps" icon="steps" title="Steps" value="2.5k" />
				<Block type="Miles" icon="miles" title="Miles" value="2.5k" />
				<Block type="WorkoutType" icon="miles" title="Workout" value="Lift" />
				<Block type="Weight" icon="weight" title="Weight" value="20lbs." />
				<Block type="Sets" icon="sets" title="Sets" value="4 sets" /> */}
			</div>

			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default WorkoutHistoryDetails;
