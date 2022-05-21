import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

const GlobalPage = React.lazy(() => import('./components/global/GlobalPage'));
const UserDashboard = React.lazy(() => import('./pages/userDashboard/UserDashboard'));
const AdminDashboard = React.lazy(() => import('./pages/adminDashboard/AdminDashboard'));
const CoordinatorDashboard = React.lazy(() => import('./pages/coordinatorDashboard/CoordinatorDashboard'));

function App() {
  return (
    <Routes>
      <Route path='/*' element={<GlobalPage />} />
      <Route path='/user/*' element={<UserDashboard />} />
      <Route path='/admin/*' element={<AdminDashboard />} />
      <Route path='/coordinator/*' element={<CoordinatorDashboard />} />
    </Routes>
  );
}

export default App;
