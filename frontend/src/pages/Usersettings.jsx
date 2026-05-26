// src/pages/user/UserSettings.jsx
import React, { useState, useRef } from 'react';
import {
  User, Lock, Bell, Palette, Shield, Trash2,
  Camera, Eye, EyeOff, Check, X, ChevronRight,
  Moon, Sun, Monitor, Zap, Save, LogOut,
  Smartphone, Mail, Globe, CreditCard,
  ArrowUpRight, AlertTriangle, RefreshCw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

// ── Toggle switch ──
const Toggle = ({ enabled, onToggle, color = '#dc2626' }) => (
  <button onClick={onToggle}
    className={`w-12 h-6 flex items-center rounded-full px-0.5 transition-all duration-300 ${
      enabled ? '' : 'bg-gray-800'
    }`}
    style={enabled ? { backgroundColor: color } : {}}
  >
    <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 ${
      enabled ? 'translate-x-6' : 'translate-x-0'
    }`} />
  </button>
);

// ── Section card ──
const Section = ({ icon: Icon, title, subtitle, children, iconColor = '#dc2626' }) => (
  <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-colors duration-300">
    <div className="p-6 border-b border-gray-800 flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: `${iconColor}15`, border: `1px solid ${iconColor}30` }}>
        <Icon size={18} style={{ color: iconColor }} />
      </div>
      <div>
        <h3 className="text-white font-black uppercase text-sm">{title}</h3>
        {subtitle && <p className="text-gray-600 text-xs mt-0.5">{subtitle}</p>}
      </div>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

// ── Input field ──
const Field = ({ label, children }) => (
  <div>
    <label className="text-gray-500 text-[10px] uppercase tracking-widest font-semibold mb-2 block">{label}</label>
    {children}
  </div>
);

const Input = ({ icon: Icon, ...props }) => (
  <div className="relative">
    {Icon && <Icon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />}
    <input
      {...props}
      className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white placeholder-gray-700 text-sm transition-colors duration-200 ${props.className || ''}`}
    />
  </div>
);

export default function UserSettings() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const fileRef  = useRef(null);

  // ── Active nav ──
  const [activeSection, setActiveSection] = useState('profile');

  // ── Profile ──
  const [name,     setName]     = useState(user?.name  || '');
  const [email,    setEmail]    = useState(user?.email || '');
  const [phone,    setPhone]    = useState(user?.phone || '');
  const [bio,      setBio]      = useState('Fitness enthusiast. Training since 2020.');
  const [dob,      setDob]      = useState('1998-04-15');
  const [gender,   setGender]   = useState('male');
  const [avatar,   setAvatar]   = useState(user?.profilePic || null);
  const [profSave, setProfSave] = useState(false);
  const [profOk,   setProfOk]   = useState(false);

  // ── Password ──
  const [curPw,    setCurPw]    = useState('');
  const [newPw,    setNewPw]    = useState('');
  const [conPw,    setConPw]    = useState('');
  const [showPw,   setShowPw]   = useState(false);
  const [pwSave,   setPwSave]   = useState(false);
  const [pwErr,    setPwErr]    = useState('');
  const [pwOk,     setPwOk]     = useState(false);

  // ── Notifications ──
  const [notif, setNotif] = useState({
    workoutReminders: true,
    progressUpdates:  true,
    weeklyReport:     true,
    challengeAlerts:  true,
    membershipExpiry: true,
    newClasses:       false,
    promotions:       false,
    communityUpdates: false,
  });

  // ── Appearance ──
  const [accentColor,  setAccentColor]  = useState('red');
  const [fontSize,     setFontSize]     = useState('medium');
  const [compactMode,  setCompactMode]  = useState(false);
  const [animations,   setAnimations]   = useState(true);

  // ── Privacy ──
  const [privacy, setPrivacy] = useState({
    profilePublic:     false,
    showProgress:      true,
    showOnLeaderboard: true,
    dataCollection:    true,
    twoFactor:         false,
  });

  // ── Fitness ──
  const [fitnessGoal,  setFitnessGoal]  = useState('muscle_gain');
  const [activityLevel,setActivityLevel]= useState('intermediate');
  const [units,        setUnits]        = useState('metric');
  const [restDays,     setRestDays]     = useState(['saturday', 'sunday']);
  const [workoutTime,  setWorkoutTime]  = useState('morning');

  // ── Handlers ──
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  const handleProfileSave = async () => {
    setProfSave(true);
    try {
      await api.put('/api/auth/profile', { name, email, phone });
      setProfOk(true);
      setTimeout(() => setProfOk(false), 3000);
    } catch {}
    finally { setProfSave(false); }
  };

  const handlePasswordSave = async () => {
    setPwErr('');
    if (newPw.length < 6) { setPwErr('Password must be at least 6 characters.'); return; }
    if (newPw !== conPw)  { setPwErr('Passwords do not match.'); return; }
    setPwSave(true);
    try {
      await api.put('/api/auth/change-password', { currentPassword: curPw, newPassword: newPw });
      setPwOk(true);
      setCurPw(''); setNewPw(''); setConPw('');
      setTimeout(() => setPwOk(false), 3000);
    } catch (err) {
      setPwErr(err.response?.data?.message || 'Failed to change password.');
    } finally { setPwSave(false); }
  };

  const pwStrength = !newPw ? 0 : newPw.length < 4 ? 1 : newPw.length < 6 ? 2 : newPw.length < 10 ? 3 : 4;
  const pwColors   = ['', '#ef4444', '#f97316', '#f59e0b', '#22c55e'];
  const pwLabels   = ['', 'Too Weak', 'Weak', 'Fair', 'Strong'];

  const toggleRestDay = (day) => {
    setRestDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  };

  const accentColors = [
    { key: 'red',    hex: '#dc2626', label: 'Red'    },
    { key: 'orange', hex: '#ea580c', label: 'Orange' },
    { key: 'blue',   hex: '#2563eb', label: 'Blue'   },
    { key: 'green',  hex: '#16a34a', label: 'Green'  },
    { key: 'purple', hex: '#9333ea', label: 'Purple' },
    { key: 'cyan',   hex: '#0891b2', label: 'Cyan'   },
  ];

  const navItems = [
    { id: 'profile',      icon: User,       label: 'Profile'       },
    { id: 'password',     icon: Lock,       label: 'Password'      },
    { id: 'notifications',icon: Bell,       label: 'Notifications' },
    { id: 'appearance',   icon: Palette,    label: 'Appearance'    },
    { id: 'privacy',      icon: Shield,     label: 'Privacy'       },
    { id: 'fitness',      icon: Zap,        label: 'Fitness'       },
    { id: 'account',      icon: CreditCard, label: 'Account'       },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">

        {/* ── Left Settings Nav ── */}
        <aside className="hidden lg:flex flex-col w-60 flex-shrink-0 sticky top-0 h-screen border-r border-gray-800 py-8 px-4">
          <div className="mb-8 px-2">
            <div className="flex items-center gap-2 mb-1">
              <Zap size={13} className="text-red-500 fill-red-500" />
              <span className="text-red-500 text-[10px] font-bold uppercase tracking-[0.3em]">Configuration</span>
            </div>
            <h2 className="text-white font-black text-xl uppercase">Settings</h2>
          </div>

          <nav className="space-y-1 flex-1">
            {navItems.map(item => (
              <button key={item.id} onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-left ${
                  activeSection === item.id
                    ? 'bg-red-600 text-white font-bold shadow-lg shadow-red-900/30'
                    : 'text-gray-500 hover:text-white hover:bg-gray-900'
                }`}>
                <item.icon size={16} className={activeSection === item.id ? 'text-white' : 'text-gray-600 group-hover:text-red-500 transition-colors'} />
                <span className="text-sm">{item.label}</span>
                {activeSection === item.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white opacity-60" />}
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="border-t border-gray-800 pt-4 mt-4">
            <button onClick={() => { logout(); navigate('/login'); }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-600/10 transition-all duration-200 group">
              <LogOut size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-sm font-bold">Sign Out</span>
            </button>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">

          {/* Mobile tab pills */}
          <div className="flex gap-1 mb-8 bg-gray-950 border border-gray-800 rounded-xl p-1 overflow-x-auto lg:hidden">
            {navItems.map(t => (
              <button key={t.id} onClick={() => setActiveSection(t.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold uppercase whitespace-nowrap transition-all duration-200 ${
                  activeSection === t.id ? 'bg-red-600 text-white' : 'text-gray-500'
                }`}>
                <t.icon size={11} /> {t.label}
              </button>
            ))}
          </div>

          {/* ════════ PROFILE ════════ */}
          {activeSection === 'profile' && (
            <div className="max-w-2xl space-y-6">
              <div>
                <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] mb-1">Account</p>
                <h1 className="text-3xl font-black uppercase">Profile Settings</h1>
              </div>

              {/* Avatar upload */}
              <Section icon={User} title="Profile Photo" subtitle="Update your display picture">
                <div className="flex items-center gap-6">
                  <div className="relative flex-shrink-0">
                    <div className="w-20 h-20 rounded-2xl border-2 border-red-600/40 overflow-hidden bg-gray-900 flex items-center justify-center">
                      {avatar
                        ? <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                        : <User size={32} className="text-gray-600" />
                      }
                    </div>
                    <button onClick={() => fileRef.current?.click()}
                      className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center transition shadow-lg">
                      <Camera size={12} className="text-white" />
                    </button>
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm mb-1">{user?.name || 'Your Name'}</p>
                    <p className="text-gray-500 text-xs mb-3">{user?.email}</p>
                    <button onClick={() => fileRef.current?.click()}
                      className="text-xs border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white px-4 py-2 rounded-lg transition-all">
                      Change Photo
                    </button>
                  </div>
                </div>
              </Section>

              {/* Personal info */}
              <Section icon={User} title="Personal Information" subtitle="Update your personal details">
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Full Name">
                      <Input placeholder="Enter full name" value={name} onChange={e => setName(e.target.value)} />
                    </Field>
                    <Field label="Phone Number">
                      <Input icon={Smartphone} placeholder="+94 77 123 4567" value={phone} onChange={e => setPhone(e.target.value)} />
                    </Field>
                  </div>
                  <Field label="Email Address">
                    <Input icon={Mail} type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                  </Field>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Date of Birth">
                      <Input type="date" value={dob} onChange={e => setDob(e.target.value)} />
                    </Field>
                    <Field label="Gender">
                      <select value={gender} onChange={e => setGender(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm transition-colors">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer_not">Prefer not to say</option>
                      </select>
                    </Field>
                  </div>
                  <Field label="Bio">
                    <textarea rows={3} value={bio} onChange={e => setBio(e.target.value)} placeholder="Tell us about yourself..."
                      className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm resize-none placeholder-gray-700 transition-colors" />
                  </Field>

                  {profOk && (
                    <div className="flex items-center gap-2 p-3 bg-green-950/40 border border-green-800/50 rounded-xl text-green-400 text-sm">
                      <Check size={14}/> Profile saved successfully!
                    </div>
                  )}

                  <button onClick={handleProfileSave} disabled={profSave}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-900 text-white font-bold px-7 py-3 rounded-xl text-sm uppercase tracking-wider transition-all duration-300 hover:scale-[1.02]">
                    {profSave
                      ? <><div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving...</>
                      : <><Save size={14}/> Save Changes</>
                    }
                  </button>
                </div>
              </Section>
            </div>
          )}

          {/* ════════ PASSWORD ════════ */}
          {activeSection === 'password' && (
            <div className="max-w-lg space-y-6">
              <div>
                <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] mb-1">Security</p>
                <h1 className="text-3xl font-black uppercase">Change Password</h1>
              </div>

              <Section icon={Lock} title="Update Password" subtitle="Choose a strong, unique password">
                <div className="space-y-5">
                  <Field label="Current Password">
                    <div className="relative">
                      <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                      <input type={showPw ? 'text' : 'password'} value={curPw} onChange={e => setCurPw(e.target.value)}
                        placeholder="Enter current password"
                        className="w-full pl-10 pr-11 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm placeholder-gray-700 transition-colors" />
                      <button onClick={() => setShowPw(!showPw)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors">
                        {showPw ? <EyeOff size={14}/> : <Eye size={14}/>}
                      </button>
                    </div>
                  </Field>

                  <Field label="New Password">
                    <div className="relative">
                      <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                      <input type={showPw ? 'text' : 'password'} value={newPw} onChange={e => setNewPw(e.target.value)}
                        placeholder="Min. 6 characters"
                        className="w-full pl-10 pr-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm placeholder-gray-700 transition-colors" />
                    </div>
                    {newPw && (
                      <div className="mt-2">
                        <div className="flex gap-1 mb-1">
                          {[1,2,3,4].map(n => (
                            <div key={n} className="flex-1 h-1 rounded-full transition-colors duration-300"
                              style={{ backgroundColor: n <= pwStrength ? pwColors[pwStrength] : '#1f2937' }} />
                          ))}
                        </div>
                        <p className="text-xs" style={{ color: pwColors[pwStrength] }}>{pwLabels[pwStrength]}</p>
                      </div>
                    )}
                  </Field>

                  <Field label="Confirm New Password">
                    <div className="relative">
                      <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                      <input type={showPw ? 'text' : 'password'} value={conPw} onChange={e => setConPw(e.target.value)}
                        placeholder="Repeat new password"
                        className="w-full pl-10 pr-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm placeholder-gray-700 transition-colors" />
                      {conPw && newPw === conPw && (
                        <Check size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" />
                      )}
                    </div>
                  </Field>

                  {pwErr && (
                    <div className="flex items-center gap-2 p-3 bg-red-950/40 border border-red-800/50 rounded-xl text-red-400 text-sm">
                      <X size={14}/> {pwErr}
                    </div>
                  )}
                  {pwOk && (
                    <div className="flex items-center gap-2 p-3 bg-green-950/40 border border-green-800/50 rounded-xl text-green-400 text-sm">
                      <Check size={14}/> Password changed successfully!
                    </div>
                  )}

                  <button onClick={handlePasswordSave} disabled={pwSave}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-900 text-white font-bold px-7 py-3 rounded-xl text-sm uppercase tracking-wider transition-all duration-300">
                    {pwSave
                      ? <><div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Updating...</>
                      : <><Lock size={14}/> Update Password</>
                    }
                  </button>
                </div>
              </Section>
            </div>
          )}

          {/* ════════ NOTIFICATIONS ════════ */}
          {activeSection === 'notifications' && (
            <div className="max-w-xl space-y-6">
              <div>
                <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] mb-1">Alerts</p>
                <h1 className="text-3xl font-black uppercase">Notifications</h1>
              </div>

              {[
                {
                  title: 'Workout & Training',
                  color: '#dc2626',
                  items: [
                    { key: 'workoutReminders', label: 'Workout Reminders',    sub: 'Daily push to stay on schedule'     },
                    { key: 'progressUpdates',  label: 'Progress Updates',     sub: 'Weekly progress summaries'          },
                    { key: 'weeklyReport',     label: 'Weekly Report',        sub: 'Your performance report every Monday'},
                  ],
                },
                {
                  title: 'Community & Events',
                  color: '#3b82f6',
                  items: [
                    { key: 'challengeAlerts',  label: 'Challenge Alerts',     sub: 'New challenges and deadlines'       },
                    { key: 'newClasses',       label: 'New Classes',          sub: 'When new classes are available'     },
                    { key: 'communityUpdates', label: 'Community Updates',    sub: 'Posts and announcements'            },
                  ],
                },
                {
                  title: 'Account & Offers',
                  color: '#22c55e',
                  items: [
                    { key: 'membershipExpiry', label: 'Membership Expiry',   sub: 'Renewal reminders'                   },
                    { key: 'promotions',       label: 'Promotions & Offers', sub: 'Special deals and discounts'         },
                  ],
                },
              ].map((group, gi) => (
                <Section key={gi} icon={Bell} title={group.title} iconColor={group.color}>
                  <div className="space-y-1 -mx-2">
                    {group.items.map(item => (
                      <div key={item.key}
                        className="flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-gray-900 transition-colors cursor-pointer"
                        onClick={() => setNotif(p => ({ ...p, [item.key]: !p[item.key] }))}>
                        <div>
                          <p className="text-white text-sm font-semibold">{item.label}</p>
                          <p className="text-gray-600 text-xs">{item.sub}</p>
                        </div>
                        <Toggle enabled={notif[item.key]} onToggle={() => {}} color={group.color} />
                      </div>
                    ))}
                  </div>
                </Section>
              ))}
            </div>
          )}

          {/* ════════ APPEARANCE ════════ */}
          {activeSection === 'appearance' && (
            <div className="max-w-xl space-y-6">
              <div>
                <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] mb-1">Display</p>
                <h1 className="text-3xl font-black uppercase">Appearance</h1>
              </div>

              {/* Theme */}
              <Section icon={Palette} title="Theme Mode" subtitle="Choose your preferred colour scheme">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'dark',   icon: Moon,    label: 'Dark'   },
                    { id: 'light',  icon: Sun,     label: 'Light'  },
                    { id: 'system', icon: Monitor, label: 'System' },
                  ].map(t => (
                    <button key={t.id}
                      onClick={() => { if (t.id !== 'system') toggleTheme(); }}
                      className={`flex flex-col items-center gap-2 py-5 rounded-xl border transition-all duration-200 ${
                        theme === t.id
                          ? 'bg-red-600/10 border-red-600/50 text-red-400'
                          : 'bg-gray-900 border-gray-800 text-gray-500 hover:border-gray-600 hover:text-white'
                      }`}>
                      <t.icon size={20} />
                      <span className="text-xs font-bold uppercase tracking-wider">{t.label}</span>
                      {theme === t.id && <div className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                    </button>
                  ))}
                </div>
              </Section>

              {/* Accent color */}
              <Section icon={Palette} title="Accent Color" subtitle="Personalize your dashboard color">
                <div className="flex flex-wrap gap-3">
                  {accentColors.map(c => (
                    <button key={c.key} onClick={() => setAccentColor(c.key)}
                      className={`flex flex-col items-center gap-1.5 transition-all duration-200 group`}>
                      <div className={`w-10 h-10 rounded-xl transition-all duration-200 ${
                        accentColor === c.key ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-110' : 'group-hover:scale-105'
                      }`} style={{ backgroundColor: c.hex }}>
                        {accentColor === c.key && (
                          <div className="w-full h-full flex items-center justify-center">
                            <Check size={14} className="text-white font-black" />
                          </div>
                        )}
                      </div>
                      <span className="text-[9px] text-gray-600 uppercase tracking-wider">{c.label}</span>
                    </button>
                  ))}
                </div>
              </Section>

              {/* Display options */}
              <Section icon={Monitor} title="Display Options" subtitle="Layout and visual preferences">
                <div className="space-y-1 -mx-2">
                  {[
                    { key: 'compact',    label: 'Compact Mode',    sub: 'Reduce spacing for more content', state: compactMode,  set: setCompactMode  },
                    { key: 'animations', label: 'Animations',      sub: 'Smooth transitions and effects',  state: animations,   set: setAnimations   },
                  ].map(opt => (
                    <div key={opt.key}
                      onClick={() => opt.set(!opt.state)}
                      className="flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-gray-900 transition-colors cursor-pointer">
                      <div>
                        <p className="text-white text-sm font-semibold">{opt.label}</p>
                        <p className="text-gray-600 text-xs">{opt.sub}</p>
                      </div>
                      <Toggle enabled={opt.state} onToggle={() => {}} />
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-800">
                  <Field label="Font Size">
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {['small', 'medium', 'large'].map(size => (
                        <button key={size} onClick={() => setFontSize(size)}
                          className={`py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                            fontSize === size ? 'bg-red-600 text-white' : 'bg-gray-900 border border-gray-800 text-gray-500 hover:text-white'
                          }`}>{size}</button>
                      ))}
                    </div>
                  </Field>
                </div>
              </Section>
            </div>
          )}

          {/* ════════ PRIVACY ════════ */}
          {activeSection === 'privacy' && (
            <div className="max-w-xl space-y-6">
              <div>
                <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] mb-1">Data</p>
                <h1 className="text-3xl font-black uppercase">Privacy & Security</h1>
              </div>

              <Section icon={Globe} title="Profile Visibility" subtitle="Control who can see your information" iconColor="#3b82f6">
                <div className="space-y-1 -mx-2">
                  {[
                    { key: 'profilePublic',     label: 'Public Profile',       sub: 'Others can view your profile'         },
                    { key: 'showProgress',      label: 'Show Progress',        sub: 'Display your fitness progress publicly'},
                    { key: 'showOnLeaderboard', label: 'Leaderboard Visibility',sub: 'Appear on community leaderboards'    },
                  ].map(item => (
                    <div key={item.key}
                      onClick={() => setPrivacy(p => ({ ...p, [item.key]: !p[item.key] }))}
                      className="flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-gray-900 transition-colors cursor-pointer">
                      <div>
                        <p className="text-white text-sm font-semibold">{item.label}</p>
                        <p className="text-gray-600 text-xs">{item.sub}</p>
                      </div>
                      <Toggle enabled={privacy[item.key]} onToggle={() => {}} color="#3b82f6" />
                    </div>
                  ))}
                </div>
              </Section>

              <Section icon={Shield} title="Security" subtitle="Protect your account" iconColor="#22c55e">
                <div className="space-y-1 -mx-2">
                  {[
                    { key: 'twoFactor',     label: 'Two-Factor Authentication', sub: 'Extra login security via SMS/app' },
                    { key: 'dataCollection',label: 'Analytics & Improvement',   sub: 'Help us improve with usage data' },
                  ].map(item => (
                    <div key={item.key}
                      onClick={() => setPrivacy(p => ({ ...p, [item.key]: !p[item.key] }))}
                      className="flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-gray-900 transition-colors cursor-pointer">
                      <div>
                        <p className="text-white text-sm font-semibold">{item.label}</p>
                        <p className="text-gray-600 text-xs">{item.sub}</p>
                      </div>
                      <Toggle enabled={privacy[item.key]} onToggle={() => {}} color="#22c55e" />
                    </div>
                  ))}
                </div>
              </Section>

              <Section icon={RefreshCw} title="Data Management" subtitle="Download or clear your data" iconColor="#f59e0b">
                <div className="space-y-3">
                  {[
                    { label: 'Download My Data',  sub: 'Get a copy of all your data', icon: ArrowUpRight, style: 'border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white' },
                    { label: 'Clear Workout History', sub: 'Remove all logged workouts', icon: Trash2,      style: 'border border-yellow-800/50 hover:border-yellow-600/50 text-yellow-600 hover:text-yellow-400' },
                  ].map((btn, i) => (
                    <button key={i} className={`w-full flex items-center justify-between px-5 py-4 rounded-xl transition-all duration-200 ${btn.style}`}>
                      <div className="text-left">
                        <p className="font-bold text-sm">{btn.label}</p>
                        <p className="text-xs opacity-60 mt-0.5">{btn.sub}</p>
                      </div>
                      <btn.icon size={15} />
                    </button>
                  ))}
                </div>
              </Section>
            </div>
          )}

          {/* ════════ FITNESS PREFERENCES ════════ */}
          {activeSection === 'fitness' && (
            <div className="max-w-xl space-y-6">
              <div>
                <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] mb-1">Training</p>
                <h1 className="text-3xl font-black uppercase">Fitness Preferences</h1>
              </div>

              <Section icon={Zap} title="Fitness Goal" subtitle="What are you primarily training for?">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { key: 'muscle_gain',   label: 'Muscle Gain',    emoji: '💪' },
                    { key: 'weight_loss',   label: 'Weight Loss',    emoji: '🔥' },
                    { key: 'endurance',     label: 'Endurance',      emoji: '🏃' },
                    { key: 'strength',      label: 'Strength',       emoji: '🏋️' },
                    { key: 'flexibility',   label: 'Flexibility',    emoji: '🧘' },
                    { key: 'general',       label: 'General Fitness',emoji: '⚡' },
                  ].map(g => (
                    <button key={g.key} onClick={() => setFitnessGoal(g.key)}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left transition-all duration-200 ${
                        fitnessGoal === g.key
                          ? 'bg-red-600/10 border-red-600/50 text-white'
                          : 'bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-600 hover:text-white'
                      }`}>
                      <span className="text-lg">{g.emoji}</span>
                      <span className="text-sm font-bold">{g.label}</span>
                      {fitnessGoal === g.key && <Check size={13} className="text-red-500 ml-auto" />}
                    </button>
                  ))}
                </div>
              </Section>

              <Section icon={BarChart2} title="Activity Level" subtitle="Your current fitness experience" iconColor="#3b82f6">
                <div className="space-y-2">
                  {[
                    { key: 'beginner',     label: 'Beginner',     sub: 'Less than 6 months training'   },
                    { key: 'intermediate', label: 'Intermediate', sub: '6 months to 2 years training'  },
                    { key: 'advanced',     label: 'Advanced',     sub: 'More than 2 years training'    },
                    { key: 'athlete',      label: 'Athlete',      sub: 'Competitive or elite training' },
                  ].map(l => (
                    <button key={l.key} onClick={() => setActivityLevel(l.key)}
                      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border transition-all duration-200 ${
                        activityLevel === l.key
                          ? 'bg-blue-600/10 border-blue-600/40 text-white'
                          : 'bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-600'
                      }`}>
                      <div className="text-left">
                        <p className="font-bold text-sm">{l.label}</p>
                        <p className="text-xs opacity-60 mt-0.5">{l.sub}</p>
                      </div>
                      {activityLevel === l.key && <Check size={14} className="text-blue-400" />}
                    </button>
                  ))}
                </div>
              </Section>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Units */}
                <Section icon={Globe} title="Units" subtitle="Measurement system" iconColor="#22c55e">
                  <div className="grid grid-cols-2 gap-2">
                    {[{ key: 'metric', label: 'Metric\nkg/cm' }, { key: 'imperial', label: 'Imperial\nlbs/ft' }].map(u => (
                      <button key={u.key} onClick={() => setUnits(u.key)}
                        className={`py-4 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all ${
                          units === u.key ? 'bg-green-600/10 border-green-600/40 text-green-400' : 'bg-gray-900 border-gray-800 text-gray-500 hover:text-white'
                        }`} style={{ whiteSpace: 'pre-line' }}>{u.label}</button>
                    ))}
                  </div>
                </Section>

                {/* Workout time */}
                <Section icon={Zap} title="Preferred Time" subtitle="Best time to train" iconColor="#f59e0b">
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: 'morning',   label: '🌅 Morning',   sub: '5-10 AM'  },
                      { key: 'afternoon', label: '☀️ Afternoon', sub: '12-4 PM'  },
                      { key: 'evening',   label: '🌆 Evening',   sub: '5-8 PM'   },
                      { key: 'night',     label: '🌙 Night',     sub: '8-11 PM'  },
                    ].map(t => (
                      <button key={t.key} onClick={() => setWorkoutTime(t.key)}
                        className={`py-3 px-2 rounded-xl border text-xs font-bold transition-all ${
                          workoutTime === t.key ? 'bg-yellow-600/10 border-yellow-600/40 text-yellow-400' : 'bg-gray-900 border-gray-800 text-gray-500 hover:text-white'
                        }`}>
                        <div>{t.label}</div>
                        <div className="opacity-50 font-normal normal-case mt-0.5">{t.sub}</div>
                      </button>
                    ))}
                  </div>
                </Section>
              </div>

              {/* Rest days */}
              <Section icon={Calendar} title="Rest Days" subtitle="Select your weekly rest days" iconColor="#8b5cf6">
                <div className="grid grid-cols-7 gap-2">
                  {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((day, i) => {
                    const key = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'][i];
                    const active = restDays.includes(key);
                    return (
                      <button key={key} onClick={() => toggleRestDay(key)}
                        className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-0.5 border text-xs font-bold uppercase transition-all duration-200 ${
                          active ? 'bg-purple-600/20 border-purple-600/40 text-purple-400' : 'bg-gray-900 border-gray-800 text-gray-600 hover:border-gray-600 hover:text-white'
                        }`}>
                        {day}
                      </button>
                    );
                  })}
                </div>
              </Section>

              <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-7 py-3 rounded-xl text-sm uppercase tracking-wider transition-all duration-300 hover:scale-[1.02]">
                <Save size={14}/> Save Preferences
              </button>
            </div>
          )}

          {/* ════════ ACCOUNT ════════ */}
          {activeSection === 'account' && (
            <div className="max-w-xl space-y-6">
              <div>
                <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] mb-1">Manage</p>
                <h1 className="text-3xl font-black uppercase">Account</h1>
              </div>

              {/* Membership */}
              <Section icon={CreditCard} title="Membership Plan" subtitle="Your current subscription" iconColor="#f59e0b">
                <div className="bg-gradient-to-r from-yellow-900/15 to-black border border-yellow-800/20 rounded-xl p-5 mb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-yellow-400 text-[10px] font-bold uppercase tracking-widest mb-1">Active Plan</p>
                      <h4 className="text-white font-black text-lg">Individual Gents</h4>
                      <p className="text-gray-500 text-xs">Colombo 7 Branch</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-green-400 text-xs font-bold">Active</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Expires: <span className="text-white font-bold">Dec 31, 2025</span></span>
                    <span className="text-gray-600">Rs. 95,000 / year</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => navigate('/membership')}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl text-sm transition-all">
                    <ArrowUpRight size={14}/> Upgrade Plan
                  </button>
                  <button className="px-5 py-3 border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white rounded-xl text-sm transition-all">
                    Details
                  </button>
                </div>
              </Section>

              {/* Sign out */}
              <Section icon={LogOut} title="Sessions" subtitle="Manage your active sessions">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-gray-900 border border-gray-800 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Monitor size={16} className="text-gray-500" />
                      <div>
                        <p className="text-white text-sm font-bold">Current Session</p>
                        <p className="text-gray-600 text-xs">Chrome • Colombo, LK • Now</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-green-400 text-[10px] font-bold">Active</span>
                    </div>
                  </div>
                  <button onClick={() => { logout(); navigate('/login'); }}
                    className="w-full flex items-center justify-center gap-2 border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white font-bold py-3 rounded-xl text-sm transition-all">
                    <LogOut size={14}/> Sign Out
                  </button>
                </div>
              </Section>

              {/* Danger zone */}
              <div className="bg-red-950/15 border border-red-900/30 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={16} className="text-red-500" />
                  <h3 className="text-red-400 font-black text-sm uppercase">Danger Zone</h3>
                </div>
                <p className="text-gray-500 text-xs mb-5 leading-relaxed">
                  Permanently delete your account and all associated fitness data. This action is irreversible.
                </p>
                <button className="flex items-center gap-2 bg-red-600/10 hover:bg-red-600 border border-red-600/30 hover:border-red-600 text-red-400 hover:text-white font-bold px-5 py-3 rounded-xl text-sm transition-all duration-300">
                  <Trash2 size={14}/> Delete Account
                </button>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}