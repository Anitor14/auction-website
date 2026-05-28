import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useStore, logout } from "@/lib/store";
import { Wallet, ShoppingCart, User, LogOut, LayoutDashboard, LogIn, Sparkles } from "lucide-react";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kilimanjaro — Cross-Border Auction Marketplace" },
      { name: "description", content: "Lagos to London cross-border live bidding engine with escrow settlement." },
      { name: "author", content: "Kilimanjaro" },
      { property: "og:title", content: "Kilimanjaro — Bid & Buy" },
      { property: "og:description", content: "Connecting West African capital with European secondary markets." },
      { property: "og:type", content: "website" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { currentUser, cart, bids, products } = useStore();
  const location = useLocation();
  const router = useRouter();

  // Handle logout
  const handleLogout = () => {
    logout();
    router.navigate({ to: "/" });
  };

  // Compile ticker notifications dynamically
  const tickerItems = [
    "LAGOS: 2022 TOYOTA PRADO — CURRENT BID ₦42,500,000",
    "LONDON: ROLEX DATEJUST 41 — CURRENT BID £9,200",
    "ABUJA: LUXURY PENTHOUSE GWARINPA — STARTS IN 2H",
    "BERLIN: HASSELBLAD 907X — CURRENT BID €4,800",
    ...bids.slice(-3).map(b => {
      const prod = products.find(p => p.id === b.productId);
      return `LIVE BID: ${prod?.title || "Lot"} is at ₦${b.amount.toLocaleString()} by ${b.userName}`;
    })
  ];

  const hideTicker = ["/auth/login", "/auth/register", "/admin/login"].includes(location.pathname);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-surface font-sans text-ink selection:bg-brand/10 selection:text-brand flex flex-col">
        {/* Live Ticker */}
        {!hideTicker && (
          <div className="overflow-hidden border-b border-zinc-950/5 bg-zinc-900 py-2">
            <div className="flex whitespace-nowrap animate-ticker">
              {[0, 1].map((dup) => (
                <div key={dup} className="flex items-center gap-12 pr-12 shrink-0">
                  {tickerItems.map((item, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-2 text-[11px] font-medium tracking-tight text-zinc-400"
                    >
                      <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse-bid" /> {item}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Global Navigation */}
        <nav className="sticky top-0 z-50 border-b border-zinc-950/5 bg-surface/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-8">
              <Link to="/" className="font-display text-2xl font-semibold tracking-tighter text-ink hover:text-brand transition-colors">
                KILIMANJARO
              </Link>
              <div className="hidden items-center gap-6 sm:flex">
                <Link to="/products" className="text-sm font-medium text-zinc-500 transition-colors hover:text-ink">
                  Browse Catalog
                </Link>
                <a href="/#how" className="text-sm font-medium text-zinc-500 transition-colors hover:text-ink">
                  How It Works
                </a>
                <a href="/#pricing" className="text-sm font-medium text-zinc-500 transition-colors hover:text-ink">
                  Pricing
                </a>
              </div>
            </div>

            {/* Authentication & User controls */}
            <div className="flex items-center gap-4">
              {currentUser ? (
                <div className="flex items-center gap-4">
                  {/* Admin dashboard link */}
                  {currentUser.role === "admin" && (
                    <Link
                      to="/admin/dashboard"
                      className="flex items-center gap-1 rounded-full bg-zinc-900 px-3.5 py-1.5 text-xs font-medium text-white transition-all hover:bg-zinc-800"
                    >
                      <LayoutDashboard className="size-3.5" />
                      Admin Panel
                    </Link>
                  )}

                  {/* Wallet indicator */}
                  {currentUser.role === "buyer" && (
                    <Link
                      to="/transactions"
                      className="flex items-center gap-2 rounded-full border border-zinc-950/10 bg-white px-3.5 py-1.5 text-xs font-semibold text-zinc-700 shadow-sm transition-all hover:bg-zinc-50"
                    >
                      <Wallet className="size-3.5 text-brand" />
                      <span>₦{currentUser.walletBalance.toLocaleString()}</span>
                    </Link>
                  )}

                  {/* Cart Widget */}
                  {currentUser.role === "buyer" && (
                    <Link
                      to="/cart"
                      className="relative flex size-9 items-center justify-center rounded-full border border-zinc-950/10 bg-white text-zinc-700 shadow-sm hover:bg-zinc-50"
                    >
                      <ShoppingCart className="size-4" />
                      {cart.length > 0 && (
                        <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white ring-2 ring-white">
                          {cart.reduce((sum, item) => sum + item.quantity, 0)}
                        </span>
                      )}
                    </Link>
                  )}

                  {/* Profile Menu & Sign out */}
                  <div className="flex items-center gap-3">
                    <span className="hidden text-xs font-medium text-zinc-500 md:inline">
                      {currentUser.name}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="flex size-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors hover:bg-red-50 hover:text-red-600"
                      title="Log out"
                    >
                      <LogOut className="size-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/auth/login"
                    className="flex items-center gap-1.5 text-sm font-medium text-zinc-600 px-4 py-2 hover:text-ink transition-colors"
                  >
                    <LogIn className="size-4" />
                    Sign in
                  </Link>
                  <Link
                    to="/auth/register"
                    className="flex items-center gap-1.5 rounded-full bg-brand px-5 py-2 text-sm font-medium text-white transition-transform active:scale-95 hover:bg-brand/90"
                  >
                    <Sparkles className="size-4" />
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="flex-1">
          <Outlet />
        </main>

        {/* Global Footer */}
        <footer className="border-t border-zinc-950/5 bg-white py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
              <div className="col-span-2 space-y-4">
                <span className="font-display text-2xl font-semibold tracking-tighter">KILIMANJARO</span>
                <p className="text-sm text-zinc-500 max-w-xs">
                  A hybrid African marketplace combining instant commerce with competitive auction-driven pricing. Connecting capital between Lagos, London, and Frankfurt.
                </p>
              </div>
              {([
                ["Platform", [
                  { label: "Live Auctions", path: "/products" },
                  { label: "Buy It Now", path: "/products" },
                  { label: "Pricing Model", path: "/#pricing" }
                ]],
                ["Trust & Escrow", [
                  { label: "KYC Verification", path: "/#how" },
                  { label: "Escrow Custody", path: "/#how" },
                  { label: "Anti-shill Engine", path: "/#how" }
                ]],
                ["Corporate", [
                  { label: "About Us", path: "/" },
                  { label: "Admin Access", path: "/admin/login" },
                  { label: "Transaction Logs", path: "/transactions" }
                ]],
              ] as [string, { label: string; path: string }[]][]).map(([title, links]) => (
                <div key={title} className="flex flex-col gap-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">{title}</span>
                  {links.map((l) => (
                    <Link key={l.label} to={l.path as any} className="text-sm text-zinc-600 hover:text-brand transition-colors">
                      {l.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
            <div className="mt-16 pt-8 border-t border-zinc-950/5 flex flex-col sm:flex-row justify-between gap-4">
              <p className="text-xs text-zinc-400">© 2025 Kilimanjaro Bids Ltd. Lagos · London · Berlin.</p>
              <p className="text-xs text-zinc-400">Regulated · PCI-DSS · GDPR compliant</p>
            </div>
          </div>
        </footer>
      </div>
    </QueryClientProvider>
  );
}

