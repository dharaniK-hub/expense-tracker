import { useEffect, useState } from "react";
import { BarChart3, CircleUserRound, FileText, Plus, ReceiptText, ShieldCheck } from "lucide-react";

const API_URL = "http://localhost:5000";
const fallbackCategories = [
  { id: 1, name: "Food & Dining" },
  { id: 2, name: "Transportation" },
  { id: 3, name: "Entertainment" },
  { id: 4, name: "Rent & Bills" },
  { id: 5, name: "Other" },
];

const Landing = ({ showExpenseForm = false }) => {
  const [userName] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ledgercraft-user"))?.name || "there";
    } catch {
      return "there";
    }
  });
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
    fetch(`${API_URL}/categories`)
      .then((response) => response.json())
      .then((payload) => {
        if (payload.data?.length) setCategories(payload.data);
      })
      .catch(() => {});
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
      setMessage("Expense added to your ledger.");
      setExpense((current) => ({ ...current, amount: "", description: "" }));
    } catch (error) {
      setMessage(error.message || "Unable to connect to the expense service.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="lc-landing">
      <div className="lc-noise" />
      <nav className="lc-nav">
        <a className="lc-brand" href="/">
          <span className="lc-brand-mark"><img src="/icons.svg" alt="" /></span>
          <span><strong>Ledger</strong>Craft<small>WEALTH INTELLIGENCE</small></span>
        </a>
        {showExpenseForm && <div className="lc-nav-links">
          <a className="active" href="/">Overview</a>
          <a href="/dashboard">Analytics</a>
          <a href="/dashboard">Categories</a>
          <a href="/profile">Security</a>
        </div>}
        <div className="lc-nav-actions">{showExpenseForm ? <><span className="lc-greeting">Hi, {userName}</span><a className="lc-nav-cta" href="/dashboard">Open dashboard <span>→</span></a></> : <a href="/login">Sign In</a>}<a className="lc-profile-icon" href="/profile" aria-label="Open your profile"><CircleUserRound size={20} /></a></div>
      </nav>

      <section className={`lc-hero ${showExpenseForm ? "" : "lc-hero-public"}`}>
        <div className="lc-hero-copy">
          <p className="lc-kicker"><i /> PERSONAL FINANCE, MADE CLEAR</p>
          <h1>Know where every <em>rupee</em> goes.</h1>
          <p className="lc-hero-text">Record an expense here, then use the dashboard to understand the spending patterns and wealth velocity behind it.</p>
          <div className="lc-hero-actions"><a className="lc-primary" href={showExpenseForm ? "/dashboard" : "/login"}><BarChart3 size={16} /> {showExpenseForm ? "Open Dashboard" : "Sign in to begin"}</a>{showExpenseForm && <a className="lc-secondary" href="/profile"><CircleUserRound size={16} /> Profile &amp; Budgets</a>}</div>
          <div className="lc-proof"><span><b>●</b> ₹3.8M+ <small>Tracked this month</small></span><span><b>●</b> 99.9% <small>Real-time Sync</small></span><span><b>●</b> Bank-grade <small>256-bit Security</small></span></div>
        </div>

        {showExpenseForm && <form className="lc-entry-card" onSubmit={addExpense}>
          <div className="lc-card-top"><div><p className="lc-kicker">NEW ENTRY</p><h2>Add an expense</h2></div><FileText size={21} /></div>
          <label><span>AMOUNT (₹)</span><input type="number" min="0.01" step="0.01" name="amount" value={expense.amount} onChange={updateExpense} placeholder="0.00" required /></label>
          <label><span>DESCRIPTION</span><input name="description" value={expense.description} onChange={updateExpense} placeholder="What did you spend on?" required /></label>
          <div className="lc-entry-row"><label><span>DATE</span><input type="date" name="date" value={expense.date} onChange={updateExpense} required /></label><label><span>CATEGORY</span><select name="category_id" value={expense.category_id} onChange={updateExpense}>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label></div>
          <div className="lc-quick"><span>Quick:</span><button type="button" onClick={() => setExpense((current) => ({ ...current, description: "Coffee" }))}>☕ Coffee</button><button type="button" onClick={() => setExpense((current) => ({ ...current, description: "Transport" }))}>🚕 Cab</button><button type="button" onClick={() => setExpense((current) => ({ ...current, description: "Electricity" }))}>⚡ Power</button></div>
          {message && <p className="lc-form-message">{message}</p>}
          <button className="lc-submit" type="submit" disabled={saving}><Plus size={17} /> {saving ? "Adding..." : "Add expense"}</button>
          <p className="lc-secure">◉ Auto-categorized &amp; instantly aggregated in your analytics</p>
        </form>}
      </section>

      <section className="lc-features"><article><span><ReceiptText size={19} /></span><h3>Record expenses</h3><p>Keep everyday purchases and their categories in one orderly place. Real-time capture with smart receipts and instant tagging.</p></article><article><span><BarChart3 size={19} /></span><h3>See the patterns</h3><p>Monthly and category charts make spending trends easy to spot. Identify recurring leaks, seasonal habits, and savings opportunities.</p></article><article><span><ShieldCheck size={19} /></span><h3>Stay in control</h3><p>Use a personal profile and budget preference to keep context close. Receive alerts before crossing thresholds and safeguard goals.</p></article></section>
      <footer className="lc-footer"><span>● © 2026 LedgerCraft Systems Inc. All rights reserved.</span><span>Privacy Policy　 Terms of Service　 Security Architecture　 |　 Made for mindful spenders</span></footer>
    </main>
  );
};

export default Landing;
