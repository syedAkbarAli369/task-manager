

import express from 'express'

import { protect } from '../middlewares/authMiddleware.js'
import upload from '../middlewares/uploadMiddleware.js'

import { createTask, deleteTask, getTaskById, getTasks, updateTask, getMyTasks } from '../controllers/taskController.js'

const router = express.Router()

router.post('/', protect, upload.single('attachment'), createTask)
router.get('/', protect, getTasks)
router.get('/my', protect, getMyTasks)
router.get('/:id', protect, getTaskById)
router.put('/:id', protect, updateTask)
router.delete("/:id", protect, deleteTask)

export default router