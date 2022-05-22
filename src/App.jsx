import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

const GlobalPage = React.lazy(() => import('./components/global/GlobalPage'));

const UserDashboard = React.lazy(() => import('./pages/userDashboard/UserDashboard'));
const AdminDashboard = React.lazy(() => import('./pages/adminDashboard/AdminDashboard'));
const CoordinatorDashboard = React.lazy(() => import('./pages/coordinatorDashboard/CoordinatorDashboard'));

const ExamPage = React.lazy(() => import('./pages/ExamPage'));

function App() {
  return (
    <Routes>
      <Route path='/*' element={<GlobalPage />} />
      <Route path='/user/*' element={<UserDashboard />} />
      <Route path='/admin/*' element={<AdminDashboard />} />
      <Route path='/coordinator/*' element={<CoordinatorDashboard />} />
      <Route path='/attemptexam/' element={<Navigate to='/user/exams' replace />} />
      <Route path='/attemptexam/*' element={<ExamPage />} />
    </Routes>
  );
}

export default App;
