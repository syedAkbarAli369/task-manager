

import express from 'express'

import { protect, adminOnly } from '../middlewares/authMiddleware.js'

import { getDashboardReport } from '../controllers/reportController.js'

const router = express.Router()

router.get('/dashboard', protect, adminOnly, getDashboardReport)

export default router