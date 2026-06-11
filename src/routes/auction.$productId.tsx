import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useStore, placeBid, buyDutchAuction, addToCart } from "@/lib/store";
import { CountdownTimer } from "@/components/countdown";
import { toast } from "sonner";
import {
  Gavel,
  ShieldCheck,
  Truck,
  ArrowLeft,
  ChevronRight,
  TrendingUp,
  Clock,
  History,
  Lock,
  ShoppingBag,
  Plus,
  Minus,
} from "lucide-react";
import heroWatch from "@/assets/hero-watch.jpg";
import lotMacbook from "@/assets/lot-macbook.jpg";
import lotBag from "@/assets/lot-bag.jpg";
import lotArt from "@/assets/lot-art.jpg";
import lotCar from "@/assets/lot-car.jpg";

export const Route = createFileRoute("/auction/$productId")({
  component: AuctionDetailPage,
});

function AuctionDetailPage() {
  const { productId } = Route.useParams();
  const router = useRouter();
  const { products, bids, currentUser } = useStore();

  const product = products.find((p) => p.id === productId);

  // Asset image lookup helper
  const IMAGES: Record<string, string> = {
    "/src/assets/hero-watch.jpg": heroWatch,
    "/src/assets/lot-macbook.jpg": lotMacbook,
    "/src/assets/lot-bag.jpg": lotBag,
    "/src/assets/lot-art.jpg": lotArt,
    "/src/assets/lot-car.jpg": lotCar,
  };
  const getImageSrc = (path: string) => IMAGES[path] || path;

  // Custom Bidding States
  const [customBid, setCustomBid] = useState("");
  const [buyNowQty, setBuyNowQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "escrow">("details");

  // If product not found, show error state
  if (!product) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
        <h2 className="text-2xl font-semibold text-zinc-900">Listing Not Found</h2>
        <p className="mt-2 text-zinc-500 text-sm">The lot you are looking for does not exist.</p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
        >
          <ArrowLeft className="size-4" /> Back to catalog
        </Link>
      </div>
    );
  }

  const currentPrice = product.currentBid || product.price;
  const lotBids = bids.filter((b) => b.productId === product.id).sort((a, b) => b.amount - a.amount);
  const minNextBid = currentPrice + (product.increment || 0);

  // Set default bid suggestions
  useEffect(() => {
    if (product.type === "English" || product.type === "Reverse") {
      setCustomBid(String(minNextBid));
    } else if (product.type === "Sealed Bid") {
      setCustomBid(String(product.price));
    }
  }, [product.id, currentPrice, product.increment]);

  const handleQuickBid = (incrementAmount: number) => {
    const target = minNextBid + incrementAmount;
    setCustomBid(String(target));
  };

  const handlePlaceBid = (e: React.FormEvent) => {
    e.preventDefault();
    const bidAmount = parseFloat(customBid);
    if (isNaN(bidAmount)) {
      toast.error("Please enter a valid bid amount.");
      return;
    }

    const res = placeBid(product.id, bidAmount);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  const handleBuyDutch = () => {
    const res = buyDutchAuction(product.id);
    if (res.success) {
      toast.success(res.message);
      router.navigate({ to: "/cart" });
    } else {
      toast.error(res.message);
    }
  };

  const handleAddBuyNowToCart = () => {
    const res = addToCart(product.id, buyNowQty, "buy_now");
    if (res.success) {
      toast.success(res.message);
      // Wait shortly and route to cart
      router.navigate({ to: "/cart" });
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="bg-surface py-12 animate-fade-in-up">
      <div className="mx-auto max-w-7xl px-6">
        {/* Breadcrumbs */}
        <nav className="mb-8 flex items-center gap-2 text-xs font-medium text-zinc-500">
          <Link to="/" className="hover:text-ink transition-colors">
            Home
          </Link>
          <ChevronRight className="size-3 text-zinc-400" />
          <Link to="/products" className="hover:text-ink transition-colors">
            Catalog
          </Link>
          <ChevronRight className="size-3 text-zinc-400" />
          <span className="text-zinc-950 truncate max-w-[200px]">{product.title}</span>
        </nav>

        {/* Back Link */}
        <Link
          to="/products"
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-3.5" /> Back to Floor Listings
        </Link>

        {/* Product details main layout */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Image and specifications */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative overflow-hidden rounded-2xl border border-zinc-950/5 bg-white shadow-sm">
              <img
                src={getImageSrc(product.image)}
                alt={product.title}
                className="w-full aspect-4/3 object-cover"
              />
              <span className="absolute left-4 top-4 rounded-full border border-zinc-200 bg-white/95 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand shadow-sm">
                {product.type} format
              </span>
            </div>

            {/* Spec / Info Tabs */}
            <div className="rounded-xl border border-zinc-950/5 bg-white p-6 shadow-sm">
              <div className="flex border-b border-zinc-950/5 mb-6">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === "details"
                    ? "border-brand text-brand"
                    : "border-transparent text-zinc-400 hover:text-zinc-600"
                    }`}
                >
                  Lot Description
                </button>
                <button
                  onClick={() => setActiveTab("escrow")}
                  className={`ml-6 pb-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === "escrow"
                    ? "border-brand text-brand"
                    : "border-transparent text-zinc-400 hover:text-zinc-600"
                    }`}
                >
                  Escrow & Shipping Rules
                </button>
              </div>

              {activeTab === "details" ? (
                <div>
                  <h2 className="text-lg font-semibold text-zinc-900 mb-3">About this item</h2>
                  <p className="text-zinc-600 text-sm leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-4 border-t border-zinc-950/5 pt-6 text-xs">
                    <div>
                      <p className="text-zinc-400 uppercase font-semibold">Catalog Category</p>
                      <p className="font-semibold text-zinc-800 mt-1">{product.category}</p>
                    </div>
                    <div>
                      <p className="text-zinc-400 uppercase font-semibold">Verification Trust</p>
                      <p className="font-semibold text-emerald-600 mt-1 flex items-center gap-1">
                        <ShieldCheck className="size-3.5" />
                        Kilimanjaro Certified
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-sm text-zinc-600 leading-relaxed">
                  <div className="flex gap-3">
                    <ShieldCheck className="size-5 shrink-0 text-brand" />
                    <div>
                      <h4 className="font-semibold text-zinc-900 text-xs">2-Stage Custody Escrow</h4>
                      <p className="text-zinc-500 text-xs mt-0.5">
                        Your bid capital is locked safely in regional banking custody (NGN, GBP, or EUR). Funds will NOT be disbursed to the vendor until you receive the lot and click "Confirm Delivery".
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Truck className="size-5 shrink-0 text-brand" />
                    <div>
                      <h4 className="font-semibold text-zinc-900 text-xs">Verified Tracked Transit</h4>
                      <p className="text-zinc-500 text-xs mt-0.5">
                        Shipping occurs via Kilimanjaro global logistics partners. Tracking codes will populate in your Transactions ledger within 24 hours of checkout.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Live Console & Bidding Panel */}
          <div className="lg:col-span-5 space-y-6">
            {/* Countdown / Pricing Console */}
            <div className="rounded-2xl border border-zinc-950/5 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-950/5 pb-4 mb-6">
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                    {product.type === "Buy Now" ? "Instant Catalog" : "Live Bidding Room"}
                  </p>
                  <h1 className="text-xl font-bold tracking-tight text-zinc-900 mt-1">
                    {product.title}
                  </h1>
                </div>
                {product.status === "active" && (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Live
                  </span>
                )}
              </div>

              {/* Status information grids */}
              <div className="grid grid-cols-2 gap-4 bg-zinc-50 rounded-xl p-4 mb-6">
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                    {product.type === "Buy Now"
                      ? "Price"
                      : product.type === "Reverse"
                        ? "Current Target"
                        : "Current Price"}
                  </p>
                  <p className="font-display text-2xl font-medium text-zinc-900 mt-1">
                    ₦{currentPrice.toLocaleString()}
                  </p>
                  {product.type !== "Buy Now" && product.reservePrice && (
                    <p className="text-[10px] text-zinc-400 mt-0.5">
                      Reserve Price: ₦{product.reservePrice.toLocaleString()}
                    </p>
                  )}
                </div>

                <div className="border-l border-zinc-950/5 pl-4">
                  {product.status === "active" && product.endTime ? (
                    <>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 flex items-center gap-1">
                        <Clock className="size-3 text-orange-600 animate-pulse-bid" />
                        Closing In
                      </p>
                      <p className="font-display text-2xl font-medium text-orange-600 mt-1">
                        <CountdownTimer endTime={product.endTime} />
                      </p>
                    </>
                  ) : product.status === "upcoming" ? (
                    <>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Starts At</p>
                      <p className="text-sm font-semibold text-blue-600 mt-1">
                        {product.startsAt ? new Date(product.startsAt).toLocaleString() : "TBD"}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Status</p>
                      <p className="text-lg font-bold text-zinc-500 mt-1 capitalize">
                        {product.status === "sold" ? "Sold / Closed" : product.status}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* CONSOLE CONTROL BLOCK */}
              {product.status === "active" ? (
                currentUser ? (
                  currentUser.role === "buyer" ? (
                    <div className="space-y-4">
                      {/* 1. English Ascent Auction Console */}
                      {product.type === "English" && (
                        <form onSubmit={handlePlaceBid} className="space-y-4">
                          <div>
                            <div className="flex justify-between items-center text-xs text-zinc-500 mb-2">
                              <span>Min Next Bid: ₦{minNextBid.toLocaleString()}</span>
                              <span>Increment: ₦{product.increment?.toLocaleString()}</span>
                            </div>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400 font-medium text-sm">
                                ₦
                              </span>
                              <input
                                type="number"
                                value={customBid}
                                onChange={(e) => setCustomBid(e.target.value)}
                                min={minNextBid}
                                step={product.increment}
                                className="w-full rounded-lg border border-zinc-950/10 py-3 pl-8 pr-4 text-sm ring-brand/10 transition-shadow focus:border-brand focus:outline-none focus:ring-4"
                                placeholder={String(minNextBid)}
                              />
                            </div>
                          </div>

                          {/* Quick Booster buttons */}
                          <div className="grid grid-cols-3 gap-2">
                            {["+50k", "+100k", "+500k"].map((val) => {
                              const amount = val.includes("500k")
                                ? 500000
                                : val.includes("100k")
                                  ? 100000
                                  : 50000;
                              return (
                                <button
                                  key={val}
                                  type="button"
                                  onClick={() => handleQuickBid(amount)}
                                  className="rounded-lg border border-zinc-950/10 bg-zinc-50 py-2 text-xs font-semibold hover:bg-zinc-100 transition-colors"
                                >
                                  {val}
                                </button>
                              );
                            })}
                          </div>

                          <button
                            type="submit"
                            className="group w-full flex items-center justify-center gap-2 rounded-lg bg-zinc-900 py-3 text-sm font-semibold text-white transition-all hover:bg-zinc-800 active:scale-[0.98] shadow"
                          >
                            <Gavel className="size-4 group-hover:animate-gavel-strike" /> Place Ascending Bid
                          </button>
                        </form>
                      )}

                      {/* 2. Dutch Descent Price Checkout */}
                      {product.type === "Dutch" && (
                        <div className="space-y-4">
                          <p className="text-xs text-zinc-500 leading-relaxed">
                            Dutch prices decrease automatically until a buyer claims the item. Click the button to buy immediately at the current price of <strong>₦{product.price.toLocaleString()}</strong>.
                          </p>
                          <button
                            onClick={handleBuyDutch}
                            className="w-full flex items-center justify-center gap-2 rounded-lg bg-brand py-3 text-sm font-semibold text-white transition-all hover:bg-brand/90 shadow active:scale-98"
                          >
                            <ShoppingBag className="size-4" /> Claim at ₦{product.price.toLocaleString()}
                          </button>
                        </div>
                      )}

                      {/* 3. Sealed Secret Bid Input */}
                      {product.type === "Sealed Bid" && (
                        <form onSubmit={handlePlaceBid} className="space-y-4">
                          <div className="group rounded-lg bg-zinc-50 border border-zinc-200/50 p-3 flex gap-2 hover:bg-zinc-100/50 transition-colors">
                            <Lock className="size-4 text-blue-600 shrink-0 mt-0.5 group-hover:animate-lock-wobble" />
                            <p className="text-[11px] text-zinc-500 leading-relaxed">
                              This is a Sealed Bid auction. Offers are hidden. The highest offer submitted at the end of the duration wins the lot at their bid. Enter your maximum offer:
                            </p>
                          </div>
                          <div>
                            <label className="block text-xs text-zinc-500 mb-1.5">Your Private Bid (₦)</label>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400 font-medium">
                                ₦
                              </span>
                              <input
                                type="number"
                                value={customBid}
                                onChange={(e) => setCustomBid(e.target.value)}
                                min={product.price}
                                className="w-full rounded-lg border border-zinc-950/10 py-3 pl-8 pr-4 text-sm ring-brand/10 transition-shadow focus:border-brand focus:outline-none focus:ring-4"
                                placeholder={String(product.price)}
                              />
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="group w-full flex items-center justify-center gap-2 rounded-lg bg-zinc-900 py-3 text-sm font-semibold text-white transition-all hover:bg-zinc-800 active:scale-[0.98] shadow"
                          >
                            <Gavel className="size-4 group-hover:animate-gavel-strike" /> Submit Confidential Offer
                          </button>
                        </form>
                      )}

                      {/* 4. Reverse Auction bid Console */}
                      {product.type === "Reverse" && (
                        <form onSubmit={handlePlaceBid} className="space-y-4">
                          <div className="rounded-lg bg-zinc-50 border border-zinc-200/50 p-3 flex gap-2">
                            <TrendingUp className="size-4 text-purple-600 shrink-0 mt-0.5" />
                            <p className="text-[11px] text-zinc-500 leading-relaxed">
                              Vendors compete by placing lower bids to fulfill this procurement brief. Your bid must be lower than the current price of <strong>₦{currentPrice.toLocaleString()}</strong>.
                            </p>
                          </div>
                          <div>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400 font-medium">
                                ₦
                              </span>
                              <input
                                type="number"
                                value={customBid}
                                onChange={(e) => setCustomBid(e.target.value)}
                                max={currentPrice - 1}
                                className="w-full rounded-lg border border-zinc-950/10 py-3 pl-8 pr-4 text-sm focus:border-brand focus:outline-none"
                                placeholder={String(currentPrice - 10000)}
                              />
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="group w-full flex items-center justify-center gap-2 rounded-lg bg-zinc-900 py-3 text-sm font-semibold text-white transition-all hover:bg-zinc-800 active:scale-[0.98]"
                          >
                            <Gavel className="size-4 group-hover:animate-gavel-strike" /> Submit Lower Offer
                          </button>
                        </form>
                      )}

                      {/* 5. Standard Direct Buy Now Checkout */}
                      {product.type === "Buy Now" && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <span className="text-xs text-zinc-500 font-medium">Quantity</span>
                            <div className="flex items-center border border-zinc-200 rounded-lg bg-white overflow-hidden shadow-sm">
                              <button
                                type="button"
                                onClick={() => setBuyNowQty(Math.max(1, buyNowQty - 1))}
                                className="px-3 py-2 text-zinc-500 hover:bg-zinc-50"
                              >
                                <Minus className="size-3" />
                              </button>
                              <span className="px-4 text-xs font-semibold text-zinc-800">{buyNowQty}</span>
                              <button
                                type="button"
                                onClick={() => setBuyNowQty(Math.min(product.stock || 1, buyNowQty + 1))}
                                className="px-3 py-2 text-zinc-500 hover:bg-zinc-50"
                              >
                                <Plus className="size-3" />
                              </button>
                            </div>
                            <span className="text-xs text-zinc-400">({product.stock} available)</span>
                          </div>

                          <button
                            onClick={handleAddBuyNowToCart}
                            className="w-full flex items-center justify-center gap-2 rounded-lg bg-brand py-3 text-sm font-semibold text-white transition-all hover:bg-brand/90 shadow active:scale-98"
                          >
                            <ShoppingBag className="size-4" /> Add to Cart & Checkout
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-zinc-200 bg-amber-50/50 p-4 text-center">
                      <p className="text-xs text-amber-800 font-medium">
                        You are logged in as an Administrator. Admins are blocked from placing offers on listings.
                      </p>
                      <Link
                        to="/admin/dashboard"
                        className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-amber-900 underline hover:text-amber-950"
                      >
                        Open Admin Console <ChevronRight className="size-3.5" />
                      </Link>
                    </div>
                  )
                ) : (
                  <div className="rounded-xl border border-zinc-950/5 bg-zinc-50 p-4 text-center">
                    <p className="text-xs text-zinc-500">
                      You must be logged in with a buyer account to bid on auctions or purchase.
                    </p>
                    <div className="mt-4 flex justify-center gap-2">
                      <Link
                        to="/auth/login"
                        className="rounded-lg bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/auth/register"
                        className="rounded-lg border border-zinc-950/10 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors shadow-sm"
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                )
              ) : (
                <div className="rounded-xl bg-zinc-100 p-4 text-center border border-zinc-200">
                  <p className="text-xs text-zinc-500 font-medium">
                    This listing is closed or has settled. Offers are disabled.
                  </p>
                  {product.highestBidderName && (
                    <p className="text-[11px] text-brand font-semibold mt-2">
                      Winning Bid: ₦{currentPrice.toLocaleString()} by {product.highestBidderName}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Bidding Activity Feed Log */}
            {product.type !== "Buy Now" && (
              <div className="rounded-2xl border border-zinc-950/5 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-zinc-950/5 pb-4 mb-4">
                  <h3 className="font-semibold text-zinc-900 text-sm flex items-center gap-2">
                    <History className="size-4 text-zinc-400" />
                    Offers Room Activity
                  </h3>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase">
                    {lotBids.length} Offers
                  </span>
                </div>

                {product.type === "Sealed Bid" && product.status === "active" ? (
                  <div className="py-8 text-center text-zinc-400 text-xs flex flex-col items-center">
                    <Lock className="size-6 text-zinc-300 stroke-1 mb-2" />
                    Bids feed is encrypted for privacy during active bidding.
                  </div>
                ) : lotBids.length === 0 ? (
                  <div className="py-8 text-center text-zinc-400 text-xs">
                    No offers placed yet. Be the first to place a bid!
                  </div>
                ) : (
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {lotBids.map((b, i) => (
                      <div
                        key={b.id}
                        className={`flex items-center justify-between p-3 rounded-lg border text-xs transition-all animate-fade-in-up ${i === 0
                          ? "bg-brand/5 border-brand/20 animate-pulse-bid"
                          : "bg-zinc-50 border-zinc-100"
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`size-2 rounded-full ${i === 0 ? "bg-brand" : "bg-zinc-300"
                              }`}
                          />
                          <div>
                            <p className="font-semibold text-zinc-800">{b.userName}</p>
                            <p className="text-[9px] text-zinc-400">
                              {new Date(b.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                        <span className="font-mono font-bold text-zinc-900">
                          ₦{b.amount.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
