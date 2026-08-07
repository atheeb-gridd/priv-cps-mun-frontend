import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import BackgroundGuides from './pages/BackgroundGuides';
import Committees from './pages/Committees';
import Agendas from './pages/Agendas';
import Contact from './pages/Contact';
import Itinerary from './pages/Itinerary';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Register from './pages/Register'; // Acts as SignUp / Create Account
import RegistrationForm from './pages/RegistrationForm'; // The actual MUN registration form
import Login from './pages/Login';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
// import DashboardPlaceholder from './pages/DashboardPlaceholder';
import OCMembers from './components/OCMembers';
import PremiumBackground from './components/PremiumBackground';
import { AuthProvider, useAuth } from './context/AuthContext';

// Route Guard for Protected Pages
const ProtectedRoute = ({ children, requireCompleted = false }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0c0d12] flex flex-col items-center justify-center text-[#DCA843] font-cinzel">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#DCA843] mb-4"></div>
        Loading Session...
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Route Guard for Public Auth Pages (Login, Sign Up)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0c0d12] flex flex-col items-center justify-center text-[#DCA843] font-cinzel">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#DCA843] mb-4"></div>
        Loading Session...
      </div>
    );
  }
  
  if (user) {
    if (user.registrationCompleted) {
      return <Navigate to="/dashboard" replace />;
    } else {
      return <Navigate to="/registration-form" replace />;
    }
  }
  
  return children;
};

const App = () => {
  const [openNav, setOpenNav] = useState(false);

  return (
    <Router>
      <AuthProvider>
        <MainApp openNav={openNav} setOpenNav={setOpenNav}/>
      </AuthProvider>
    </Router>
  );
};

const MainApp = ({ openNav, setOpenNav }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    const titleMap = {
      '/': 'CPS PRIME MUN 5.O | Conquer From Within',
      '/backgroundguides': 'Background Guides | CPS PRIME MUN 5.O',
      '/committees': 'Committees | CPS PRIME MUN 5.O',
      '/agendas': 'Agendas | CPS PRIME MUN 5.O',
      '/ocmembers': 'Organizing Committee | CPS PRIME MUN 5.O',
      '/contact': 'Contact Us | CPS PRIME MUN 5.O',
      '/itinerary': 'Conference Schedule & Itinerary | CPS PRIME MUN 5.O',
      '/register': 'Create Account | CPS PRIME MUN 5.O',
      '/login': 'Sign In | CPS PRIME MUN 5.O',
      '/verify-email': 'Verify Email | CPS PRIME MUN 5.O',
      '/forgot-password': 'Forgot Password | CPS PRIME MUN 5.O',
      '/reset-password': 'Reset Password | CPS PRIME MUN 5.O',
      '/dashboard': 'Delegate Portal | CPS PRIME MUN 5.O',
      '/registration-form': 'Seat Allocation & Registration | CPS PRIME MUN 5.O',
    };

    document.title = titleMap[location.pathname] || 'CPS PRIME MUN 5.O';
  }, [location.pathname]);

  return (
    <>
      <PremiumBackground />
      <Navbar openNav={openNav} setOpenNav={setOpenNav} />
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/backgroundguides' element={<BackgroundGuides />} />
        <Route path='/committees' element={<Committees />} />
        <Route path='/agendas' element={<Agendas />} />
        <Route path='/ocmembers' element={<OCMembers />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/itinerary' element={<Itinerary />} />

        {/* Public Auth Routes */}
        <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
        <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path='/forgot-password' element={<PublicRoute><ForgotPassword /></PublicRoute>} />
        <Route path='/reset-password' element={<PublicRoute><ResetPassword /></PublicRoute>} />

        {/* Protected Routes */}
        <Route path='/dashboard' element={<ProtectedRoute requireCompleted={true}><RegistrationForm /></ProtectedRoute>} />
        <Route path='/registration-form' element={<ProtectedRoute requireCompleted={false}><RegistrationForm /></ProtectedRoute>} />
      </Routes>
      
      <Footer />
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
};

export default App;
