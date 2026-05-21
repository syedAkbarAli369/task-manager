

import express from 'express'
import { adminOnly, protect } from '../middlewares/authMiddleware.js'
import { deleteUser, getUserById, getUsers, getTeamMembers } from '../controllers/userController.js'

const router = express.Router()

// User management Routes
router.get('/', protect, adminOnly, getUsers)
router.get('/team', protect, getTeamMembers)
router.get('/:id', protect, getUserById)
router.delete('/:id', protect, adminOnly, deleteUser)

export default router