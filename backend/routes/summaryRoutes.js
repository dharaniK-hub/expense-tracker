import express from 'express'
import { getSummary, getMonthlyExpenses, getCategorySpending } from '../controllers/summaryController.js'

const router = express.Router()

router.get('/', getSummary)
router.get('/monthly', getMonthlyExpenses)
router.get('/categories', getCategorySpending)

export default router
