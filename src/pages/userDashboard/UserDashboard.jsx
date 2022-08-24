import React, { Suspense, useEffect, useState, useContext } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Navigation from "../../components/dashboard/Navigation";
import PageLoader from "../../components/ui/PageLoader";

import AuthContext from "../../store/AuthContext";


const ExamSection = React.lazy(() => import('./ExamSection'));
const PracticeSection = React.lazy(() => import('./PracticeSection'));
const ResultSection = React.lazy(() => import('./ResultSection'));
const WalletSection = React.lazy(() => import('./WalletSection'));
const ViewExamPage = React.lazy(() => import('./ViewExamPage'));
const ProfilePage = React.lazy(() => import('../ProfilePage'));
const NotFound = React.lazy(() => import('../404'));




const UserDashboard = () => {
  const navigate = useNavigate();
  const { role, isLoggedIn } = useContext(AuthContext);
  const [navVisibility, setNavVisibility] = useState(true);


  useEffect(() => {
    if(!isLoggedIn || role !== 'user') {
      navigate('/auth/login');
    }

    if(window.innerWidth < 768) {
      setNavVisibility(false);
    }
  }, [isLoggedIn, role, navigate]);




  return (<>
    <Navigation type='user' navVisibility={navVisibility} toggleNav={ () => {setNavVisibility(!navVisibility)} } />
    
    <main className={`${navVisibility ? '' : 'cover'} t-2`}>
      <Suspense fallback={<div><PageLoader /></div>}>
        <Routes>
					<Route path='/' element={<Navigate to='exams' replace />} />
          <Route path='/exams' element={<ExamSection />} />
          <Route path='/practice' element={<PracticeSection />} />
          <Route path='/results' element={<ResultSection />} />
          <Route path='/wallet' element={<WalletSection />} />
          <Route path='/viewexam/:id/*' element={<ViewExamPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='*' element={<NotFound home="exams" />} />
        </Routes>
      </Suspense>
    </main>
  </>)
}

export default UserDashboard;