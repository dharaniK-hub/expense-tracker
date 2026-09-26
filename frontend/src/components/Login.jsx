import { Eye, EyeOff, KeyRound, UserRound } from "lucide-react";
import { useState } from "react";

const API_URL = "http://localhost:5000";

export default function AuthPage() {
  const [mode, setMode] = useState(window.location.pathname === "/forgot-password" ? "forgot" : window.location.pathname === "/signup" ? "signup" : "signin");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isLogin = mode === "signin";
  const isRecovery = mode === "forgot";

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setMessage("");
    setShowPassword(false);
  };

  const handleChange = (event) => {
    setMessage('');
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isLogin && !isRecovery && form.password !== form.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (isRecovery) {
      setMessage("Password recovery is not configured yet. Contact support to reset your password.");
      return;
    }

    setSubmitting(true);
    setMessage('');

    try {
      const response = await fetch(`${API_URL}/${isLogin ? 'login' : 'signup'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isLogin
          ? { email: form.email, password: form.password }
          : { name: form.name, email: form.email, password: form.password })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed.');
      }

      setMessage(data.message);
      if (isLogin) {
        localStorage.setItem("ledgercraft-user", JSON.stringify(data.user));
        const currentProfile = JSON.parse(localStorage.getItem("expense-tracker-profile") || "{}");
        localStorage.setItem("expense-tracker-profile", JSON.stringify({ ...currentProfile, ...data.user }));
        window.location.assign("/home");
      } else {
        setForm({ name: '', email: '', password: '', confirmPassword: '' });
        window.location.assign("/login");
      }
    } catch (error) {
      setMessage(error.message || 'Unable to connect to the backend.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="lc-auth min-h-screen relative overflow-hidden flex flex-col justify-between text-white">
      <div className="absolute top-24 right-12 md:right-32 w-32 h-32 bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl flex items-center justify-center transform rotate-6 hover:rotate-12 transition-transform duration-500">
        <img className="h-full w-full rounded-2xl object-cover" src="/money.png" alt="Money and cryptocurrency" />
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 left-8 md:left-24 w-32 h-32 bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl flex items-center justify-center transform -rotate-6 hover:-rotate-12 transition-transform duration-500">
        <img className="h-full w-full rounded-2xl object-cover" src="/food.png" alt="Burger and coffee" />
      </div>

      <div className="absolute bottom-24 right-20 md:right-48 w-32 h-32 bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl flex items-center justify-center transform rotate-12 hover:rotate-6 transition-transform duration-500">
        <img className="h-full w-full rounded-2xl object-cover" src="/transport.png" alt="Futuristic blue car" />
      </div>

      <nav className="relative z-20 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-2 text-xl font-bold tracking-wide">
          <span className="text-cyan-300">📈</span> LedgerCraft
        </div>
        <a href="/profile" aria-label="Open your profile" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors"><UserRound size={20} /></a>
      </nav>

      <main className="relative z-20 flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 border-t-white/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold mb-2 drop-shadow-md">
              {isLogin ? 'Welcome back' : isRecovery ? 'Reset your password' : 'Create your account'}
            </h2>
            <p className="text-blue-100/80 text-sm">
              {isLogin ? 'Log in to manage your budget and expenses' : isRecovery ? 'Enter your email to start account recovery' : 'Start tracking expenses with clarity'}
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {!isLogin && !isRecovery && (
              <div>
                <label className="block text-xs font-bold text-blue-200 uppercase tracking-wide mb-1">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Doe" 
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                />
              </div>
            )}
            
            <div>
              <label className="block text-xs font-bold text-blue-200 uppercase tracking-wide mb-1">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="alex@example.com"
                required
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
              />
            </div>

            {!isRecovery && <div>
              <label className="block text-xs font-bold text-blue-200 uppercase tracking-wide mb-1">Password</label>
              <div className="password-field"><input type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={handleChange} placeholder="••••••••" required className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all" /><button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>
            </div>}

            {!isLogin && !isRecovery && <div>
              <label className="block text-xs font-bold text-blue-200 uppercase tracking-wide mb-1">Confirm password</label>
              <div className="password-field"><input type={showPassword ? "text" : "password"} name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Repeat your password" required className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all" /><button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide confirmed password" : "Show confirmed password"}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>
            </div>}

            {isLogin && (
              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded bg-black/20 border-white/20 text-cyan-500 focus:ring-cyan-500" />
                  <span className="text-blue-100">Remember me</span>
                </label>
                <button type="button" onClick={() => window.location.assign("/forgot-password")} className="text-cyan-300 font-medium hover:text-cyan-100">Forgot password?</button>
              </div>
            )}

            <button type="submit" disabled={submitting} className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-white font-extrabold rounded-xl px-4 py-4 shadow-lg shadow-cyan-500/30 transform hover:-translate-y-0.5 transition-all mt-4 disabled:cursor-wait disabled:opacity-70">
              {submitting ? 'Please wait...' : isLogin ? 'Sign In →' : isRecovery ? <><KeyRound size={17} /> Continue</> : 'Create Account →'}
            </button>
          </form>

          {message && <p className="mt-4 text-center text-sm font-semibold text-blue-100">{message}</p>}

          {!isRecovery && <div className="mt-8 text-center">
            <p className="text-sm text-blue-100">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button type="button" onClick={() => window.location.assign(isLogin ? "/signup" : "/login")} className="text-cyan-300 font-bold hover:underline">
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>}
        </div>
      </main>

      <footer className="relative z-20 flex flex-col md:flex-row items-center justify-between px-8 py-6 text-xs text-blue-200/70 font-medium">
        <div className="flex gap-4 mb-4 md:mb-0">
          <button className="hover:text-white transition-colors">Terms of Service</button>
          <span>•</span>
          <button className="hover:text-white transition-colors">Privacy Policy</button>
          <span>•</span>
          <button className="hover:text-white transition-colors">Security</button>
        </div>
        <div>
          © 2026 LedgerCraft Financial Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
