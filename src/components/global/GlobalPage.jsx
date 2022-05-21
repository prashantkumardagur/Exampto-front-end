import React, { Suspense } from "react";
import NavBar from "./NavBar";
import { Navigate, Routes, Route } from "react-router-dom";

import PageLoader from "../ui/PageLoader";

const HomePage = React.lazy(() => import("../../pages/HomePage"));
const LoginPage = React.lazy(() => import('../../pages/authPages/LoginPage'));
const SignUpPage = React.lazy(() => import('../../pages/authPages/SignUpPage'));
const AdminLoginPage = React.lazy(() => import('../../pages/authPages/AdminLoginPage'));

const GlobalPage = () => {
  return (<>
    <NavBar />
    <div className="container">
      <Suspense fallback={<div><PageLoader /></div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/auth' element={<Navigate to='/auth/login' replace />} />
          <Route path='/auth/login' element={<LoginPage />} />
          <Route path='/auth/signup' element={<SignUpPage />} />
          <Route path='/auth/adminlogin' element={<AdminLoginPage />} />
        </Routes>
      </Suspense>
    </div>
  </>);
}

export default GlobalPage;