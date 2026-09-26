import { CircleUserRound, LayoutDashboard } from "lucide-react";

const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("ledgercraft-user")) || null;
  } catch {
    return null;
  }
};

const AppNav = () => {
  const user = getUser();

  return (
    <header className="lc-app-nav">
      <a className="lc-brand" href="/">
        <span className="lc-brand-mark"><img src="/icons.svg" alt="" /></span>
        <span><strong>Ledger</strong>Craft<small>WEALTH INTELLIGENCE</small></span>
      </a>
      <nav aria-label="Primary navigation">
        <a href="/dashboard"><LayoutDashboard size={16} /> Dashboard</a>
        <a href="/profile" className="lc-profile-link" aria-label="Open your profile">
          <span className="lc-user-name">{user?.name || "Profile"}</span>
          <CircleUserRound size={22} />
        </a>
      </nav>
    </header>
  );
};

export default AppNav;
