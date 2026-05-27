// src/pages/admin/AdminMediaManager.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
  Image, Video, Upload, Trash2, Edit3, Eye,
  X, Check, Search, Zap, RefreshCw, Download,
  Copy, AlertTriangle, FolderOpen, Plus, Grid,
  List, ChevronRight
} from 'lucide-react';
import api from '../../api/axios';

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────
const USAGE_MAP = {
  'h1_hero.png':  ['Home Hero', 'About Hero', 'BecomeaMember Hero'],
  'a3.jpg':       ['About Page Hero'],
  'ab2.avif':     ['About — Why Choose Us'],
  'img3.jpg':     ['Course — CTA Banner'],
  'img4.jpg':     ['About Team Carousel'],
  'img5.jpg':     ['About Team Carousel'],
  'img6.jpg':     ['About Team Carousel'],
  'img7.jpg':     ['About Team Carousel'],
  'img8.jpg':     ['About Team Carousel'],
  'img9.jpg':     ['BMI Calculator Hero'],
  'class-1.jpg':  ['Course — Classes Grid'],
  'class-2.jpg':  ['Course — Classes Grid'],
  'class-3.jpg':  ['Course — Classes Grid'],
  'class-4.jpg':  ['Course — Classes Grid'],
  'class-5.jpg':  ['Course — Classes Grid'],
  'h2.png':       ['WorkoutSessions — Personal Training'],
  'h3.png':       ['WorkoutSessions — Group Training'],
  'team1.png':    ['WorkoutSessions — Body Building'],
  'team2.png':    ['WorkoutSessions — Muscle Gain'],
  'team3.png':    ['WorkoutSessions — Weight Loss'],
  'video1.mp4':   ['Course Hero Video'],
  'video2.mp4':   ['Ourteam Hero Video'],
};

const DEMO_FILES = [
  { name:'h1_hero.png',  size:524288,   type:'image', url:'/h1_hero.png',  updatedAt:'2025-01-15' },
  { name:'a3.jpg',       size:312000,   type:'image', url:'/a3.jpg',       updatedAt:'2025-02-10' },
  { name:'ab2.avif',     size:180000,   type:'image', url:'/ab2.avif',     updatedAt:'2025-02-10' },
  { name:'img3.jpg',     size:290000,   type:'image', url:'/img3.jpg',     updatedAt:'2025-01-20' },
  { name:'img4.jpg',     size:275000,   type:'image', url:'/img4.jpg',     updatedAt:'2025-01-20' },
  { name:'img5.jpg',     size:310000,   type:'image', url:'/img5.jpg',     updatedAt:'2025-01-20' },
  { name:'img6.jpg',     size:295000,   type:'image', url:'/img6.jpg',     updatedAt:'2025-01-20' },
  { name:'img7.jpg',     size:280000,   type:'image', url:'/img7.jpg',     updatedAt:'2025-01-20' },
  { name:'img8.jpg',     size:265000,   type:'image', url:'/img8.jpg',     updatedAt:'2025-01-20' },
  { name:'img9.jpg',     size:340000,   type:'image', url:'/img9.jpg',     updatedAt:'2025-03-01' },
  { name:'class-1.jpg',  size:220000,   type:'image', url:'/class-1.jpg',  updatedAt:'2025-01-05' },
  { name:'class-2.jpg',  size:235000,   type:'image', url:'/class-2.jpg',  updatedAt:'2025-01-05' },
  { name:'class-3.jpg',  size:210000,   type:'image', url:'/class-3.jpg',  updatedAt:'2025-01-05' },
  { name:'class-4.jpg',  size:225000,   type:'image', url:'/class-4.jpg',  updatedAt:'2025-01-05' },
  { name:'class-5.jpg',  size:240000,   type:'image', url:'/class-5.jpg',  updatedAt:'2025-01-05' },
  { name:'h2.png',       size:180000,   type:'image', url:'/h2.png',       updatedAt:'2025-01-10' },
  { name:'h3.png',       size:175000,   type:'image', url:'/h3.png',       updatedAt:'2025-01-10' },
  { name:'team1.png',    size:195000,   type:'image', url:'/team1.png',    updatedAt:'2025-01-10' },
  { name:'team2.png',    size:188000,   type:'image', url:'/team2.png',    updatedAt:'2025-01-10' },
  { name:'team3.png',    size:192000,   type:'image', url:'/team3.png',    updatedAt:'2025-01-10' },
  { name:'video1.mp4',   size:15728640, type:'video', url:'/video1.mp4',   updatedAt:'2025-01-01' },
  { name:'video2.mp4',   size:18874368, type:'video', url:'/video2.mp4',   updatedAt:'2025-01-01' },
];

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
const getFileType = (name = '') => {
  const ext = name.split('.').pop()?.toLowerCase();
  if (['jpg','jpeg','png','webp','gif','avif','svg'].includes(ext)) return 'image';
  if (['mp4','webm','mov','avi'].includes(ext))                      return 'video';
  return 'other';
};

const formatSize = (bytes) => {
  if (!bytes)               return '—';
  if (bytes < 1024)         return `${bytes} B`;
  if (bytes < 1024 * 1024)  return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

// ─────────────────────────────────────────────
// COMPONENT — Toast notification
// ─────────────────────────────────────────────
const Toast = ({ toast }) => {
  if (!toast) return null;
  return (
    <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-2xl transition-all duration-300 ${
      toast.type === 'success'
        ? 'bg-green-950/90 border-green-800/60 text-green-400'
        : 'bg-red-950/90 border-red-800/60 text-red-400'
    }`}>
      {toast.type === 'success' ? <Check size={15}/> : <AlertTriangle size={15}/>}
      <span className="text-sm font-semibold">{toast.msg}</span>
    </div>
  );
};

// ─────────────────────────────────────────────
// COMPONENT — Upload zone
// ─────────────────────────────────────────────
const UploadZone = ({ uploading, uploadProgress, dragOver, onDragOver, onDragLeave, onDrop, onClick }) => (
  <div
    onDragOver={onDragOver}
    onDragLeave={onDragLeave}
    onDrop={onDrop}
    onClick={onClick}
    className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 mb-8 ${
      dragOver
        ? 'border-red-500 bg-red-600/5 scale-[1.01]'
        : 'border-gray-700 hover:border-red-600/50 hover:bg-gray-950'
    }`}
  >
    {uploading ? (
      <div className="space-y-3">
        <div className="w-12 h-12 border-2 border-red-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-white font-bold">Uploading... {uploadProgress}%</p>
        <div className="max-w-xs mx-auto h-2 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-red-600 rounded-full transition-all duration-300"
            style={{ width: `${uploadProgress}%` }} />
        </div>
      </div>
    ) : (
      <>
        <Upload size={32} className={`mx-auto mb-3 transition-colors ${dragOver ? 'text-red-500' : 'text-gray-600'}`} />
        <p className="text-white font-black text-lg mb-1">
          {dragOver ? 'Drop files here!' : 'Upload Media Files'}
        </p>
        <p className="text-gray-500 text-sm mb-4">Drag & drop or click to browse · JPG, PNG, WEBP, AVIF, SVG, MP4</p>
        <span className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-full text-sm uppercase tracking-wider transition-all pointer-events-none">
          <Plus size={14}/> Choose Files
        </span>
      </>
    )}
  </div>
);

// ─────────────────────────────────────────────
// COMPONENT — Delete confirm modal
// ─────────────────────────────────────────────
const DeleteModal = ({ fileName, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-4">
    <div className="bg-[#0a0a0a] border border-red-800/40 rounded-2xl p-8 max-w-md w-full">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-red-600/15 border border-red-600/30 flex items-center justify-center">
          <AlertTriangle size={18} className="text-red-500" />
        </div>
        <div>
          <p className="text-white font-black">Delete File?</p>
          <p className="text-gray-500 text-xs">This action cannot be undone</p>
        </div>
      </div>

      <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 mb-6">
        <p className="text-white text-sm font-bold mb-2">{fileName}</p>
        {USAGE_MAP[fileName] && (
          <>
            <div className="flex items-center gap-1.5 mb-2">
              <AlertTriangle size={10} className="text-yellow-400" />
              <p className="text-yellow-400 text-[10px] uppercase tracking-widest font-bold">Used in:</p>
            </div>
            {USAGE_MAP[fileName].map((u, i) => (
              <p key={i} className="text-gray-400 text-xs pl-4">• {u}</p>
            ))}
          </>
        )}
      </div>

      <div className="flex gap-3">
        <button onClick={onConfirm}
          className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl text-sm transition-all">
          <Trash2 size={14}/> Delete
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
// COMPONENT — File detail / preview modal
// ─────────────────────────────────────────────
const FileDetailModal = ({ file, onClose, onReplace, onDelete, onCopyURL }) => (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 flex items-center justify-center px-4"
    onClick={onClose}>
    <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto relative"
      onClick={e => e.stopPropagation()}>

      {/* Close button */}
      <button onClick={onClose}
        className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-900 border border-gray-700 rounded-lg flex items-center justify-center hover:border-gray-500 transition-colors">
        <X size={14} className="text-gray-400" />
      </button>

      <div className="p-6">
        {/* Preview */}
        <div className="relative bg-gray-900 rounded-xl overflow-hidden mb-5" style={{ aspectRatio:'16/9' }}>
          {file.type === 'image' ? (
            <img src={file.url} alt={file.name} className="w-full h-full object-contain"
              onError={e => { e.currentTarget.style.display = 'none'; }} />
          ) : (
            <video src={file.url} controls className="w-full h-full" />
          )}
        </div>

        {/* File info */}
        <div className="space-y-2.5 mb-5">
          {[
            { label:'Filename',     val: file.name,        copy: false },
            { label:'Type',         val: file.type,        copy: false },
            { label:'Size',         val: formatSize(file.size), copy: false },
            { label:'Last Updated', val: file.updatedAt,   copy: false },
          ].map((r, i) => (
            <div key={i} className="flex justify-between py-2 border-b border-gray-800/60 last:border-0">
              <span className="text-gray-500 text-sm">{r.label}</span>
              <span className="text-white text-sm font-semibold capitalize">{r.val}</span>
            </div>
          ))}
          {/* URL row */}
          <div className="flex justify-between py-2">
            <span className="text-gray-500 text-sm">URL</span>
            <button onClick={onCopyURL}
              className="text-red-400 text-xs flex items-center gap-1 hover:text-red-300 transition-colors font-bold">
              <Copy size={10}/> Copy URL
            </button>
          </div>
        </div>

        {/* Usage */}
        {USAGE_MAP[file.name] && (
          <div className="bg-gray-950 border border-yellow-800/30 rounded-xl p-4 mb-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={12} className="text-yellow-400" />
              <p className="text-yellow-400 text-[10px] uppercase tracking-widest font-bold">Used In</p>
            </div>
            {USAGE_MAP[file.name].map((u, i) => (
              <div key={i} className="flex items-center gap-2 py-1">
                <ChevronRight size={10} className="text-red-500" />
                <p className="text-gray-300 text-xs">{u}</p>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button onClick={onReplace}
            className="flex items-center justify-center gap-2 bg-blue-600/10 hover:bg-blue-600 border border-blue-600/30 hover:border-blue-600 text-blue-400 hover:text-white font-bold py-3 rounded-xl text-sm transition-all">
            <Edit3 size={14}/> Replace File
          </button>
          <button onClick={onDelete}
            className="flex items-center justify-center gap-2 bg-red-600/10 hover:bg-red-600 border border-red-600/30 hover:border-red-600 text-red-400 hover:text-white font-bold py-3 rounded-xl text-sm transition-all">
            <Trash2 size={14}/> Delete
          </button>
          <a href={file.url} download={file.name}
            className="col-span-2 flex items-center justify-center gap-2 border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white font-bold py-3 rounded-xl text-sm transition-all">
            <Download size={14}/> Download
          </a>
        </div>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// COMPONENT — Grid view card
// ─────────────────────────────────────────────
const GridCard = ({ file, onView, onReplace, onDelete }) => (
  <div
    className="group relative bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden cursor-pointer hover:border-gray-600 transition-all duration-300"
    onClick={() => onView(file)}
  >
    {/* Thumbnail */}
    <div className="relative aspect-square bg-gray-900 overflow-hidden">
      {file.type === 'image' ? (
        <img src={file.url} alt={file.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={e => { e.currentTarget.style.display = 'none'; }} />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-purple-900/20">
          <Video size={28} className="text-purple-400" />
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
        <button onClick={e => { e.stopPropagation(); onView(file); }}
          className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all backdrop-blur-sm">
          <Eye size={13} className="text-white" />
        </button>
        <button onClick={e => { e.stopPropagation(); onReplace(file); }}
          className="w-8 h-8 bg-blue-600/50 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all">
          <Edit3 size={13} className="text-white" />
        </button>
        <button onClick={e => { e.stopPropagation(); onDelete(file.name); }}
          className="w-8 h-8 bg-red-600/50 hover:bg-red-600 rounded-lg flex items-center justify-center transition-all">
          <Trash2 size={13} className="text-white" />
        </button>
      </div>

      {/* Type badge */}
      <div className={`absolute top-2 left-2 text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
        file.type === 'video' ? 'bg-purple-600/80 text-white' : 'bg-black/60 text-gray-300'
      }`}>
        {file.type}
      </div>

      {/* Usage indicator */}
      {USAGE_MAP[file.name] && (
        <div className="absolute top-2 right-2 w-5 h-5 bg-yellow-500/80 rounded-full flex items-center justify-center"
          title={`Used in: ${USAGE_MAP[file.name].join(', ')}`}>
          <span className="text-[8px] font-black text-black">{USAGE_MAP[file.name].length}</span>
        </div>
      )}
    </div>

    {/* Name + size */}
    <div className="p-3">
      <p className="text-white text-xs font-bold truncate">{file.name}</p>
      <p className="text-gray-600 text-[9px] mt-0.5">{formatSize(file.size)}</p>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// COMPONENT — List view table
// ─────────────────────────────────────────────
const ListView = ({ files, onView, onReplace, onDelete }) => (
  <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-800">
            {['File','Type','Size','Used In','Updated','Actions'].map((h, i) => (
              <th key={i} className="px-5 py-4 text-left text-[9px] text-gray-600 uppercase tracking-widest font-bold whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800/50">
          {files.map((file, i) => (
            <tr key={i} className="hover:bg-gray-950 transition-colors group">
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-900 overflow-hidden flex-shrink-0 flex items-center justify-center">
                    {file.type === 'image'
                      ? <img src={file.url} alt={file.name} className="w-full h-full object-cover"
                          onError={e => { e.currentTarget.style.display = 'none'; }} />
                      : <Video size={16} className="text-purple-400" />
                    }
                  </div>
                  <p className="text-white text-sm font-bold">{file.name}</p>
                </div>
              </td>
              <td className="px-5 py-4">
                <span className={`text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                  file.type === 'image'
                    ? 'bg-blue-600/15 text-blue-400 border-blue-600/30'
                    : 'bg-purple-600/15 text-purple-400 border-purple-600/30'
                }`}>{file.type}</span>
              </td>
              <td className="px-5 py-4 text-gray-400 text-sm">{formatSize(file.size)}</td>
              <td className="px-5 py-4">
                {USAGE_MAP[file.name]
                  ? <span className="text-yellow-400 text-xs font-bold">{USAGE_MAP[file.name].length} page(s)</span>
                  : <span className="text-gray-700 text-xs">—</span>
                }
              </td>
              <td className="px-5 py-4 text-gray-500 text-sm whitespace-nowrap">{file.updatedAt}</td>
              <td className="px-5 py-4">
                <div className="flex gap-1.5">
                  <button onClick={() => onView(file)}
                    className="w-7 h-7 rounded-lg bg-gray-900 border border-gray-700 hover:border-blue-500 flex items-center justify-center transition-all">
                    <Eye size={11} className="text-gray-400" />
                  </button>
                  <button onClick={() => onReplace(file)}
                    className="w-7 h-7 rounded-lg bg-gray-900 border border-gray-700 hover:border-blue-500 flex items-center justify-center transition-all">
                    <Edit3 size={11} className="text-gray-400" />
                  </button>
                  <button onClick={() => onDelete(file.name)}
                    className="w-7 h-7 rounded-lg bg-gray-900 border border-gray-700 hover:border-red-600 flex items-center justify-center transition-all">
                    <Trash2 size={11} className="text-red-400" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────
export default function AdminMediaManager() {
  const [files,          setFiles]          = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [uploading,      setUploading]      = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile,   setSelectedFile]   = useState(null);
  const [deleteConfirm,  setDeleteConfirm]  = useState(null);
  const [replaceTarget,  setReplaceTarget]  = useState(null);
  const [searchTerm,     setSearchTerm]     = useState('');
  const [filterType,     setFilterType]     = useState('all');
  const [viewMode,       setViewMode]       = useState('grid');
  const [dragOver,       setDragOver]       = useState(false);
  const [toast,          setToast]          = useState(null);

  const fileInputRef = useRef(null);
  const replaceRef   = useRef(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Fetch ──
  const fetchFiles = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/admin/media');
      setFiles(res.data);
    } catch {
      setFiles(DEMO_FILES);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchFiles(); }, []);

  // ── Upload ──
  const handleUpload = async (fileList) => {
    if (!fileList?.length) return;
    setUploading(true);
    setUploadProgress(0);
    const formData = new FormData();
    Array.from(fileList).forEach(f => formData.append('files', f));
    try {
      const interval = setInterval(() => {
        setUploadProgress(p => { if (p >= 90) { clearInterval(interval); return 90; } return p + 10; });
      }, 200);
      await api.post('/api/admin/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      clearInterval(interval);
      setUploadProgress(100);
      showToast(`${fileList.length} file(s) uploaded!`);
      await fetchFiles();
    } catch {
      const newFiles = Array.from(fileList).map(f => ({
        name: f.name, size: f.size,
        type: getFileType(f.name),
        url:  URL.createObjectURL(f),
        updatedAt: new Date().toISOString().split('T')[0],
      }));
      setFiles(prev => [...newFiles, ...prev]);
      setUploadProgress(100);
      showToast(`${fileList.length} file(s) added (demo mode)`);
    } finally {
      setTimeout(() => { setUploading(false); setUploadProgress(0); }, 800);
    }
  };

  // ── Replace ──
  const handleReplace = async (fileList) => {
    if (!fileList?.length || !replaceTarget) return;
    const file = fileList[0];
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('replaceFile', replaceTarget.name);
      await api.put('/api/admin/media/replace', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      showToast(`"${replaceTarget.name}" replaced!`);
      await fetchFiles();
    } catch {
      const newUrl = URL.createObjectURL(file);
      setFiles(prev => prev.map(f =>
        f.name === replaceTarget.name
          ? { ...f, url: newUrl, size: file.size, updatedAt: new Date().toISOString().split('T')[0] }
          : f
      ));
      showToast(`"${replaceTarget.name}" replaced (demo mode)`);
    } finally {
      setUploading(false);
      setReplaceTarget(null);
      setSelectedFile(null);
    }
  };

  // ── Delete ──
  const handleDelete = async (fileName) => {
    try {
      await api.delete(`/api/admin/media/${encodeURIComponent(fileName)}`);
      showToast(`"${fileName}" deleted!`);
      await fetchFiles();
    } catch {
      setFiles(prev => prev.filter(f => f.name !== fileName));
      showToast(`"${fileName}" deleted (demo mode)`);
    } finally {
      setDeleteConfirm(null);
      setSelectedFile(null);
    }
  };

  // ── Trigger replace for a specific file ──
  const triggerReplace = (file) => {
    setReplaceTarget(file);
    replaceRef.current?.click();
  };

  // ── Filter ──
  const displayed = files.filter(f => {
    const matchType   = filterType === 'all' || f.type === filterType;
    const matchSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchType && matchSearch;
  });

  const imageCount = files.filter(f => f.type === 'image').length;
  const videoCount = files.filter(f => f.type === 'video').length;
  const totalSize  = files.reduce((s, f) => s + (f.size || 0), 0);

  return (
    <div className="space-y-0">

      {/* ── Toast ── */}
      <Toast toast={toast} />

      {/* ── Modals ── */}
      {deleteConfirm && (
        <DeleteModal
          fileName={deleteConfirm}
          onConfirm={() => handleDelete(deleteConfirm)}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}

      {selectedFile && (
        <FileDetailModal
          file={selectedFile}
          onClose={() => setSelectedFile(null)}
          onReplace={() => triggerReplace(selectedFile)}
          onDelete={() => { setDeleteConfirm(selectedFile.name); setSelectedFile(null); }}
          onCopyURL={() => { navigator.clipboard.writeText(selectedFile.url); showToast('URL copied!'); }}
        />
      )}

      {/* ── Hidden file inputs ── */}
      <input ref={fileInputRef} type="file" multiple accept="image/*,video/*" className="hidden"
        onChange={e => handleUpload(e.target.files)} />
      <input ref={replaceRef} type="file" accept="image/*,video/*" className="hidden"
        onChange={e => handleReplace(e.target.files)} />

      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Zap size={11} className="text-red-500 fill-red-500" />
            <span className="text-red-500 text-[9px] font-bold uppercase tracking-[0.3em]">Admin</span>
          </div>
          <h1 className="text-3xl font-black uppercase">Media Manager</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage all images and videos used in the website</p>
        </div>

        {/* Summary pills */}
        <div className="flex flex-wrap gap-3">
          {[
            { icon: Image,      label: `${imageCount} Images`,     color: 'text-blue-400'   },
            { icon: Video,      label: `${videoCount} Videos`,     color: 'text-purple-400' },
            { icon: FolderOpen, label: formatSize(totalSize),      color: 'text-green-400'  },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-2 bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5">
              <s.icon size={14} className={s.color} />
              <p className="text-white text-sm font-black">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Upload zone ── */}
      <UploadZone
        uploading={uploading}
        uploadProgress={uploadProgress}
        dragOver={dragOver}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); handleUpload(e.dataTransfer.files); }}
        onClick={() => fileInputRef.current?.click()}
      />

      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
          <input
            placeholder="Search files..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm placeholder-gray-700 transition-colors"
          />
        </div>

        {/* Type filter */}
        <div className="flex gap-1 bg-gray-950 border border-gray-800 rounded-xl p-1">
          {['all','image','video'].map(t => (
            <button key={t} onClick={() => setFilterType(t)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                filterType === t ? 'bg-red-600 text-white' : 'text-gray-500 hover:text-white'
              }`}>{t}</button>
          ))}
        </div>

        {/* View mode */}
        <div className="flex gap-1 bg-gray-950 border border-gray-800 rounded-xl p-1">
          <button onClick={() => setViewMode('grid')}
            className={`p-2.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-red-600 text-white' : 'text-gray-500 hover:text-white'}`}>
            <Grid size={15} />
          </button>
          <button onClick={() => setViewMode('list')}
            className={`p-2.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-red-600 text-white' : 'text-gray-500 hover:text-white'}`}>
            <List size={15} />
          </button>
        </div>

        <button onClick={fetchFiles} title="Refresh"
          className="p-3 bg-gray-950 border border-gray-800 rounded-xl hover:border-gray-600 transition-colors">
          <RefreshCw size={15} className="text-gray-400" />
        </button>
      </div>

      {/* ── File count ── */}
      <p className="text-gray-600 text-xs uppercase tracking-widest mb-5">
        Showing <span className="text-white font-bold">{displayed.length}</span> of{' '}
        <span className="text-white font-bold">{files.length}</span> files
      </p>

      {/* ── Content ── */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="bg-gray-900/50 rounded-2xl aspect-square animate-pulse" />
          ))}
        </div>
      ) : displayed.length === 0 ? (
        <div className="py-24 text-center">
          <FolderOpen size={40} className="text-gray-700 mx-auto mb-3" />
          <p className="text-gray-500 text-sm uppercase tracking-widest">No files found</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
          {displayed.map((file, i) => (
            <GridCard
              key={i}
              file={file}
              onView={setSelectedFile}
              onReplace={triggerReplace}
              onDelete={setDeleteConfirm}
            />
          ))}
        </div>
      ) : (
        <ListView
          files={displayed}
          onView={setSelectedFile}
          onReplace={triggerReplace}
          onDelete={setDeleteConfirm}
        />
      )}
    </div>
  );
}