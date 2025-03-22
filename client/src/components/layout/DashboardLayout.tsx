import { Outlet } from "react-router";
import styles from "../../css/layout/DashboardLayout.module.scss";
import Navbar from "./Navbar";

const AppLayout = () => {
	return (
		<div className={styles.AppLayout}>
			<Navbar />
			<Outlet />
		</div>
	);
};

export default AppLayout;
