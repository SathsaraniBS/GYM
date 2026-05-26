// src/pages/admin/AdminMediaManager.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
  Image, Video, Upload, Trash2, Edit3, Eye,
  X, Check, Search, Filter, Zap, RefreshCw,
  Download, Copy, AlertTriangle, Play, Pause,
  FolderOpen, Plus, Grid, List, ChevronRight
} from 'lucide-react';
import api from '../../api/axios';

// ── File type helper ──
const getFileType = (name = '') => {
  const ext = name.split('.').pop()?.toLowerCase();
  if (['jpg','jpeg','png','webp','gif','avif','svg'].includes(ext)) return 'image';
  if (['mp4','webm','mov','avi'].includes(ext)) return 'video';
  return 'other';
};

const formatSize = (bytes) => {
  if (!bytes) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

// ── Where each file is used ──
const usageMap = {
  'h1_hero.png':      ['Home Hero', 'About Hero', 'BecomeaMember Hero'],
  'a3.jpg':           ['About Page Hero'],
  'ab2.avif':         ['About — Why Choose Us'],
  'img3.jpg':         ['Course — CTA Banner'],
  'img4.jpg':         ['About Team Carousel'],
  'img5.jpg':         ['About Team Carousel'],
  'img6.jpg':         ['About Team Carousel'],
  'img7.jpg':         ['About Team Carousel'],
  'img8.jpg':         ['About Team Carousel'],
  'img9.jpg':         ['BMI Calculator Hero'],
  'class-1.jpg':      ['Course — Classes Grid'],
  'class-2.jpg':      ['Course — Classes Grid'],
  'class-3.jpg':      ['Course — Classes Grid'],
  'class-4.jpg':      ['Course — Classes Grid'],
  'class-5.jpg':      ['Course — Classes Grid'],
  'h2.png':           ['WorkoutSessions — Personal Training'],
  'h3.png':           ['WorkoutSessions — Group Training'],
  'team1.png':        ['WorkoutSessions — Body Building'],
  'team2.png':        ['WorkoutSessions — Muscle Gain'],
  'team3.png':        ['WorkoutSessions — Weight Loss'],
  'video1.mp4':       ['Course Hero Video'],
  'video2.mp4':       ['Ourteam Hero Video'],
};

export default function AdminMediaManager() {
  const [files,         setFiles]         = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [uploading,     setUploading]     = useState(false);
  const [uploadProgress,setUploadProgress]= useState(0);
  const [selected,      setSelected]      = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchTerm,    setSearchTerm]    = useState('');
  const [filterType,    setFilterType]    = useState('all');
  const [viewMode,      setViewMode]      = useState('grid');
  const [replaceTarget, setReplaceTarget] = useState(null);
  const [toast,         setToast]         = useState(null);
  const [dragOver,      setDragOver]      = useState(false);

  const fileInputRef   = useRef(null);
  const replaceRef     = useRef(null);

  // ── Toast helper ──
  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Fetch files from backend ──
  const fetchFiles = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/admin/media');
      setFiles(res.data);
    } catch {
      // Demo mode — use mock data
      setFiles([
        { name: 'h1_hero.png',   size: 524288,  type: 'image', url: '/h1_hero.png',   updatedAt: '2025-01-15' },
        { name: 'a3.jpg',        size: 312000,  type: 'image', url: '/a3.jpg',         updatedAt: '2025-02-10' },
        { name: 'ab2.avif',      size: 180000,  type: 'image', url: '/ab2.avif',       updatedAt: '2025-02-10' },
        { name: 'img3.jpg',      size: 290000,  type: 'image', url: '/img3.jpg',       updatedAt: '2025-01-20' },
        { name: 'img4.jpg',      size: 275000,  type: 'image', url: '/img4.jpg',       updatedAt: '2025-01-20' },
        { name: 'img5.jpg',      size: 310000,  type: 'image', url: '/img5.jpg',       updatedAt: '2025-01-20' },
        { name: 'img6.jpg',      size: 295000,  type: 'image', url: '/img6.jpg',       updatedAt: '2025-01-20' },
        { name: 'img7.jpg',      size: 280000,  type: 'image', url: '/img7.jpg',       updatedAt: '2025-01-20' },
        { name: 'img8.jpg',      size: 265000,  type: 'image', url: '/img8.jpg',       updatedAt: '2025-01-20' },
        { name: 'img9.jpg',      size: 340000,  type: 'image', url: '/img9.jpg',       updatedAt: '2025-03-01' },
        { name: 'class-1.jpg',   size: 220000,  type: 'image', url: '/class-1.jpg',    updatedAt: '2025-01-05' },
        { name: 'class-2.jpg',   size: 235000,  type: 'image', url: '/class-2.jpg',    updatedAt: '2025-01-05' },
        { name: 'class-3.jpg',   size: 210000,  type: 'image', url: '/class-3.jpg',    updatedAt: '2025-01-05' },
        { name: 'class-4.jpg',   size: 225000,  type: 'image', url: '/class-4.jpg',    updatedAt: '2025-01-05' },
        { name: 'class-5.jpg',   size: 240000,  type: 'image', url: '/class-5.jpg',    updatedAt: '2025-01-05' },
        { name: 'h2.png',        size: 180000,  type: 'image', url: '/h2.png',         updatedAt: '2025-01-10' },
        { name: 'h3.png',        size: 175000,  type: 'image', url: '/h3.png',         updatedAt: '2025-01-10' },
        { name: 'team1.png',     size: 195000,  type: 'image', url: '/team1.png',      updatedAt: '2025-01-10' },
        { name: 'team2.png',     size: 188000,  type: 'image', url: '/team2.png',      updatedAt: '2025-01-10' },
        { name: 'team3.png',     size: 192000,  type: 'image', url: '/team3.png',      updatedAt: '2025-01-10' },
        { name: 'video1.mp4',    size: 15728640,type: 'video', url: '/video1.mp4',     updatedAt: '2025-01-01' },
        { name: 'video2.mp4',    size: 18874368,type: 'video', url: '/video2.mp4',     updatedAt: '2025-01-01' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFiles(); }, []);

  // ── Upload files ──
  const handleUpload = async (fileList) => {
    if (!fileList?.length) return;
    setUploading(true);
    setUploadProgress(0);
    const formData = new FormData();
    Array.from(fileList).forEach(f => formData.append('files', f));
    try {
      // Simulate progress
      const interval = setInterval(() => {
        setUploadProgress(p => { if (p >= 90) { clearInterval(interval); return 90; } return p + 10; });
      }, 200);
      await api.post('/api/admin/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      clearInterval(interval);
      setUploadProgress(100);
      showToast(`${fileList.length} file(s) uploaded successfully!`);
      await fetchFiles();
    } catch {
      // Demo — add files locally
      const newFiles = Array.from(fileList).map(f => ({
        name: f.name, size: f.size, type: getFileType(f.name),
        url: URL.createObjectURL(f), updatedAt: new Date().toISOString().split('T')[0],
      }));
      setFiles(prev => [...newFiles, ...prev]);
      setUploadProgress(100);
      showToast(`${fileList.length} file(s) added (demo mode)`);
    } finally {
      setTimeout(() => { setUploading(false); setUploadProgress(0); }, 800);
    }
  };

  // ── Replace file ──
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
      showToast(`"${replaceTarget.name}" replaced successfully!`);
      await fetchFiles();
    } catch {
      // Demo — update locally
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
      setSelected(null);
    }
  };

  // ── Delete file ──
  const handleDelete = async (fileName) => {
    try {
      await api.delete(`/api/admin/media/${encodeURIComponent(fileName)}`);
      showToast(`"${fileName}" deleted successfully!`);
      await fetchFiles();
    } catch {
      // Demo — remove locally
      setFiles(prev => prev.filter(f => f.name !== fileName));
      showToast(`"${fileName}" deleted (demo mode)`);
    } finally {
      setDeleteConfirm(null);
      setSelected(null);
    }
  };

  // ── Drag & drop ──
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleUpload(e.dataTransfer.files);
  };

  // ── Filter + search ──
  const displayed = files.filter(f => {
    const matchType   = filterType === 'all' || f.type === filterType;
    const matchSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchType && matchSearch;
  });

  const imageCount = files.filter(f => f.type === 'image').length;
  const videoCount = files.filter(f => f.type === 'video').length;
  const totalSize  = files.reduce((s, f) => s + (f.size || 0), 0);

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-8">

      {/* ── Toast ── */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-2xl transition-all duration-300 ${
          toast.type === 'success'
            ? 'bg-green-950/90 border-green-800/60 text-green-400'
            : 'bg-red-950/90 border-red-800/60 text-red-400'
        }`}>
          {toast.type === 'success' ? <Check size={16}/> : <AlertTriangle size={16}/>}
          <span className="text-sm font-semibold">{toast.msg}</span>
        </div>
      )}

      {/* ── Delete confirm modal ── */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-6">
          <div className="bg-[#0a0a0a] border border-red-800/40 rounded-2xl p-8 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-600/15 border border-red-600/30 flex items-center justify-center">
                <AlertTriangle size={18} className="text-red-500" />
              </div>
              <div>
                <p className="text-white font-black">Delete File?</p>
                <p className="text-gray-500 text-xs">This action cannot be undone</p>
              </div>
            </div>
            <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 mb-6">
              <p className="text-white text-sm font-bold mb-1">{deleteConfirm}</p>
              {usageMap[deleteConfirm] && (
                <div>
                  <p className="text-yellow-400 text-[10px] uppercase tracking-widest mb-2 font-bold">⚠ Used in:</p>
                  {usageMap[deleteConfirm].map((u, i) => (
                    <p key={i} className="text-gray-400 text-xs">• {u}</p>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl text-sm transition-all">
                <Trash2 size={14}/> Delete
              </button>
              <button onClick={() => setDeleteConfirm(null)}
                className="flex-1 border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white font-bold py-3 rounded-xl text-sm transition-all">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Detail panel modal ── */}
      {selected && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 flex items-center justify-center px-6"
          onClick={() => setSelected(null)}>
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}>

            {/* Preview */}
            <div className="relative bg-gray-900 rounded-xl overflow-hidden mb-5" style={{ aspectRatio: '16/9' }}>
              {selected.type === 'image' ? (
                <img src={selected.url} alt={selected.name}
                  className="w-full h-full object-contain" />
              ) : (
                <video src={selected.url} controls className="w-full h-full" />
              )}
            </div>

            {/* Info */}
            <div className="space-y-3 mb-5">
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Filename</span>
                <span className="text-white font-bold text-sm">{selected.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Type</span>
                <span className="text-white text-sm capitalize">{selected.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Size</span>
                <span className="text-white text-sm">{formatSize(selected.size)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Last Updated</span>
                <span className="text-white text-sm">{selected.updatedAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">URL</span>
                <button
                  onClick={() => { navigator.clipboard.writeText(selected.url); showToast('URL copied!'); }}
                  className="text-red-400 text-xs flex items-center gap-1 hover:text-red-300 transition-colors">
                  <Copy size={10}/> Copy URL
                </button>
              </div>
            </div>

            {/* Usage */}
            {usageMap[selected.name] && (
              <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 mb-5">
                <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-3">Used In</p>
                {usageMap[selected.name].map((u, i) => (
                  <div key={i} className="flex items-center gap-2 py-1">
                    <ChevronRight size={10} className="text-red-500" />
                    <p className="text-gray-300 text-xs">{u}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => { setReplaceTarget(selected); replaceRef.current?.click(); }}
                className="flex items-center justify-center gap-2 bg-blue-600/10 hover:bg-blue-600 border border-blue-600/30 hover:border-blue-600 text-blue-400 hover:text-white font-bold py-3 rounded-xl text-sm transition-all">
                <Edit3 size={14}/> Replace File
              </button>
              <button
                onClick={() => { setDeleteConfirm(selected.name); }}
                className="flex items-center justify-center gap-2 bg-red-600/10 hover:bg-red-600 border border-red-600/30 hover:border-red-600 text-red-400 hover:text-white font-bold py-3 rounded-xl text-sm transition-all">
                <Trash2 size={14}/> Delete
              </button>
              <a href={selected.url} download={selected.name}
                className="flex items-center justify-center gap-2 border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white font-bold py-3 rounded-xl text-sm transition-all col-span-2">
                <Download size={14}/> Download
              </a>
            </div>

            <button onClick={() => setSelected(null)}
              className="absolute top-4 right-4 w-8 h-8 bg-gray-900 border border-gray-700 rounded-lg flex items-center justify-center hover:border-gray-500 transition-colors">
              <X size={14} className="text-gray-400" />
            </button>
          </div>
        </div>
      )}

      {/* ── Hidden inputs ── */}
      <input ref={fileInputRef} type="file" multiple accept="image/*,video/*" className="hidden"
        onChange={e => handleUpload(e.target.files)} />
      <input ref={replaceRef} type="file" accept="image/*,video/*" className="hidden"
        onChange={e => handleReplace(e.target.files)} />

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Zap size={13} className="text-red-500 fill-red-500" />
            <span className="text-red-500 text-[10px] font-bold uppercase tracking-[0.3em]">Admin Panel</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase leading-none">
            Media<br />
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #dc2626' }}>Manager</span>
          </h1>
        </div>

        {/* Summary pills */}
        <div className="flex flex-wrap gap-3">
          {[
            { icon: Image,  label: `${imageCount} Images`,          color: 'text-blue-400'  },
            { icon: Video,  label: `${videoCount} Videos`,          color: 'text-purple-400'},
            { icon: FolderOpen, label: formatSize(totalSize)+' total',color: 'text-green-400'},
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-2 bg-gray-950 border border-gray-800 rounded-xl px-4 py-3">
              <s.icon size={14} className={s.color} />
              <p className="text-white text-sm font-black">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Upload zone ── */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 mb-8 ${
          dragOver
            ? 'border-red-500 bg-red-600/5'
            : 'border-gray-700 hover:border-red-600/50 hover:bg-gray-950'
        }`}
      >
        {uploading ? (
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-full border-2 border-red-600 border-t-transparent rounded-full animate-spin mx-auto" />
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
              {dragOver ? 'Drop files here' : 'Upload Media Files'}
            </p>
            <p className="text-gray-500 text-sm">Drag & drop or click to browse · JPG, PNG, WEBP, AVIF, MP4</p>
            <button onClick={e => e.stopPropagation()}
              className="mt-4 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-full text-sm uppercase tracking-wider transition-all"
              onClickCapture={() => fileInputRef.current?.click()}>
              <Plus size={14}/> Choose Files
            </button>
          </>
        )}
      </div>

      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
          <input placeholder="Search files..."
            value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm placeholder-gray-700 transition-colors" />
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
            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-red-600 text-white' : 'text-gray-500 hover:text-white'}`}>
            <Grid size={15} />
          </button>
          <button onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-red-600 text-white' : 'text-gray-500 hover:text-white'}`}>
            <List size={15} />
          </button>
        </div>

        <button onClick={fetchFiles}
          className="p-3 bg-gray-950 border border-gray-800 rounded-xl hover:border-gray-600 transition-colors">
          <RefreshCw size={15} className="text-gray-400" />
        </button>
      </div>

      {/* ── Count ── */}
      <p className="text-gray-600 text-xs uppercase tracking-widest mb-5">
        Showing {displayed.length} of {files.length} files
      </p>

      {/* ── Loading ── */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="bg-gray-900 rounded-2xl aspect-square animate-pulse" />
          ))}
        </div>
      ) : displayed.length === 0 ? (
        <div className="py-24 text-center">
          <FolderOpen size={40} className="text-gray-700 mx-auto mb-3" />
          <p className="text-gray-500 text-sm uppercase tracking-widest">No files found</p>
        </div>
      ) : viewMode === 'grid' ? (

        /* ── GRID VIEW ── */
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
          {displayed.map((file, i) => (
            <div key={i}
              className="group relative bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden cursor-pointer hover:border-gray-600 transition-all duration-300"
              onClick={() => setSelected(file)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-square bg-gray-900 overflow-hidden">
                {file.type === 'image' ? (
                  <img src={file.url} alt={file.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-purple-900/20">
                    <Video size={28} className="text-purple-400" />
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <button
                    onClick={e => { e.stopPropagation(); setSelected(file); }}
                    className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all backdrop-blur-sm">
                    <Eye size={13} className="text-white" />
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); setReplaceTarget(file); replaceRef.current?.click(); }}
                    className="w-8 h-8 bg-blue-600/50 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all">
                    <Edit3 size={13} className="text-white" />
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); setDeleteConfirm(file.name); }}
                    className="w-8 h-8 bg-red-600/50 hover:bg-red-600 rounded-lg flex items-center justify-center transition-all">
                    <Trash2 size={13} className="text-white" />
                  </button>
                </div>

                {/* Type badge */}
                <div className={`absolute top-2 left-2 text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                  file.type === 'video'
                    ? 'bg-purple-600/80 text-white'
                    : 'bg-black/60 text-gray-300'
                }`}>
                  {file.type}
                </div>

                {/* Usage indicator */}
                {usageMap[file.name] && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-yellow-500/80 rounded-full flex items-center justify-center"
                    title={`Used in: ${usageMap[file.name].join(', ')}`}>
                    <span className="text-[8px] font-black text-black">{usageMap[file.name].length}</span>
                  </div>
                )}
              </div>

              {/* File name */}
              <div className="p-3">
                <p className="text-white text-xs font-bold truncate">{file.name}</p>
                <p className="text-gray-600 text-[9px] mt-0.5">{formatSize(file.size)}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (

        /* ── LIST VIEW ── */
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="px-5 py-4 text-left text-[9px] text-gray-600 uppercase tracking-widest">File</th>
                <th className="px-5 py-4 text-left text-[9px] text-gray-600 uppercase tracking-widest">Type</th>
                <th className="px-5 py-4 text-left text-[9px] text-gray-600 uppercase tracking-widest">Size</th>
                <th className="px-5 py-4 text-left text-[9px] text-gray-600 uppercase tracking-widest">Used In</th>
                <th className="px-5 py-4 text-left text-[9px] text-gray-600 uppercase tracking-widest">Updated</th>
                <th className="px-5 py-4 text-left text-[9px] text-gray-600 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {displayed.map((file, i) => (
                <tr key={i} className="hover:bg-gray-950 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-900 overflow-hidden flex-shrink-0 flex items-center justify-center">
                        {file.type === 'image'
                          ? <img src={file.url} alt={file.name} className="w-full h-full object-cover"
                              onError={e => { e.target.style.display='none'; }} />
                          : <Video size={16} className="text-purple-400" />
                        }
                      </div>
                      <p className="text-white text-sm font-bold">{file.name}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                      file.type === 'image'
                        ? 'bg-blue-600/15 text-blue-400 border border-blue-600/30'
                        : 'bg-purple-600/15 text-purple-400 border border-purple-600/30'
                    }`}>{file.type}</span>
                  </td>
                  <td className="px-5 py-4 text-gray-400 text-sm">{formatSize(file.size)}</td>
                  <td className="px-5 py-4">
                    {usageMap[file.name]
                      ? <span className="text-yellow-400 text-xs font-bold">{usageMap[file.name].length} page(s)</span>
                      : <span className="text-gray-700 text-xs">—</span>
                    }
                  </td>
                  <td className="px-5 py-4 text-gray-500 text-sm">{file.updatedAt}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1.5">
                      <button onClick={() => setSelected(file)}
                        className="w-7 h-7 rounded-lg bg-gray-900 border border-gray-700 hover:border-blue-600 flex items-center justify-center transition-all">
                        <Eye size={11} className="text-gray-400" />
                      </button>
                      <button onClick={() => { setReplaceTarget(file); replaceRef.current?.click(); }}
                        className="w-7 h-7 rounded-lg bg-gray-900 border border-gray-700 hover:border-blue-600 flex items-center justify-center transition-all">
                        <Edit3 size={11} className="text-gray-400" />
                      </button>
                      <button onClick={() => setDeleteConfirm(file.name)}
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
      )}
    </div>
  );
}