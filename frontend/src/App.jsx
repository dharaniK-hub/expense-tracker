import Dashboard from "./components/Dashboard";

function App() {
  if (window.location.pathname === "/dashboard") {
    return <Dashboard />;
  }

  return (
    <main className="route-entry">
      <p className="eyebrow">Expense tracker</p>
      <h1>Personal expense tracker</h1>
      <p>Manage expenses, then review spending analytics from the dashboard.</p>
      <a href="/dashboard">Open dashboard</a>
    </main>
  );
}

export default App;
