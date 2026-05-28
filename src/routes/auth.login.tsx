import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useStore, login } from "@/lib/store";
import { toast } from "sonner";
import { Mail, Sparkles, ArrowRight, UserCheck, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { currentUser } = useStore();

  // Redirect if already logged in
  if (currentUser) {
    if (currentUser.role === "admin") {
      router.navigate({ to: "/admin/dashboard" });
    } else {
      router.navigate({ to: "/" });
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter an email address.");
      return;
    }

    const success = login(email);
    if (success) {
      const user = useStore().currentUser;
      toast.success(`Welcome back, ${user?.name || "User"}!`);
      if (user?.role === "admin") {
        router.navigate({ to: "/admin/dashboard" });
      } else {
        router.navigate({ to: "/" });
      }
    } else {
      toast.error("Account not found. For testing, use a demo account below or register.");
    }
  };

  const handleQuickLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    const success = login(demoEmail);
    if (success) {
      const user = useStore().currentUser;
      toast.success(`Logged in as ${user?.name} (${user?.role})`);
      if (user?.role === "admin") {
        router.navigate({ to: "/admin/dashboard" });
      } else {
        router.navigate({ to: "/" });
      }
    }
  };

  return (
    <div className="flex min-h-[75vh] items-center justify-center bg-zinc-50/50 py-12 px-6">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-zinc-950/5 bg-white p-8 shadow-sm">
        {/* Header */}
        <div className="text-center">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-brand">Secure Access</span>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight text-zinc-900">
            Sign in to Kilimanjaro
          </h2>
          <p className="mt-2 text-xs text-zinc-500">
            Enter your credentials or select a demo role below to begin bidding.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                <Mail className="size-4" />
              </span>
              <input
                type="email"
                placeholder="you@kilimanjaro.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-zinc-950/10 bg-white py-2.5 pl-10 pr-4 text-sm ring-brand/10 transition-shadow focus:border-brand focus:outline-none focus:ring-4"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-zinc-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 shadow"
          >
            Continue <ArrowRight className="size-4" />
          </button>
        </form>

        {/* Demo Fast Login Buttons */}
        <div className="pt-6 border-t border-zinc-950/5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 text-center mb-3">
            Testing Quick Roles
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleQuickLogin("buyer@kilimanjaro.com")}
              className="flex flex-col items-center gap-1.5 rounded-lg border border-zinc-200 bg-white p-3 hover:bg-zinc-50 transition-colors text-left"
            >
              <UserCheck className="size-5 text-brand" />
              <div className="text-center">
                <p className="text-xs font-semibold text-zinc-800">Adaeze O.</p>
                <p className="text-[9px] text-zinc-400">Buyer Profile</p>
              </div>
            </button>

            <button
              onClick={() => handleQuickLogin("admin@kilimanjaro.com")}
              className="flex flex-col items-center gap-1.5 rounded-lg border border-zinc-200 bg-white p-3 hover:bg-zinc-50 transition-colors text-left"
            >
              <ShieldAlert className="size-5 text-zinc-800" />
              <div className="text-center">
                <p className="text-xs font-semibold text-zinc-800">Admin Console</p>
                <p className="text-[9px] text-zinc-400">Manage Listings</p>
              </div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-zinc-500 pt-2">
          New to Kilimanjaro?{" "}
          <Link to="/auth/register" className="font-semibold text-brand hover:underline">
            Register a new account
          </Link>
        </div>
      </div>
    </div>
  );
}
