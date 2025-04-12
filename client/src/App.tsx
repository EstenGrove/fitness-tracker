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
const ActiveWorkout = lazy(() => import("./pages/ActiveWorkoutPage.tsx"));
// views
const HistoryAll = lazy(() => import("./views/HistoryAllView.tsx"));
const HistoryStrength = lazy(() => import("./views/HistoryStrengthView.tsx"));
const HistoryStretch = lazy(() => import("./views/HistoryStretchView.tsx"));
const HistoryWalk = lazy(() => import("./views/HistoryWalkView.tsx"));
const HistoryCardio = lazy(() => import("./views/HistoryCardioView.tsx"));
const HistoryTimed = lazy(() => import("./views/HistoryTimedView.tsx"));
const HistoryOther = lazy(() => import("./views/HistoryOtherView.tsx"));

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
								{/* MARK: MEDS */}
								<Route
									path="/meds"
									element={
										<Suspense fallback={<Loader />}>
											<Medications />
										</Suspense>
									}
								/>
								{/* MARK: HISTORY */}
								<Route
									path="/history"
									element={
										<Suspense fallback={<Loader />}>
											<WorkoutHistory />
										</Suspense>
									}
								>
									<Route
										path=""
										element={
											<Suspense fallback={<Loader />}>
												<HistoryAll />
											</Suspense>
										}
									/>
									<Route
										path="strength"
										element={
											<Suspense fallback={<Loader />}>
												<HistoryStrength />
											</Suspense>
										}
									/>
									<Route
										path="cardio"
										element={
											<Suspense fallback={<Loader />}>
												<HistoryCardio />
											</Suspense>
										}
									/>
									<Route
										path="walk"
										element={
											<Suspense fallback={<Loader />}>
												<HistoryWalk />
											</Suspense>
										}
									/>
									<Route
										path="stretch"
										element={
											<Suspense fallback={<Loader />}>
												<HistoryStretch />
											</Suspense>
										}
									/>
									<Route
										path="timed"
										element={
											<Suspense fallback={<Loader />}>
												<HistoryTimed />
											</Suspense>
										}
									/>
									<Route
										path="other"
										element={
											<Suspense fallback={<Loader />}>
												<HistoryOther />
											</Suspense>
										}
									/>
								</Route>
								<Route
									path="workouts"
									element={
										<Suspense fallback={<Loader />}>
											<Workouts />
										</Suspense>
									}
								/>
								<Route path="/workouts/all" element={<AllWorkoutsPage />} />
								<Route path="/active/:id" element={<ActiveWorkout />} />
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
