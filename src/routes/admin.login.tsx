import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useStore, login } from "@/lib/store";
import { toast } from "sonner";
import { ShieldCheck, Mail, ArrowRight, Lock, EyeOff } from "lucide-react";

export const Route = createFileRoute("/admin/login")({
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { currentUser } = useStore();

  // Redirect if already logged in as admin
  if (currentUser?.role === "admin") {
    router.navigate({ to: "/admin/dashboard" });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter email address.");
      return;
    }

    const success = login(email);
    if (success) {
      const user = useStore().currentUser;
      if (user?.role === "admin") {
        toast.success("Admin access granted. Opening Dashboard...");
        router.navigate({ to: "/admin/dashboard" });
      } else {
        toast.error("Account does not possess administrator permissions.");
      }
    } else {
      toast.error("Admin account not found. For testing, use the bypass login below.");
    }
  };

  const handleQuickBypass = () => {
    setEmail("admin@kilimanjaro.com");
    const success = login("admin@kilimanjaro.com");
    if (success) {
      toast.success("Admin dashboard access granted.");
      router.navigate({ to: "/admin/dashboard" });
    }
  };

  return (
    <div className="flex min-h-[75vh] items-center justify-center bg-zinc-950 py-12 px-6 relative overflow-hidden">
      {/* Decorative dark grid bg */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "radial-gradient(circle at 50% 50%, #ffffff 1px, transparent 1px)",
        backgroundSize: "20px 20px"
      }} />

      <div className="w-full max-w-md space-y-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl relative z-10 text-white">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex size-12 items-center justify-center rounded-full bg-zinc-800 text-brand mb-4">
            <ShieldCheck className="size-6" />
          </div>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-white">
            Gavel Console
          </h2>
          <p className="mt-2 text-xs text-zinc-400">
            Secure admin authentication portal. Authorized access only.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
              Admin Identity / Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                <Mail className="size-4" />
              </span>
              <input
                type="email"
                placeholder="admin@kilimanjaro.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 focus:border-brand focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
              Passkey
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
                <Lock className="size-4" />
              </span>
              <input
                type="password"
                value="••••••••"
                readOnly
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2.5 pl-10 pr-4 text-sm text-zinc-500 focus:outline-none"
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-600">
                <EyeOff className="size-4" />
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-white py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-100 shadow"
          >
            Access Dashboard <ArrowRight className="size-4" />
          </button>
        </form>

        {/* Demo Fast Login Buttons */}
        <div className="pt-6 border-t border-zinc-850 text-center">
          <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-500 mb-3">
            Testing Override
          </p>
          <button
            onClick={handleQuickBypass}
            className="w-full rounded-lg border border-zinc-850 bg-zinc-950 px-4 py-2.5 text-xs font-semibold text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white"
          >
            Bypass & Login as Admin
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-zinc-600 pt-2">
          Want to browse as user?{" "}
          <Link to="/auth/login" className="font-semibold text-zinc-400 hover:underline">
            Go to Buyer Sign-in
          </Link>
        </div>
      </div>
    </div>
  );
}
