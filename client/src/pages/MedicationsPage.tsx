import { useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import WeeklyHeader from "../components/layout/WeeklyHeader";
import styles from "../css/pages/MedicationsPage.module.scss";
import { formatDate } from "../utils/utils_dates";

const MedicationsPage = () => {
	const baseDate = formatDate(new Date(), "url");
	const [selectedDate, setSelectedDate] = useState<string>(baseDate);

	const onSelect = (date: Date | string) => {
		const selected = formatDate(date, "url");
		setSelectedDate(selected);
	};

	return (
		<div className={styles.MedicationsPage}>
			<div className={styles.MedicationsPage_header}>
				<PageHeader title="Medications" />
			</div>
			<WeeklyHeader
				baseDate={baseDate}
				onSelect={onSelect}
				selectedDate={selectedDate}
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
