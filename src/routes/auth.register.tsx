import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useStore, register } from "@/lib/store";
import { toast } from "sonner";
import { Mail, User, Shield, Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/auth/register")({
  component: RegisterPage,
});

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"buyer" | "admin">("buyer");
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
    if (!email || !name) {
      toast.error("Please fill in all fields.");
      return;
    }

    const success = register(email, name, role);
    if (success) {
      toast.success(`Account created successfully! Welcome to Kilimanjaro, ${name}.`);
      if (role === "admin") {
        router.navigate({ to: "/admin/dashboard" });
      } else {
        router.navigate({ to: "/" });
      }
    } else {
      toast.error("An account with this email already exists.");
    }
  };

  return (
    <div className="flex min-h-[75vh] items-center justify-center bg-zinc-50/50 py-12 px-6">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-zinc-950/5 bg-white p-8 shadow-sm">
        {/* Header */}
        <div className="text-center">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-brand">Floor Enrollment</span>
          <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight text-zinc-900">
            Create your account
          </h2>
          <p className="mt-2 text-xs text-zinc-500">
            Open a secure wallet-enabled bidder profile in less than 90 seconds.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
                <User className="size-4" />
              </span>
              <input
                type="text"
                placeholder="Adaeze Obi"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-zinc-950/10 bg-white py-2.5 pl-10 pr-4 text-sm ring-brand/10 transition-shadow focus:border-brand focus:outline-none focus:ring-4"
                required
              />
            </div>
          </div>

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

          <div>
            <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Floor Role</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole("buyer")}
                className={`rounded-lg border p-3 text-center transition-all ${role === "buyer"
                  ? "border-brand bg-brand/5 text-brand"
                  : "border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50"
                  }`}
              >
                <Sparkles className="mx-auto size-4 mb-1" />
                <span className="block text-xs font-semibold">Buyer / Bidder</span>
                <span className="block text-[9px] opacity-75 mt-0.5">Wallet Enabled</span>
              </button>

              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`rounded-lg border p-3 text-center transition-all ${role === "admin"
                  ? "border-zinc-800 bg-zinc-50 text-zinc-900"
                  : "border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50"
                  }`}
              >
                <Shield className="mx-auto size-4 mb-1" />
                <span className="block text-xs font-semibold">Admin Console</span>
                <span className="block text-[9px] opacity-75 mt-0.5">Manage Platform</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-zinc-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 shadow"
          >
            Create Account <ArrowRight className="size-4" />
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-xs text-zinc-500 pt-2">
          Already have an account?{" "}
          <Link to="/auth/login" className="font-semibold text-brand hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
