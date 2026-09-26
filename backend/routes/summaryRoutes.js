import express from "express";
import {
  categoryExpenses,
  getCategories,
  getSummary,
  monthlyExpenses,
} from "../controllers/summaryController.js";

const router = express.Router();

router.get("/summary", getSummary);
router.get("/expenses/monthly", monthlyExpenses);
router.get("/expenses/by-category", categoryExpenses);
router.get("/categories", getCategories);

export default router;
