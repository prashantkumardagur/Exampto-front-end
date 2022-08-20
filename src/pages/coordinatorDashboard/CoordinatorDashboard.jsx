import React, { Suspense, useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navigation from "../../components/dashboard/Navigation";
import PageLoader from "../../components/ui/PageLoader";

const AnalyticsSection = React.lazy(() => import('./AnalyticsSection'));
const MyTestsSection = React.lazy(() => import('./MyTestsSection'));
const NewTestSection = React.lazy(() => import('./NewTestSection'));
const ViewExamPage = React.lazy(() => import('./ViewExamPage'));
const ProfilePage = React.lazy(() => import('../ProfilePage'));
const NotFound = React.lazy(() => import('../404'));




const UserDashboard = () => {
	const [navVisibility, setNavVisibility] = useState(true);



  useEffect(() => {
    if(window.innerWidth < 768) {
      setNavVisibility(false);
    }
  }, []);




	return (<>
    <Navigation type='coordinator' navVisibility={navVisibility} toggleNav={ () => {setNavVisibility(!navVisibility)} } />
		
		<main className={`${navVisibility ? '' : 'cover'} t-2`}>
			<Suspense fallback={<div><PageLoader /></div>}>
				<Routes>
					<Route path='/' element={<Navigate to='analytics' replace />} />
					<Route path='/analytics' element={<AnalyticsSection />} />
					<Route path='/mytests' element={<MyTestsSection />} />
					<Route path='/newtest' element={<NewTestSection />} />
					<Route path='/viewexam/:id' element={<ViewExamPage />} />
          <Route path='/profile' element={<ProfilePage />} />
					<Route path='*' element={<NotFound home="analytics" />} />
				</Routes>
			</Suspense>
		</main>
	</>)
}

export default UserDashboard;