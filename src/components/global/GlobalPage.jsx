import React, { Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

import NavBar from "./NavBar";
import PageLoader from "../ui/PageLoader";
import Footer from "./Footer";


const LoginPage = React.lazy(() => import('../../pages/authPages/LoginPage'));
const SignUpPage = React.lazy(() => import('../../pages/authPages/SignUpPage'));
const TermsAndConditions = React.lazy(() => import('../../pages/global/TermsAndConditions'));
const PrivacyPolicy = React.lazy(() => import('../../pages/global/PrivacyPolicy'));
const AboutUs = React.lazy(() => import('../../pages/global/AboutUs'));
const ContactUs = React.lazy(() => import('../../pages/global/ContactUs'));
const NotFound = React.lazy(() => import('../../pages/404'));




const GlobalPage = () => {
  return (<>
    <NavBar />
    <div className="container">
      <Suspense fallback={<div><PageLoader /></div>}>
        <Routes>
          <Route path='/auth' element={<Navigate to='/auth/login' replace />} />
          <Route path='/auth/login' element={<LoginPage />} />
          <Route path='/auth/signup' element={<SignUpPage />} />
          <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
    <Footer />
  </>);
}

export default GlobalPage;