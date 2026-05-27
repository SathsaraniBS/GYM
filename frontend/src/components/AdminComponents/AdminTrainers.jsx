// src/pages/admin/AdminTrainers.jsx
import React, { useState, useEffect } from 'react';
import {
  Dumbbell, Plus, Search, Edit3, Trash2, Eye,
  Star, Users, Calendar, Check, X, AlertTriangle,
  Phone, Mail, MapPin, Zap, Save, User, Award,
  Clock, TrendingUp
} from 'lucide-react';
import api from '../../api/axios';

// ─────────────────────────────────────────────
// HELPER — Field label wrapper
// ─────────────────────────────────────────────
const Field = ({ label, children }) => (
  <div>
    <label className="text-gray-500 text-[10px] uppercase tracking-widest font-semibold mb-2 block">
      {label}
    </label>
    {children}
  </div>
);

// ─────────────────────────────────────────────
// HELPER — Input with optional icon
// ─────────────────────────────────────────────
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

// ─────────────────────────────────────────────
// COMPONENT — Trainer card
// ─────────────────────────────────────────────
const TrainerCard = ({ trainer, onView, onEdit, onDelete, color }) => (
  <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden
    hover:border-gray-600 transition-all duration-300 group flex flex-col">
    <div className="p-6 flex-1 flex flex-col">

      {/* Avatar + name + status */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl flex-shrink-0"
            style={{ backgroundColor:`${color}15`, border:`1px solid ${color}30`, color }}>
            {trainer.name?.charAt(0)}
          </div>
          <div>
            <p className="text-white font-black leading-tight">{trainer.name}</p>
            <p className="text-gray-500 text-xs mt-0.5">{trainer.branch}</p>
          </div>
        </div>
        <span className={`text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full border flex-shrink-0 ${
          trainer.status === 'Active'
            ? 'bg-green-600/15 text-green-400 border-green-600/30'
            : 'bg-gray-600/20 text-gray-400 border-gray-600/30'
        }`}>
          {trainer.status}
        </span>
      </div>

      {/* Specialization tag */}
      <div className="inline-flex items-center gap-1.5 bg-gray-900 border border-gray-800
        rounded-lg px-3 py-1.5 mb-4 self-start">
        <Dumbbell size={11} style={{ color }} />
        <p className="text-gray-300 text-xs font-semibold">{trainer.specialization}</p>
      </div>

      {/* Bio */}
      {trainer.bio && (
        <p className="text-gray-600 text-xs leading-relaxed mb-4 line-clamp-2 flex-1">
          {trainer.bio}
        </p>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { icon: Star,     val: trainer.rating  || '—', label: 'Rating',  color: '#f59e0b' },
          { icon: Users,    val: trainer.members || 0,   label: 'Members', color: '#3b82f6' },
          { icon: Calendar, val: trainer.classes || 0,   label: 'Classes', color: '#22c55e' },
        ].map((s, i) => (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-3 text-center">
            <s.icon size={12} className="mx-auto mb-1" style={{ color: s.color }} />
            <p className="text-white font-black text-sm">{s.val}</p>
            <p className="text-gray-600 text-[8px] uppercase tracking-widest mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 mt-auto">
        <button onClick={() => onView(trainer)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-gray-700
            hover:border-gray-500 text-gray-400 hover:text-white rounded-xl text-xs font-bold transition-all">
          <Eye size={12}/> View
        </button>
        <button onClick={() => onEdit(trainer)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-blue-600/40
            hover:bg-blue-600 text-blue-400 hover:text-white rounded-xl text-xs font-bold transition-all">
          <Edit3 size={12}/> Edit
        </button>
        <button onClick={() => onDelete(trainer)}
          className="w-9 h-9 flex items-center justify-center border border-red-600/30
            hover:bg-red-600 rounded-xl transition-all flex-shrink-0">
          <Trash2 size={12} className="text-red-400" />
        </button>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// COMPONENT — Trainer detail modal (View)
// ─────────────────────────────────────────────
const TrainerDetailModal = ({ trainer, color, onClose, onEdit }) => (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-4"
    onClick={onClose}>
    <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
      onClick={e => e.stopPropagation()}>

      {/* Header */}
      <div className="p-6 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl"
            style={{ backgroundColor:`${color}20`, border:`1px solid ${color}40`, color }}>
            {trainer.name?.charAt(0)}
          </div>
          <div>
            <h3 className="text-white font-black text-lg">{trainer.name}</h3>
            <span className={`text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
              trainer.status === 'Active'
                ? 'bg-green-600/15 text-green-400 border-green-600/30'
                : 'bg-gray-600/20 text-gray-400 border-gray-600/30'
            }`}>{trainer.status}</span>
          </div>
        </div>
        <button onClick={onClose}
          className="w-8 h-8 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center hover:border-gray-600 transition-colors">
          <X size={14} className="text-gray-400" />
        </button>
      </div>

      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { icon: Star,     val: trainer.rating   || '—', label: 'Rating',     color: '#f59e0b' },
            { icon: Users,    val: trainer.members  || 0,   label: 'Members',    color: '#3b82f6' },
            { icon: Calendar, val: trainer.classes  || 0,   label: 'Classes',    color: '#22c55e' },
          ].map((s, i) => (
            <div key={i} className="bg-gray-950 border border-gray-800 rounded-xl p-4 text-center">
              <s.icon size={14} className="mx-auto mb-1.5" style={{ color: s.color }} />
              <p className="text-white font-black">{s.val}</p>
              <p className="text-gray-600 text-[9px] uppercase tracking-widest mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Info rows */}
        <div className="space-y-3 mb-6">
          {[
            { icon: Mail,    label: 'Email',          val: trainer.email          },
            { icon: Phone,   label: 'Phone',          val: trainer.phone          },
            { icon: MapPin,  label: 'Branch',         val: trainer.branch         },
            { icon: Dumbbell,label: 'Specialization', val: trainer.specialization },
            { icon: Clock,   label: 'Experience',     val: trainer.experience     },
          ].filter(r => r.val).map((r, i) => (
            <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-800/60 last:border-0">
              <div className="flex items-center gap-2">
                <r.icon size={13} className="text-gray-600" />
                <span className="text-gray-500 text-sm">{r.label}</span>
              </div>
              <span className="text-white text-sm font-semibold">{r.val}</span>
            </div>
          ))}
        </div>

        {/* Bio */}
        {trainer.bio && (
          <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 mb-6">
            <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-2">Bio</p>
            <p className="text-gray-300 text-sm leading-relaxed">{trainer.bio}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button onClick={() => { onEdit(trainer); onClose(); }}
            className="flex-1 flex items-center justify-center gap-2 border border-blue-600/40
              hover:bg-blue-600 text-blue-400 hover:text-white font-bold py-3 rounded-xl text-sm transition-all">
            <Edit3 size={14}/> Edit Trainer
          </button>
          <button onClick={onClose}
            className="px-6 border border-gray-700 hover:border-gray-500 text-gray-400
              hover:text-white font-bold rounded-xl text-sm transition-all">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// COMPONENT — Add / Edit trainer modal
// ─────────────────────────────────────────────
const TrainerModal = ({ trainer, onClose, onSave }) => {
  const isEdit = !!trainer;
  const [saving, setSaving] = useState(false);
  const [form,   setForm]   = useState({
    name:           trainer?.name           || '',
    email:          trainer?.email          || '',
    phone:          trainer?.phone          || '',
    specialization: trainer?.specialization || '',
    branch:         trainer?.branch         || 'Colombo 7',
    status:         trainer?.status         || 'Active',
    experience:     trainer?.experience     || '',
    bio:            trainer?.bio            || '',
  });

  const set = (key, val) => setForm(p => ({ ...p, [key]: val }));

  const handleSave = async () => {
    if (!form.name || !form.email) return;
    setSaving(true);
    await onSave(form, trainer?._id);
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
              <Dumbbell size={16} className="text-red-500" />
            </div>
            <div>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest">{isEdit ? 'Edit' : 'New'}</p>
              <h3 className="text-white font-black uppercase text-sm">{isEdit ? 'Edit Trainer' : 'Add Trainer'}</h3>
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center hover:border-gray-600 transition-colors">
            <X size={14} className="text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">

          {/* Name + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full Name">
              <Input icon={User} placeholder="Ayesh Ranasinghe"
                value={form.name} onChange={e => set('name', e.target.value)} />
            </Field>
            <Field label="Phone">
              <Input icon={Phone} type="tel" placeholder="+94 77 123 4567"
                value={form.phone} onChange={e => set('phone', e.target.value)} />
            </Field>
          </div>

          {/* Email */}
          <Field label="Email Address">
            <Input icon={Mail} type="email" placeholder="trainer@fittrack.com"
              value={form.email} onChange={e => set('email', e.target.value)} />
          </Field>

          {/* Specialization */}
          <Field label="Specialization">
            <Input icon={Dumbbell} placeholder="e.g. Boxing & HIIT"
              value={form.specialization} onChange={e => set('specialization', e.target.value)} />
          </Field>

          {/* Branch + Status */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Branch">
              <div className="relative">
                <MapPin size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                <select value={form.branch} onChange={e => set('branch', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-950 border border-gray-800 rounded-xl
                    focus:outline-none focus:border-red-600 text-white text-sm transition-colors appearance-none">
                  {['Colombo 7','Moors','Ja Ela'].map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
            </Field>
            <Field label="Status">
              <select value={form.status} onChange={e => set('status', e.target.value)}
                className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl
                  focus:outline-none focus:border-red-600 text-white text-sm transition-colors appearance-none">
                {['Active','Inactive'].map(s => <option key={s}>{s}</option>)}
              </select>
            </Field>
          </div>

          {/* Experience */}
          <Field label="Experience">
            <Input icon={Award} placeholder="e.g. 5 years"
              value={form.experience} onChange={e => set('experience', e.target.value)} />
          </Field>

          {/* Bio */}
          <Field label="Bio">
            <textarea rows={3} placeholder="Brief description about the trainer..."
              value={form.bio} onChange={e => set('bio', e.target.value)}
              className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl
                focus:outline-none focus:border-red-600 text-white text-sm resize-none
                placeholder-gray-700 transition-colors" />
          </Field>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} disabled={saving || !form.name || !form.email}
              className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700
                disabled:bg-gray-800 disabled:text-gray-600 text-white font-bold py-4 rounded-xl
                text-sm uppercase tracking-wider transition-all">
              {saving
                ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving...</>
                : <><Save size={14}/> {isEdit ? 'Save Changes' : 'Add Trainer'}</>
              }
            </button>
            <button onClick={onClose}
              className="px-6 border border-gray-700 hover:border-gray-500 text-gray-400
                hover:text-white font-bold rounded-xl text-sm transition-all">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// COMPONENT — Delete confirm modal
// ─────────────────────────────────────────────
const DeleteConfirm = ({ trainer, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-4">
    <div className="bg-[#0a0a0a] border border-red-800/40 rounded-2xl p-8 max-w-sm w-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-red-600/15 border border-red-600/30 flex items-center justify-center">
          <AlertTriangle size={18} className="text-red-500" />
        </div>
        <div>
          <p className="text-white font-black">Remove Trainer?</p>
          <p className="text-gray-500 text-xs">This action cannot be undone</p>
        </div>
      </div>
      <p className="text-gray-400 text-sm mb-6">
        Remove <span className="text-white font-bold">{trainer.name}</span> from the system?
      </p>
      <div className="flex gap-3">
        <button onClick={onConfirm}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl text-sm transition-all">
          Remove
        </button>
        <button onClick={onCancel}
          className="flex-1 border border-gray-700 hover:border-gray-500 text-gray-400
            hover:text-white font-bold py-3 rounded-xl text-sm transition-all">
          Cancel
        </button>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────
const SPEC_COLORS = {
  'Boxing & HIIT':      '#dc2626',
  'Strength & Power':   '#3b82f6',
  'Yoga & Mobility':    '#8b5cf6',
  'Cardio & Endurance': '#f59e0b',
  'Pilates & Core':     '#22c55e',
};

export default function AdminTrainers() {
  const [trainers,      setTrainers]      = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [searchQuery,   setSearchQuery]   = useState('');
  const [branchFilter,  setBranchFilter]  = useState('all');
  const [statusFilter,  setStatusFilter]  = useState('all');

  // Modal states
  const [viewTrainer,   setViewTrainer]   = useState(null);
  const [editTrainer,   setEditTrainer]   = useState(null);
  const [addModal,      setAddModal]      = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast,         setToast]         = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Load trainers ──
  const loadTrainers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/admin/trainers');
      setTrainers(res.data || []);
    } catch {
      setTrainers([
        { _id:'1', name:'Ayesh Ranasinghe',  email:'ayesh@fittrack.com', phone:'+94771234567', specialization:'Boxing & HIIT',     branch:'Colombo 7', status:'Active',   rating:4.9, members:48, classes:12, experience:'5 years', bio:'Expert in high-intensity training and boxing.' },
        { _id:'2', name:'Thumesh Almeda',    email:'thu@fittrack.com',   phone:'+94779876543', specialization:'Strength & Power',   branch:'Moors',     status:'Active',   rating:4.7, members:36, classes:8,  experience:'4 years', bio:'Specializes in powerlifting and strength training.' },
        { _id:'3', name:'Dulshan Miyuranga', email:'dul@fittrack.com',   phone:'+94772345678', specialization:'Yoga & Mobility',    branch:'Ja Ela',    status:'Active',   rating:4.8, members:29, classes:6,  experience:'3 years', bio:'Certified yoga instructor with focus on mobility.' },
        { _id:'4', name:'Kasun Rathnayake',  email:'kas@fittrack.com',   phone:'+94773456789', specialization:'Cardio & Endurance', branch:'Colombo 7', status:'Active',   rating:4.6, members:32, classes:9,  experience:'6 years', bio:'Marathon runner and endurance coach.' },
        { _id:'5', name:'Nimali Perera',     email:'nim@fittrack.com',   phone:'+94774567890', specialization:'Pilates & Core',     branch:'Moors',     status:'Inactive', rating:4.5, members:18, classes:4,  experience:'2 years', bio:'Core strength and pilates specialist.' },
      ]);
    } finally { setLoading(false); }
  };

  useEffect(() => { loadTrainers(); }, []);

  // ── Save (Add / Edit) ──
  const handleSave = async (form, id) => {
    try {
      if (id) {
        await api.put(`/api/admin/trainers/${id}`, form);
        setTrainers(prev => prev.map(t => t._id === id ? { ...t, ...form } : t));
        showToast('Trainer updated successfully!');
      } else {
        const res = await api.post('/api/admin/trainers', form);
        const newT = res.data || { _id: Date.now().toString(), ...form, rating: 0, members: 0, classes: 0 };
        setTrainers(prev => [newT, ...prev]);
        showToast('Trainer added successfully!');
      }
    } catch {
      if (id) setTrainers(prev => prev.map(t => t._id === id ? { ...t, ...form } : t));
      else     setTrainers(prev => [{ _id: Date.now().toString(), ...form, rating:0, members:0, classes:0 }, ...prev]);
      showToast(id ? 'Trainer updated (demo mode)' : 'Trainer added (demo mode)');
    }
    setAddModal(false);
    setEditTrainer(null);
  };

  // ── Delete ──
  const handleDelete = async (id) => {
    try { await api.delete(`/api/admin/trainers/${id}`); } catch {}
    setTrainers(prev => prev.filter(t => t._id !== id));
    showToast('Trainer removed successfully');
    setDeleteConfirm(null);
  };

  // ── Filter ──
  const filtered = trainers.filter(t => {
    const q = searchQuery.toLowerCase();
    const matchSearch = t.name?.toLowerCase().includes(q) ||
                        t.specialization?.toLowerCase().includes(q) ||
                        t.branch?.toLowerCase().includes(q);
    const matchBranch = branchFilter === 'all' || t.branch === branchFilter;
    const matchStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchSearch && matchBranch && matchStatus;
  });

  const statCards = [
    { label: 'Total Trainers',  val: trainers.length,                                   color: '#dc2626' },
    { label: 'Active',          val: trainers.filter(t => t.status==='Active').length,   color: '#22c55e' },
    { label: 'Total Members',   val: trainers.reduce((s,t) => s+(t.members||0), 0),      color: '#3b82f6' },
    { label: 'Classes / Month', val: trainers.reduce((s,t) => s+(t.classes||0), 0),      color: '#f59e0b' },
  ];

  return (
    <div className="space-y-6">

      {/* ── Toast ── */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-2xl ${
          toast.type === 'success'
            ? 'bg-green-950/90 border-green-800/60 text-green-400'
            : 'bg-red-950/90 border-red-800/60 text-red-400'
        }`}>
          {toast.type === 'success' ? <Check size={15}/> : <X size={15}/>}
          <span className="text-sm font-semibold">{toast.msg}</span>
        </div>
      )}

      {/* ── Modals ── */}
      {viewTrainer && (
        <TrainerDetailModal
          trainer={viewTrainer}
          color={SPEC_COLORS[viewTrainer.specialization] || '#dc2626'}
          onClose={() => setViewTrainer(null)}
          onEdit={(t) => setEditTrainer(t)}
        />
      )}

      {(addModal || editTrainer) && (
        <TrainerModal
          trainer={editTrainer}
          onClose={() => { setAddModal(false); setEditTrainer(null); }}
          onSave={handleSave}
        />
      )}

      {deleteConfirm && (
        <DeleteConfirm
          trainer={deleteConfirm}
          onConfirm={() => handleDelete(deleteConfirm._id)}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap size={11} className="text-red-500 fill-red-500" />
            <span className="text-red-500 text-[9px] font-bold uppercase tracking-[0.3em]">Admin</span>
          </div>
          <h1 className="text-3xl font-black uppercase">Trainer Management</h1>
          <p className="text-gray-500 text-sm mt-0.5">{trainers.length} total trainers</p>
        </div>
        <button
          onClick={() => setAddModal(true)}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold
            px-5 py-2.5 rounded-xl text-sm uppercase tracking-wider transition-all hover:scale-105">
          <Plus size={14}/> Add Trainer
        </button>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <div key={i}
            className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-5 text-center
              hover:border-gray-600 transition-all hover:scale-[1.02] cursor-default">
            <p className="font-black text-3xl mb-1" style={{ color: s.color }}>{s.val}</p>
            <p className="text-gray-600 text-[9px] uppercase tracking-widest">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── Search + filters ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
          <input
            placeholder="Search by name, specialization or branch..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-950 border border-gray-800 rounded-xl
              focus:outline-none focus:border-red-600 text-white text-sm placeholder-gray-700 transition-colors"
          />
        </div>
        <select value={branchFilter} onChange={e => setBranchFilter(e.target.value)}
          className="px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none
            focus:border-red-600 text-white text-sm transition-colors">
          <option value="all">All Branches</option>
          {['Colombo 7','Moors','Ja Ela'].map(b => <option key={b}>{b}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none
            focus:border-red-600 text-white text-sm transition-colors">
          <option value="all">All Status</option>
          {['Active','Inactive'].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* ── Trainer cards grid ── */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-900/50 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-24 text-center">
          <Dumbbell size={40} className="text-gray-700 mx-auto mb-3" />
          <p className="text-gray-500 text-sm uppercase tracking-widest">No trainers found</p>
          <button onClick={() => setAddModal(true)}
            className="mt-5 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold
              px-6 py-3 rounded-full text-sm transition-all mx-auto">
            <Plus size={14}/> Add First Trainer
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((t, i) => (
            <TrainerCard
              key={i}
              trainer={t}
              color={SPEC_COLORS[t.specialization] || '#dc2626'}
              onView={setViewTrainer}
              onEdit={(t) => setEditTrainer(t)}
              onDelete={setDeleteConfirm}
            />
          ))}
        </div>
      )}
    </div>
  );
}