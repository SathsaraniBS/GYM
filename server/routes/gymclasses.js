// server/routes/gymClasses.js
import express from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// ── In-memory store (replace with MongoDB model later) ──
let classes = [
  { _id:'1', name:'Boxing HIIT',      trainer:'Ayesh Ranasinhe', branch:'Ja Ela',    date:'2026-05-29', time:'16:00', duration:'120', capacity:'40', booked:'33', type:'Boxing',   status:'Active',   description:'High-intensity boxing workout for all levels.'  },
  { _id:'2', name:'Boxing HIIT',      trainer:'Ayesh R.',        branch:'Colombo 7', date:'2025-05-27', time:'07:00', duration:'45',  capacity:'20', booked:'18', type:'Boxing',   status:'Active',   description:'High-intensity boxing workout for all levels.'  },
  { _id:'3', name:'Power Yoga Flow',  trainer:'Dulshan M.',      branch:'Ja Ela',    date:'2025-05-27', time:'18:30', duration:'60',  capacity:'15', booked:'12', type:'Yoga',     status:'Active',   description:'Dynamic yoga flow to improve flexibility.'      },
  { _id:'4', name:'Strength Circuit', trainer:'Thumesh A.',      branch:'Moors',     date:'2025-05-28', time:'08:00', duration:'50',  capacity:'20', booked:'8',  type:'Strength', status:'Upcoming', description:'Full body strength training circuit.'           },
  { _id:'5', name:'HIIT Cardio',      trainer:'Ayesh R.',        branch:'Colombo 7', date:'2025-05-28', time:'17:00', duration:'30',  capacity:'40', booked:'40', type:'HIIT',     status:'Full',     description:'High intensity interval cardio session.'        },
  { _id:'6', name:'Pilates Core',     trainer:'Nimali P.',       branch:'Moors',     date:'2025-05-29', time:'10:00', duration:'60',  capacity:'40', booked:'40', type:'Pilates',  status:'Full',     description:'Core strength and stability with pilates.'      },
  { _id:'7', name:'Active Recovery',  trainer:'Dulshan M.',      branch:'Ja Ela',    date:'2025-05-30', time:'09:00', duration:'40',  capacity:'20', booked:'5',  type:'Recovery', status:'Upcoming', description:'Gentle recovery session with stretching.'       },
  { _id:'8', name:'Beginner Strength',trainer:'Thumesh A.',      branch:'Moors',     date:'2025-05-31', time:'11:00', duration:'60',  capacity:'15', booked:'7',  type:'Strength', status:'Upcoming', description:'Strength training for beginners.'               },
];

// GET /api/admin/classes
router.get('/', protect, adminOnly, (req, res) => {
  res.json({ classes, total: classes.length });
});

// POST /api/admin/classes
router.post('/', protect, adminOnly, (req, res) => {
  const newClass = { _id: Date.now().toString(), ...req.body };
  classes.unshift(newClass);
  res.status(201).json({ class: newClass, message: 'Class created' });
});

// PUT /api/admin/classes/:id
router.put('/:id', protect, adminOnly, (req, res) => {
  const idx = classes.findIndex(c => c._id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Class not found' });
  classes[idx] = { ...classes[idx], ...req.body };
  res.json({ class: classes[idx], message: 'Class updated' });
});

// DELETE /api/admin/classes/:id
router.delete('/:id', protect, adminOnly, (req, res) => {
  const idx = classes.findIndex(c => c._id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Class not found' });
  classes.splice(idx, 1);
  res.json({ message: 'Class deleted' });
});

export default router;