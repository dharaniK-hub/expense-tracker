import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import pool from "./config/database.js";
import summaryRoutes from "./routes/summaryRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/test", (_req, res) => {
  res.json({ message: "The backend server is running." });
});

app.post("/expenses", async (req, res) => {
  const { amount, description, date, category_id: categoryId } = req.body;
  const numericAmount = Number(amount);
  const numericCategoryId = Number(categoryId);

  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({ error: "Please provide a valid positive amount." });
  }
  if (!description?.trim() || !date || !Number.isInteger(numericCategoryId)) {
    return res.status(400).json({ error: "Description, date, and category are required." });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO expenses (user_id, category_id, description, amount, date) VALUES (?, ?, ?, ?, ?)",
      [1, numericCategoryId, description.trim(), numericAmount, date]
    );
    res.status(201).json({
      message: "Expense saved successfully!",
      expenseId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to save expense to database." });
  }
});

app.use("/", summaryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
