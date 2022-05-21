import React, { Suspense, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "../../components/dashboard/Header";
import SideNav from "../../components/dashboard/SideNav";
import PageLoader from "../../components/ui/PageLoader";

const AnalyticsSection = React.lazy(() => import('./AnalyticsSection'));
const UserSection = React.lazy(() => import('./UserSection'));
const CoordinatorSection = React.lazy(() => import('./CoordinatorSection'));

const UserDashboard = () => {
	const [navVisibility, setNavVisibility] = useState(true);

	return (<>
		<Header toggleNav={() => { setNavVisibility(!navVisibility) }} />
		<SideNav visible={navVisibility} type='admin' />
		<main className={`${navVisibility ? '' : 'cover'} t-2`}>
			<Suspense fallback={<div><PageLoader /></div>}>
				<Routes>
					<Route path='/' element={<Navigate to='analytics' replace />} />
					<Route path='/analytics' element={<AnalyticsSection />} />
					<Route path='/users' element={<UserSection />} />
					<Route path='/coordinators' element={<CoordinatorSection />} />
				</Routes>
			</Suspense>
		</main>
	</>)
}

export default UserDashboard;