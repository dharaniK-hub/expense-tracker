import { useEffect, useState } from "react";
import { ArrowRight, BarChart3, CircleUserRound, Plus, ReceiptText, ShieldCheck } from "lucide-react";

const API_URL = "http://localhost:5000";
const fallbackCategories = [
  { id: 1, name: "Food" },
  { id: 2, name: "Transportation" },
  { id: 3, name: "Shopping" },
  { id: 4, name: "Entertainment" },
  { id: 5, name: "Utilities" },
  { id: 8, name: "Other" },
];

const Landing = () => {
  const [categories, setCategories] = useState(fallbackCategories);
  const [expense, setExpense] = useState({
    amount: "",
    description: "",
    date: new Date().toISOString().slice(0, 10),
    category_id: "1",
  });
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/categories`);
        if (!response.ok) return;
        const payload = await response.json();
        if (payload.data?.length) setCategories(payload.data);
      } catch {
        // The form keeps its useful default categories when the API is offline.
      }
    };
    loadCategories();
  }, []);

  const updateExpense = (event) => {
    setMessage("");
    setExpense((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const addExpense = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/expenses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expense),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Unable to save expense.");

      setMessage("Expense added successfully.");
      setExpense((current) => ({ ...current, amount: "", description: "" }));
    } catch (error) {
      setMessage(error.message || "Unable to connect to the expense service.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="landing">
      <section className="landing-hero">
        <div className="hero-copy">
          <p className="eyebrow">Personal finance, made clear</p>
          <h1>Know where every rupee goes.</h1>
          <p className="hero-text">
            Record an expense here, then use the dashboard to understand the spending patterns behind it.
          </p>
          <div className="hero-actions">
            <a className="primary-link" href="/dashboard">
              <BarChart3 size={18} aria-hidden="true" /> Dashboard
            </a>
            <a className="secondary-link" href="/profile">
              <CircleUserRound size={18} aria-hidden="true" /> Profile
            </a>
          </div>
        </div>

        <form className="quick-expense-form" onSubmit={addExpense}>
          <div className="quick-form-heading">
            <div>
              <p className="eyebrow">New entry</p>
              <h2>Add an expense</h2>
            </div>
            <ReceiptText size={22} aria-hidden="true" />
          </div>
          <label>
            <span>Amount</span>
            <input type="number" min="0.01" step="0.01" name="amount" value={expense.amount} onChange={updateExpense} placeholder="0.00" required />
          </label>
          <label>
            <span>Description</span>
            <input name="description" value={expense.description} onChange={updateExpense} placeholder="What did you spend on?" required />
          </label>
          <div className="quick-form-row">
            <label>
              <span>Date</span>
              <input type="date" name="date" value={expense.date} onChange={updateExpense} required />
            </label>
            <label>
              <span>Category</span>
              <select name="category_id" value={expense.category_id} onChange={updateExpense}>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </label>
          </div>
          {message && <p className="quick-form-message">{message}</p>}
          <button type="submit" disabled={saving}>
            <Plus size={17} aria-hidden="true" /> {saving ? "Adding..." : "Add expense"}
          </button>
        </form>
      </section>

      <section className="landing-features">
        <article>
          <ReceiptText size={24} aria-hidden="true" />
          <h2>Record expenses</h2>
          <p>Keep everyday purchases and their categories in one orderly place.</p>
        </article>
        <article>
          <BarChart3 size={24} aria-hidden="true" />
          <h2>See the patterns</h2>
          <p>Monthly and category charts make spending trends easy to spot.</p>
        </article>
        <article>
          <ShieldCheck size={24} aria-hidden="true" />
          <h2>Stay in control</h2>
          <p>Use a personal profile and budget preference to keep context close.</p>
        </article>
      </section>
    </main>
  );
};

export default Landing;
