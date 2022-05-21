import React, { Suspense, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "../../components/dashboard/Header";
import SideNav from "../../components/dashboard/SideNav";
import PageLoader from "../../components/ui/PageLoader";

const ExamSection = React.lazy(() => import('./ExamSection'));
const PracticeSection = React.lazy(() => import('./PracticeSection'));
const ResultSection = React.lazy(() => import('./ResultSection'));
const WalletSection = React.lazy(() => import('./WalletSection'));

const UserDashboard = () => {
  const [navVisibility, setNavVisibility] = useState(true);

  return (<>
    <Header toggleNav={ () => {setNavVisibility(!navVisibility)} } />
    <SideNav visible={navVisibility} type='user' />
    <main className={`${navVisibility ? '' : 'cover'} t-2`}>
      <Suspense fallback={<div><PageLoader /></div>}>
        <Routes>
					<Route path='/' element={<Navigate to='exams' replace />} />
          <Route path='/exams' element={<ExamSection />} />
          <Route path='/practice' element={<PracticeSection />} />
          <Route path='/results' element={<ResultSection />} />
          <Route path='/wallet' element={<WalletSection />} />
        </Routes>
      </Suspense>
    </main>
  </>)
}

export default UserDashboard;