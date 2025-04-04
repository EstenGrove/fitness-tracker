import { TouchEvent, useMemo, useState } from "react";

interface SwipeActions {
	onSwipeLeft?: () => void;
	onSwipeRight?: () => void;
	onSwipeUp?: () => void;
	onSwipeDown?: () => void;
}

interface TouchPos {
	x: number;
	y: number;
}

const useSwipeActions = (threshold: number, actions: SwipeActions = {}) => {
	const { onSwipeLeft, onSwipeRight } = actions;
	const [touchStart, setTouchStart] = useState<TouchPos>({
		x: 0,
		y: 0,
	});
	const [movePos, setMovePos] = useState<TouchPos>({
		x: 0,
		y: 0,
	});
	const deltas = useMemo(() => {
		// calculate diff
		const deltaX = movePos.x - touchStart.x;
		const deltaY = movePos.y - touchStart.y;
		return {
			x: deltaX,
			y: deltaY,
		};
	}, [touchStart, movePos]);

	const onTouchStart = (e: TouchEvent) => {
		const { screenX, screenY } = e.changedTouches[0];

		setTouchStart({
			x: screenX,
			y: screenY,
		});
	};
	const onTouchMove = (e: TouchEvent) => {
		const { screenX, screenY } = e.changedTouches[0];
		const deltaX = screenX - touchStart.x;
		setMovePos({
			x: screenX,
			y: screenY,
		});

		if (deltaX >= threshold) {
			return onSwipeLeft && onSwipeLeft();
		}
		if (Math.sign(deltaX) === -1) {
			return onSwipeRight && onSwipeRight();
		}
	};
	const onTouchEnd = (e: TouchEvent) => {
		const { screenX, screenY } = e.changedTouches[0];
		const deltaX = screenX - touchStart.x;
		setMovePos({
			x: screenX,
			y: screenY,
		});

		if (deltaX >= threshold) {
			return onSwipeLeft && onSwipeLeft();
		}
	};

	return {
		deltas,
		onTouchStart,
		onTouchMove,
		onTouchEnd,
	};
};

export { useSwipeActions };
