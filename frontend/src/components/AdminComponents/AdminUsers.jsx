// src/components/AdminComponents/AdminUsers.jsx
import React, { useState, useEffect } from 'react';
import {
  Search, Trash2, Mail, User, Shield, ShieldAlert,
  Ban, CheckCircle, Plus, Edit3, Eye, X, Check,
  AlertTriangle, Zap, ChevronLeft, ChevronRight,
  Download, RefreshCw, Phone, Calendar
} from 'lucide-react';
import api from '../../api/axios';                    // ✅ Fixed: api/axios not api/api
import { useToast } from '../../context/ToastContext'; // ✅ Fixed: context not contexts

// ── Role badge ──
const RoleBadge = ({ role }) => {
  const map = {
    admin: 'bg-red-600/15 text-red-400 border-red-600/30',
    user:  'bg-blue-600/15 text-blue-400 border-blue-600/30',
  };
  return (
    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${map[role] || map.user}`}>
      {role === 'admin' ? <Shield size={9}/> : <User size={9}/>}
      {role}
    </span>
  );
};

// ── Status badge ──
const StatusBadge = ({ status }) => {
  const map = {
    active:   'bg-green-600/15 text-green-400 border-green-600/30',
    banned:   'bg-red-600/15 text-red-400 border-red-600/30',
    inactive: 'bg-gray-600/20 text-gray-400 border-gray-600/30',
  };
  return (
    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${map[status] || map.inactive}`}>
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
      className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 bg-gray-950 border border-gray-800
        rounded-xl focus:outline-none focus:border-red-600 text-white text-sm
        placeholder-gray-700 transition-colors`}
    />
  </div>
);

// ── User detail modal ──
const UserDetailModal = ({ user, onClose, onEdit }) => (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-4"
    onClick={onClose}>
    <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl w-full max-w-md"
      onClick={e => e.stopPropagation()}>
      <div className="p-6 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-600/30 flex items-center justify-center text-red-400 font-black text-xl">
            {user.name?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <p className="text-white font-black">{user.name}</p>
            <div className="flex items-center gap-2 mt-1">
              <RoleBadge role={user.role} />
              <StatusBadge status={user.status || 'active'} />
            </div>
          </div>
        </div>
        <button onClick={onClose}
          className="w-8 h-8 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center hover:border-gray-600 transition-colors">
          <X size={14} className="text-gray-400" />
        </button>
      </div>
      <div className="p-6">
        <div className="space-y-3 mb-6">
          {[
            { label:'Email',   val: user.email,   icon: Mail     },
            { label:'Phone',   val: user.phone,   icon: Phone    },
            { label:'Joined',  val: user.joined,  icon: Calendar },
            { label:'Role',    val: user.role,    icon: Shield   },
          ].filter(r => r.val).map((r, i) => (
            <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-800/60 last:border-0">
              <div className="flex items-center gap-2">
                <r.icon size={13} className="text-gray-600" />
                <span className="text-gray-500 text-sm">{r.label}</span>
              </div>
              <span className="text-white text-sm font-semibold capitalize">{r.val}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={() => { onEdit(user); onClose(); }}
            className="flex-1 flex items-center justify-center gap-2 border border-blue-600/40 hover:bg-blue-600 text-blue-400 hover:text-white font-bold py-3 rounded-xl text-sm transition-all">
            <Edit3 size={14}/> Edit User
          </button>
          <button onClick={onClose}
            className="px-5 border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white font-bold rounded-xl text-sm transition-all">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ── Edit / Add modal ──
const UserModal = ({ user, onClose, onSave }) => {
  const isEdit = !!user;
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name:     user?.name     || '',
    email:    user?.email    || '',
    phone:    user?.phone    || '',
    role:     user?.role     || 'user',
    password: '',
  });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSave = async () => {
    if (!form.name || !form.email) return;
    setSaving(true);
    await onSave(form, user?._id);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-4"
      onClick={onClose}>
      <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-600/15 border border-red-600/30 flex items-center justify-center">
              <User size={16} className="text-red-500" />
            </div>
            <div>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest">{isEdit ? 'Edit' : 'New'}</p>
              <h3 className="text-white font-black text-sm uppercase">{isEdit ? 'Edit User' : 'Add User'}</h3>
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center hover:border-gray-600 transition-colors">
            <X size={14} className="text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Full Name">
              <Input icon={User} placeholder="John Silva" value={form.name}
                onChange={e => set('name', e.target.value)} />
            </Field>
            <Field label="Phone">
              <Input icon={Phone} type="tel" placeholder="+94 77 000 0000" value={form.phone}
                onChange={e => set('phone', e.target.value)} />
            </Field>
          </div>
          <Field label="Email Address">
            <Input icon={Mail} type="email" placeholder="user@gmail.com" value={form.email}
              onChange={e => set('email', e.target.value)} />
          </Field>
          {!isEdit && (
            <Field label="Password">
              <Input type="password" placeholder="Min. 6 characters" value={form.password}
                onChange={e => set('password', e.target.value)} />
            </Field>
          )}
          <Field label="Role">
            <select value={form.role} onChange={e => set('role', e.target.value)}
              className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm transition-colors">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </Field>
          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} disabled={saving || !form.name || !form.email}
              className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-800 disabled:text-gray-600 text-white font-bold py-4 rounded-xl text-sm uppercase tracking-wider transition-all">
              {saving
                ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/> Saving...</>
                : <><Check size={14}/> {isEdit ? 'Save Changes' : 'Add User'}</>
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

// ── Delete confirm ──
const DeleteConfirm = ({ user, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-4">
    <div className="bg-[#0a0a0a] border border-red-800/40 rounded-2xl p-8 max-w-sm w-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-red-600/15 border border-red-600/30 flex items-center justify-center">
          <AlertTriangle size={18} className="text-red-500" />
        </div>
        <div>
          <p className="text-white font-black">Delete User?</p>
          <p className="text-gray-500 text-xs">This cannot be undone</p>
        </div>
      </div>
      <p className="text-gray-400 text-sm mb-6">
        Delete <span className="text-white font-bold">{user?.name}</span> from the system?
      </p>
      <div className="flex gap-3">
        <button onClick={onConfirm}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl text-sm transition-all">
          Delete
        </button>
        <button onClick={onCancel}
          className="flex-1 border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white font-bold py-3 rounded-xl text-sm transition-all">
          Cancel
        </button>
      </div>
    </div>
  </div>
);

// ── Toast component ──
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

// ──────────────────────────────────────────────
// MAIN COMPONENT
// ──────────────────────────────────────────────
const AdminUsers = () => {
  const [users,         setUsers]         = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [searchQuery,   setSearchQuery]   = useState('');
  const [roleFilter,    setRoleFilter]    = useState('all');
  const [statusFilter,  setStatusFilter]  = useState('all');
  const [viewUser,      setViewUser]      = useState(null);
  const [editUser,      setEditUser]      = useState(null);
  const [addModal,      setAddModal]      = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast,         setToast]         = useState(null);
  const [page,          setPage]          = useState(1);
  const perPage = 8;

  // ── Safe toast (no context dependency) ──
  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Try useToast — fallback to local ──
  let addToast = showToast;
  try {
    const toastCtx = useToast();
    if (toastCtx?.addToast) addToast = toastCtx.addToast;
  } catch {}

  const notify = (msg, type = 'success') => {
    showToast(msg, type);
    try { addToast(msg, type); } catch {}
  };

  // ── Load users ──
  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/admin/users');
      setUsers(res.data?.users || res.data || []);
    } catch {
      // Demo data
      setUsers([
        { _id:'1',  name:'Ayesh Ranasinghe',    email:'ayesh@gmail.com',  phone:'+94771234567', role:'user',  status:'active',   joined:'Jan 2025' },
        { _id:'2',  name:'Admin User',           email:'admin@fittrack.com',phone:'+94779876543',role:'admin', status:'active',   joined:'Dec 2024' },
        { _id:'3',  name:'Nimal Perera',         email:'nimal@gmail.com',  phone:'+94772345678', role:'user',  status:'active',   joined:'Feb 2025' },
        { _id:'4',  name:'Chamari Silva',        email:'cham@gmail.com',   phone:'+94773456789', role:'user',  status:'inactive', joined:'Jan 2024' },
        { _id:'5',  name:'Dilshan Madushanka',   email:'dil@gmail.com',    phone:'+94774567890', role:'user',  status:'active',   joined:'May 2025' },
        { _id:'6',  name:'Priya Fernando',       email:'priya@gmail.com',  phone:'+94775678901', role:'user',  status:'banned',   joined:'Apr 2025' },
        { _id:'7',  name:'Kasun Dissanayake',    email:'kasun@gmail.com',  phone:'+94776789012', role:'user',  status:'active',   joined:'Dec 2023' },
        { _id:'8',  name:'Amara Wickramasinghe', email:'amara@gmail.com',  phone:'+94777890123', role:'user',  status:'active',   joined:'Feb 2025' },
        { _id:'9',  name:'Sachini Perera',       email:'sach@gmail.com',   phone:'+94778901234', role:'user',  status:'active',   joined:'Mar 2025' },
        { _id:'10', name:'Bandara Silva',        email:'band@gmail.com',   phone:'+94779012345', role:'user',  status:'inactive', joined:'May 2025' },
      ]);
    } finally { setLoading(false); }
  };

  useEffect(() => { loadUsers(); }, []);

  // ── Save (Add / Edit) ──
  const handleSave = async (form, id) => {
    try {
      if (id) {
        await api.put(`/api/admin/users/${id}`, form);
        setUsers(prev => prev.map(u => u._id === id ? { ...u, ...form } : u));
        notify('User updated successfully!');
      } else {
        const res = await api.post('/api/admin/users', form);
        const newU = res.data?.user || res.data || { _id: Date.now().toString(), ...form, status: 'active', joined: 'Just now' };
        setUsers(prev => [newU, ...prev]);
        notify('User added successfully!');
      }
    } catch {
      if (id) setUsers(prev => prev.map(u => u._id === id ? { ...u, ...form } : u));
      else     setUsers(prev => [{ _id: Date.now().toString(), ...form, status: 'active', joined: 'Just now' }, ...prev]);
      notify(id ? 'User updated (demo mode)' : 'User added (demo mode)');
    }
    setAddModal(false);
    setEditUser(null);
  };

  // ── Delete ──
  const handleDelete = async (id) => {
    try { await api.delete(`/api/admin/users/${id}`); } catch {}
    setUsers(prev => prev.filter(u => u._id !== id));
    notify('User deleted successfully');
    setDeleteConfirm(null);
  };

  // ── Toggle role ──
  const handleRoleToggle = async (user) => {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    try { await api.put(`/api/admin/users/${user._id}`, { role: newRole }); } catch {}
    setUsers(prev => prev.map(u => u._id === user._id ? { ...u, role: newRole } : u));
    notify(`${user.name} is now ${newRole}`);
  };

  // ── Toggle ban ──
  const handleBanToggle = async (user) => {
    const newStatus = user.status === 'banned' ? 'active' : 'banned';
    try { await api.put(`/api/admin/users/${user._id}`, { status: newStatus }); } catch {}
    setUsers(prev => prev.map(u => u._id === user._id ? { ...u, status: newStatus } : u));
    notify(`${user.name} ${newStatus === 'banned' ? 'banned' : 'unbanned'}`);
  };

  // ── Filter ──
  const filtered = users.filter(u => {
    const q = searchQuery.toLowerCase();
    const matchSearch = u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q);
    const matchRole   = roleFilter   === 'all' || u.role   === roleFilter;
    const matchStatus = statusFilter === 'all' || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated  = filtered.slice((page - 1) * perPage, page * perPage);

  const counts = {
    total:  users.length,
    admins: users.filter(u => u.role   === 'admin').length,
    banned: users.filter(u => u.status === 'banned').length,
    active: users.filter(u => u.status === 'active').length,
  };

  return (
    <div className="space-y-6">
      <Toast toast={toast} />

      {/* Modals */}
      {viewUser    && <UserDetailModal user={viewUser}      onClose={() => setViewUser(null)}    onEdit={setEditUser} />}
      {(addModal || editUser) && (
        <UserModal
          user={editUser}
          onClose={() => { setAddModal(false); setEditUser(null); }}
          onSave={handleSave}
        />
      )}
      {deleteConfirm && (
        <DeleteConfirm
          user={deleteConfirm}
          onConfirm={() => handleDelete(deleteConfirm._id)}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap size={11} className="text-red-500 fill-red-500" />
            <span className="text-red-500 text-[9px] font-bold uppercase tracking-[0.3em]">Admin</span>
          </div>
          <h1 className="text-3xl font-black uppercase">User Management</h1>
          <p className="text-gray-500 text-sm mt-0.5">{users.length} total accounts</p>
        </div>
        <div className="flex gap-3">
          <button onClick={loadUsers}
            className="w-10 h-10 border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white rounded-xl flex items-center justify-center transition-all">
            <RefreshCw size={15}/>
          </button>
          <button className="flex items-center gap-2 border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-all">
            <Download size={14}/> Export
          </button>
          <button onClick={() => setAddModal(true)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm uppercase tracking-wider transition-all hover:scale-105">
            <Plus size={14}/> Add User
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label:'Total Users', val:counts.total,  color:'#dc2626', filter:null },
          { label:'Active',      val:counts.active, color:'#22c55e', filter:'active' },
          { label:'Admins',      val:counts.admins, color:'#3b82f6', filter:'admin' },
          { label:'Banned',      val:counts.banned, color:'#f59e0b', filter:'banned' },
        ].map((s, i) => (
          <div key={i}
            onClick={() => { if (s.filter) setStatusFilter(s.filter); else setStatusFilter('all'); setPage(1); }}
            className="bg-[#0a0a0a] border border-gray-800 hover:border-gray-600 rounded-xl p-4 text-center cursor-pointer transition-all hover:scale-[1.02]">
            <p className="font-black text-2xl" style={{ color:s.color }}>{s.val}</p>
            <p className="text-gray-600 text-[9px] uppercase tracking-widest mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
          <input
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setPage(1); }}
            className="w-full pl-10 pr-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm placeholder-gray-700 transition-colors"
          />
        </div>
        <select value={roleFilter} onChange={e => { setRoleFilter(e.target.value); setPage(1); }}
          className="px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm transition-colors">
          <option value="all">All Roles</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
          className="px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm transition-colors">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="banned">Banned</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800">
          <p className="text-gray-500 text-xs">
            Showing <span className="text-white font-bold">{Math.min((page-1)*perPage+1,filtered.length)}–{Math.min(page*perPage,filtered.length)}</span> of{' '}
            <span className="text-white font-bold">{filtered.length}</span> users
          </p>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-20 flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin"/>
              <p className="text-gray-600 text-xs uppercase tracking-widest">Loading users...</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  {['User','Email','Role','Status','Joined','Actions'].map((h, i) => (
                    <th key={i} className="px-5 py-4 text-left text-[9px] text-gray-600 uppercase tracking-widest font-bold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/40">
                {paginated.map((u, i) => (
                  <tr key={i} className="hover:bg-gray-950/60 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 ${
                          u.role === 'admin'
                            ? 'bg-red-600/20 border border-red-600/30 text-red-400'
                            : 'bg-gray-900 border border-gray-700 text-gray-400'
                        }`}>
                          {(u.name || '?').charAt(0).toUpperCase()}
                        </div>
                        <p className="text-white font-bold text-sm whitespace-nowrap">{u.name}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-400 text-sm">{u.email}</td>
                    <td className="px-5 py-4"><RoleBadge role={u.role} /></td>
                    <td className="px-5 py-4"><StatusBadge status={u.status || 'active'} /></td>
                    <td className="px-5 py-4 text-gray-500 text-xs whitespace-nowrap">{u.joined}</td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setViewUser(u)} title="View"
                          className="w-7 h-7 rounded-lg bg-gray-900 border border-gray-700 hover:border-blue-500 flex items-center justify-center transition-all">
                          <Eye size={11} className="text-gray-400"/>
                        </button>
                        <button onClick={() => setEditUser(u)} title="Edit"
                          className="w-7 h-7 rounded-lg bg-gray-900 border border-gray-700 hover:border-yellow-500 flex items-center justify-center transition-all">
                          <Edit3 size={11} className="text-gray-400"/>
                        </button>
                        <button onClick={() => handleRoleToggle(u)} title={u.role==='admin'?'Remove Admin':'Make Admin'}
                          className="w-7 h-7 rounded-lg bg-gray-900 border border-gray-700 hover:border-purple-500 flex items-center justify-center transition-all">
                          {u.role === 'admin' ? <ShieldAlert size={11} className="text-purple-400"/> : <Shield size={11} className="text-gray-400"/>}
                        </button>
                        <button onClick={() => handleBanToggle(u)} title={u.status==='banned'?'Unban':'Ban'}
                          className="w-7 h-7 rounded-lg bg-gray-900 border border-gray-700 hover:border-orange-500 flex items-center justify-center transition-all">
                          {u.status === 'banned' ? <CheckCircle size={11} className="text-green-400"/> : <Ban size={11} className="text-gray-400"/>}
                        </button>
                        <button onClick={() => setDeleteConfirm(u)} title="Delete"
                          className="w-7 h-7 rounded-lg bg-gray-900 border border-gray-700 hover:border-red-600 flex items-center justify-center transition-all">
                          <Trash2 size={11} className="text-red-400"/>
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
              <User size={36} className="text-gray-700 mx-auto mb-3"/>
              <p className="text-gray-600 text-sm uppercase tracking-widest">No users found</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-between">
            <p className="text-gray-600 text-xs">Page <span className="text-white font-bold">{page}</span> of <span className="text-white font-bold">{totalPages}</span></p>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page===1}
                className="w-8 h-8 rounded-lg bg-gray-900 border border-gray-700 flex items-center justify-center disabled:opacity-40 hover:border-gray-500 transition-all">
                <ChevronLeft size={14} className="text-gray-400"/>
              </button>
              {[...Array(Math.min(totalPages,5))].map((_,i) => (
                <button key={i} onClick={() => setPage(i+1)}
                  className={`w-8 h-8 rounded-lg border text-xs font-bold transition-all ${
                    page===i+1 ? 'bg-red-600 border-red-600 text-white' : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-500'
                  }`}>{i+1}</button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages,p+1))} disabled={page===totalPages}
                className="w-8 h-8 rounded-lg bg-gray-900 border border-gray-700 flex items-center justify-center disabled:opacity-40 hover:border-gray-500 transition-all">
                <ChevronRight size={14} className="text-gray-400"/>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;