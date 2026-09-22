import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

export default function AdminLogin() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    navigate("/admin", { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await login(email, password);
    setLoading(false);
    if (result.ok) {
      navigate("/admin", { replace: true });
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-brand-950 grain-overlay relative flex items-center justify-center px-5" data-testid="admin-login-page">
      <SEO title="Admin Login" path="/admin/login" />
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <img src="/logo.png" alt="Logo PT Kaltara Jaya Makmur" className="w-11 h-11 object-contain" />
          <div className="leading-tight">
            <p className="font-display font-bold text-white">Admin CMS</p>
            <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-brand-500">PT Kaltara Jaya Makmur</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8" data-testid="admin-login-form">
          <h1 className="font-display text-xl font-bold text-brand-950 mb-6">Masuk ke Dashboard</h1>
          {error && (
            <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3" data-testid="login-error">
              {error}
            </p>
          )}
          <div className="space-y-2">
            <Label htmlFor="admin-email">Email</Label>
            <Input id="admin-email" data-testid="admin-email-input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@perusahaan.co.id" />
          </div>
          <div className="space-y-2 mt-4">
            <Label htmlFor="admin-password">Password</Label>
            <Input id="admin-password" data-testid="admin-password-input" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          <Button
            type="submit"
            disabled={loading}
            data-testid="login-form-submit-button"
            className="w-full mt-6 bg-brand-600 hover:bg-brand-900 text-white font-semibold py-6 rounded-full transition-colors duration-300"
          >
            {loading ? "Memeriksa…" : "Masuk"}
          </Button>
        </form>
      </div>
    </div>
  );
}
