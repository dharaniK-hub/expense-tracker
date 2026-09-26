import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CalendarDays, Tags } from "lucide-react";

const colors = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626", "#7c3aed", "#0891b2"];
const formatMoney = (value) =>
  `Rs. ${Number(value || 0).toLocaleString("en-LK", { maximumFractionDigits: 0 })}`;

const SpendingCharts = ({ loading, monthlyData, categoryData }) => (
  <div className="chart-stack">
    <article className="chart-panel">
      <div className="panel-title">
        <div>
          <p className="eyebrow">Trend</p>
          <h2>Monthly spending</h2>
        </div>
        <CalendarDays size={21} aria-hidden="true" />
      </div>
      <div className="chart-box">
        {loading ? <p>Loading monthly spending...</p> : monthlyData.length ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 10, right: 4, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#dce5ef" />
              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
              <Tooltip formatter={formatMoney} />
              <Bar dataKey="total" name="Expenses" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : <p>No expenses match these filters.</p>}
      </div>
    </article>

    <article className="chart-panel">
      <div className="panel-title">
        <div>
          <p className="eyebrow">Breakdown</p>
          <h2>Spending by category</h2>
        </div>
        <Tags size={21} aria-hidden="true" />
      </div>
      <div className="category-chart-layout">
        <div className="pie-box">
          {loading ? <p>Loading categories...</p> : categoryData.length ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} dataKey="total" nameKey="name" innerRadius={48} outerRadius={82} paddingAngle={3}>
                  {categoryData.map((entry, index) => (
                    <Cell key={entry.categoryId} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={formatMoney} />
              </PieChart>
            </ResponsiveContainer>
          ) : <p>No category data available.</p>}
        </div>
        <div className="category-legend">
          {categoryData.slice(0, 6).map((entry, index) => (
            <div key={entry.categoryId} className="legend-row">
              <span><i style={{ backgroundColor: colors[index % colors.length] }} />{entry.name}</span>
              <strong>{formatMoney(entry.total)}</strong>
            </div>
          ))}
        </div>
      </div>
    </article>
  </div>
);

export default SpendingCharts;
