import React, { Suspense, useState, useEffect, useContext } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Navigation from "../../components/dashboard/Navigation";
import PageLoader from "../../components/ui/PageLoader";

import AuthContext from "../../store/AuthContext";


const AnalyticsSection = React.lazy(() => import('./AnalyticsSection'));
const UserSection = React.lazy(() => import('./UserSection'));
const CoordinatorSection = React.lazy(() => import('./CoordinatorSection'));
const MessagesSection = React.lazy(() => import('./MessagesSection'));
const PendingPayments = React.lazy(() => import('./PendingPayments'));
const ProfilePage = React.lazy(() => import('../ProfilePage'));
const NotFound = React.lazy(() => import('../404'));




const UserDashboard = () => {
	const navigate = useNavigate();
	const { isLoggedIn, role } = useContext(AuthContext);
	const [navVisibility, setNavVisibility] = useState(true);


	// Effect to toggle the navbar visibility on smaller screens
  useEffect(() => {
		if( !isLoggedIn || role !== 'admin' ){
			navigate('/auth/login');
		}
    if(window.innerWidth < 768) {
      setNavVisibility(false);
    }
  }, [isLoggedIn, role, navigate]);



	

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
					<Route path='/payments' element={<PendingPayments />} />
          <Route path='/profile' element={<ProfilePage />} />
					<Route path='*' element={<NotFound home="analytics" />} />
				</Routes>
			</Suspense>
		</main>
	</>)
}

export default UserDashboard;