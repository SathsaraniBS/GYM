// src/pages/admin/AdminMembers.jsx
import React, { useState, useEffect } from 'react';
import {
  Search, Plus, Eye, Edit3, Trash2, X, Check,
  Users, AlertTriangle, Download, ChevronLeft,
  ChevronRight, Zap, Mail, Phone, Save, User,
  MapPin, CreditCard, Calendar
} from 'lucide-react';
import api from '../../api/axios';

// ── Reusable Badge ──
const Badge = ({ status }) => {
  const map = {
    Active:   'bg-green-600/15 text-green-400 border-green-600/30',
    Expired:  'bg-red-600/15 text-red-400 border-red-600/30',
    Pending:  'bg-yellow-600/15 text-yellow-400 border-yellow-600/30',
    Inactive: 'bg-gray-600/20 text-gray-400 border-gray-600/30',
  };
  return (
    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${map[status] || map.Inactive}`}>
      {status}
    </span>
  );
};

// ── Field wrapper ──
const Field = ({ label, children }) => (
  <div>
    <label className="text-gray-500 text-[10px] uppercase tracking-widest font-semibold mb-2 block">{label}</label>
    {children}
  </div>
);

// ── Input ──
const Input = ({ icon: Icon, ...props }) => (
  <div className="relative">
    {Icon && <Icon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />}
    <input
      {...props}
      className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 bg-gray-950 border border-gray-800 rounded-xl
        focus:outline-none focus:border-red-600 text-white text-sm placeholder-gray-700 transition-colors`}
    />
  </div>
);

// ══════════════════════════════════════════════
// MODAL — Add / Edit Member
// ══════════════════════════════════════════════
const MemberModal = ({ member, onClose, onSave }) => {
  const isEdit = !!member;
  const [form, setForm] = useState({
    name:    member?.name    || '',
    email:   member?.email   || '',
    phone:   member?.phone   || '',
    branch:  member?.branch  || 'Colombo 7',
    plan:    member?.plan    || 'Individual Gents',
    status:  member?.status  || 'Active',
    joined:  member?.joined  || '',
    expires: member?.expires || '',
    paid:    member?.paid    || '',
  });
  const [saving, setSaving] = useState(false);

  const set = (key, val) => setForm(p => ({ ...p, [key]: val }));

  const handleSave = async () => {
    if (!form.name || !form.email) return;
    setSaving(true);
    await onSave(form, member?._id);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-4"
      onClick={onClose}>
      <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-600/15 border border-red-600/30 flex items-center justify-center">
              <User size={16} className="text-red-500" />
            </div>
            <div>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest">{isEdit ? 'Edit' : 'New'}</p>
              <h3 className="text-white font-black uppercase text-sm">{isEdit ? 'Edit Member' : 'Add Member'}</h3>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center hover:border-gray-600 transition-colors">
            <X size={14} className="text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">

          {/* Name + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full Name">
              <Input icon={User} placeholder="Ayesh Ranasinghe" value={form.name}
                onChange={e => set('name', e.target.value)} />
            </Field>
            <Field label="Phone">
              <Input icon={Phone} type="tel" placeholder="+94 77 123 4567" value={form.phone}
                onChange={e => set('phone', e.target.value)} />
            </Field>
          </div>

          {/* Email */}
          <Field label="Email Address">
            <Input icon={Mail} type="email" placeholder="member@gmail.com" value={form.email}
              onChange={e => set('email', e.target.value)} />
          </Field>

          {/* Branch + Plan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Branch">
              <div className="relative">
                <MapPin size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                <select value={form.branch} onChange={e => set('branch', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm transition-colors appearance-none">
                  {['Colombo 7','Moors','Ja Ela'].map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
            </Field>
            <Field label="Membership Plan">
              <div className="relative">
                <CreditCard size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                <select value={form.plan} onChange={e => set('plan', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm transition-colors appearance-none">
                  {['Individual Gents','Individual Ladies','Buddy Gents','Buddy Ladies','Couple','Family','Student'].map(p => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </div>
            </Field>
          </div>

          {/* Status + Paid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Status">
              <select value={form.status} onChange={e => set('status', e.target.value)}
                className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm transition-colors appearance-none">
                {['Active','Pending','Expired','Inactive'].map(s => <option key={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Amount Paid">
              <Input icon={CreditCard} placeholder="Rs. 95,000" value={form.paid}
                onChange={e => set('paid', e.target.value)} />
            </Field>
          </div>

          {/* Joined + Expires */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Joined Date">
              <Input icon={Calendar} placeholder="Jan 2025" value={form.joined}
                onChange={e => set('joined', e.target.value)} />
            </Field>
            <Field label="Expires Date">
              <Input icon={Calendar} placeholder="Jan 2026" value={form.expires}
                onChange={e => set('expires', e.target.value)} />
            </Field>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} disabled={saving || !form.name || !form.email}
              className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-800 disabled:text-gray-600 text-white font-bold py-4 rounded-xl text-sm uppercase tracking-wider transition-all">
              {saving
                ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving...</>
                : <><Save size={14}/> {isEdit ? 'Save Changes' : 'Add Member'}</>
              }
            </button>
            <button onClick={onClose}
              className="px-6 border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white font-bold rounded-xl text-sm transition-all">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════
// MODAL — View Member Detail
// ══════════════════════════════════════════════
const MemberDetailModal = ({ member, onClose, onEdit }) => (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-4"
    onClick={onClose}>
    <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl w-full max-w-md"
      onClick={e => e.stopPropagation()}>

      {/* Header */}
      <div className="p-6 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-600/30 flex items-center justify-center text-red-400 font-black text-2xl">
            {member.name?.charAt(0)}
          </div>
          <div>
            <h3 className="text-white font-black text-lg">{member.name}</h3>
            <Badge status={member.status} />
          </div>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center hover:border-gray-600 transition-colors">
          <X size={14} className="text-gray-400" />
        </button>
      </div>

      {/* Info */}
      <div className="p-6">
        <div className="space-y-3 mb-6">
          {[
            { label: 'Email',   val: member.email,   icon: Mail     },
            { label: 'Phone',   val: member.phone,   icon: Phone    },
            { label: 'Branch',  val: member.branch,  icon: MapPin   },
            { label: 'Plan',    val: member.plan,    icon: CreditCard },
            { label: 'Joined',  val: member.joined,  icon: Calendar },
            { label: 'Expires', val: member.expires, icon: Calendar },
            { label: 'Paid',    val: member.paid,    icon: CreditCard },
          ].map((r, i) => (
            <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-800/60 last:border-0">
              <div className="flex items-center gap-2">
                <r.icon size={13} className="text-gray-600" />
                <span className="text-gray-500 text-sm">{r.label}</span>
              </div>
              <span className="text-white text-sm font-semibold">{r.val || '—'}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button onClick={() => { onEdit(member); onClose(); }}
            className="flex-1 flex items-center justify-center gap-2 border border-blue-600/40 hover:bg-blue-600 text-blue-400 hover:text-white font-bold py-3 rounded-xl text-sm transition-all">
            <Edit3 size={14}/> Edit Member
          </button>
          <button onClick={onClose}
            className="px-6 border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white font-bold rounded-xl text-sm transition-all">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ══════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ══════════════════════════════════════════════
export default function AdminMembers() {
  const [members,        setMembers]        = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [searchQuery,    setSearchQuery]    = useState('');
  const [statusFilter,   setStatusFilter]   = useState('all');
  const [branchFilter,   setBranchFilter]   = useState('all');
  const [viewMember,     setViewMember]     = useState(null);
  const [editMember,     setEditMember]     = useState(null);
  const [addModal,       setAddModal]       = useState(false);
  const [deleteConfirm,  setDeleteConfirm]  = useState(null);
  const [toast,          setToast]          = useState(null);
  const [page,           setPage]           = useState(1);
  const perPage = 8;

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Load ──
  const loadMembers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/admin/members');
      setMembers(res.data?.members || res.data || []);
    } catch {
      setMembers([
        { _id:'1',  name:'Ayesh Ranasinghe',    email:'ayesh@gmail.com', phone:'+94771234567', branch:'Colombo 7', plan:'Individual Gents',   status:'Active',   joined:'Jan 2025', expires:'Jan 2026', paid:'Rs. 95,000'  },
        { _id:'2',  name:'Nimal Perera',          email:'nimal@gmail.com', phone:'+94779876543', branch:'Moors',     plan:'Buddy Gents',        status:'Active',   joined:'Feb 2025', expires:'Feb 2026', paid:'Rs. 85,000'  },
        { _id:'3',  name:'Chamari Silva',         email:'cham@gmail.com',  phone:'+94772345678', branch:'Ja Ela',    plan:'Individual Ladies',  status:'Expired',  joined:'Jan 2024', expires:'Jan 2025', paid:'Rs. 90,000'  },
        { _id:'4',  name:'Ruwan Jayawardena',     email:'ruwan@gmail.com', phone:'+94773456789', branch:'Colombo 7', plan:'Family',             status:'Active',   joined:'Mar 2025', expires:'Mar 2026', paid:'Rs. 160,000' },
        { _id:'5',  name:'Dilshan Madushanka',    email:'dil@gmail.com',   phone:'+94774567890', branch:'Moors',     plan:'Student',            status:'Pending',  joined:'May 2025', expires:'Nov 2025', paid:'Rs. 35,000'  },
        { _id:'6',  name:'Priya Fernando',        email:'priya@gmail.com', phone:'+94775678901', branch:'Ja Ela',    plan:'Couple',             status:'Active',   joined:'Apr 2025', expires:'Apr 2026', paid:'Rs. 80,000'  },
        { _id:'7',  name:'Kasun Dissanayake',     email:'kasun@gmail.com', phone:'+94776789012', branch:'Colombo 7', plan:'Individual Gents',   status:'Inactive', joined:'Dec 2023', expires:'Dec 2024', paid:'Rs. 95,000'  },
        { _id:'8',  name:'Amara Wickramasinghe',  email:'amara@gmail.com', phone:'+94777890123', branch:'Moors',     plan:'Buddy Ladies',       status:'Active',   joined:'Feb 2025', expires:'Feb 2026', paid:'Rs. 85,000'  },
        { _id:'9',  name:'Sachini Perera',        email:'sach@gmail.com',  phone:'+94778901234', branch:'Ja Ela',    plan:'Individual Ladies',  status:'Active',   joined:'Mar 2025', expires:'Mar 2026', paid:'Rs. 90,000'  },
        { _id:'10', name:'Bandara Silva',         email:'band@gmail.com',  phone:'+94779012345', branch:'Colombo 7', plan:'Family',             status:'Pending',  joined:'May 2025', expires:'May 2026', paid:'Rs. 160,000' },
      ]);
    } finally { setLoading(false); }
  };

  useEffect(() => { loadMembers(); }, []);

  // ── Add / Edit save ──
  const handleSave = async (form, id) => {
    try {
      if (id) {
        await api.put(`/api/admin/members/${id}`, form);
        setMembers(prev => prev.map(m => m._id === id ? { ...m, ...form } : m));
        showToast('Member updated successfully!');
      } else {
        const res = await api.post('/api/admin/members', form);
        const newM = res.data?.member || res.data || { _id: Date.now().toString(), ...form };
        setMembers(prev => [newM, ...prev]);
        showToast('Member added successfully!');
      }
    } catch {
      if (id) {
        setMembers(prev => prev.map(m => m._id === id ? { ...m, ...form } : m));
        showToast('Member updated (demo mode)');
      } else {
        setMembers(prev => [{ _id: Date.now().toString(), ...form }, ...prev]);
        showToast('Member added (demo mode)');
      }
    }
    setAddModal(false);
    setEditMember(null);
  };

  // ── Delete ──
  const handleDelete = async (id) => {
    try { await api.delete(`/api/admin/members/${id}`); } catch {}
    setMembers(prev => prev.filter(m => m._id !== id));
    showToast('Member deleted successfully');
    setDeleteConfirm(null);
  };

  // ── Status change ──
  const handleStatusChange = async (id, status) => {
    try { await api.put(`/api/admin/members/${id}`, { status }); } catch {}
    setMembers(prev => prev.map(m => m._id === id ? { ...m, status } : m));
    showToast(`Status updated to ${status}`);
  };

  // ── Filter ──
  const filtered = members.filter(m => {
    const q = searchQuery.toLowerCase();
    const matchSearch = m.name?.toLowerCase().includes(q) ||
                        m.email?.toLowerCase().includes(q) ||
                        m.plan?.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'all' || m.status === statusFilter;
    const matchBranch = branchFilter === 'all' || m.branch === branchFilter;
    return matchSearch && matchStatus && matchBranch;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated  = filtered.slice((page - 1) * perPage, page * perPage);

  const counts = {
    total:    members.length,
    active:   members.filter(m => m.status === 'Active').length,
    expired:  members.filter(m => m.status === 'Expired').length,
    pending:  members.filter(m => m.status === 'Pending').length,
    inactive: members.filter(m => m.status === 'Inactive').length,
  };

  return (
    <div className="space-y-6">

      {/* ── Toast ── */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-2xl transition-all ${
          toast.type === 'success' ? 'bg-green-950/90 border-green-800/60 text-green-400' : 'bg-red-950/90 border-red-800/60 text-red-400'
        }`}>
          {toast.type === 'success' ? <Check size={15}/> : <X size={15}/>}
          <span className="text-sm font-semibold">{toast.msg}</span>
        </div>
      )}

      {/* ── Modals ── */}
      {(addModal || editMember) && (
        <MemberModal
          member={editMember}
          onClose={() => { setAddModal(false); setEditMember(null); }}
          onSave={handleSave}
        />
      )}

      {viewMember && (
        <MemberDetailModal
          member={viewMember}
          onClose={() => setViewMember(null)}
          onEdit={(m) => setEditMember(m)}
        />
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-[#0a0a0a] border border-red-800/40 rounded-2xl p-8 max-w-sm w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-600/15 border border-red-600/30 flex items-center justify-center">
                <AlertTriangle size={18} className="text-red-500" />
              </div>
              <div>
                <p className="text-white font-black">Delete Member?</p>
                <p className="text-gray-500 text-xs">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Remove <span className="text-white font-bold">{deleteConfirm.name}</span> from the system?
            </p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteConfirm._id)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl text-sm transition-all">
                Delete
              </button>
              <button onClick={() => setDeleteConfirm(null)}
                className="flex-1 border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white font-bold py-3 rounded-xl text-sm transition-all">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap size={11} className="text-red-500 fill-red-500" />
            <span className="text-red-500 text-[9px] font-bold uppercase tracking-[0.3em]">Admin</span>
          </div>
          <h1 className="text-3xl font-black uppercase">User Management</h1>
          <p className="text-gray-500 text-sm mt-0.5">{members.length} total members</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-all">
            <Download size={14}/> Export
          </button>
          <button onClick={() => setAddModal(true)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm uppercase tracking-wider transition-all hover:scale-105">
            <Plus size={14}/> Add Member
          </button>
        </div>
      </div>

      {/* ── Stat pills ── */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label:'Total',    val: counts.total,    color:'#dc2626', filter:'all'      },
          { label:'Active',   val: counts.active,   color:'#22c55e', filter:'Active'   },
          { label:'Pending',  val: counts.pending,  color:'#f59e0b', filter:'Pending'  },
          { label:'Expired',  val: counts.expired,  color:'#ef4444', filter:'Expired'  },
          { label:'Inactive', val: counts.inactive, color:'#6b7280', filter:'Inactive' },
        ].map((s, i) => (
          <div key={i}
            onClick={() => { setStatusFilter(s.filter); setPage(1); }}
            className={`bg-[#0a0a0a] border rounded-xl p-4 text-center cursor-pointer transition-all hover:scale-[1.02] ${
              statusFilter === s.filter ? 'border-gray-500' : 'border-gray-800 hover:border-gray-600'
            }`}>
            <p className="font-black text-2xl" style={{ color: s.color }}>{s.val}</p>
            <p className="text-gray-600 text-[9px] uppercase tracking-widest mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── Search + Filters ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
          <input
            placeholder="Search by name, email, or plan..."
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setPage(1); }}
            className="w-full pl-10 pr-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm placeholder-gray-700 transition-colors"
          />
        </div>
        <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
          className="px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm transition-colors">
          <option value="all">All Status</option>
          {['Active','Pending','Expired','Inactive'].map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={branchFilter} onChange={e => { setBranchFilter(e.target.value); setPage(1); }}
          className="px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm transition-colors">
          <option value="all">All Branches</option>
          {['Colombo 7','Moors','Ja Ela'].map(b => <option key={b}>{b}</option>)}
        </select>
      </div>

      {/* ── Table ── */}
      <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800">
          <p className="text-gray-500 text-xs">
            Showing <span className="text-white font-bold">{Math.min((page-1)*perPage+1, filtered.length)}–{Math.min(page*perPage, filtered.length)}</span> of{' '}
            <span className="text-white font-bold">{filtered.length}</span> members
          </p>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-20 flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-600 text-xs uppercase tracking-widest">Loading members...</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  {['Member','Branch','Plan','Status','Joined','Expires','Paid','Actions'].map((h,i) => (
                    <th key={i} className="px-5 py-4 text-left text-[9px] text-gray-600 uppercase tracking-widest font-bold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/40">
                {paginated.map((m, i) => (
                  <tr key={i} className="hover:bg-gray-950/60 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-500 font-black text-sm flex-shrink-0">
                          {(m.name || '?').charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm whitespace-nowrap">{m.name}</p>
                          <p className="text-gray-600 text-xs">{m.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-400 text-sm whitespace-nowrap">{m.branch}</td>
                    <td className="px-5 py-4 text-gray-400 text-xs whitespace-nowrap">{m.plan}</td>
                    <td className="px-5 py-4">
                      <select
                        value={m.status}
                        onChange={e => handleStatusChange(m._id, e.target.value)}
                        className="bg-transparent text-xs font-bold border-0 outline-none cursor-pointer"
                        style={{ color: m.status==='Active'?'#22c55e':m.status==='Expired'?'#ef4444':m.status==='Pending'?'#f59e0b':'#6b7280' }}
                      >
                        {['Active','Pending','Expired','Inactive'].map(s => (
                          <option key={s} value={s} className="bg-gray-900 text-white">{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-4 text-gray-500 text-xs whitespace-nowrap">{m.joined}</td>
                    <td className="px-5 py-4 text-gray-500 text-xs whitespace-nowrap">{m.expires}</td>
                    <td className="px-5 py-4 text-green-400 font-black text-xs whitespace-nowrap">{m.paid}</td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setViewMember(m)}
                          title="View"
                          className="w-7 h-7 rounded-lg bg-gray-900 border border-gray-700 hover:border-blue-500 flex items-center justify-center transition-all">
                          <Eye size={11} className="text-gray-400" />
                        </button>
                        <button onClick={() => setEditMember(m)}
                          title="Edit"
                          className="w-7 h-7 rounded-lg bg-gray-900 border border-gray-700 hover:border-yellow-500 flex items-center justify-center transition-all">
                          <Edit3 size={11} className="text-gray-400" />
                        </button>
                        <button onClick={() => setDeleteConfirm(m)}
                          title="Delete"
                          className="w-7 h-7 rounded-lg bg-gray-900 border border-gray-700 hover:border-red-600 flex items-center justify-center transition-all">
                          <Trash2 size={11} className="text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {!loading && paginated.length === 0 && (
            <div className="py-20 text-center">
              <Users size={36} className="text-gray-700 mx-auto mb-3" />
              <p className="text-gray-600 text-sm uppercase tracking-widest">No members found</p>
            </div>
          )}
        </div>

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-between">
            <p className="text-gray-600 text-xs">Page <span className="text-white font-bold">{page}</span> of <span className="text-white font-bold">{totalPages}</span></p>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="w-8 h-8 rounded-lg bg-gray-900 border border-gray-700 flex items-center justify-center disabled:opacity-40 hover:border-gray-500 transition-all">
                <ChevronLeft size={14} className="text-gray-400" />
              </button>
              {[...Array(Math.min(totalPages, 5))].map((_, i) => (
                <button key={i} onClick={() => setPage(i + 1)}
                  className={`w-8 h-8 rounded-lg border text-xs font-bold transition-all ${
                    page === i+1 ? 'bg-red-600 border-red-600 text-white' : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-500'
                  }`}>
                  {i + 1}
                </button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="w-8 h-8 rounded-lg bg-gray-900 border border-gray-700 flex items-center justify-center disabled:opacity-40 hover:border-gray-500 transition-all">
                <ChevronRight size={14} className="text-gray-400" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}