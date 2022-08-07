import React, { Suspense, useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navigation from "../../components/dashboard/Navigation";
import PageLoader from "../../components/ui/PageLoader";

const AnalyticsSection = React.lazy(() => import('./AnalyticsSection'));
const UserSection = React.lazy(() => import('./UserSection'));
const CoordinatorSection = React.lazy(() => import('./CoordinatorSection'));
const MessagesSection = React.lazy(() => import('./MessagesSection'));




const UserDashboard = () => {
	const [navVisibility, setNavVisibility] = useState(true);


	// Effect to toggle the navbar visibility on smaller screens
  useEffect(() => {
    if(window.innerWidth < 768) {
      setNavVisibility(false);
    }
  }, []);



	

	return (<>
    <Navigation type='admin' navVisibility={navVisibility} toggleNav={ () => {setNavVisibility(!navVisibility)} } />
		<main className={`${navVisibility ? '' : 'cover'} t-2`}>
			<Suspense fallback={<div><PageLoader /></div>}>
				<Routes>
					<Route path='/' element={<Navigate to='analytics' replace />} />
					<Route path='/analytics' element={<AnalyticsSection />} />
					<Route path='/users' element={<UserSection />} />
					<Route path='/coordinators' element={<CoordinatorSection />} />
					<Route path="/messages" element={<MessagesSection />} />
				</Routes>
			</Suspense>
		</main>
	</>)
}

export default UserDashboard;