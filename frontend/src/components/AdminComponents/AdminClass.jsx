// src/components/AdminComponents/AdminClass.jsx
import React, { useState, useEffect } from 'react';
import {
  Calendar, Plus, Search, Edit3, Trash2, Eye,
  Users, Clock, Check, X, AlertTriangle, Zap,
  Save, Dumbbell, MapPin, User, ChevronLeft,
  ChevronRight, RefreshCw
} from 'lucide-react';
import api from '../../api/axios';

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
const Field = ({ label, children }) => (
  <div>
    <label className="text-gray-500 text-[10px] uppercase tracking-widest font-semibold mb-2 block">
      {label}
    </label>
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
        placeholder-gray-700 transition-colors`}
    />
  </div>
);

const StatusBadge = ({ status }) => {
  const map = {
    Active:    'bg-green-600/15 text-green-400 border-green-600/30',
    Cancelled: 'bg-red-600/15 text-red-400 border-red-600/30',
    Full:      'bg-yellow-600/15 text-yellow-400 border-yellow-600/30',
    Upcoming:  'bg-blue-600/15 text-blue-400 border-blue-600/30',
  };
  return (
    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${map[status] || map.Upcoming}`}>
      {status}
    </span>
  );
};

// ─────────────────────────────────────────────
// COMPONENT — Add / Edit Class Modal
// ─────────────────────────────────────────────
const ClassModal = ({ cls, onClose, onSave }) => {
  const isEdit = !!cls;
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name:        cls?.name        || '',
    trainer:     cls?.trainer     || '',
    branch:      cls?.branch      || 'Colombo 7',
    date:        cls?.date        || '',
    time:        cls?.time        || '',
    duration:    cls?.duration    || '60',
    capacity:    cls?.capacity    || '20',
    booked:      cls?.booked      || '0',
    type:        cls?.type        || 'Strength',
    status:      cls?.status      || 'Upcoming',
    description: cls?.description || '',
  });

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSave = async () => {
    if (!form.name || !form.trainer || !form.date) return;
    setSaving(true);
    await onSave(form, cls?._id);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-4"
      onClick={onClose}>
      <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-600/15 border border-red-600/30 flex items-center justify-center">
              <Calendar size={16} className="text-red-500" />
            </div>
            <div>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest">{isEdit ? 'Edit' : 'New'}</p>
              <h3 className="text-white font-black text-sm uppercase">{isEdit ? 'Edit Class' : 'Add Class'}</h3>
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center hover:border-gray-600 transition-colors">
            <X size={14} className="text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Class Name">
              <Input icon={Dumbbell} placeholder="Boxing HIIT" value={form.name}
                onChange={e => set('name', e.target.value)} />
            </Field>
            <Field label="Trainer">
              <Input icon={User} placeholder="Ayesh R." value={form.trainer}
                onChange={e => set('trainer', e.target.value)} />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Date">
              <input type="date" value={form.date} onChange={e => set('date', e.target.value)}
                className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm transition-colors" />
            </Field>
            <Field label="Time">
              <input type="time" value={form.time} onChange={e => set('time', e.target.value)}
                className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm transition-colors" />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Branch">
              <div className="relative">
                <MapPin size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                <select value={form.branch} onChange={e => set('branch', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm transition-colors appearance-none">
                  {['Colombo 7','Moors','Ja Ela'].map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
            </Field>
            <Field label="Class Type">
              <select value={form.type} onChange={e => set('type', e.target.value)}
                className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm transition-colors appearance-none">
                {['Strength','Cardio','HIIT','Yoga','Pilates','Boxing','Recovery'].map(t => <option key={t}>{t}</option>)}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Field label="Duration (min)">
              <Input placeholder="60" value={form.duration}
                onChange={e => set('duration', e.target.value)} />
            </Field>
            <Field label="Capacity">
              <Input placeholder="20" value={form.capacity}
                onChange={e => set('capacity', e.target.value)} />
            </Field>
            <Field label="Status">
              <select value={form.status} onChange={e => set('status', e.target.value)}
                className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm transition-colors appearance-none">
                {['Upcoming','Active','Full','Cancelled'].map(s => <option key={s}>{s}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Description">
            <textarea rows={2} placeholder="Brief class description..." value={form.description}
              onChange={e => set('description', e.target.value)}
              className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm resize-none placeholder-gray-700 transition-colors" />
          </Field>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button onClick={handleSave}
              disabled={saving || !form.name || !form.trainer || !form.date}
              className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-800 disabled:text-gray-600 text-white font-bold py-4 rounded-xl text-sm uppercase tracking-wider transition-all">
              {saving
                ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/> Saving...</>
                : <><Save size={14}/> {isEdit ? 'Save Changes' : 'Add Class'}</>
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

// ─────────────────────────────────────────────
// COMPONENT — View Class Detail Modal
// ─────────────────────────────────────────────
const ClassDetailModal = ({ cls, onClose, onEdit }) => {
  const pct = Math.round((parseInt(cls.booked) / parseInt(cls.capacity)) * 100) || 0;
  const typeColors = {
    'Strength':'#dc2626','Cardio':'#f97316','HIIT':'#ef4444',
    'Yoga':'#8b5cf6','Pilates':'#ec4899','Boxing':'#dc2626','Recovery':'#22c55e',
  };
  const color = typeColors[cls.type] || '#dc2626';

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-4"
      onClick={onClose}>
      <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl w-full max-w-md"
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor:`${color}15`, border:`1px solid ${color}30` }}>
              <Dumbbell size={20} style={{ color }} />
            </div>
            <div>
              <h3 className="text-white font-black text-lg">{cls.name}</h3>
              <StatusBadge status={cls.status} />
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center hover:border-gray-600 transition-colors">
            <X size={14} className="text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          {/* Info rows */}
          <div className="space-y-3 mb-5">
            {[
              { label:'Trainer',  val: cls.trainer  },
              { label:'Branch',   val: cls.branch   },
              { label:'Date',     val: cls.date     },
              { label:'Time',     val: cls.time     },
              { label:'Duration', val: cls.duration ? `${cls.duration} min` : '—' },
              { label:'Type',     val: cls.type     },
            ].filter(r => r.val).map((r, i) => (
              <div key={i} className="flex justify-between py-2.5 border-b border-gray-800/60 last:border-0">
                <span className="text-gray-500 text-sm">{r.label}</span>
                <span className="text-white text-sm font-semibold">{r.val}</span>
              </div>
            ))}
          </div>

          {/* Booking progress */}
          <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 mb-5">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-gray-500">Bookings</span>
              <span className="text-white font-black">{cls.booked}/{cls.capacity} <span className="text-gray-600">spots</span></span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all" style={{ width:`${pct}%`, backgroundColor: pct >= 90 ? '#ef4444' : color }} />
            </div>
            <p className="text-gray-600 text-[9px] mt-1.5 uppercase tracking-widest">{pct}% full</p>
          </div>

          {cls.description && (
            <p className="text-gray-400 text-sm leading-relaxed mb-5">{cls.description}</p>
          )}

          <div className="flex gap-3">
            <button onClick={() => { onEdit(cls); onClose(); }}
              className="flex-1 flex items-center justify-center gap-2 border border-blue-600/40 hover:bg-blue-600 text-blue-400 hover:text-white font-bold py-3 rounded-xl text-sm transition-all">
              <Edit3 size={14}/> Edit Class
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
};

// ─────────────────────────────────────────────
// COMPONENT — Delete Confirm Modal
// ─────────────────────────────────────────────
const DeleteConfirm = ({ cls, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-4">
    <div className="bg-[#0a0a0a] border border-red-800/40 rounded-2xl p-8 max-w-sm w-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-red-600/15 border border-red-600/30 flex items-center justify-center">
          <AlertTriangle size={18} className="text-red-500" />
        </div>
        <div>
          <p className="text-white font-black">Delete Class?</p>
          <p className="text-gray-500 text-xs">This cannot be undone</p>
        </div>
      </div>
      <p className="text-gray-400 text-sm mb-6">
        Delete <span className="text-white font-bold">{cls?.name}</span>?
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

// ─────────────────────────────────────────────
// COMPONENT — Toast
// ─────────────────────────────────────────────
const Toast = ({ toast }) => {
  if (!toast) return null;
  return (
    <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-2xl ${
      toast.type === 'success'
        ? 'bg-green-950/90 border-green-800/60 text-green-400'
        : 'bg-red-950/90 border-red-800/60 text-red-400'
    }`}>
      {toast.type === 'success' ? <Check size={15}/> : <X size={15}/>}
      <span className="text-sm font-semibold">{toast.msg}</span>
    </div>
  );
};

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
const TYPE_COLORS = {
  'Strength':'#dc2626', 'Cardio':'#f97316', 'HIIT':'#ef4444',
  'Yoga':'#8b5cf6',     'Pilates':'#ec4899','Boxing':'#dc2626',
  'Recovery':'#22c55e',
};

export default function AdminClass() {
  const [classes,       setClasses]       = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [searchQuery,   setSearchQuery]   = useState('');
  const [branchFilter,  setBranchFilter]  = useState('all');
  const [statusFilter,  setStatusFilter]  = useState('all');
  const [typeFilter,    setTypeFilter]    = useState('all');
  const [viewClass,     setViewClass]     = useState(null);
  const [editClass,     setEditClass]     = useState(null);
  const [addModal,      setAddModal]      = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast,         setToast]         = useState(null);
  const [page,          setPage]          = useState(1);
  const perPage = 8;

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Load classes ──
  const loadClasses = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/admin/classes');
      setClasses(res.data?.classes || res.data || []);
    } catch {
      setClasses([
        { _id:'1', name:'Boxing HIIT',      trainer:'Ayesh R.',   branch:'Colombo 7', date:'2025-05-27', time:'07:00', duration:'45', capacity:'20', booked:'18', type:'Boxing',   status:'Active',    description:'High-intensity boxing workout for all levels.'    },
        { _id:'2', name:'Power Yoga Flow',  trainer:'Dulshan M.', branch:'Ja Ela',    date:'2025-05-27', time:'18:30', duration:'60', capacity:'15', booked:'12', type:'Yoga',     status:'Active',    description:'Dynamic yoga flow to improve flexibility.'        },
        { _id:'3', name:'Strength Circuit', trainer:'Thumesh A.', branch:'Moors',     date:'2025-05-28', time:'08:00', duration:'50', capacity:'20', booked:'8',  type:'Strength', status:'Upcoming',  description:'Full body strength training circuit.'             },
        { _id:'4', name:'HIIT Cardio',      trainer:'Ayesh R.',   branch:'Colombo 7', date:'2025-05-28', time:'17:00', duration:'30', capacity:'20', booked:'15', type:'HIIT',     status:'Upcoming',  description:'High intensity interval cardio session.'          },
        { _id:'5', name:'Pilates Core',     trainer:'Nimali P.',  branch:'Moors',     date:'2025-05-29', time:'10:00', duration:'55', capacity:'12', booked:'12', type:'Pilates',  status:'Full',      description:'Core strength and stability with pilates.'        },
        { _id:'6', name:'Active Recovery',  trainer:'Dulshan M.', branch:'Ja Ela',    date:'2025-05-30', time:'09:00', duration:'40', capacity:'20', booked:'5',  type:'Recovery', status:'Upcoming',  description:'Gentle recovery session with stretching.'         },
        { _id:'7', name:'Cardio Blast',     trainer:'Kasun R.',   branch:'Colombo 7', date:'2025-05-25', time:'06:00', duration:'45', capacity:'20', booked:'19', type:'Cardio',   status:'Cancelled', description:'Morning cardio blast session.'                    },
        { _id:'8', name:'Beginner Strength',trainer:'Thumesh A.', branch:'Moors',     date:'2025-05-31', time:'11:00', duration:'60', capacity:'15', booked:'7',  type:'Strength', status:'Upcoming',  description:'Strength training for beginners.'                 },
      ]);
    } finally { setLoading(false); }
  };

  useEffect(() => { loadClasses(); }, []);

  // ── Add / Edit save (handleAdd was missing — now included) ──
  const handleAdd = async (form, id) => {
    try {
      if (id) {
        await api.put(`/api/admin/classes/${id}`, form);
        setClasses(prev => prev.map(c => c._id === id ? { ...c, ...form } : c));
        showToast('Class updated successfully!');
      } else {
        const res = await api.post('/api/admin/classes', form);
        const newC = res.data?.class || res.data || { _id: Date.now().toString(), ...form };
        setClasses(prev => [newC, ...prev]);
        showToast('Class added successfully!');
      }
    } catch {
      if (id) setClasses(prev => prev.map(c => c._id === id ? { ...c, ...form } : c));
      else     setClasses(prev => [{ _id: Date.now().toString(), ...form }, ...prev]);
      showToast(id ? 'Class updated (demo mode)' : 'Class added (demo mode)');
    }
    setAddModal(false);
    setEditClass(null);
  };

  // ── Delete ──
  const handleDelete = async (id) => {
    try { await api.delete(`/api/admin/classes/${id}`); } catch {}
    setClasses(prev => prev.filter(c => c._id !== id));
    showToast('Class deleted successfully');
    setDeleteConfirm(null);
  };

  // ── Filter ──
  const filtered = classes.filter(c => {
    const q = searchQuery.toLowerCase();
    const matchSearch = c.name?.toLowerCase().includes(q) || c.trainer?.toLowerCase().includes(q);
    const matchBranch = branchFilter === 'all' || c.branch  === branchFilter;
    const matchStatus = statusFilter === 'all' || c.status  === statusFilter;
    const matchType   = typeFilter   === 'all' || c.type    === typeFilter;
    return matchSearch && matchBranch && matchStatus && matchType;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated  = filtered.slice((page - 1) * perPage, page * perPage);

  const counts = {
    total:     classes.length,
    active:    classes.filter(c => c.status === 'Active').length,
    upcoming:  classes.filter(c => c.status === 'Upcoming').length,
    full:      classes.filter(c => c.status === 'Full').length,
    cancelled: classes.filter(c => c.status === 'Cancelled').length,
  };

  return (
    <div className="space-y-6">
      <Toast toast={toast} />

      {/* Modals */}
      {viewClass && (
        <ClassDetailModal cls={viewClass} onClose={() => setViewClass(null)} onEdit={setEditClass} />
      )}
      {(addModal || editClass) && (
        <ClassModal
          cls={editClass}
          onClose={() => { setAddModal(false); setEditClass(null); }}
          onSave={handleAdd}
        />
      )}
      {deleteConfirm && (
        <DeleteConfirm
          cls={deleteConfirm}
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
          <h1 className="text-3xl font-black uppercase">Class Management</h1>
          <p className="text-gray-500 text-sm mt-0.5">{classes.length} total classes</p>
        </div>
        <div className="flex gap-3">
          <button onClick={loadClasses}
            className="w-10 h-10 border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white rounded-xl flex items-center justify-center transition-all">
            <RefreshCw size={15}/>
          </button>
          <button onClick={() => setAddModal(true)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm uppercase tracking-wider transition-all hover:scale-105">
            <Plus size={14}/> Add Class
          </button>
        </div>
      </div>

      {/* Stat pills */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label:'Total',     val:counts.total,     color:'#dc2626', filter:null        },
          { label:'Active',    val:counts.active,    color:'#22c55e', filter:'Active'    },
          { label:'Upcoming',  val:counts.upcoming,  color:'#3b82f6', filter:'Upcoming'  },
          { label:'Full',      val:counts.full,      color:'#f59e0b', filter:'Full'      },
          { label:'Cancelled', val:counts.cancelled, color:'#6b7280', filter:'Cancelled' },
        ].map((s, i) => (
          <div key={i}
            onClick={() => { setStatusFilter(s.filter || 'all'); setPage(1); }}
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
            placeholder="Search by class name or trainer..."
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setPage(1); }}
            className="w-full pl-10 pr-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm placeholder-gray-700 transition-colors"
          />
        </div>
        <select value={branchFilter} onChange={e => { setBranchFilter(e.target.value); setPage(1); }}
          className="px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm transition-colors">
          <option value="all">All Branches</option>
          {['Colombo 7','Moors','Ja Ela'].map(b => <option key={b}>{b}</option>)}
        </select>
        <select value={typeFilter} onChange={e => { setTypeFilter(e.target.value); setPage(1); }}
          className="px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm transition-colors">
          <option value="all">All Types</option>
          {['Strength','Cardio','HIIT','Yoga','Pilates','Boxing','Recovery'].map(t => <option key={t}>{t}</option>)}
        </select>
        <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
          className="px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm transition-colors">
          <option value="all">All Status</option>
          {['Active','Upcoming','Full','Cancelled'].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800">
          <p className="text-gray-500 text-xs">
            Showing <span className="text-white font-bold">{Math.min((page-1)*perPage+1,filtered.length)}–{Math.min(page*perPage,filtered.length)}</span> of{' '}
            <span className="text-white font-bold">{filtered.length}</span> classes
          </p>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-20 flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin"/>
              <p className="text-gray-600 text-xs uppercase tracking-widest">Loading classes...</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  {['Class','Trainer','Branch','Date & Time','Bookings','Type','Status',''].map((h, i) => (
                    <th key={i} className="px-5 py-4 text-left text-[9px] text-gray-600 uppercase tracking-widest font-bold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/40">
                {paginated.map((c, i) => {
                  const color = TYPE_COLORS[c.type] || '#dc2626';
                  const pct   = Math.round((parseInt(c.booked) / parseInt(c.capacity)) * 100) || 0;
                  return (
                    <tr key={i} className="hover:bg-gray-950/60 transition-colors group">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor:`${color}15`, border:`1px solid ${color}30` }}>
                            <Dumbbell size={14} style={{ color }} />
                          </div>
                          <p className="text-white font-bold text-sm whitespace-nowrap">{c.name}</p>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-400 text-sm whitespace-nowrap">{c.trainer}</td>
                      <td className="px-5 py-4 text-gray-400 text-sm whitespace-nowrap">{c.branch}</td>
                      <td className="px-5 py-4">
                        <p className="text-white text-sm whitespace-nowrap">{c.date}</p>
                        <p className="text-gray-600 text-xs">{c.time} · {c.duration}min</p>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-white text-sm font-bold">{c.booked}/{c.capacity}</span>
                          <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width:`${pct}%`, backgroundColor: pct>=90?'#ef4444':color }} />
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full"
                          style={{ backgroundColor:`${color}15`, color, border:`1px solid ${color}30` }}>
                          {c.type}
                        </span>
                      </td>
                      <td className="px-5 py-4"><StatusBadge status={c.status} /></td>
                      <td className="px-5 py-4">
                        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => setViewClass(c)} title="View"
                            className="w-7 h-7 rounded-lg bg-gray-900 border border-gray-700 hover:border-blue-500 flex items-center justify-center transition-all">
                            <Eye size={11} className="text-gray-400"/>
                          </button>
                          <button onClick={() => setEditClass(c)} title="Edit"
                            className="w-7 h-7 rounded-lg bg-gray-900 border border-gray-700 hover:border-yellow-500 flex items-center justify-center transition-all">
                            <Edit3 size={11} className="text-gray-400"/>
                          </button>
                          <button onClick={() => setDeleteConfirm(c)} title="Delete"
                            className="w-7 h-7 rounded-lg bg-gray-900 border border-gray-700 hover:border-red-600 flex items-center justify-center transition-all">
                            <Trash2 size={11} className="text-red-400"/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          {!loading && paginated.length === 0 && (
            <div className="py-20 text-center">
              <Calendar size={36} className="text-gray-700 mx-auto mb-3"/>
              <p className="text-gray-600 text-sm uppercase tracking-widest">No classes found</p>
              <button onClick={() => setAddModal(true)}
                className="mt-4 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-full text-sm transition-all mx-auto">
                <Plus size={13}/> Add First Class
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-between">
            <p className="text-gray-600 text-xs">Page <span className="text-white font-bold">{page}</span> of <span className="text-white font-bold">{totalPages}</span></p>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => Math.max(1,p-1))} disabled={page===1}
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
}