import bcrypt from "bcryptjs";
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

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name?.trim() || !email?.trim() || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name.trim(), email.trim().toLowerCase(), hashedPassword]
    );

    res.status(201).json({ message: "Account created successfully!" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "Email already exists." });
    }

    console.error("Signup failed:", error.message);
    res.status(500).json({ error: "Database error during signup." });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email?.trim() || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const [users] = await pool.query(
      "SELECT id, name, email, password FROM users WHERE email = ?",
      [email.trim().toLowerCase()]
    );

    if (users.length === 0 || !(await bcrypt.compare(password, users[0].password))) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const user = users[0];
    res.json({
      message: "Login successful!",
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error("Login failed:", error.message);
    res.status(500).json({ error: "Database error during login." });
  }
});

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
