import pool from "../config/database.js";

const buildFilters = (query) => {
  const conditions = [];
  const values = [];

  if (query.user_id) {
    conditions.push("e.user_id = ?");
    values.push(Number(query.user_id));
  }

  if (query.startDate) {
    conditions.push("e.date >= ?");
    values.push(query.startDate);
  }

  if (query.endDate) {
    conditions.push("e.date <= ?");
    values.push(query.endDate);
  }

  if (query.category) {
    const categoryId = Number(query.category);
    if (!Number.isInteger(categoryId) || categoryId < 1) {
      throw new Error("Invalid category");
    }
    conditions.push("e.category_id = ?");
    values.push(categoryId);
  }

  return {
    where: conditions.length ? `WHERE ${conditions.join(" AND ")}` : "",
    values,
  };
};

const getFilters = (req, res) => {
  try {
    return buildFilters(req.query);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
    return null;
  }
};

export const getSummary = async (req, res) => {
  const filters = getFilters(req, res);
  if (!filters) return;

  try {
    const [totals] = await pool.query(
      `SELECT COALESCE(SUM(e.amount), 0) AS totalExpenses FROM expenses e ${filters.where}`,
      filters.values
    );
    const [topCategories] = await pool.query(
      `SELECT e.category_id AS categoryId, COALESCE(c.name, "Uncategorized") AS name,
              SUM(e.amount) AS total
       FROM expenses e
       LEFT JOIN categories c ON c.id = e.category_id
       ${filters.where}
       GROUP BY e.category_id, c.name
       ORDER BY total DESC
       LIMIT 1`,
      filters.values
    );

    const totalExpenses = Number(totals[0].totalExpenses);
    const totalIncome = 0;
    res.json({
      success: true,
      data: {
        totalIncome,
        totalExpenses,
        balance: totalIncome - totalExpenses,
        highestSpendingCategory: topCategories[0] || null,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Unable to calculate summary" });
  }
};

export const monthlyExpenses = async (req, res) => {
  const filters = getFilters(req, res);
  if (!filters) return;

  try {
    const [monthlyData] = await pool.query(
      `SELECT DATE_FORMAT(e.date, "%Y-%m") AS period,
              DATE_FORMAT(e.date, "%b %Y") AS label,
              SUM(e.amount) AS total
       FROM expenses e
       ${filters.where}
       GROUP BY YEAR(e.date), MONTH(e.date), period, label
       ORDER BY YEAR(e.date), MONTH(e.date)`,
      filters.values
    );

    res.json({
      success: true,
      data: monthlyData.map((item) => ({ ...item, total: Number(item.total) })),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Unable to calculate monthly expenses" });
  }
};

export const categoryExpenses = async (req, res) => {
  const filters = getFilters(req, res);
  if (!filters) return;

  try {
    const [categoryData] = await pool.query(
      `SELECT e.category_id AS categoryId, COALESCE(c.name, "Uncategorized") AS name,
              SUM(e.amount) AS total
       FROM expenses e
       LEFT JOIN categories c ON c.id = e.category_id
       ${filters.where}
       GROUP BY e.category_id, c.name
       ORDER BY total DESC`,
      filters.values
    );

    res.json({
      success: true,
      data: categoryData.map((item) => ({ ...item, total: Number(item.total) })),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Unable to calculate category expenses" });
  }
};

export const getCategories = async (_req, res) => {
  try {
    const [categories] = await pool.query(
      "SELECT id, name FROM categories ORDER BY name"
    );
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: "Unable to load categories" });
  }
};
