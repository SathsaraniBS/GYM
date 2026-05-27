// src/components/AdminComponents/AdminContact.jsx
import React, { useState, useEffect } from 'react';
import {
  Mail, Search, Trash2, Eye, Check, X,
  AlertTriangle, Zap, RefreshCw, MessageSquare,
  Phone, User, Clock, ChevronLeft, ChevronRight,
  Reply, MailOpen, MailCheck, Filter
} from 'lucide-react';
import api from '../../api/axios';

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
const formatDate = (iso) => {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
    ' · ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

const StatusBadge = ({ status }) => {
  const map = {
    unread:  'bg-red-600/15 text-red-400 border-red-600/30',
    read:    'bg-blue-600/15 text-blue-400 border-blue-600/30',
    replied: 'bg-green-600/15 text-green-400 border-green-600/30',
  };
  const icons = { unread: Mail, read: MailOpen, replied: MailCheck };
  const Icon  = icons[status] || Mail;
  return (
    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border flex items-center gap-1 w-fit ${map[status] || map.unread}`}>
      <Icon size={9}/> {status}
    </span>
  );
};

// ─────────────────────────────────────────────
// COMPONENT — Message detail modal
// ─────────────────────────────────────────────
const MessageModal = ({ msg, onClose, onStatusChange, onDelete }) => {
  const [replyText, setReplyText]   = useState('');
  const [replying,  setReplying]    = useState(false);
  const [showReply, setShowReply]   = useState(false);

  const handleReply = async () => {
    if (!replyText.trim()) return;
    setReplying(true);
    // In real app: send email via nodemailer
    await new Promise(r => setTimeout(r, 800));
    onStatusChange(msg._id, 'replied');
    setReplying(false);
    setShowReply(false);
    setReplyText('');
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-4"
      onClick={onClose}>
      <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/15 border border-red-600/30 flex items-center justify-center text-red-400 font-black text-lg">
              {msg.name?.charAt(0)?.toUpperCase()}
            </div>
            <div>
              <p className="text-white font-black">{msg.name}</p>
              <StatusBadge status={msg.status} />
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center hover:border-gray-600 transition-colors">
            <X size={14} className="text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          {/* Contact info */}
          <div className="grid grid-cols-1 gap-3 mb-5">
            {[
              { icon: Mail,  label: 'Email',    val: msg.email  },
              { icon: Phone, label: 'Mobile',   val: msg.mobile },
              { icon: Clock, label: 'Received', val: formatDate(msg.createdAt) },
            ].filter(r => r.val && r.val !== '—').map((r, i) => (
              <div key={i} className="flex items-center gap-3 py-2.5 border-b border-gray-800/60 last:border-0">
                <r.icon size={14} className="text-gray-600 flex-shrink-0" />
                <span className="text-gray-500 text-sm w-20 flex-shrink-0">{r.label}</span>
                <span className="text-white text-sm font-semibold">{r.val}</span>
              </div>
            ))}
          </div>

          {/* Message */}
          <div className="bg-gray-950 border border-gray-800 rounded-xl p-5 mb-5">
            <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-3">Message</p>
            <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
          </div>

          {/* Reply area */}
          {showReply && (
            <div className="bg-gray-950 border border-gray-800 rounded-xl p-5 mb-5">
              <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-3">
                Reply to {msg.email}
              </p>
              <textarea
                rows={4}
                placeholder="Type your reply..."
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm resize-none placeholder-gray-700 transition-colors"
              />
              <div className="flex gap-3 mt-3">
                <button onClick={handleReply} disabled={replying || !replyText.trim()}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-800 disabled:text-gray-600 text-white font-bold py-3 rounded-xl text-sm transition-all">
                  {replying
                    ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/> Sending...</>
                    : <><Reply size={14}/> Send Reply</>
                  }
                </button>
                <button onClick={() => setShowReply(false)}
                  className="px-5 border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white font-bold rounded-xl text-sm transition-all">
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="grid grid-cols-3 gap-3">
            <button onClick={() => setShowReply(!showReply)}
              className="flex items-center justify-center gap-2 border border-blue-600/40 hover:bg-blue-600 text-blue-400 hover:text-white font-bold py-3 rounded-xl text-sm transition-all">
              <Reply size={13}/> Reply
            </button>
            <button
              onClick={() => {
                const next = msg.status === 'unread' ? 'read' : msg.status === 'read' ? 'replied' : 'unread';
                onStatusChange(msg._id, next);
              }}
              className="flex items-center justify-center gap-2 border border-green-600/40 hover:bg-green-600 text-green-400 hover:text-white font-bold py-3 rounded-xl text-sm transition-all">
              <Check size={13}/> {msg.status === 'replied' ? 'Unread' : 'Mark Read'}
            </button>
            <button onClick={() => { onDelete(msg._id); onClose(); }}
              className="flex items-center justify-center gap-2 border border-red-600/40 hover:bg-red-600 text-red-400 hover:text-white font-bold py-3 rounded-xl text-sm transition-all">
              <Trash2 size={13}/> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// COMPONENT — Delete confirm
// ─────────────────────────────────────────────
const DeleteConfirm = ({ msg, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-4">
    <div className="bg-[#0a0a0a] border border-red-800/40 rounded-2xl p-8 max-w-sm w-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-red-600/15 border border-red-600/30 flex items-center justify-center">
          <AlertTriangle size={18} className="text-red-500" />
        </div>
        <div>
          <p className="text-white font-black">Delete Message?</p>
          <p className="text-gray-500 text-xs">This cannot be undone</p>
        </div>
      </div>
      <p className="text-gray-400 text-sm mb-6">
        Delete message from <span className="text-white font-bold">{msg?.name}</span>?
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
      toast.type === 'success' ? 'bg-green-950/90 border-green-800/60 text-green-400' : 'bg-red-950/90 border-red-800/60 text-red-400'
    }`}>
      {toast.type === 'success' ? <Check size={15}/> : <X size={15}/>}
      <span className="text-sm font-semibold">{toast.msg}</span>
    </div>
  );
};

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function AdminContact() {
  const [messages,      setMessages]      = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [searchQuery,   setSearchQuery]   = useState('');
  const [statusFilter,  setStatusFilter]  = useState('all');
  const [viewMsg,       setViewMsg]       = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toast,         setToast]         = useState(null);
  const [page,          setPage]          = useState(1);
  const perPage = 8;

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Load messages ──
  const loadMessages = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/contact');
      setMessages(res.data?.messages || res.data || []);
    } catch {
      // Demo data
      setMessages([
        { _id:'1', name:'Ayesh Ranasinghe',  email:'ayesh@gmail.com',  mobile:'+94771234567', message:'I would like to know more about the Individual Gents membership plan and pricing for Colombo 7 branch.',         status:'unread',  createdAt: new Date(Date.now()-1000*60*5).toISOString()    },
        { _id:'2', name:'Chamari Silva',     email:'cham@gmail.com',   mobile:'+94772345678', message:'Hello, I am interested in joining the yoga classes. What are the available time slots for Ja Ela branch?',      status:'read',    createdAt: new Date(Date.now()-1000*60*60*2).toISOString()  },
        { _id:'3', name:'Ruwan Perera',      email:'ruwan@gmail.com',  mobile:'+94773456789', message:'My membership expired last month. I want to renew it. What are the renewal options available?',                 status:'replied', createdAt: new Date(Date.now()-1000*60*60*5).toISOString()  },
        { _id:'4', name:'Dilshan Fernando',  email:'dil@gmail.com',    mobile:'+94774567890', message:'I am a student and interested in the student membership plan. Do you need proof of enrollment?',               status:'unread',  createdAt: new Date(Date.now()-1000*60*60*24).toISOString() },
        { _id:'5', name:'Priya Kumari',      email:'priya@gmail.com',  mobile:'+94775678901', message:'Can I get a personal trainer for weight loss? What are the trainer fees and availability?',                    status:'unread',  createdAt: new Date(Date.now()-1000*60*60*26).toISOString() },
        { _id:'6', name:'Kasun Bandara',     email:'kasun@gmail.com',  mobile:'+94776789012', message:'I want to book a trial session before committing to a membership. Is that possible at your Colombo 7 branch?', status:'read',    createdAt: new Date(Date.now()-1000*60*60*48).toISOString() },
        { _id:'7', name:'Nimali Perera',     email:'nim@gmail.com',    mobile:'+94777890123', message:'Do you have family membership packages? We are a family of 4 looking to join together.',                      status:'replied', createdAt: new Date(Date.now()-1000*60*60*72).toISOString() },
        { _id:'8', name:'Sachini Silva',     email:'sach@gmail.com',   mobile:'+94778901234', message:'What are your gym opening hours during public holidays? Also, is parking available at Moors branch?',          status:'unread',  createdAt: new Date(Date.now()-1000*60*60*96).toISOString() },
      ]);
    } finally { setLoading(false); }
  };

  useEffect(() => { loadMessages(); }, []);

  // ── Status change ──
  const handleStatusChange = async (id, status) => {
    try { await api.put(`/api/contact/${id}`, { status }); } catch {}
    setMessages(prev => prev.map(m => m._id === id ? { ...m, status } : m));
    if (viewMsg?._id === id) setViewMsg(prev => ({ ...prev, status }));
    showToast(`Marked as ${status}`);
  };

  // ── Delete ──
  const handleDelete = async (id) => {
    try { await api.delete(`/api/contact/${id}`); } catch {}
    setMessages(prev => prev.filter(m => m._id !== id));
    showToast('Message deleted');
    setDeleteConfirm(null);
  };

  // ── Mark all read ──
  const markAllRead = () => {
    setMessages(prev => prev.map(m => m.status === 'unread' ? { ...m, status: 'read' } : m));
    showToast('All messages marked as read');
  };

  // ── Filter ──
  const filtered = messages.filter(m => {
    const q = searchQuery.toLowerCase();
    const matchSearch = m.name?.toLowerCase().includes(q) || m.email?.toLowerCase().includes(q) || m.message?.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'all' || m.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated  = filtered.slice((page - 1) * perPage, page * perPage);

  const counts = {
    total:   messages.length,
    unread:  messages.filter(m => m.status === 'unread').length,
    read:    messages.filter(m => m.status === 'read').length,
    replied: messages.filter(m => m.status === 'replied').length,
  };

  return (
    <div className="space-y-6">
      <Toast toast={toast} />

      {/* Modals */}
      {viewMsg && (
        <MessageModal
          msg={viewMsg}
          onClose={() => setViewMsg(null)}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      )}
      {deleteConfirm && (
        <DeleteConfirm
          msg={deleteConfirm}
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
          <h1 className="text-3xl font-black uppercase">Contact Messages</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {counts.unread > 0 && (
              <span className="text-red-400 font-bold">{counts.unread} unread · </span>
            )}
            {messages.length} total messages
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={loadMessages}
            className="w-10 h-10 border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white rounded-xl flex items-center justify-center transition-all">
            <RefreshCw size={15}/>
          </button>
          {counts.unread > 0 && (
            <button onClick={markAllRead}
              className="flex items-center gap-2 border border-green-600/40 hover:bg-green-600 text-green-400 hover:text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-all">
              <MailCheck size={14}/> Mark All Read
            </button>
          )}
        </div>
      </div>

      {/* Stat pills */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label:'Total',   val:counts.total,   color:'#dc2626', filter:'all'     },
          { label:'Unread',  val:counts.unread,  color:'#ef4444', filter:'unread'  },
          { label:'Read',    val:counts.read,    color:'#3b82f6', filter:'read'    },
          { label:'Replied', val:counts.replied, color:'#22c55e', filter:'replied' },
        ].map((s, i) => (
          <div key={i}
            onClick={() => { setStatusFilter(s.filter); setPage(1); }}
            className={`bg-[#0a0a0a] border rounded-xl p-4 text-center cursor-pointer transition-all hover:scale-[1.02] ${
              statusFilter === s.filter ? 'border-gray-500' : 'border-gray-800 hover:border-gray-600'
            }`}>
            <p className="font-black text-2xl" style={{ color:s.color }}>{s.val}</p>
            <p className="text-gray-600 text-[9px] uppercase tracking-widest mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
          <input
            placeholder="Search by name, email or message..."
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setPage(1); }}
            className="w-full pl-10 pr-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm placeholder-gray-700 transition-colors"
          />
        </div>
        <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
          className="px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm transition-colors">
          <option value="all">All Messages</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
        </select>
      </div>

      {/* Messages list */}
      <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800">
          <p className="text-gray-500 text-xs">
            Showing <span className="text-white font-bold">{Math.min((page-1)*perPage+1,filtered.length)}–{Math.min(page*perPage,filtered.length)}</span> of{' '}
            <span className="text-white font-bold">{filtered.length}</span> messages
          </p>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin"/>
            <p className="text-gray-600 text-xs uppercase tracking-widest">Loading messages...</p>
          </div>
        ) : paginated.length === 0 ? (
          <div className="py-20 text-center">
            <MessageSquare size={36} className="text-gray-700 mx-auto mb-3"/>
            <p className="text-gray-600 text-sm uppercase tracking-widest">No messages found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-800/40">
            {paginated.map((m, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 px-6 py-5 hover:bg-gray-950/60 transition-colors group cursor-pointer ${
                  m.status === 'unread' ? 'bg-red-600/3' : ''
                }`}
                onClick={() => { setViewMsg(m); handleStatusChange(m._id, m.status === 'unread' ? 'read' : m.status); }}
              >
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 ${
                  m.status === 'unread'
                    ? 'bg-red-600/20 border border-red-600/30 text-red-400'
                    : 'bg-gray-900 border border-gray-700 text-gray-500'
                }`}>
                  {m.name?.charAt(0)?.toUpperCase()}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={`font-bold text-sm ${m.status === 'unread' ? 'text-white' : 'text-gray-300'}`}>
                        {m.name}
                      </p>
                      <StatusBadge status={m.status} />
                    </div>
                    <p className="text-gray-600 text-xs flex-shrink-0">{formatDate(m.createdAt)}</p>
                  </div>
                  <p className="text-gray-500 text-xs mb-1">{m.email} · {m.mobile}</p>
                  <p className={`text-sm truncate ${m.status === 'unread' ? 'text-gray-300' : 'text-gray-500'}`}>
                    {m.message}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                  <button
                    onClick={e => { e.stopPropagation(); handleStatusChange(m._id, m.status === 'replied' ? 'unread' : 'replied'); }}
                    title="Toggle replied"
                    className="w-7 h-7 rounded-lg bg-gray-900 border border-gray-700 hover:border-green-500 flex items-center justify-center transition-all">
                    <MailCheck size={11} className="text-gray-400"/>
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); setDeleteConfirm(m); }}
                    title="Delete"
                    className="w-7 h-7 rounded-lg bg-gray-900 border border-gray-700 hover:border-red-600 flex items-center justify-center transition-all">
                    <Trash2 size={11} className="text-red-400"/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

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