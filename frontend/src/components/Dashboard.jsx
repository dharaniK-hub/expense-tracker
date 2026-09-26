import { useCallback, useEffect, useState } from "react";
import {
  AlertCircle,
  BarChart3,
  CircleDollarSign,
  Filter,
  Tags,
} from "lucide-react";
import SummaryCard from "./SummaryCard";
import SpendingCharts from "./SpendingCharts";
import AppNav from "./AppNav";

const API_URL = "http://localhost:5000";

const emptyFilters = { startDate: "", endDate: "", category: "" };

const makeSearch = (filters) => {
  const params = new URLSearchParams();
  if (filters.startDate) params.set("startDate", filters.startDate);
  if (filters.endDate) params.set("endDate", filters.endDate);
  if (filters.category) params.set("category", filters.category);
  const query = params.toString();
  return query ? `?${query}` : "";
};

const Dashboard = () => {
  const [filters, setFilters] = useState(emptyFilters);
  const [appliedFilters, setAppliedFilters] = useState(emptyFilters);
  const [categories, setCategories] = useState([]);
  const [summary, setSummary] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/categories`);
        if (!response.ok) throw new Error();
        const payload = await response.json();
        setCategories(payload.data || []);
      } catch {
        setError("Categories could not be loaded for filtering.");
      }
    };
    loadCategories();
  }, []);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const search = makeSearch(appliedFilters);
      const [summaryResponse, monthlyResponse, categoryResponse] = await Promise.all([
        fetch(`${API_URL}/summary${search}`),
        fetch(`${API_URL}/expenses/monthly${search}`),
        fetch(`${API_URL}/expenses/by-category${search}`),
      ]);

      if (!summaryResponse.ok || !monthlyResponse.ok || !categoryResponse.ok) {
        throw new Error();
      }

      const [summaryPayload, monthlyPayload, categoryPayload] = await Promise.all([
        summaryResponse.json(),
        monthlyResponse.json(),
        categoryResponse.json(),
      ]);

      setSummary(summaryPayload.data);
      setMonthlyData(monthlyPayload.data || []);
      setCategoryData(categoryPayload.data || []);
    } catch {
      setError("Dashboard data could not be loaded. Confirm that the API is running.");
    } finally {
      setLoading(false);
    }
  }, [appliedFilters]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleFilterChange = (event) => {
    setFilters((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const applyFilters = (event) => {
    event.preventDefault();
    if (filters.startDate && filters.endDate && filters.startDate > filters.endDate) {
      setError("The start date must be before the end date.");
      return;
    }
    setAppliedFilters(filters);
  };

  const clearFilters = () => {
    setFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
  };

  const activeSummary = summary || {
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    highestSpendingCategory: null,
  };

  return (
    <div className="lc-app-shell">
      <AppNav />
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">Financial overview</p>
          <h1>Dashboard</h1>
          <p className="subtitle">A clear picture of your expenses and spending patterns.</p>
        </div>
        <BarChart3 className="header-icon" size={34} aria-hidden="true" />
      </header>

      <form className="filter-bar" onSubmit={applyFilters}>
        <Filter size={20} aria-hidden="true" />
        <label>
          <span>From</span>
          <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} />
        </label>
        <label>
          <span>To</span>
          <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} />
        </label>
        <label>
          <span>Category</span>
          <select name="category" value={filters.category} onChange={handleFilterChange}>
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </label>
        <button className="apply-button" type="submit">Apply</button>
        <button className="clear-button" type="button" onClick={clearFilters}>Clear</button>
      </form>

      {error && (
        <p className="error-message" role="alert">
          <AlertCircle size={18} /> {error}
        </p>
      )}

      <section className="summary-grid" aria-label="Financial summary">
        <SummaryCard title="Total income" amount={activeSummary.totalIncome} icon="income" />
        <SummaryCard title="Total expenses" amount={activeSummary.totalExpenses} icon="expense" />
        <SummaryCard title="Balance" amount={activeSummary.balance} icon="balance" />
      </section>

      <section className="analytics-layout">
        <SpendingCharts loading={loading} monthlyData={monthlyData} categoryData={categoryData} />
        <aside className="insight-card">
          <div className="panel-title">
            <div>
              <p className="eyebrow">Insight</p>
              <h2>Highest spending</h2>
            </div>
            <CircleDollarSign size={21} aria-hidden="true" />
          </div>
          {activeSummary.highestSpendingCategory ? (
            <>
              <strong>{activeSummary.highestSpendingCategory.name}</strong>
              <p>
                Rs. {Number(activeSummary.highestSpendingCategory.total).toLocaleString("en-LK", { minimumFractionDigits: 2 })}
                {" "}is your largest expense category in this view.
              </p>
            </>
          ) : (
            <p>Add expenses to see your highest spending category.</p>
          )}
          <Tags size={24} className="insight-icon" aria-hidden="true" />
        </aside>
      </section>
    </main>
    </div>
  );
};

export default Dashboard;
