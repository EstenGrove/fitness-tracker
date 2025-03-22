import { useEffect, useRef, useState } from "react";
import { TimeInfo, TimerStatus, TimeStatus } from "./useWorkoutTimer";
import { formatDateTime } from "../utils/utils_dates";
import { LocalStorage } from "../utils/utils_storage";

interface HookParams {
	onStart?: () => void;
	onPause?: () => void;
	onResume?: () => void;
	onEnd?: () => void;
}

const getSecsFromInterval = (intervalMins: number) => {
	return intervalMins * 60;
};

const getTimestamp = () => {
	const time = formatDateTime(new Date(), "longMs");

	return time;
};

const storage = new LocalStorage();
const storageKey = "ACTIVE-WORKOUT";

const useIntervalTimer = (interval: number, params: HookParams = {}) => {
	const { onStart, onResume, onPause, onEnd } = params;

	const timerRef = useRef<number | null>(null);
	const seconds = getSecsFromInterval(interval);
	const [timer, setTimer] = useState<number>(seconds);
	const [status, setStatus] = useState<TimerStatus>(TimeStatus.IDLE);
	const [timeInfo, setTimeInfo] = useState<TimeInfo>({
		startedAt: null,
		pausedAt: null,
		resumedAt: null,
		endedAt: null,
	});

	const start = () => {
		const newTime = getTimestamp();
		const info = { ...timeInfo, startedAt: newTime };

		setTimer(seconds);
		setTimeInfo(info);
		setStatus(TimeStatus.ACTIVE);
		storage.set(storageKey, info);
		return onStart && onStart();
	};
	const pause = () => {
		const newTime = getTimestamp();
		const info = { ...timeInfo, pausedAt: newTime };

		setTimeInfo(info);
		setStatus(TimeStatus.PAUSED);

		if (timerRef.current) {
			clearInterval(timerRef.current);
		}
		storage.set(storageKey, info);
		return onPause && onPause();
	};
	const resume = () => {
		const newTime = getTimestamp();
		const info = { ...timeInfo, resumedAt: newTime };

		setTimeInfo(info);
		setStatus(TimeStatus.ACTIVE);
		storage.set(storageKey, info);
		return onResume && onResume();
	};
	const end = () => {
		const newTime = getTimestamp();
		const info = { ...timeInfo, endedAt: newTime };

		setTimeInfo(info);
		setStatus(TimeStatus.ENDED);
		storage.set(storageKey, info);
		return onEnd && onEnd();
	};
	const reset = () => {
		const newInfo = {
			startedAt: null,
			pausedAt: null,
			resumedAt: null,
			endedAt: null,
		};
		setStatus(TimeStatus.IDLE);
		storage.set(storageKey, newInfo);
	};

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		if (status === TimeStatus.ACTIVE && timer > 0) {
			timerRef.current = setInterval(() => {
				setTimer((prev) => prev - 1);
			}, 1000);
		}

		return () => {
			isMounted = false;
			if (timerRef.current) {
				clearInterval(timerRef.current);
			}
		};
	}, [status, timer]);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		return () => {
			isMounted = false;
		};
	}, []);

	return {
		info: timeInfo,
		timer: timer,
		start: start,
		resume: resume,
		pause: pause,
		end: end,
		reset: reset,
	};
};

export { useIntervalTimer };
