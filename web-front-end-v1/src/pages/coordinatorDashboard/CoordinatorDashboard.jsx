import React, { Suspense, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "../../components/dashboard/Header";
import SideNav from "../../components/dashboard/SideNav";
import PageLoader from "../../components/ui/PageLoader";

const AnalyticsSection = React.lazy(() => import('./AnalyticsSection'));
const MyTestsSection = React.lazy(() => import('./MyTestsSection'));
const NewTestSection = React.lazy(() => import('./NewTestSection'));

const UserDashboard = () => {
	const [navVisibility, setNavVisibility] = useState(true);

	return (<>
		<Header toggleNav={() => { setNavVisibility(!navVisibility) }} />
		<SideNav visible={navVisibility} type='coordinator' />
		<main className={`${navVisibility ? '' : 'cover'} t-2`}>
			<Suspense fallback={<div><PageLoader /></div>}>
				<Routes>
					<Route path='/' element={<Navigate to='analytics' replace />} />
					<Route path='/analytics' element={<AnalyticsSection />} />
					<Route path='/mytests' element={<MyTestsSection />} />
					<Route path='/newtest' element={<NewTestSection />} />
				</Routes>
			</Suspense>
		</main>
	</>)
}

export default UserDashboard;