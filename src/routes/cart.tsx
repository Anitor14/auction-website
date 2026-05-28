import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useStore, removeFromCart, checkoutCart, topUpWallet } from "@/lib/store";
import { toast } from "sonner";
import {
  Trash2,
  ShieldCheck,
  CreditCard,
  Wallet,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Info,
  CheckCircle,
} from "lucide-react";
import heroWatch from "@/assets/hero-watch.jpg";
import lotMacbook from "@/assets/lot-macbook.jpg";
import lotBag from "@/assets/lot-bag.jpg";
import lotArt from "@/assets/lot-art.jpg";
import lotCar from "@/assets/lot-car.jpg";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

function CartPage() {
  const { cart, currentUser } = useStore();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<"wallet" | "card">("wallet");
  const [isSuccess, setIsSuccess] = useState(false);
  const [cardNum, setCardNum] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const IMAGES: Record<string, string> = {
    "/src/assets/hero-watch.jpg": heroWatch,
    "/src/assets/lot-macbook.jpg": lotMacbook,
    "/src/assets/lot-bag.jpg": lotBag,
    "/src/assets/lot-art.jpg": lotArt,
    "/src/assets/lot-car.jpg": lotCar,
  };
  const getImageSrc = (path: string) => IMAGES[path] || path;

  // Insufficient wallet check
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const escrowFee = subtotal * 0.02;
  const shippingFee = subtotal > 0 ? 50000 : 0;
  const grandTotal = subtotal + escrowFee + shippingFee;

  const hasInsufficientWallet =
    currentUser !== null && paymentMethod === "wallet" && currentUser.walletBalance < grandTotal;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("Please log in to complete checkout.");
      return;
    }

    if (paymentMethod === "card") {
      if (!cardNum || !cardExp || !cardCvv) {
        toast.error("Please fill in card details.");
        return;
      }
    }

    const res = checkoutCart(paymentMethod);
    if (res.success) {
      toast.success(res.message);
      setIsSuccess(true);
    } else {
      toast.error(res.message);
    }
  };

  const handleQuickFund = () => {
    if (!currentUser) return;
    const need = grandTotal - currentUser.walletBalance;
    // Top up matching need + some buffer
    const topUpAmount = Math.ceil(need / 100000) * 100000;
    topUpWallet(topUpAmount);
    toast.success(`Credited ₦${topUpAmount.toLocaleString()} to your wallet balance!`);
  };

  if (!currentUser) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center py-20 text-center px-4">
        <ShoppingBag className="size-12 text-zinc-400 stroke-1 mb-4" />
        <h2 className="text-xl font-semibold text-zinc-900">Your Cart</h2>
        <p className="mt-2 text-zinc-500 text-sm max-w-sm">
          Please log in to view items in your shopping cart or complete transactions.
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

  if (isSuccess) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <div className="inline-flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-6">
          <CheckCircle className="size-8" />
        </div>
        <h2 className="font-display text-4xl font-semibold tracking-tight text-zinc-900">
          Escrow Custody Active
        </h2>
        <p className="mt-4 text-zinc-500 text-sm leading-relaxed">
          Your payment of <strong>₦{grandTotal.toLocaleString()}</strong> has been successfully secured in our multi-sig custody account. The vendor has been notified to prepare and ship your lots.
        </p>
        <div className="mt-8 rounded-xl border border-zinc-950/5 bg-zinc-50 p-5 text-left text-xs space-y-3">
          <div className="flex justify-between font-semibold text-zinc-800">
            <span>Funding Method:</span>
            <span className="capitalize">{paymentMethod} Payment</span>
          </div>
          <div className="flex justify-between text-zinc-500">
            <span>Escrow Agent:</span>
            <span>Kilimanjaro Bids Ltd.</span>
          </div>
          <div className="flex justify-between text-zinc-500">
            <span>Escrow Status:</span>
            <span className="font-bold text-emerald-600">Funded / Secured</span>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            to="/transactions"
            className="flex items-center justify-center gap-1.5 rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
          >
            Track Escrow & Shipment <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/products"
            className="rounded-lg border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">Checkout Desk</span>
          <h1 className="mt-2 font-display text-5xl font-medium tracking-tight">Shopping Cart</h1>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-zinc-950/10 rounded-2xl bg-zinc-50/20">
            <ShoppingBag className="size-12 text-zinc-400 stroke-1 mb-4" />
            <h3 className="font-semibold text-zinc-800 text-sm">Your cart is empty</h3>
            <p className="mt-1 text-xs text-zinc-500 max-w-xs">
              Go bid on active auctions or add Buy Now items from the floor catalog to populate checkout.
            </p>
            <Link
              to="/products"
              className="mt-6 rounded-lg bg-zinc-900 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-zinc-800"
            >
              Browse Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Cart Items List */}
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-2">Items Summary</h2>
              {cart.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center gap-4 rounded-xl border border-zinc-950/5 bg-white p-4 shadow-sm"
                >
                  <img
                    src={getImageSrc(item.productImage)}
                    alt={item.productTitle}
                    className="size-16 rounded-lg object-cover bg-zinc-50 border shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span
                      className={`inline-block rounded-full border px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider ${
                        item.type === "auction_win"
                          ? "bg-amber-50 text-amber-700 border-amber-200/50"
                          : "bg-zinc-50 text-zinc-700 border-zinc-200/50"
                      }`}
                    >
                      {item.type === "auction_win" ? "Auction Win" : "Buy It Now"}
                    </span>
                    <h3 className="font-semibold text-zinc-800 text-sm truncate mt-1">
                      {item.productTitle}
                    </h3>
                    <p className="text-xs font-mono font-bold text-zinc-900 mt-1">
                      ₦{item.price.toLocaleString()} {item.quantity > 1 && `x ${item.quantity}`}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="flex size-8 items-center justify-center rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))}

              {/* Escrow Custody Guarantee Alert */}
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/20 p-5 flex gap-3">
                <ShieldCheck className="size-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-800">Escrow Security Covered</h4>
                  <p className="text-[11px] text-emerald-700 leading-relaxed mt-1">
                    Funds are secured in multi-currency bank accounts managed by Kilimanjaro. Payout is released to the seller only when delivery transit matches specifications and you authorize clearance.
                  </p>
                </div>
              </div>
            </div>

            {/* Billing Summary & Payment Panel */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-2">Payment</h2>
              <div className="rounded-2xl border border-zinc-950/5 bg-white p-6 shadow-sm">
                <div className="space-y-3.5 border-b border-zinc-950/5 pb-4 mb-6 text-xs text-zinc-500">
                  <div className="flex justify-between">
                    <span>Items Subtotal:</span>
                    <span className="font-mono text-zinc-800">₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1">
                      Escrow Custody Fee (2%):
                      <span title="Fee to cover multi-sig transaction routing and verification mechanisms.">
                        <Info className="size-3 text-zinc-400 cursor-pointer" />
                      </span>
                    </span>
                    <span className="font-mono text-zinc-800">₦{escrowFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Insured Courier Delivery:</span>
                    <span className="font-mono text-zinc-800">₦{shippingFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold text-zinc-900 border-t border-zinc-950/5 pt-3.5">
                    <span>Total Bill:</span>
                    <span className="font-mono text-brand">₦{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Form Select Payment Method */}
                <form onSubmit={handleCheckout} className="space-y-6">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-600 mb-3">Choose Payment Method</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("wallet")}
                        className={`rounded-lg border p-3.5 text-center flex flex-col items-center justify-center transition-all ${
                          paymentMethod === "wallet"
                            ? "border-brand bg-brand/5 text-brand"
                            : "border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50"
                        }`}
                      >
                        <Wallet className="size-4 mb-1" />
                        <span className="text-xs font-semibold">Kilimanjaro Wallet</span>
                        <span className="text-[9px] opacity-75 mt-0.5">
                          Bal: ₦{currentUser.walletBalance.toLocaleString()}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className={`rounded-lg border p-3.5 text-center flex flex-col items-center justify-center transition-all ${
                          paymentMethod === "card"
                            ? "border-zinc-800 bg-zinc-50 text-zinc-900"
                            : "border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50"
                        }`}
                      >
                        <CreditCard className="size-4 mb-1" />
                        <span className="text-xs font-semibold">Insured Card Link</span>
                        <span className="text-[9px] opacity-75 mt-0.5">Visa/Mastercard</span>
                      </button>
                    </div>
                  </div>

                  {/* Insufficient Wallet Warning */}
                  {hasInsufficientWallet && (
                    <div className="rounded-lg bg-red-50 border border-red-200/50 p-4 text-center">
                      <p className="text-xs text-red-800 font-medium">
                        Insufficient balance in your Kilimanjaro wallet.
                      </p>
                      <button
                        type="button"
                        onClick={handleQuickFund}
                        className="mt-3.5 inline-flex items-center gap-1 rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 transition-colors"
                      >
                        <Sparkles className="size-3.5" /> Instant Demo Fund (₦
                        {(grandTotal - currentUser.walletBalance).toLocaleString()})
                      </button>
                    </div>
                  )}

                  {/* Card payment detail inputs */}
                  {paymentMethod === "card" && (
                    <div className="space-y-3.5 border border-zinc-200 rounded-xl p-4 bg-zinc-50/50">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="4111 2222 3333 4444"
                          value={cardNum}
                          onChange={(e) => setCardNum(e.target.value)}
                          className="w-full rounded-md border border-zinc-950/10 bg-white px-2.5 py-1.5 text-xs focus:border-brand focus:outline-none"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={cardExp}
                            onChange={(e) => setCardExp(e.target.value)}
                            className="w-full rounded-md border border-zinc-950/10 bg-white px-2.5 py-1.5 text-xs focus:border-brand focus:outline-none"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                            CVV Code
                          </label>
                          <input
                            type="password"
                            placeholder="123"
                            maxLength={3}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full rounded-md border border-zinc-950/10 bg-white px-2.5 py-1.5 text-xs focus:border-brand focus:outline-none"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Submit checkout */}
                  <button
                    type="submit"
                    disabled={hasInsufficientWallet}
                    className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-zinc-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed shadow"
                  >
                    <ShieldCheck className="size-4" /> Secure Funds in Escrow
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
