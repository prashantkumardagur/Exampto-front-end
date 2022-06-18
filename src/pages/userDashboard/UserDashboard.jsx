import React, { Suspense, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navigation from "../../components/dashboard/Navigation";
import PageLoader from "../../components/ui/PageLoader";

const ExamSection = React.lazy(() => import('./ExamSection'));
const PracticeSection = React.lazy(() => import('./PracticeSection'));
const ResultSection = React.lazy(() => import('./ResultSection'));
const WalletSection = React.lazy(() => import('./WalletSection'));
const ViewExamPage = React.lazy(() => import('./ViewExamPage'));

const UserDashboard = () => {
  const [navVisibility, setNavVisibility] = useState(true);

  useEffect(() => {
    if(window.innerWidth < 768) {
      setNavVisibility(false);
    }
  }, []);

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
        </Routes>
      </Suspense>
    </main>
  </>)
}

export default UserDashboard;