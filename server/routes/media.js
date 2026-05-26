// server/routes/media.js
import express              from 'express';
import multer               from 'multer';
import path                 from 'path';
import fs                   from 'fs';
import { fileURLToPath }    from 'url';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

// ✅ ES Module __dirname fix (not available by default in ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const router = express.Router();

// ── Public folder path (Vite frontend/public/) ──
const PUBLIC_DIR = path.join(__dirname, '../../frontend/public');

// ── Multer storage — saves directly to frontend/public/ ──
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(PUBLIC_DIR)) {
      fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    }
    cb(null, PUBLIC_DIR);
  },
  filename: (req, file, cb) => {
    // Keep original filename — replaces existing file with same name
    cb(null, file.originalname);
  },
});

// ── File type filter ──
const fileFilter = (req, file, cb) => {
  const allowedExt = /jpg|jpeg|png|webp|gif|avif|svg|mp4|webm|mov/;
  const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
  if (allowedExt.test(ext)) cb(null, true);
  else cb(new Error(`File type .${ext} is not allowed`), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB max
});

// ════════════════════════════════════════
// GET /api/admin/media
// List all image & video files in public/
// ════════════════════════════════════════
router.get('/', protect, adminOnly, (req, res) => {
  try {
    if (!fs.existsSync(PUBLIC_DIR)) return res.json([]);

    const allowedExts = ['.jpg','.jpeg','.png','.webp','.gif','.avif','.svg','.mp4','.webm','.mov'];
    const videoExts   = ['.mp4','.webm','.mov'];

    const files = fs.readdirSync(PUBLIC_DIR)
      .filter(f => allowedExts.includes(path.extname(f).toLowerCase()))
      .map(f => {
        const stat = fs.statSync(path.join(PUBLIC_DIR, f));
        const ext  = path.extname(f).toLowerCase();
        return {
          name:      f,
          size:      stat.size,
          type:      videoExts.includes(ext) ? 'video' : 'image',
          url:       `/${f}`,
          updatedAt: stat.mtime.toISOString().split('T')[0],
        };
      })
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    res.json(files);
  } catch (err) {
    res.status(500).json({ message: 'Failed to list files', error: err.message });
  }
});

// ════════════════════════════════════════
// POST /api/admin/media/upload
// Upload one or more new files
// ════════════════════════════════════════
router.post('/upload', protect, adminOnly, upload.array('files', 20), (req, res) => {
  try {
    if (!req.files?.length) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
    const uploaded = req.files.map(f => ({
      name: f.filename,
      size: f.size,
      url:  `/${f.filename}`,
    }));
    res.json({
      message: `${req.files.length} file(s) uploaded successfully`,
      files:   uploaded,
    });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});

// ════════════════════════════════════════
// PUT /api/admin/media/replace
// Replace an existing file with a new one
// ════════════════════════════════════════
router.put('/replace', protect, adminOnly, upload.single('file'), (req, res) => {
  try {
    const { replaceFile } = req.body;
    if (!req.file)    return res.status(400).json({ message: 'No replacement file provided' });
    if (!replaceFile) return res.status(400).json({ message: 'replaceFile name is required' });
    if (replaceFile.includes('..') || replaceFile.includes('/') || replaceFile.includes('\\')) {
      return res.status(400).json({ message: 'Invalid filename' });
    }

    const oldPath = path.join(PUBLIC_DIR, replaceFile);
    const newPath = path.join(PUBLIC_DIR, replaceFile);

    if (fs.existsSync(oldPath) && replaceFile !== req.file.filename) {
      fs.unlinkSync(oldPath);
    }
    if (req.file.path !== newPath) {
      fs.renameSync(req.file.path, newPath);
    }

    res.json({
      message: `"${replaceFile}" replaced successfully`,
      file: {
        name:      replaceFile,
        url:       `/${replaceFile}`,
        size:      req.file.size,
        updatedAt: new Date().toISOString().split('T')[0],
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Replace failed', error: err.message });
  }
});

// ════════════════════════════════════════
// DELETE /api/admin/media/:filename
// Delete a file from public/
// ════════════════════════════════════════
router.delete('/:filename', protect, adminOnly, (req, res) => {
  try {
    const filename = decodeURIComponent(req.params.filename);
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return res.status(400).json({ message: 'Invalid filename' });
    }

    const filePath = path.join(PUBLIC_DIR, filename);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: `File "${filename}" not found` });
    }

    fs.unlinkSync(filePath);
    res.json({ message: `"${filename}" deleted successfully` });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
});

export default router;