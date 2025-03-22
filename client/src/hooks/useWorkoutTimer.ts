import { useState } from "react";
import { useTimer } from "./useTimer";
import { formatDateTime } from "../utils/utils_dates";

export type TimerStatus = "IDLE" | "ACTIVE" | "PAUSED" | "ENDED";

export enum TimeStatus {
	IDLE = "IDLE",
	ACTIVE = "ACTIVE",
	PAUSED = "PAUSED",
	ENDED = "ENDED",
}
export interface TimeInfo {
	startedAt: string | null;
	pausedAt: string | null;
	resumedAt: string | null;
	endedAt: string | null;
}
interface HookParams {
	onStart?: (info: TimeInfo) => void;
	onPause?: (info: TimeInfo) => void;
	onResume?: (info: TimeInfo) => void;
	onEnd?: (info: TimeInfo) => void;
	onReset?: () => void;
}

const getTimestamp = () => {
	const time = formatDateTime(new Date(), "longMs");

	return time;
};

const useWorkoutTimer = (params: HookParams = {}) => {
	const { onStart, onPause, onResume, onEnd, onReset } = params;
	const timer = useTimer();
	const [status, setStatus] = useState<TimerStatus>("IDLE");
	const [timeInfo, setTimeInfo] = useState<TimeInfo>({
		startedAt: null,
		pausedAt: null,
		resumedAt: null,
		endedAt: null,
	});

	const start = () => {
		const time = getTimestamp();
		const newInfo: TimeInfo = { ...timeInfo, startedAt: time };
		timer.start();

		setStatus(TimeStatus.ACTIVE);
		setTimeInfo(newInfo);

		return onStart && onStart(newInfo);
	};
	const pause = () => {
		const time = getTimestamp();
		const newInfo: TimeInfo = { ...timeInfo, pausedAt: time };
		timer.pause();

		setStatus(TimeStatus.PAUSED);
		setTimeInfo(newInfo);

		return onPause && onPause(newInfo);
	};
	const resume = () => {
		const time = getTimestamp();
		const newInfo: TimeInfo = { ...timeInfo, resumedAt: time };
		timer.resume();

		setStatus(TimeStatus.ACTIVE);
		setTimeInfo(newInfo);

		return onResume && onResume(newInfo);
	};
	const end = () => {
		const time = getTimestamp();
		const newInfo: TimeInfo = { ...timeInfo, endedAt: time };
		timer.stop();

		setStatus(TimeStatus.ENDED);
		setTimeInfo(newInfo);

		return onEnd && onEnd(newInfo);
	};

	const reset = () => {
		const newInfo: TimeInfo = {
			startedAt: null,
			pausedAt: null,
			resumedAt: null,
			endedAt: null,
		};

		setStatus(TimeStatus.IDLE);
		setTimeInfo(newInfo);
		timer.reset();

		return onReset && onReset();
	};

	return {
		// states
		status: status, // timer status
		info: timeInfo, // time info (startedAt, endedAt...)
		timer: timer.timer, // numeric timer value (eg. 46 => 46 sec)
		// handlers
		start: start,
		pause: pause,
		resume: resume,
		end: end,
		reset: reset,
	};
};

export { useWorkoutTimer };
