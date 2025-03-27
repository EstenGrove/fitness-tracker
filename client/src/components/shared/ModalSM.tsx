import { ReactNode, RefObject, useRef } from "react";
import styles from "../../css/shared/ModalSM.module.scss";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useSwipeDown } from "../../hooks/useSwipeDown";

type Props = {
	onClose: () => void;
	children?: ReactNode;
};

const ModalSM = ({ onClose, children }: Props) => {
	const modalRef = useRef<HTMLDivElement>(null);
	useOutsideClick(modalRef as RefObject<HTMLDivElement>, onClose);
	// closes on swipe down after threshold is reached
	const touchHandlers = useSwipeDown(100, onClose);

	return (
		<div ref={modalRef} className={styles.ModalSM} {...touchHandlers}>
			<div className={styles.ModalSM_top}>
				{/*  */}
				{/*  */}
			</div>
			<div className={styles.ModalSM_main}>{children}</div>
		</div>
	);
};

export default ModalSM;
