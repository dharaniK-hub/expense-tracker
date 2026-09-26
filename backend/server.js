import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import expenseRoutes from "./routes/expenseRoutes.js";
import pool from "./config/database.js";
import summaryRoutes from "./routes/summaryRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/test", (_req, res) => {
  res.json({ message: "The backend server is running." });
});

app.use("/", summaryRoutes);
app.use("/expenses", expenseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

pool.getConnection()
  .then((connection) => {
    console.log("Successfully connected to TiDB Cloud (Pool Active)!");
    connection.release();
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
  });
