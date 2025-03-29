import sprite from "../assets/icons/calendar2.svg";
import PageContainer from "../components/layout/PageContainer";
import PageHeader from "../components/layout/PageHeader";
import styles from "../css/pages/SettingsPage.module.scss";

const Settings = () => {
	return (
		<svg className={styles.Settings}>
			<use xlinkHref={`${sprite}#icon-settings`}></use>
		</svg>
	);
};

const SettingsPage = () => {
	return (
		<PageContainer>
			<div className={styles.SettingsPage}>
				<PageHeader title="Settings">
					<Settings />
				</PageHeader>
			</div>
		</PageContainer>
	);
};

export default SettingsPage;
