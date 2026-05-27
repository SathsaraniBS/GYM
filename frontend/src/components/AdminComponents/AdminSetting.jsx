// src/components/AdminComponents/AdminSetting.jsx
import React, { useState } from 'react';
import {
  Settings, Save, Eye, EyeOff, Check, X,
  Zap, Shield, Bell, Globe, Database,
  Palette, Lock, Mail, Phone, MapPin,
  RefreshCw, AlertTriangle, Server, Clock,
  ToggleLeft, ToggleRight, ChevronRight, User
} from 'lucide-react';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
const Field = ({ label, hint, children }) => (
  <div>
    <label className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-1.5 block">{label}</label>
    {hint && <p className="text-gray-600 text-xs mb-2">{hint}</p>}
    {children}
  </div>
);

const Input = ({ icon: Icon, ...props }) => (
  <div className="relative">
    {Icon && <Icon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />}
    <input
      {...props}
      className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 bg-gray-950 border border-gray-800
        rounded-xl focus:outline-none focus:border-red-600 text-white text-sm
        placeholder-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
    />
  </div>
);

const Toggle = ({ enabled, onToggle, color = '#dc2626' }) => (
  <button onClick={onToggle}
    className="w-12 h-6 flex items-center rounded-full px-0.5 transition-all duration-300 flex-shrink-0"
    style={{ backgroundColor: enabled ? color : '#1f2937' }}>
    <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 ${enabled ? 'translate-x-6' : 'translate-x-0'}`} />
  </button>
);

const SectionCard = ({ icon: Icon, title, subtitle, iconColor = '#dc2626', children }) => (
  <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-colors">
    <div className="p-6 border-b border-gray-800 flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor:`${iconColor}15`, border:`1px solid ${iconColor}30` }}>
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

const Toast = ({ toast }) => {
  if (!toast) return null;
  return (
    <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-2xl ${
      toast.type === 'success' ? 'bg-green-950/90 border-green-800/60 text-green-400' : 'bg-red-950/90 border-red-800/60 text-red-400'
    }`}>
      {toast.type === 'success' ? <Check size={15}/> : <X size={15}/>}
      <span className="text-sm font-semibold">{toast.msg}</span>
    </div>
  );
};

const ToggleRow = ({ label, sub, enabled, onToggle, color = '#dc2626' }) => (
  <div onClick={onToggle}
    className="flex items-center justify-between px-4 py-4 rounded-xl hover:bg-gray-900 transition-colors cursor-pointer">
    <div>
      <p className="text-white text-sm font-semibold">{label}</p>
      {sub && <p className="text-gray-600 text-xs mt-0.5">{sub}</p>}
    </div>
    <Toggle enabled={enabled} onToggle={() => {}} color={color} />
  </div>
);

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function AdminSetting() {
  const { user } = useAuth();
  const [activeTab,   setActiveTab]   = useState('general');
  const [toast,       setToast]       = useState(null);
  const [showPw,      setShowPw]      = useState(false);

  // ── General settings ──
  const [gymName,     setGymName]     = useState('FitTrack Gym');
  const [gymEmail,    setGymEmail]    = useState('fitnessfirstcolombo@gmail.com');
  const [gymPhone,    setGymPhone]    = useState('011-269-5331');
  const [gymAddress,  setGymAddress]  = useState('Colombo 7, Maitland Crescent');
  const [gymWebsite,  setGymWebsite]  = useState('https://fittrack.lk');
  const [currency,    setCurrency]    = useState('LKR');
  const [timezone,    setTimezone]    = useState('Asia/Colombo');
  const [saving,      setSaving]      = useState(false);

  // ── Notifications ──
  const [notif, setNotif] = useState({
    newMember:       true,
    memberExpiry:    true,
    paymentReceived: true,
    classBooking:    false,
    contactMessage:  true,
    weeklyReport:    true,
    systemAlerts:    true,
    promoEmails:     false,
  });

  // ── Security ──
  const [curPw,       setCurPw]       = useState('');
  const [newPw,       setNewPw]       = useState('');
  const [conPw,       setConPw]       = useState('');
  const [pwSaving,    setPwSaving]    = useState(false);
  const [pwErr,       setPwErr]       = useState('');
  const [security, setSecurity] = useState({
    twoFactor:       false,
    loginAlerts:     true,
    sessionTimeout:  true,
    ipWhitelist:     false,
  });

  // ── Business hours ──
  const [hours, setHours] = useState({
    monFri: { open: '05:00', close: '23:00', enabled: true  },
    satSun: { open: '06:00', close: '22:00', enabled: true  },
    holidays:{ open: '08:00', close: '18:00', enabled: false },
  });

  // ── Branches ──
  const [branches] = useState([
    { name:'Colombo 7', address:'Maitland Crescent', phone:'011-269-5331', active:true  },
    { name:'Moors',     address:'Moors Sports Club',  phone:'011-212-1755', active:true  },
    { name:'Ja Ela',    address:'Ja-ela',             phone:'011-222-9747', active:true  },
    { name:'WTC',       address:'World Trade Center', phone:'011-233-8842', active:false },
  ]);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Save general ──
  const handleSaveGeneral = async () => {
    setSaving(true);
    try {
      await api.put('/api/admin/settings', { gymName, gymEmail, gymPhone, gymAddress, currency, timezone });
      showToast('Settings saved successfully!');
    } catch {
      showToast('Settings saved (demo mode)');
    } finally { setSaving(false); }
  };

  // ── Change password ──
  const handleChangePassword = async () => {
    setPwErr('');
    if (newPw.length < 6) { setPwErr('Password must be at least 6 characters.'); return; }
    if (newPw !== conPw)  { setPwErr('Passwords do not match.'); return; }
    setPwSaving(true);
    try {
      await api.put('/api/auth/change-password', { currentPassword: curPw, newPassword: newPw });
      showToast('Password changed successfully!');
      setCurPw(''); setNewPw(''); setConPw('');
    } catch (err) {
      setPwErr(err.response?.data?.message || 'Failed to change password.');
    } finally { setPwSaving(false); }
  };

  const pwStrength  = !newPw ? 0 : newPw.length < 4 ? 1 : newPw.length < 6 ? 2 : newPw.length < 10 ? 3 : 4;
  const pwColors    = ['', '#ef4444', '#f97316', '#f59e0b', '#22c55e'];
  const pwLabels    = ['', 'Too Weak', 'Weak', 'Fair', 'Strong'];

  const tabs = [
    { id:'general',      label:'General',       icon:Settings  },
    { id:'notifications',label:'Notifications', icon:Bell      },
    { id:'security',     label:'Security',      icon:Shield    },
    { id:'hours',        label:'Business Hours',icon:Clock     },
    { id:'branches',     label:'Branches',      icon:MapPin    },
    { id:'system',       label:'System',        icon:Server    },
  ];

  return (
    <div className="space-y-6">
      <Toast toast={toast} />

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Zap size={11} className="text-red-500 fill-red-500" />
          <span className="text-red-500 text-[9px] font-bold uppercase tracking-[0.3em]">Admin</span>
        </div>
        <h1 className="text-3xl font-black uppercase">Settings</h1>
        <p className="text-gray-500 text-sm mt-0.5">Configure your gym management system</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-950 border border-gray-800 rounded-xl p-1 overflow-x-auto">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${
              activeTab === t.id ? 'bg-red-600 text-white shadow-lg shadow-red-900/30' : 'text-gray-500 hover:text-white'
            }`}>
            <t.icon size={13}/> {t.label}
          </button>
        ))}
      </div>

      {/* ════════ GENERAL ════════ */}
      {activeTab === 'general' && (
        <div className="space-y-5 max-w-2xl">
          <SectionCard icon={Settings} title="Gym Information" subtitle="Basic details about your gym">
            <div className="space-y-5">
              <Field label="Gym Name">
                <Input icon={Zap} placeholder="FitTrack Gym" value={gymName}
                  onChange={e => setGymName(e.target.value)} />
              </Field>
              <Field label="Contact Email">
                <Input icon={Mail} type="email" placeholder="info@fittrack.lk" value={gymEmail}
                  onChange={e => setGymEmail(e.target.value)} />
              </Field>
              <Field label="Phone Number">
                <Input icon={Phone} placeholder="011-269-5331" value={gymPhone}
                  onChange={e => setGymPhone(e.target.value)} />
              </Field>
              <Field label="Primary Address">
                <Input icon={MapPin} placeholder="Colombo 7, Maitland Crescent" value={gymAddress}
                  onChange={e => setGymAddress(e.target.value)} />
              </Field>
              <Field label="Website">
                <Input icon={Globe} placeholder="https://fittrack.lk" value={gymWebsite}
                  onChange={e => setGymWebsite(e.target.value)} />
              </Field>
            </div>
          </SectionCard>

          <SectionCard icon={Globe} title="Regional" subtitle="Currency and timezone settings" iconColor="#3b82f6">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Currency">
                <select value={currency} onChange={e => setCurrency(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm transition-colors">
                  {['LKR','USD','EUR','GBP','AUD'].map(c => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Timezone">
                <select value={timezone} onChange={e => setTimezone(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm transition-colors">
                  {['Asia/Colombo','Asia/Kolkata','UTC','America/New_York','Europe/London'].map(t => <option key={t}>{t}</option>)}
                </select>
              </Field>
            </div>
          </SectionCard>

          <button onClick={handleSaveGeneral} disabled={saving}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-900 text-white font-bold px-8 py-4 rounded-xl text-sm uppercase tracking-wider transition-all hover:scale-[1.02]">
            {saving
              ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/> Saving...</>
              : <><Save size={14}/> Save Changes</>
            }
          </button>
        </div>
      )}

      {/* ════════ NOTIFICATIONS ════════ */}
      {activeTab === 'notifications' && (
        <div className="space-y-5 max-w-xl">
          <SectionCard icon={Bell} title="Admin Alerts" subtitle="Notifications sent to admin email">
            <div className="space-y-1 -mx-2">
              {[
                { key:'newMember',       label:'New Member Registration', sub:'Alert when a new member registers',       color:'#22c55e' },
                { key:'memberExpiry',    label:'Membership Expiry',       sub:'Alert 7 days before membership expires',   color:'#f59e0b' },
                { key:'paymentReceived', label:'Payment Received',        sub:'Confirm when payment is processed',        color:'#3b82f6' },
                { key:'classBooking',   label:'Class Bookings',          sub:'Alert when a class is booked',             color:'#8b5cf6' },
                { key:'contactMessage', label:'Contact Messages',         sub:'New message from contact form',            color:'#dc2626' },
              ].map(item => (
                <ToggleRow key={item.key} label={item.label} sub={item.sub}
                  enabled={notif[item.key]} color={item.color}
                  onToggle={() => setNotif(p => ({ ...p, [item.key]: !p[item.key] }))} />
              ))}
            </div>
          </SectionCard>

          <SectionCard icon={Mail} title="Report & Marketing" subtitle="Scheduled reports and emails" iconColor="#3b82f6">
            <div className="space-y-1 -mx-2">
              {[
                { key:'weeklyReport', label:'Weekly Performance Report', sub:'Every Monday morning summary',  color:'#3b82f6' },
                { key:'systemAlerts', label:'System Alerts',             sub:'Server and error notifications', color:'#ef4444' },
                { key:'promoEmails',  label:'Promotional Emails',        sub:'Special offers and updates',     color:'#f59e0b' },
              ].map(item => (
                <ToggleRow key={item.key} label={item.label} sub={item.sub}
                  enabled={notif[item.key]} color={item.color}
                  onToggle={() => setNotif(p => ({ ...p, [item.key]: !p[item.key] }))} />
              ))}
            </div>
          </SectionCard>

          <button onClick={() => showToast('Notification settings saved!')}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl text-sm uppercase tracking-wider transition-all">
            <Save size={14}/> Save Preferences
          </button>
        </div>
      )}

      {/* ════════ SECURITY ════════ */}
      {activeTab === 'security' && (
        <div className="space-y-5 max-w-xl">

          {/* Change password */}
          <SectionCard icon={Lock} title="Change Password" subtitle="Update your admin password">
            <div className="space-y-4">
              <Field label="Current Password">
                <div className="relative">
                  <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                  <input type={showPw ? 'text' : 'password'} placeholder="Enter current password"
                    value={curPw} onChange={e => setCurPw(e.target.value)}
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
                  <input type={showPw ? 'text' : 'password'} placeholder="Min. 6 characters"
                    value={newPw} onChange={e => setNewPw(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm placeholder-gray-700 transition-colors" />
                </div>
                {newPw && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1,2,3,4].map(n => (
                        <div key={n} className="flex-1 h-1 rounded-full transition-colors"
                          style={{ backgroundColor: n <= pwStrength ? pwColors[pwStrength] : '#1f2937' }} />
                      ))}
                    </div>
                    <p className="text-xs" style={{ color: pwColors[pwStrength] }}>{pwLabels[pwStrength]}</p>
                  </div>
                )}
              </Field>
              <Field label="Confirm Password">
                <div className="relative">
                  <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                  <input type={showPw ? 'text' : 'password'} placeholder="Repeat new password"
                    value={conPw} onChange={e => setConPw(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm placeholder-gray-700 transition-colors" />
                  {conPw && newPw === conPw && <Check size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500"/>}
                </div>
              </Field>
              {pwErr && (
                <div className="flex items-center gap-2 p-3 bg-red-950/40 border border-red-800/50 rounded-xl text-red-400 text-sm">
                  <X size={13}/> {pwErr}
                </div>
              )}
              <button onClick={handleChangePassword} disabled={pwSaving}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-900 text-white font-bold px-7 py-3 rounded-xl text-sm uppercase tracking-wider transition-all">
                {pwSaving
                  ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/> Updating...</>
                  : <><Lock size={14}/> Update Password</>
                }
              </button>
            </div>
          </SectionCard>

          {/* Security toggles */}
          <SectionCard icon={Shield} title="Access Control" subtitle="Security and session settings" iconColor="#22c55e">
            <div className="space-y-1 -mx-2">
              {[
                { key:'twoFactor',      label:'Two-Factor Authentication', sub:'Extra login protection via SMS', color:'#22c55e' },
                { key:'loginAlerts',    label:'Login Alerts',              sub:'Email on every new admin login', color:'#3b82f6' },
                { key:'sessionTimeout', label:'Session Timeout',           sub:'Auto logout after 30 min idle',  color:'#f59e0b' },
                { key:'ipWhitelist',    label:'IP Whitelisting',           sub:'Restrict to specific IP ranges', color:'#8b5cf6' },
              ].map(item => (
                <ToggleRow key={item.key} label={item.label} sub={item.sub}
                  enabled={security[item.key]} color={item.color}
                  onToggle={() => setSecurity(p => ({ ...p, [item.key]: !p[item.key] }))} />
              ))}
            </div>
          </SectionCard>
        </div>
      )}

      {/* ════════ BUSINESS HOURS ════════ */}
      {activeTab === 'hours' && (
        <div className="space-y-5 max-w-xl">
          <SectionCard icon={Clock} title="Operating Hours" subtitle="Set gym opening and closing times">
            <div className="space-y-5">
              {[
                { key:'monFri',   label:'Monday – Friday',   color:'#dc2626' },
                { key:'satSun',   label:'Saturday – Sunday', color:'#3b82f6' },
                { key:'holidays', label:'Public Holidays',   color:'#f59e0b' },
              ].map(row => (
                <div key={row.key} className="bg-gray-950 border border-gray-800 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: row.color }} />
                      <p className="text-white font-bold text-sm">{row.label}</p>
                    </div>
                    <Toggle
                      enabled={hours[row.key].enabled}
                      color={row.color}
                      onToggle={() => setHours(p => ({ ...p, [row.key]: { ...p[row.key], enabled: !p[row.key].enabled } }))}
                    />
                  </div>
                  {hours[row.key].enabled && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-gray-600 text-[10px] uppercase tracking-widest mb-1.5 block">Opens</label>
                        <input type="time" value={hours[row.key].open}
                          onChange={e => setHours(p => ({ ...p, [row.key]: { ...p[row.key], open: e.target.value } }))}
                          className="w-full px-4 py-2.5 bg-black border border-gray-800 rounded-lg focus:outline-none focus:border-red-600 text-white text-sm transition-colors" />
                      </div>
                      <div>
                        <label className="text-gray-600 text-[10px] uppercase tracking-widest mb-1.5 block">Closes</label>
                        <input type="time" value={hours[row.key].close}
                          onChange={e => setHours(p => ({ ...p, [row.key]: { ...p[row.key], close: e.target.value } }))}
                          className="w-full px-4 py-2.5 bg-black border border-gray-800 rounded-lg focus:outline-none focus:border-red-600 text-white text-sm transition-colors" />
                      </div>
                    </div>
                  )}
                  {!hours[row.key].enabled && (
                    <p className="text-gray-700 text-xs uppercase tracking-widest">Closed</p>
                  )}
                </div>
              ))}
            </div>
          </SectionCard>

          <button onClick={() => showToast('Business hours saved!')}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl text-sm uppercase tracking-wider transition-all">
            <Save size={14}/> Save Hours
          </button>
        </div>
      )}

      {/* ════════ BRANCHES ════════ */}
      {activeTab === 'branches' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">{branches.filter(b=>b.active).length} active branches</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {branches.map((b, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      b.active ? 'bg-red-600/15 border border-red-600/30' : 'bg-gray-900 border border-gray-800'
                    }`}>
                      <MapPin size={16} className={b.active ? 'text-red-500' : 'text-gray-600'} />
                    </div>
                    <div>
                      <p className="text-white font-black">{b.name}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${b.active ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`} />
                        <p className={`text-[9px] uppercase tracking-widest font-bold ${b.active ? 'text-green-400' : 'text-gray-600'}`}>
                          {b.active ? 'Active' : 'Inactive'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin size={12} className="text-gray-600" />
                    <p className="text-gray-400 text-xs">{b.address}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={12} className="text-gray-600" />
                    <p className="text-gray-400 text-xs">{b.phone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ════════ SYSTEM ════════ */}
      {activeTab === 'system' && (
        <div className="space-y-5 max-w-xl">
          {/* System info */}
          <SectionCard icon={Server} title="System Information" subtitle="Current system status">
            <div className="space-y-3">
              {[
                { label:'Node.js Version',   val:'v18.17.0' },
                { label:'Database',          val:'MongoDB Atlas' },
                { label:'Frontend',          val:'React + Vite' },
                { label:'Backend',           val:'Express.js' },
                { label:'Environment',       val:'Development' },
                { label:'Last Restart',      val: new Date().toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'}) },
              ].map((r, i) => (
                <div key={i} className="flex justify-between py-2.5 border-b border-gray-800/60 last:border-0">
                  <span className="text-gray-500 text-sm">{r.label}</span>
                  <span className="text-white text-sm font-semibold">{r.val}</span>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Cache + maintenance */}
          <SectionCard icon={Database} title="Data Management" subtitle="Cache and maintenance options" iconColor="#f59e0b">
            <div className="space-y-3">
              {[
                { label:'Clear Cache',       sub:'Remove temporary files',             icon:RefreshCw, color:'border-blue-600/40 text-blue-400 hover:bg-blue-600'   },
                { label:'Export All Data',   sub:'Download full database backup',      icon:Database,  color:'border-green-600/40 text-green-400 hover:bg-green-600' },
              ].map((btn, i) => (
                <button key={i} onClick={() => showToast(`${btn.label} initiated`)}
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-xl border transition-all duration-200 hover:text-white ${btn.color}`}>
                  <div className="text-left">
                    <p className="font-bold text-sm">{btn.label}</p>
                    <p className="text-xs opacity-60 mt-0.5">{btn.sub}</p>
                  </div>
                  <btn.icon size={16} />
                </button>
              ))}
            </div>
          </SectionCard>

          {/* Danger zone */}
          <div className="bg-red-950/15 border border-red-900/30 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={16} className="text-red-500" />
              <h3 className="text-red-400 font-black text-sm uppercase">Danger Zone</h3>
            </div>
            <p className="text-gray-500 text-xs mb-5 leading-relaxed">
              These actions are irreversible. Please be absolutely certain before proceeding.
            </p>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between px-5 py-4 rounded-xl border border-yellow-800/50 hover:border-yellow-600/50 text-yellow-600 hover:text-yellow-400 transition-all">
                <div className="text-left">
                  <p className="font-bold text-sm">Reset All Settings</p>
                  <p className="text-xs opacity-60 mt-0.5">Restore factory defaults</p>
                </div>
                <RefreshCw size={16}/>
              </button>
              <button className="w-full flex items-center justify-between px-5 py-4 rounded-xl border border-red-800/50 hover:bg-red-600/10 text-red-600 hover:text-red-400 transition-all">
                <div className="text-left">
                  <p className="font-bold text-sm">Delete All Demo Data</p>
                  <p className="text-xs opacity-60 mt-0.5">Remove all sample records</p>
                </div>
                <AlertTriangle size={16}/>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}