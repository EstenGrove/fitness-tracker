import { useMemo, useState } from "react";
import sprite from "../../assets/icons/main2.svg";
import styles from "../../css/timer/WorkoutTimer.module.scss";
import { useCountdown } from "../../hooks/useCountdown";
import {
	TimeInfo,
	TimeInfoAndDuration,
	useWorkoutTimer,
} from "../../hooks/useWorkoutTimer";
import { addEllipsis } from "../../utils/utils_misc";
import {
	differenceInHours,
	differenceInMinutes,
	differenceInSeconds,
} from "date-fns";
import { formatDateTime, formatTime } from "../../utils/utils_dates";

type Props = {
	title: string;
	onStart?: (info: TimeInfoAndDuration) => void;
	onEnd?: (info: TimeInfoAndDuration) => void;
};
type IdleScreenProps = {
	title: string;
	onStart: () => void;
};
type TimerScreen = "IDLE" | "COUNTDOWN" | "TIMER" | "ENDED";
enum ETimerScreen {
	IDLE = "IDLE",
	COUNTDOWN = "COUNTDOWN",
	TIMER = "TIMER",
	ENDED = "ENDED",
}
type BtnProps = {
	onClick: () => void;
};

const formatDisplayTime = (timeInSecs: number) => {
	const rawMins = Math.floor(timeInSecs / 60);
	const rawSecs = timeInSecs % 60;
	const mins = String(rawMins).padStart(2, "0");
	const secs = String(rawSecs).padStart(2, "0");

	return `${mins}:${secs}`;
};
const calculateDuration = (start: string, end: string) => {
	if (!start || !end) return "0";
	const rawHrs = differenceInHours(end, start);
	const rawMins = differenceInMinutes(end, start);
	const rawSecs = differenceInSeconds(end, start) % 60;

	const hrs = String(rawHrs).padStart(1, "0");
	const mins = String(rawMins).padStart(2, "0");
	const secs = String(rawSecs).padStart(2, "0");

	return `${hrs}:${mins}:${secs}`;
};

const PauseButton = ({ onClick }: BtnProps) => {
	return (
		<button type="button" onClick={onClick} className={styles.PauseButton}>
			<svg className={styles.PauseButton_icon}>
				<use xlinkHref={`${sprite}#icon-pause`}></use>
			</svg>
		</button>
	);
};
const StartButton = ({ onClick }: BtnProps) => {
	return (
		<button type="button" onClick={onClick} className={styles.StartButton}>
			<span>Start</span>
		</button>
	);
};
const EndButton = ({ onClick }: BtnProps) => {
	return (
		<button type="button" onClick={onClick} className={styles.EndButton}>
			<span>End Workout</span>
		</button>
	);
};
const ResumeButton = ({ onClick }: BtnProps) => {
	return (
		<button type="button" onClick={onClick} className={styles.ResumeButton}>
			<svg className={styles.ResumeButton_icon}>
				<use xlinkHref={`${sprite}#icon-play`}></use>
			</svg>
		</button>
	);
};
const ResetButton = ({ onClick }: BtnProps) => {
	return (
		<button type="button" onClick={onClick} className={styles.ResetButton}>
			<svg className={styles.ResetButton_icon}>
				<use xlinkHref={`${sprite}#icon-synchronize`}></use>
			</svg>
			<span>Reset</span>
		</button>
	);
};

const IdleScreen = ({ title, onStart }: IdleScreenProps) => {
	const heading = addEllipsis(title, 40);
	return (
		<div className={styles.IdleScreen}>
			<div className={styles.IdleScreen_title}>{heading}</div>
			<div className={styles.IdleScreen_controls}>
				<StartButton onClick={onStart} />
			</div>
		</div>
	);
};

type CountdownProps = {
	count: number;
};

type ActiveTimerProps = {
	title: string;
	time: string;
	onPause: () => void;
	onResume: () => void;
	onEnd: () => void;
};

type EndedProps = {
	title: string;
	time: string;
	info: TimeInfo;
	onReset: () => void;
};

const CountdownScreen = ({ count }: CountdownProps) => {
	return (
		<div className={styles.CountdownScreen}>
			<div className={styles.CountdownScreen_label}>Ready</div>
			<div className={styles.CountdownScreen_count}>{count}</div>
		</div>
	);
};
const ActiveTimerScreen = ({
	title,
	time,
	onPause,
	onResume,
	onEnd,
}: ActiveTimerProps) => {
	const [isPaused, setIsPaused] = useState<boolean>(false);
	const css = {
		color: isPaused ? "var(--accent-red)" : "var(--blueGrey100)",
	};

	const handlePause = () => {
		setIsPaused(true);
		onPause();
	};
	const handleResume = () => {
		setIsPaused(false);
		onResume();
	};

	return (
		<div className={styles.ActiveTimerScreen}>
			<div className={styles.ActiveTimerScreen_time} style={css}>
				{time}
			</div>
			<div className={styles.ActiveTimerScreen_title}>{title}</div>
			<div className={styles.ActiveTimerScreen_controls}>
				{!isPaused ? (
					<PauseButton onClick={handlePause} />
				) : (
					<ResumeButton onClick={handleResume} />
				)}
				<EndButton onClick={onEnd} />
			</div>
		</div>
	);
};
const EndedScreen = ({ title, time, info, onReset }: EndedProps) => {
	const { startedAt, endedAt } = info;
	const start = startedAt as string;
	const end = endedAt as string;
	const startTime = formatTime(start as string, "longMs");
	const endTime = formatTime(end as string, "longMs");
	const duration = calculateDuration(start, end);

	return (
		<div className={styles.EndedScreen}>
			<div className={styles.EndedScreen_time}>{time}</div>
			<div className={styles.EndedScreen_title}>{title}</div>
			<div className={styles.EndedScreen_duration}>
				<span>{startTime}</span>
				<span> to </span>
				<span>{endTime}</span>
				<span> ({duration})</span>
			</div>
			<div className={styles.EndedScreen_duration}>
				<ResetButton onClick={onReset} />
			</div>
		</div>
	);
};

const countOff = 5;

const WorkoutTimer = ({ title, onStart, onEnd }: Props) => {
	const [screen, setScreen] = useState<TimerScreen>(ETimerScreen.IDLE);
	const countdown = useCountdown(countOff, () => {
		// start timer when countdown ends
		setScreen(ETimerScreen.TIMER);
		workoutTimer.start();
	});
	const workoutTimer = useWorkoutTimer({
		onStart(info) {
			return onStart && onStart(info);
		},
		onEnd(info) {
			return onEnd && onEnd(info);
		},
	});
	const { info, timer } = workoutTimer;
	const displayTime = useMemo(() => {
		return formatDisplayTime(timer);
	}, [timer]);

	// Starts countdown, then timer after countdown ends
	const start = () => {
		setScreen(ETimerScreen.COUNTDOWN);
		countdown.start();
	};
	const pause = () => {
		console.log("[PAUSED]", formatDateTime(new Date(), "longMs"));
		workoutTimer.pause();
	};
	const resume = () => {
		console.log("[RESUMED]", formatDateTime(new Date(), "longMs"));
		workoutTimer.resume();
	};
	const end = () => {
		console.log("[ENDED]", formatDateTime(new Date(), "longMs"));
		workoutTimer.end();
		setScreen(ETimerScreen.ENDED);
	};
	const reset = () => {
		workoutTimer.reset();
		setScreen(ETimerScreen.IDLE);
	};

	return (
		<div className={styles.WorkoutTimer}>
			{screen === ETimerScreen.IDLE && (
				<div className={styles.WorkoutTimer_screen}>
					<IdleScreen title={title} onStart={start} />
				</div>
			)}
			{screen === ETimerScreen.COUNTDOWN && (
				<div className={styles.WorkoutTimer_screen}>
					<CountdownScreen count={countdown.count} />
				</div>
			)}
			{screen === ETimerScreen.TIMER && (
				<div className={styles.WorkoutTimer_screen}>
					<ActiveTimerScreen
						title={title}
						time={displayTime}
						onPause={pause}
						onResume={resume}
						onEnd={end}
					/>
				</div>
			)}
			{screen === ETimerScreen.ENDED && (
				<div className={styles.WorkoutTimer_screen}>
					<EndedScreen
						title={title}
						time={displayTime}
						info={info}
						onReset={reset}
					/>
				</div>
			)}
		</div>
	);
};

export default WorkoutTimer;
