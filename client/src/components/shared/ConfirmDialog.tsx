import { JSX, ReactNode, RefObject, useRef } from "react";
import styles from "../../css/shared/ConfirmDialog.module.scss";
import { useSwipeDown } from "../../hooks/useSwipeDown";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { useBackgroundBlur } from "../../hooks/useBackgroundBlur";

type Props = {
	onClose: () => void;
	onCancel?: () => void;
	onConfirm?: () => void;
	footer?: ReactNode | JSX.Element;
	children?: ReactNode;
};

const threshold = 100;

type FooterProps = {
	onCancel: () => void;
	onConfirm: () => void;
};

const BaseFooter = ({ onCancel, onConfirm }: FooterProps) => {
	return (
		<div className={styles.BaseFooter}>
			<button
				type="button"
				onClick={onCancel}
				className={styles.BaseFooter_cancel}
			>
				Cancel
			</button>
			<button
				type="button"
				onClick={onConfirm}
				className={styles.BaseFooter_confirm}
			>
				Confirm
			</button>
		</div>
	);
};

const ConfirmDialog = ({
	onClose,
	onCancel,
	onConfirm,
	footer,
	children,
}: Props) => {
	const modalRef = useRef<HTMLDivElement>(null);
	useOutsideClick(modalRef as RefObject<HTMLDivElement>, onClose);
	useLockBodyScroll();
	useBackgroundBlur();
	// closes on swipe down after threshold is reached
	const { translateY, onTouchStart, onTouchMove, onTouchEnd } = useSwipeDown(
		threshold,
		onClose
	);

	const cancel = () => {
		onClose();
		return onCancel && onCancel();
	};
	const confirm = () => {
		return onConfirm && onConfirm();
	};

	return (
		<div
			ref={modalRef}
			className={styles.ConfirmDialog}
			onTouchStart={onTouchStart}
			onTouchMove={onTouchMove}
			onTouchEnd={onTouchEnd}
			style={{ transform: `translateY(${translateY}px)` }}
		>
			<div className={styles.ConfirmDialog_top}>
				<div className={styles.DragHandle}></div>
			</div>
			<div className={styles.ConfirmDialog_main}>{children}</div>
			<div className={styles.ConfirmDialog_footer}>
				{!footer ? (
					<BaseFooter onCancel={cancel} onConfirm={confirm} />
				) : (
					footer
				)}
			</div>
		</div>
	);
};

export default ConfirmDialog;
