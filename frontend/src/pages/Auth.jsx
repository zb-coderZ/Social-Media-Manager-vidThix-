import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { useToast } from "../context/ToastContext";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, login, register } = useApp();
  const { error } = useToast();
  const [isRegistering, setIsRegistering] = useState(
    new URLSearchParams(location.search).get("mode") === "register",
  );
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const submit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await (isRegistering
        ? register(form)
        : login({ email: form.email, password: form.password }));
      navigate("/dashboard", { replace: true });
    } catch (requestError) {
      error(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 dark:bg-slate-950 bg-slate-50">
      <form
        onSubmit={submit}
        className="w-full max-w-md p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-card space-y-5"
      >
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {isRegistering ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Use your vidThix account to access the dashboard.
          </p>
        </div>
        {isRegistering && (
          <input
            required
            minLength={2}
            placeholder="Full name"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-colors duration-150"
          />
        )}
        <input
          required
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-colors duration-150"
        />
        <input
          required
          minLength={6}
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(event) =>
            setForm({ ...form, password: event.target.value })
          }
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-colors duration-150"
        />
        <button
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-brand-600 to-accent-500 text-white font-medium rounded-xl px-4 py-3 shadow-sm hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] transition-all duration-150 disabled:opacity-50"
        >
          {isSubmitting
            ? "Submitting..."
            : isRegistering
              ? "Create account"
              : "Log in"}
        </button>
        <button
          type="button"
          onClick={() => setIsRegistering(!isRegistering)}
          className="w-full text-sm text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors duration-150"
        >
          {isRegistering
            ? "Already have an account? Log in"
            : "Need an account? Register"}
        </button>
      </form>
    </main>
  );
};

export default Auth;
