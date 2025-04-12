import { useWeekHeader } from "../hooks/useWeekHeader";
import styles from "../css/pages/MedicationsPage.module.scss";
import PageHeader from "../components/layout/PageHeader";
import WeeklyHeader from "../components/layout/WeeklyHeader";

const MedicationsPage = () => {
	const base = new Date();
	const baseDate: string = base.toString();
	const header = useWeekHeader(baseDate);

	console.log("baseDate", baseDate);

	return (
		<div className={styles.MedicationsPage}>
			<div className={styles.MedicationsPage_header}>
				<PageHeader title="Medications" />
			</div>
			<WeeklyHeader
				baseDate={baseDate}
				onSelect={header.selectDate}
				selectedDate={header.selectedDate}
			/>
			<div className={styles.MedicationsPage_main}>
				{/*  */}
				{/*  */}
				{/*  */}
			</div>
		</div>
	);
};

export default MedicationsPage;
