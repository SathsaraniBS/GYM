// src/pages/Userdashboard.jsx
import React, { useEffect, useState } from 'react';
import UserNavbar from '../components/User/UserNavbar';
// import { useAuth } from '../hooks/useAuth';
import { useAuth } from '../context/AuthContext'; 
import { FaUserCircle, FaWhatsapp } from 'react-icons/fa';
import Footer from '../components/Footer';
import PersonalInfoForm from '../components/User/PresonalInfo'
import ChangePasswordForm from '../components/User/ChangePasswordForm';
import UserSidebar from '../components/User/UserSidebar';

function UserDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    if (user !== undefined) setLoading(false);
  }, [user]);

  if (loading) return <div className="bg-black min-h-screen text-white flex items-center justify-center"><p>Loading...</p></div>;
  if (!user) return <div className="bg-black min-h-screen text-white flex items-center justify-center"><p>Please log in</p></div>;

  return (
    <div className="bg-black min-h-screen text-white flex flex-col">
      <UserNavbar />
      <div className="flex flex-1 pt-[64px] bg-gray-100 dark:bg-gray-900 flex flex-col min-h-screen">
        <UserSidebar />
        
        </div>


    </div>
            
          

          

         
  );
}

export default UserDashboard;