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
    <main className="min-h-screen flex items-center justify-center p-4 dark:bg-navy-950 bg-gray-50">
      <form
        onSubmit={submit}
        className="w-full max-w-md p-8 rounded-2xl bg-white dark:bg-navy-800 border border-gray-200 dark:border-indigo-600/30 shadow-xl space-y-5"
      >
        <div>
          <h1 className="text-3xl font-bold dark:text-white text-gray-900">
            {isRegistering ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-2 dark:text-gray-400 text-gray-600">
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
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:bg-navy-900 dark:border-navy-700 dark:text-white"
          />
        )}
        <input
          required
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:bg-navy-900 dark:border-navy-700 dark:text-white"
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
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:bg-navy-900 dark:border-navy-700 dark:text-white"
        />
        <button
          disabled={isSubmitting}
          className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold disabled:opacity-50"
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
          className="w-full text-sm text-indigo-600 dark:text-cyan-400"
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
