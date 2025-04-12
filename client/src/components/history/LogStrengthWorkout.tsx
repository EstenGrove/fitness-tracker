import { useState } from "react";
import styles from "../../css/history/LogStrengthWorkout.module.scss";
import {
	StrengthSet,
	StrengthWorkout,
	Workout,
} from "../../features/workouts/types";
import { TimeInfo } from "../../hooks/useWorkoutTimer";
import MultiStepModal, { StepHeader, StepItem } from "../shared/MultiStepModal";
import { Effort } from "../../features/history/types";
import Select from "../shared/Select";
import { formatDate, formatDateTime } from "../../utils/utils_dates";
import DatePicker from "../shared/DatePicker";
import TimePicker from "../shared/TimePicker";
import NumberInput from "../shared/NumberInput";
import LogStrengthSets from "./LogStrengthSets";

interface WorkoutInfo extends TimeInfo {
	workoutLength: string | number;
	targetLength: string | number;
	totalTime: string;
}

type Props = {
	workout: StrengthWorkout;
	workoutDetails: WorkoutInfo;
	workouts: StrengthWorkout[];
};

interface LogStrengthVals {
	workout: number | string; // workoutID
	workoutLength: number;
	effort: Effort;
	sets: StrengthSet[];
	workoutDate: string;
	startTime: string;
	endTime: string;
}

type StepProps = {
	values: LogStrengthVals;
	onChange: (name: string, value: string | number) => void;
	onSelect: (name: string, value: string | Date) => void;
};

type WhichProps = {
	workouts: StrengthWorkout[];
} & StepProps;

const WhichWorkoutStep = ({ values, workouts, onChange }: WhichProps) => {
	const options = workouts.map((item) => ({
		label: item.workoutName,
		value: String(item.workoutID),
	}));
	return (
		<div className={styles.WhichWorkoutStep}>
			<StepHeader title="What was the workout?" />
			<Select
				id="workout"
				name="workout"
				value={values.workout as string}
				options={options}
				onChange={onChange}
			/>
		</div>
	);
};

type SetsProps = {
	workout: StrengthWorkout;
	onSetsChange: (sets: StrengthSet[]) => void;
} & StepProps;

const WorkoutSetsStep = ({
	// values,
	// onSelect,
	// onChange,
	onSetsChange,
	workout,
}: SetsProps) => {
	return (
		<div className={styles.WorkoutSetsStep}>
			<StepHeader title="How many reps & sets?" />
			<LogStrengthSets workout={workout} onChange={onSetsChange} />
		</div>
	);
};

const EffortStep = ({ values, onChange }: StepProps) => {
	const options = ["Easy", "Moderate", "Hard", "Strenuous"].map((item) => ({
		label: item,
		value: item,
	}));
	return (
		<div className={styles.EffortStep}>
			<StepHeader title="How much effort was this workout?" />
			<Select
				name="effort"
				id="effort"
				value={values.effort}
				options={options}
				onChange={onChange}
			/>
		</div>
	);
};

const showStartAndEnd = false;

const WorkoutDateStep = ({ values, onSelect, onChange }: StepProps) => {
	return (
		<div className={styles.WorkoutDateStep}>
			<StepHeader title="When did this workout occur?" />
			<div className={styles.WorkoutDateStep_main}>
				<div className={styles.WorkoutDateStep_main_field}>
					<DatePicker
						id="workoutDate"
						name="workoutDate"
						onSelect={onSelect}
						value={values.workoutDate}
					/>
				</div>

				{showStartAndEnd && (
					<div className={styles.WorkoutDateStep_main_split}>
						<div className={styles.WorkoutDateStep_main_split_item}>
							<div>Start time</div>
							<TimePicker
								id="startTime"
								name="startTime"
								onChange={onSelect}
								value={values.startTime as string}
							/>
						</div>
						<div className={styles.WorkoutDateStep_main_split_item}>
							<div>End time</div>
							<TimePicker
								id="endTime"
								name="endTime"
								onChange={onSelect}
								value={values.endTime as string}
							/>
						</div>
					</div>
				)}

				{!showStartAndEnd && (
					<div className={styles.WorkoutDateStep_main_field}>
						<div>Start time</div>
						<TimePicker
							id="startTime"
							name="startTime"
							onChange={onSelect}
							value={values.startTime as string}
							style={{ width: "100%" }}
						/>
					</div>
				)}

				<div className={styles.WorkoutDateStep_main_minsfield}>
					<label htmlFor="workoutLength">How long was this workout?</label>
					<div className={styles.WorkoutDateStep_main_minsfield_mins}>
						<NumberInput
							name="workoutLength"
							id="workoutLength"
							value={values.workoutLength}
							onChange={onChange}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

const LogStrengthWorkout = ({ workout, workoutDetails, workouts }: Props) => {
	const [values, setValues] = useState<LogStrengthVals>({
		workout: String(28),
		workoutLength: 10,
		effort: "Easy",
		workoutDate: formatDate(new Date(), "db"),
		startTime: formatDateTime(new Date(), "db"),
		endTime: formatDateTime(new Date(), "db"),
		sets: [],
	});

	const onChange = (name: string, value: string | number) => {
		setValues({
			...values,
			[name]: value,
		});
	};
	const onSelect = (name: string, value: string | Date) => {
		setValues({
			...values,
			[name]: value,
		});
	};

	const onSetChange = (sets: StrengthSet[]) => {
		setValues({
			...values,
			sets: sets,
		});
	};

	const steps: StepItem[] = [
		{
			id: 1,
			title: "Which type of workout was it?",
			content: (
				<WhichWorkoutStep
					workouts={workouts}
					values={values}
					onChange={onChange}
					onSelect={onSelect}
				/>
			),
			next: 2,
		},
		{
			id: 2,
			title: "How long was this workout?",
			content: (
				<WorkoutDateStep
					values={values}
					onChange={onChange}
					onSelect={onSelect}
				/>
			),
			prev: 1,
			next: 3,
		},
		{
			id: 3,
			title: "How many reps & sets?",
			content: (
				<WorkoutSetsStep
					values={values}
					workout={workout}
					onChange={onChange}
					onSelect={onSelect}
					onSetsChange={onSetChange}
				/>
			),
			prev: 2,
			next: 4,
		},
		{
			id: 3,
			title: "How much effort was this workout?",
			content: (
				<EffortStep values={values} onChange={onChange} onSelect={onSelect} />
			),
			prev: 2,
			next: 4,
		},
	];

	return (
		<div className={styles.LogStrengthWorkout}>
			<MultiStepModal onClose={() => {}} steps={steps} />
		</div>
	);
};

export default LogStrengthWorkout;
