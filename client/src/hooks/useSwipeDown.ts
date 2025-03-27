import { TouchEvent, useState } from "react";

const useSwipeDown = (threshold: number = 100, onThreshold?: () => void) => {
	const [initialY, setInitialY] = useState<number>(0);

	const onTouchStart = (e: TouchEvent) => {
		const startY = e.touches[0].clientY;
		setInitialY(startY);
	};

	const onTouchMove = (e: TouchEvent) => {
		const endY = e.touches[0].clientY;
		const deltaY = endY - initialY;

		if (deltaY >= threshold) {
			return onThreshold && onThreshold();
		}
	};

	return {
		onTouchStart,
		onTouchMove,
	};
};

export { useSwipeDown };
