import { useEffect, useRef } from "react";

const useAudio = (src: string) => {
	const audioRef = useRef<HTMLAudioElement>(new Audio(src));

	const play = () => {
		if (audioRef.current) {
			const audioEl = audioRef.current as HTMLAudioElement;
			audioEl.play();
		}
	};

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		if (audioRef.current) {
			const audioEl = audioRef.current as HTMLAudioElement;

			audioEl.load();
		}

		return () => {
			isMounted = false;
		};
	}, []);

	return {
		audioEl: audioRef.current as HTMLAudioElement,
		play: play,
	};
};

export { useAudio };
