import { useCallback, useEffect, useMemo, useState } from "react";
import sprite from "../../assets/icons/main2.svg";
import styles from "../../css/timer/IntervalTimer.module.scss";
import { useCountdown } from "../../hooks/useCountdown";
import { useIntervalTimer } from "../../hooks/useIntervalTimer";
import { addEllipsis } from "../../utils/utils_misc";
import { formatTime } from "../../utils/utils_dates";
import {
	differenceInHours,
	differenceInMinutes,
	differenceInSeconds,
} from "date-fns";
import { useTimer } from "../../hooks/useTimer";
import { TimeInfo, TimerStatus } from "../../hooks/useWorkoutTimer";

type Props = {
	title: string;
	interval: number; // mins
};

type TimerScreen = "IDLE" | "COUNTDOWN" | "TIMER" | "ENDED" | "ELAPSED";
enum ETimerScreen {
	IDLE = "IDLE",
	COUNTDOWN = "COUNTDOWN",
	TIMER = "TIMER",
	ENDED = "ENDED",
	ELAPSED = "ELAPSED",
}
type BtnProps = {
	onClick: () => void;
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

const countOff = 3; // 3 seconds
const defaultInterval = 5; // 5 mins

const formatDisplayTime = (seconds: number): string => {
	const rawMins = Math.floor(seconds / 60);
	const rawSecs = seconds % 60;
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

type IdleScreenProps = {
	title: string;
	onStart: () => void;
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

type ElapsedProps = {
	title: string;
	onStart: () => void;
	onEnd: () => void;
};

const ElapsedScreen = ({ title, onStart, onEnd }: ElapsedProps) => {
	const timer = useTimer();
	const [status, setStatus] = useState<TimerStatus>("IDLE");
	const isPaused = status === "PAUSED";
	const displayTime = useMemo(() => {
		return formatDisplayTime(timer.timer);
	}, [timer.timer]);

	const start = () => {
		timer.start();
		setStatus("ACTIVE");

		return onStart && onStart();
	};
	const pause = () => {
		timer.pause();
		setStatus("PAUSED");
	};
	const resume = () => {
		timer.resume();
		setStatus("ACTIVE");
	};
	const end = () => {
		timer.stop();
		setStatus("ENDED");

		reset();
		return onEnd && onEnd();
	};
	const reset = () => {
		timer.reset();
		setStatus("IDLE");
	};

	// start counting timer onMount
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		if (status === "IDLE") {
			start();
		}

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.ElapsedScreen}>
			<div className={styles.ElapsedScreen_time}>{displayTime}</div>
			<div className={styles.ElapsedScreen_title}>{title}</div>
			<div className={styles.ElapsedScreen_controls}>
				{!isPaused ? (
					<PauseButton onClick={pause} />
				) : (
					<ResumeButton onClick={resume} />
				)}
				<EndButton onClick={end} />
			</div>
		</div>
	);
};

const IntervalTimer = ({ title, interval = defaultInterval }: Props) => {
	const [screen, setScreen] = useState<TimerScreen>(ETimerScreen.IDLE);
	const countdown = useCountdown(countOff, () => {
		// start interval timer
		setScreen(ETimerScreen.TIMER);
		timer.start();
	});
	const timer = useIntervalTimer(interval);
	const { info } = timer;
	const displayTime = useMemo(() => {
		return formatDisplayTime(timer.timer);
	}, [timer.timer]);

	const start = () => {
		countdown.start();
		setScreen(ETimerScreen.COUNTDOWN);
	};
	const pause = () => {
		timer.pause();
	};
	const resume = () => {
		timer.resume();
	};
	const end = () => {
		timer.end();
		setScreen(ETimerScreen.ENDED);
	};
	const reset = () => {
		timer.end();
		timer.reset();
		countdown.reset();
		setScreen(ETimerScreen.IDLE);
	};

	const startElapsed = useCallback(() => {
		setScreen(ETimerScreen.ELAPSED);
	}, []);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		if (timer.timer <= 0) {
			startElapsed();
		}

		return () => {
			isMounted = false;
		};
	}, [startElapsed, timer.timer]);

	return (
		<div className={styles.IntervalTimer}>
			{screen === ETimerScreen.IDLE && (
				<div className={styles.IntervalTimer_screen}>
					<IdleScreen title={title} onStart={start} />
				</div>
			)}
			{screen === ETimerScreen.COUNTDOWN && (
				<div className={styles.IntervalTimer_screen}>
					<CountdownScreen count={countdown.count} />
				</div>
			)}
			{screen === ETimerScreen.TIMER && (
				<div className={styles.IntervalTimer_screen}>
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
				<div className={styles.IntervalTimer_screen}>
					<EndedScreen
						title={title}
						time={displayTime}
						info={info}
						onReset={() => {
							end();
							reset();
						}}
					/>
				</div>
			)}
			{screen === ETimerScreen.ELAPSED && (
				<div className={styles.IntervalTimer_screen}>
					<ElapsedScreen
						title={title}
						onStart={startElapsed}
						onEnd={() => {
							console.log("[ELAPSED ENDED] elapsed has been ended...");
							end();
						}}
					/>
				</div>
			)}
		</div>
	);
};

export default IntervalTimer;
