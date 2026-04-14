import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { Camera, ShieldCheck, Mail, Smartphone, Bell, Trash2, Monitor, User } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();

  const [twoFA, setTwoFA] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [systemNotif, setSystemNotif] = useState(true);

  const [fullName, setFullName] = useState(user?.name || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || "");
  const [email, setEmail] = useState(user?.email || "");

  // Profile Update Function
  const handleProfileUpdate = async () => {
    try {
      await updateUser({
        name: fullName,
        email: email,
        phone: phoneNumber,
      });

      if (addToast) addToast('Profile updated successfully!', 'success');
    } catch (err) {
      if (addToast) addToast('Failed to update profile', 'error');
      console.error(err);
    }
  };

  const Toggle = ({ enabled, setEnabled }) => (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`w-14 h-7 flex items-center rounded-full p-1 transition-all duration-300 ${
        enabled ? "bg-orange-500" : "bg-gray-700"
      }`}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 ${
          enabled ? "translate-x-7" : "translate-x-0"
        }`}
      ></div>
    </button>
  );

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-10 py-10 relative overflow-hidden">
      
      {/* Header Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-12">
        <div className="z-10">
          <h1 className="text-3xl font-bold tracking-wide text-white mb-2">
            FitTrack
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-left mb-3 text-orange-500">
            Account Settings
          </h2>
          <p className="text-gray-400 mb-8">Manage your personal information and security preferences</p>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-28 h-28 rounded-full border-2 border-orange-500 overflow-hidden bg-gray-900 flex items-center justify-center">
                {user?.profilePic ? (
                    <img
                        src={user.profilePic}
                        alt="profile"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <User size={50} className="text-gray-600" />
                )}
              </div>
              <button className="absolute bottom-0 right-0 bg-orange-600 p-2 rounded-full hover:bg-orange-500 transition shadow-lg">
                <Camera size={16} className="text-white" />
              </button>
            </div>

            <div>
              <h2 className="text-2xl font-semibold">{user?.name || "User Name"}</h2>
              <span className="bg-orange-500/20 text-orange-400 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mt-2 inline-block border border-orange-500/30">
                {user?.role || "Athlete"}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side Decoration (Consistent with Auth pages) */}
        <div className="relative hidden md:block">
           <div className="w-full max-w-md mx-auto aspect-square rounded-2xl bg-gray-900 border-2 border-orange-500/20 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-orange-500/5 animate-pulse"></div>
                <User size={120} className="text-orange-500/20" />
           </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Personal Info Form */}
        <div className="md:col-span-2 bg-gray-900 border border-orange-500/20 rounded-2xl p-8 shadow-2xl">
          <h3 className="text-xl font-bold mb-8 text-white border-b border-gray-800 pb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full mt-2 p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full mt-2 p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                placeholder="+1 234 567 890"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <button
            onClick={handleProfileUpdate}
            className="mt-8 px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition transform hover:scale-105 shadow-lg shadow-orange-900/20"
          >
            Save Changes
          </button>
        </div>

        {/* Account Actions */}
        <div className="bg-gray-900 border border-orange-500/20 rounded-2xl p-8 shadow-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-8 text-white border-b border-gray-800 pb-4">Account Actions</h3>
            <button className="w-full flex items-center gap-3 px-4 py-4 rounded-xl hover:bg-gray-800 transition mb-4 text-gray-300 hover:text-orange-400">
              <Monitor size={18} /> Manage Devices
            </button>
          </div>
          <button className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-xl bg-red-600/10 text-red-500 border border-red-600/20 hover:bg-red-600 hover:text-white transition font-bold mt-4">
            <Trash2 size={18} /> Delete Account
          </button>
        </div>
      </div>

      {/* Security Section */}
      <div className="relative z-10 mt-10 bg-gray-900 border border-orange-500/20 rounded-2xl p-8 shadow-2xl">
        <h3 className="text-xl font-bold mb-8 text-white border-b border-gray-800 pb-4">Security & Notifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          <div className="flex items-center justify-between py-2 border-b border-gray-800 md:border-none">
            <div className="flex items-center gap-4">
                <ShieldCheck size={22} className="text-orange-500" /> 
                <span className="font-medium">Two-Factor Authentication</span>
            </div>
            <Toggle enabled={twoFA} setEnabled={setTwoFA} />
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-800 md:border-none">
            <div className="flex items-center gap-4">
                <Mail size={22} className="text-orange-500" /> 
                <span className="font-medium">Email Notifications</span>
            </div>
            <Toggle enabled={emailNotif} setEnabled={setEmailNotif} />
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-800 md:border-none">
            <div className="flex items-center gap-4">
                <Smartphone size={22} className="text-orange-500" /> 
                <span className="font-medium">SMS Notifications</span>
            </div>
            <Toggle enabled={smsNotif} setEnabled={setSmsNotif} />
          </div>
          <div className="flex items-center justify-between py-2 md:border-none">
            <div className="flex items-center gap-4">
                <Bell size={22} className="text-orange-500" /> 
                <span className="font-medium">System Alerts</span>
            </div>
            <Toggle enabled={systemNotif} setEnabled={setSystemNotif} />
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProfilePage;