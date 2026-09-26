import { House, LayoutDashboard, UserRound, WalletCards } from "lucide-react";
import Dashboard from "./components/Dashboard";
import Landing from "./components/Landing";
import Profile from "./components/Profile";

const routes = {
  "/": Landing,
  "/dashboard": Dashboard,
  "/profile": Profile,
};

function App() {
  const CurrentPage = routes[window.location.pathname] || Landing;

  return (
    <div className="app-shell">
      <header className="site-nav">
        <a className="brand" href="/">
          <WalletCards size={21} aria-hidden="true" />
          Ledgerly
        </a>
        <nav aria-label="Main navigation">
          {window.location.pathname !== "/" && (
            <a href="/" title="Home" aria-label="Home">
              <House size={17} aria-hidden="true" />
              Home
            </a>
          )}
          <a className={window.location.pathname === "/dashboard" ? "active" : ""} href="/dashboard">
            <LayoutDashboard size={17} aria-hidden="true" />
            Dashboard
          </a>
          <a className={window.location.pathname === "/profile" ? "active" : ""} href="/profile">
            <UserRound size={17} aria-hidden="true" />
            Profile
          </a>
        </nav>
      </header>
      <CurrentPage />
    </div>
  );
}

export default App;
