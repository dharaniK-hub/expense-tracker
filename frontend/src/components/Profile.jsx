import { useEffect, useState } from "react";
import { CircleUserRound, Mail, Save, Wallet, ArrowLeft, LogOut } from "lucide-react";
import AppNav from "./AppNav";

const defaultProfile = {
  name: "",
  email: "",
  currency: "LKR",
  monthlyBudget: "",
};

const Profile = () => {
  const [profile, setProfile] = useState(defaultProfile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const signedInUser = JSON.parse(localStorage.getItem("ledgercraft-user") || "null");
    const storedProfile = localStorage.getItem("expense-tracker-profile");
    const savedProfile = storedProfile ? JSON.parse(storedProfile) : {};
    setProfile({ ...defaultProfile, ...savedProfile, ...(signedInUser || {}) });
  }, []);

  const updateProfile = (event) => {
    setSaved(false);
    setProfile((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const saveProfile = (event) => {
    event.preventDefault();
    localStorage.setItem("expense-tracker-profile", JSON.stringify(profile));
    setSaved(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("ledgercraft-user");
    window.location.assign("/");
  };

  return (
    <div className="lc-app-shell">
      <AppNav />
    <main className="profile-page">
      <header className="profile-heading">
        <div>
          <a href="/dashboard" aria-label="Go back" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#64748b', textDecoration: 'none', fontSize: '13px', marginBottom: '16px', fontWeight: 'bold' }}><ArrowLeft size={16} /> Back to Dashboard</a>
          <p className="eyebrow">Account</p>
          <h1>Your profile</h1>
          <p>Set the details that personalize your expense tracking experience.</p>
        </div>
        <CircleUserRound size={36} aria-hidden="true" />
      </header>

      <form className="profile-form" onSubmit={saveProfile}>
        <section>
          <h2>Personal details</h2>
          <div className="profile-fields">
            <label>
              <span>Display name</span>
              <input name="name" value={profile.name} onChange={updateProfile} placeholder="Your name" />
            </label>
            <label>
              <span>Email address</span>
              <div className="input-with-icon">
                <Mail size={17} aria-hidden="true" />
                <input type="email" name="email" value={profile.email} onChange={updateProfile} placeholder="name@example.com" />
              </div>
            </label>
          </div>
        </section>

        <section>
          <h2>Preferences</h2>
          <div className="profile-fields">
            <label>
              <span>Currency</span>
              <select name="currency" value={profile.currency} onChange={updateProfile}>
                <option value="LKR">LKR - Sri Lankan Rupee</option>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
              </select>
            </label>
            <label>
              <span>Monthly budget</span>
              <div className="input-with-icon">
                <Wallet size={17} aria-hidden="true" />
                <input type="number" min="0" name="monthlyBudget" value={profile.monthlyBudget} onChange={updateProfile} placeholder="0.00" />
              </div>
            </label>
          </div>
        </section>

        <footer className="profile-actions">
          {saved && <span className="saved-message">Profile saved.</span>}
          <button type="button" onClick={handleLogout} style={{ background: 'transparent', border: '1px solid rgba(220, 38, 38, 0.4)', color: '#ef4444' }}><LogOut size={17} aria-hidden="true" /> Log out</button>
          <button type="submit"><Save size={17} aria-hidden="true" /> Save profile</button>
        </footer>
      </form>
    </main>
    </div>
  );
};

export default Profile;
