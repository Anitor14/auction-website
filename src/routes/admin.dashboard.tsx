import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useStore, startAuctionNow, endAuctionEarly, updateEscrowStatus, resetStore } from "@/lib/store";
import { toast } from "sonner";
import { CountdownTimer } from "@/components/countdown";
import {
  ShieldCheck,
  TrendingUp,
  Activity,
  DollarSign,
  Gavel,
  PlusCircle,
  RefreshCcw,
  CheckCircle,
  Truck,
  RotateCcw,
  Users,
  Eye,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import heroWatch from "@/assets/hero-watch.jpg";
import lotMacbook from "@/assets/lot-macbook.jpg";
import lotBag from "@/assets/lot-bag.jpg";
import lotArt from "@/assets/lot-art.jpg";
import lotCar from "@/assets/lot-car.jpg";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  const { products, bids, transactions, currentUser } = useStore();
  const router = useRouter();

  // Route Guard: Admin only
  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center px-4">
        <AlertTriangle className="size-12 text-amber-500 mb-4" />
        <h2 className="text-xl font-semibold text-zinc-950">Access Restriction</h2>
        <p className="mt-2 text-zinc-500 text-sm max-w-sm">
          This portal requires administrator authorization levels. Please log in with a console key.
        </p>
        <Link
          to="/admin/login"
          className="mt-6 rounded-lg bg-zinc-950 px-6 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-zinc-900"
        >
          Open Admin Login
        </Link>
      </div>
    );
  }

  // --- Dynamic Stats calculation ---
  const totalGMV = transactions
    .filter((t) => t.status === "disbursed" || t.status === "delivered" || t.status === "shipped" || t.status === "escrow_funded")
    .reduce((sum, t) => sum + t.amount, 0) + 412850000; // Seed GMV + active tx

  const activeCount = products.filter((p) => p.status === "active").length;

  const escrowHoldings = transactions
    .filter((t) => t.status === "escrow_funded" || t.status === "shipped" || t.status === "delivered")
    .reduce((sum, t) => sum + t.amount, 0);

  const completedCount = products.filter((p) => p.status === "sold" || p.status === "closed").length;
  const settlementRate = completedCount > 0 ? Math.round((completedCount / (completedCount + activeCount)) * 100) : 87;

  // Assets image lookup
  const IMAGES: Record<string, string> = {
    "/src/assets/hero-watch.jpg": heroWatch,
    "/src/assets/lot-macbook.jpg": lotMacbook,
    "/src/assets/lot-bag.jpg": lotBag,
    "/src/assets/lot-art.jpg": lotArt,
    "/src/assets/lot-car.jpg": lotCar,
  };
  const getImageSrc = (path: string) => IMAGES[path] || path;

  // --- Handlers ---
  const handleStartAuction = (id: string) => {
    startAuctionNow(id);
    toast.success("Auction listing has been activated successfully!");
  };

  const handleEndAuction = (id: string) => {
    endAuctionEarly(id);
    toast.success("Auction ended early. Bids analyzed, winner declared!");
  };

  const handleEscrowAction = (id: string, status: typeof transactions[0]["status"]) => {
    const res = updateEscrowStatus(id, status);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  const handleResetPlatform = () => {
    if (confirm("Reset the entire platform to initial demo values? Bids, carts, and uploads will be wiped.")) {
      resetStore();
      toast.success("Demo dataset restored.");
      router.invalidate();
    }
  };

  return (
    <div className="bg-zinc-50 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-6 mb-8 border-zinc-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                Authorized System Console
              </span>
            </div>
            <h1 className="font-display text-5xl font-medium tracking-tight text-zinc-950 mt-2">
              Platform Dashboard
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/admin/products/new"
              className="flex items-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-zinc-800 shadow"
            >
              <PlusCircle className="size-4" />
              Upload Product
            </Link>

            <button
              onClick={handleResetPlatform}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 shadow-sm"
              title="Reset platform states for demo testing"
            >
              <RotateCcw className="size-4" />
              Reset Demo
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            {
              title: "Total GMV (NGN)",
              value: `₦${totalGMV.toLocaleString()}`,
              sub: "+12.4% vs last quarter",
              icon: TrendingUp,
              color: "text-emerald-600 bg-emerald-50 border-emerald-100",
            },
            {
              title: "Active Listings",
              value: activeCount,
              sub: "Live auctions in progress",
              icon: Gavel,
              color: "text-blue-600 bg-blue-50 border-blue-100",
            },
            {
              title: "Escrow Pool",
              value: `₦${escrowHoldings.toLocaleString()}`,
              sub: "Funds locked in custody",
              icon: DollarSign,
              color: "text-orange-600 bg-orange-50 border-orange-100",
            },
            {
              title: "Sell-Through Rate",
              value: `${settlementRate}%`,
              sub: "Completed vs Total lots",
              icon: Activity,
              color: "text-purple-600 bg-purple-50 border-purple-100",
            },
          ].map((s) => (
            <div
              key={s.title}
              className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm flex items-start justify-between"
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">{s.title}</p>
                <h3 className="font-display text-3xl font-medium tracking-tight text-zinc-900 mt-2">
                  {s.value}
                </h3>
                <p className="text-[10px] text-zinc-500 mt-1">{s.sub}</p>
              </div>
              <div className={`p-2 rounded-lg border ${s.color}`}>
                <s.icon className="size-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Listings and Bids split layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 mb-10">
          {/* Products controller */}
          <div className="lg:col-span-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-zinc-900 text-sm mb-6 flex items-center gap-2">
              <Gavel className="size-4 text-zinc-400" />
              Auctions floor controller
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-zinc-100 text-zinc-400 font-bold uppercase tracking-wider text-[9px] pb-3">
                    <th className="pb-3 pr-4">Lot</th>
                    <th className="pb-3 pr-4">Format</th>
                    <th className="pb-3 pr-4">Price / High Bid</th>
                    <th className="pb-3 pr-4">Time Remaining</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {products.map((p) => {
                    const price = p.currentBid || p.price;
                    return (
                      <tr key={p.id} className="hover:bg-zinc-50/50">
                        <td className="py-3.5 pr-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={getImageSrc(p.image)}
                              alt={p.title}
                              className="size-10 rounded-md object-cover border bg-zinc-50 shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="font-semibold text-zinc-900 truncate max-w-[150px]">{p.title}</p>
                              <p className="text-[9px] text-zinc-400 capitalize">{p.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 pr-4 font-semibold text-zinc-600">{p.type}</td>
                        <td className="py-3.5 pr-4 font-mono font-bold text-zinc-800">
                          ₦{price.toLocaleString()}
                        </td>
                        <td className="py-3.5 pr-4 text-zinc-500 font-medium">
                          {p.status === "active" && p.endTime ? (
                            <CountdownTimer endTime={p.endTime} className="text-orange-600 font-semibold" />
                          ) : p.status === "upcoming" ? (
                            <span className="text-blue-600 font-semibold">Upcoming</span>
                          ) : (
                            <span className="capitalize text-zinc-400">{p.status}</span>
                          )}
                        </td>
                        <td className="py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {p.status === "upcoming" || p.status === "draft" ? (
                              <button
                                onClick={() => handleStartAuction(p.id)}
                                className="rounded-md bg-zinc-900 text-white px-2.5 py-1.5 font-bold hover:bg-zinc-800"
                              >
                                Start Live
                              </button>
                            ) : p.status === "active" ? (
                              <button
                                onClick={() => handleEndAuction(p.id)}
                                className="rounded-md bg-red-50 text-red-700 px-2.5 py-1.5 font-bold hover:bg-red-100 border border-red-100"
                              >
                                End Early
                              </button>
                            ) : (
                              <span className="text-zinc-400 font-medium">Closed</span>
                            )}
                            <Link
                              to="/auction/$productId"
                              params={{ productId: p.id }}
                              className="p-1.5 rounded-md hover:bg-zinc-100 text-zinc-400 hover:text-zinc-950"
                            >
                              <Eye className="size-4" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Dynamic Feed Side Panel */}
          <div className="lg:col-span-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm flex flex-col h-[400px]">
            <h3 className="font-semibold text-zinc-900 text-sm mb-4 flex items-center gap-2 border-b pb-3">
              <Activity className="size-4 text-brand" />
              Live Bid Room Stream
            </h3>
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {bids.length === 0 ? (
                <p className="text-zinc-400 text-center text-xs py-10">No bid logs received yet.</p>
              ) : (
                bids
                  .slice()
                  .reverse()
                  .map((b) => {
                    const prod = products.find((p) => p.id === b.productId);
                    return (
                      <div
                        key={b.id}
                        className="rounded-lg border border-zinc-100 bg-zinc-50 p-2.5 text-xs flex flex-col gap-1 border-l-4 border-l-brand"
                      >
                        <div className="flex items-center justify-between text-[10px] text-zinc-400 font-semibold">
                          <span>{b.userName}</span>
                          <span>{new Date(b.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <p className="font-semibold text-zinc-800 line-clamp-1">{prod?.title || "Lot Item"}</p>
                        <p className="font-mono font-bold text-zinc-900">₦{b.amount.toLocaleString()}</p>
                      </div>
                    );
                  })
              )}
            </div>
          </div>
        </div>

        {/* Escrow Transaction Desk */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-zinc-900 text-sm mb-6 flex items-center gap-2">
            <ShieldCheck className="size-4 text-emerald-600" />
            Escrow Settlement Ledger
          </h2>

          {transactions.length === 0 ? (
            <div className="py-12 text-center text-zinc-400 text-xs">
              No transactions currently locked in escrow. Test this by purchasing an item.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-zinc-100 text-zinc-400 font-bold uppercase tracking-wider text-[9px] pb-3">
                    <th className="pb-3 pr-4">Tx ID</th>
                    <th className="pb-3 pr-4">Item Detail</th>
                    <th className="pb-3 pr-4">Buyer</th>
                    <th className="pb-3 pr-4">Amount</th>
                    <th className="pb-3 pr-4">Escrow Status</th>
                    <th className="pb-3 text-right">Escrow Settlement Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-zinc-50/50">
                      <td className="py-3.5 pr-4 font-mono font-semibold text-zinc-500">{tx.id}</td>
                      <td className="py-3.5 pr-4">
                        <div className="flex items-center gap-2">
                          <img
                            src={getImageSrc(tx.productImage)}
                            alt={tx.productTitle}
                            className="size-8 rounded-md object-cover border"
                          />
                          <span className="font-semibold text-zinc-800 truncate max-w-[130px]">
                            {tx.productTitle}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 pr-4 font-medium text-zinc-600">{tx.buyerName}</td>
                      <td className="py-3.5 pr-4 font-mono font-bold text-zinc-900">
                        ₦{tx.amount.toLocaleString()}
                      </td>
                      <td className="py-3.5 pr-4">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                            tx.status === "disbursed"
                              ? "bg-emerald-100 text-emerald-800"
                              : tx.status === "refunded"
                                ? "bg-red-100 text-red-800"
                                : tx.status === "shipped"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-orange-100 text-orange-850"
                          }`}
                        >
                          {tx.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {tx.status === "escrow_funded" && (
                            <button
                              onClick={() => handleEscrowAction(tx.id, "shipped")}
                              className="flex items-center gap-1 rounded-md border border-blue-200 bg-blue-50 text-blue-700 px-2 py-1 hover:bg-blue-100"
                            >
                              <Truck className="size-3" /> Ship
                            </button>
                          )}
                          {(tx.status === "escrow_funded" || tx.status === "shipped" || tx.status === "delivered") && (
                            <>
                              <button
                                onClick={() => handleEscrowAction(tx.id, "disbursed")}
                                className="flex items-center gap-1 rounded-md border border-emerald-250 bg-emerald-50 text-emerald-850 px-2 py-1 hover:bg-emerald-100"
                              >
                                <CheckCircle className="size-3" /> Disburse
                              </button>
                              <button
                                onClick={() => handleEscrowAction(tx.id, "refunded")}
                                className="flex items-center gap-1 rounded-md border border-red-200 bg-red-50 text-red-700 px-2 py-1 hover:bg-red-100"
                              >
                                <RotateCcw className="size-3" /> Refund
                              </button>
                            </>
                          )}
                          {(tx.status === "disbursed" || tx.status === "refunded") && (
                            <span className="text-zinc-400 font-medium">Settled</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
