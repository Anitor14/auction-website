import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useStore, topUpWallet, withdrawWallet, updateEscrowStatus } from "@/lib/store";
import { toast } from "sonner";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  ShieldCheck,
  CheckCircle,
  Truck,
  RotateCcw,
  Plus,
  History,
  Lock,
  ChevronRight,
  HelpCircle,
} from "lucide-react";
import heroWatch from "@/assets/hero-watch.jpg";
import lotMacbook from "@/assets/lot-macbook.jpg";
import lotBag from "@/assets/lot-bag.jpg";
import lotArt from "@/assets/lot-art.jpg";
import lotCar from "@/assets/lot-car.jpg";

export const Route = createFileRoute("/transactions")({
  component: TransactionsPage,
});

function TransactionsPage() {
  const { transactions, currentUser } = useStore();
  const [topUpAmount, setTopUpAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [showTopUp, setShowTopUp] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  // Asset image lookup helper
  const IMAGES: Record<string, string> = {
    "/src/assets/hero-watch.jpg": heroWatch,
    "/src/assets/lot-macbook.jpg": lotMacbook,
    "/src/assets/lot-bag.jpg": lotBag,
    "/src/assets/lot-art.jpg": lotArt,
    "/src/assets/lot-car.jpg": lotCar,
  };
  const getImageSrc = (path: string) => IMAGES[path] || path;

  // Guard: User must be logged in
  if (!currentUser) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center py-20 text-center px-4">
        <Wallet className="size-12 text-zinc-400 stroke-1 mb-4" />
        <h2 className="text-xl font-semibold text-zinc-900">Wallet & Transactions</h2>
        <p className="mt-2 text-zinc-500 text-sm max-w-sm">
          Please log in to manage your bidding wallet, deposit capital, or view escrow transaction histories.
        </p>
        <Link
          to="/auth/login"
          className="mt-6 rounded-lg bg-zinc-900 px-6 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-zinc-800"
        >
          Sign In
        </Link>
      </div>
    );
  }

  // Filter transactions for this specific user
  const userTransactions = transactions.filter((t) => t.buyerId === currentUser.id);

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(topUpAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid deposit amount.");
      return;
    }

    const success = topUpWallet(amount);
    if (success) {
      toast.success(`₦${amount.toLocaleString()} deposited successfully into your bidding wallet!`);
      setTopUpAmount("");
      setShowTopUp(false);
    } else {
      toast.error("Deposit failed.");
    }
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid withdrawal amount.");
      return;
    }

    const res = withdrawWallet(amount);
    if (res.success) {
      toast.success(`Processed withdrawal of ₦${amount.toLocaleString()} to your linked account.`);
      setWithdrawAmount("");
      setShowWithdraw(false);
    } else {
      toast.error(res.message);
    }
  };

  const handleConfirmDelivery = (txId: string) => {
    const res = updateEscrowStatus(txId, "disbursed");
    if (res.success) {
      toast.success("Delivery confirmed. Escrow disbursement released to vendor.");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="bg-surface py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">Bidding Ledger</span>
          <h1 className="mt-2 font-display text-5xl font-medium tracking-tight">Wallet & Escrow Vault</h1>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Wallet details */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Your Wallet</h2>

            {/* Wallet Panel */}
            <div className="rounded-2xl border border-zinc-950/5 bg-zinc-900 p-6 text-white shadow-lg relative overflow-hidden">
              {/* background effect */}
              <div className="absolute inset-0 opacity-10 bg-radial-gradient" style={{
                backgroundImage: "radial-gradient(circle at 100% 0%, var(--brand) 0%, transparent 60%)"
              }} />
              <div className="relative z-10 space-y-6">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-400">Available bidding capital</p>
                  <p className="font-display text-4xl font-medium mt-2">
                    ₦{currentUser.walletBalance.toLocaleString()}
                  </p>
                </div>

                {currentUser.role === "buyer" && (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        setShowTopUp(true);
                        setShowWithdraw(false);
                      }}
                      className="flex items-center justify-center gap-1 rounded-lg bg-brand px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-brand/90"
                    >
                      <Plus className="size-3.5" /> Deposit
                    </button>
                    <button
                      onClick={() => {
                        setShowWithdraw(true);
                        setShowTopUp(false);
                      }}
                      className="flex items-center justify-center gap-1 rounded-lg bg-zinc-800 px-4 py-2.5 text-xs font-semibold text-zinc-200 transition-colors hover:bg-zinc-700"
                    >
                      <ArrowUpRight className="size-3.5" /> Withdraw
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Deposit Modal / Form */}
            {showTopUp && (
              <form
                onSubmit={handleDepositSubmit}
                className="rounded-2xl border border-zinc-950/5 bg-white p-5 shadow-sm space-y-4"
              >
                <div className="flex justify-between items-center border-b pb-2">
                  <h3 className="font-semibold text-zinc-800 text-xs">Deposit Demo Capital</h3>
                  <button
                    type="button"
                    onClick={() => setShowTopUp(false)}
                    className="text-xs text-zinc-400 hover:text-zinc-600"
                  >
                    Cancel
                  </button>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-zinc-500 mb-1">Deposit Amount (₦)</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400 font-medium">
                      ₦
                    </span>
                    <input
                      type="number"
                      placeholder="5,000,000"
                      value={topUpAmount}
                      onChange={(e) => setTopUpAmount(e.target.value)}
                      className="w-full rounded-lg border border-zinc-950/10 bg-white py-2 pl-7 pr-4 text-xs focus:border-brand focus:outline-none"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-zinc-900 py-2 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors"
                >
                  Fund Wallet Balance
                </button>
              </form>
            )}

            {/* Withdraw Modal / Form */}
            {showWithdraw && (
              <form
                onSubmit={handleWithdrawSubmit}
                className="rounded-2xl border border-zinc-950/5 bg-white p-5 shadow-sm space-y-4"
              >
                <div className="flex justify-between items-center border-b pb-2">
                  <h3 className="font-semibold text-zinc-800 text-xs">Withdraw Bidding Capital</h3>
                  <button
                    type="button"
                    onClick={() => setShowWithdraw(false)}
                    className="text-xs text-zinc-400 hover:text-zinc-600"
                  >
                    Cancel
                  </button>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-zinc-500 mb-1">Withdraw Amount (₦)</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400 font-medium">
                      ₦
                    </span>
                    <input
                      type="number"
                      placeholder="1,000,000"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="w-full rounded-lg border border-zinc-950/10 bg-white py-2 pl-7 pr-4 text-xs focus:border-brand focus:outline-none"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-zinc-900 py-2 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors"
                >
                  Withdraw Capital
                </button>
              </form>
            )}

            {/* Escrow Help desk info */}
            <div className="rounded-xl border border-zinc-950/5 bg-zinc-50/50 p-4 space-y-3">
              <div className="flex gap-2.5">
                <HelpCircle className="size-4 text-zinc-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-zinc-800">How Escrow works here?</h4>
                  <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                    When you win an auction or complete a buy-now purchase, your money enters a locked escrow status. The vendor ships the package and tags it as "Shipped" in our admin system. Once you physically receive the item, verify its parameters and click <strong>Confirm Delivery</strong> on this page to release custody payout.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Transactions list */}
          <div className="lg:col-span-8 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Escrow Transaction Ledger</h2>

            {userTransactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-zinc-950/10 rounded-2xl bg-zinc-50/10">
                <History className="size-10 text-zinc-400 stroke-1 mb-4" />
                <h3 className="font-semibold text-zinc-800 text-sm">No transactions logged</h3>
                <p className="mt-1 text-xs text-zinc-500 max-w-xs">
                  Your transaction ledger is empty. Add Buy Now products to your cart or place high bids to win live auctions.
                </p>
                <Link
                  to="/products"
                  className="mt-6 rounded-lg bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors"
                >
                  Enter Auction Floor
                </Link>
              </div>
            ) : (
              <div className="rounded-2xl border border-zinc-950/5 bg-white overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-zinc-50 border-b border-zinc-950/5 text-zinc-400 font-bold uppercase tracking-wider text-[9px]">
                      <tr>
                        <th className="py-4 px-6">Transaction ID</th>
                        <th className="py-4 px-6">Lot Description</th>
                        <th className="py-4 px-6">Settled Date</th>
                        <th className="py-4 px-6">Principal</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6 text-right">Escrow Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-950/5">
                      {userTransactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-zinc-50/50 transition-colors">
                          <td className="py-4 px-6 font-mono font-semibold text-zinc-500">{tx.id}</td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <img
                                src={getImageSrc(tx.productImage)}
                                alt={tx.productTitle}
                                className="size-8 rounded-md object-cover border shrink-0"
                              />
                              <span className="font-semibold text-zinc-800 truncate max-w-[130px]">
                                {tx.productTitle}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-zinc-500">
                            {new Date(tx.date).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-6 font-mono font-bold text-zinc-900">
                            ₦{tx.amount.toLocaleString()}
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                                tx.status === "disbursed"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200/50"
                                  : tx.status === "refunded"
                                    ? "bg-red-50 text-red-700 border-red-200/50"
                                    : tx.status === "shipped"
                                      ? "bg-blue-50 text-blue-700 border-blue-200/50"
                                      : "bg-orange-50 text-orange-700 border-orange-200/50"
                              }`}
                            >
                              {tx.status.replace("_", " ")}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right">
                            {tx.status === "shipped" ? (
                              <button
                                onClick={() => handleConfirmDelivery(tx.id)}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-700 shadow-sm"
                              >
                                <CheckCircle className="size-3.5" /> Confirm Delivery
                              </button>
                            ) : tx.status === "escrow_funded" ? (
                              <span className="text-[10px] text-zinc-400 font-medium flex items-center justify-end gap-1">
                                <Lock className="size-3 text-zinc-400" /> Wait for shipment
                              </span>
                            ) : (
                              <span className="text-zinc-400 font-medium">Completed</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
