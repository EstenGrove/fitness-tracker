import "./App.scss";
import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import Loader from "./components/layout/Loader";
import LoginPage from "./pages/LoginPage.tsx";
import DashboardLayout from "./components/layout/DashboardLayout.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import AllWorkoutsPage from "./pages/AllWorkoutsPage.tsx";

const Dashboard = lazy(() => import("./pages/DashboardPage.tsx"));
const Workouts = lazy(() => import("./pages/WorkoutsPage.tsx"));
const WorkoutHistory = lazy(() => import("./pages/WorkoutHistoryPage.tsx"));
const Medications = lazy(() => import("./pages/MedicationsPage.tsx"));
const Settings = lazy(() => import("./pages/SettingsPage.tsx"));

function App() {
	return (
		<Provider store={store}>
			<Router>
				<div className="App">
					<div className="App_main">
						<Routes>
							{/* MAIN APP/AUTH ROUTES */}
							<Route
								path="/"
								element={
									<Suspense fallback={<Loader />}>
										<DashboardLayout />
									</Suspense>
								}
							>
								<Route index element={<Dashboard />} />
								<Route
									path="/meds"
									element={
										<Suspense fallback={<Loader />}>
											<Medications />
										</Suspense>
									}
								/>
								<Route
									path="/history"
									element={
										<Suspense fallback={<Loader />}>
											<WorkoutHistory />
										</Suspense>
									}
								/>
								<Route
									path="workouts"
									element={
										<Suspense fallback={<Loader />}>
											<Workouts />
										</Suspense>
									}
								/>
								<Route path="/workouts/all" element={<AllWorkoutsPage />} />
								<Route
									path="/settings"
									element={
										<Suspense fallback={<Loader />}>
											<Settings />
										</Suspense>
									}
								/>
							</Route>

							{/* TOP LEVEL ROUTES */}
							<Route path="/login" element={<LoginPage />} />
							<Route path="*" element={<NotFoundPage />} />
						</Routes>
					</div>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
