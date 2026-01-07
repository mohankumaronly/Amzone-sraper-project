import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'
import ScrapingLoadingScreen from '../components/ScrapingLoadingScreen'
import LoadingScreen from '../components/LoadingScreen'
import EmailVerificationScreen from '../components/EmailVerificationScreen'
import EmailSuccessPage from '../pages/EmailSuccessPage'
import Dashboard from '../pages/Dashboard'


const AppRouters = () => {
    return (
        <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/email-verification' element={<EmailVerificationScreen />} />
            <Route path='/email-verification' element={<EmailVerificationScreen />} />
            <Route path="/verify-email/:token" element={<EmailSuccessPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path='/scraping-loading' element={<ScrapingLoadingScreen />} />
            <Route path='/loading' element={<LoadingScreen />} /> */}
        </Routes>
    )
}

export default AppRouters