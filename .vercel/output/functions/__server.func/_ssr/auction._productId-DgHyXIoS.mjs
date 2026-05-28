import { a2 as useRouter, P as reactExports, H as jsxRuntimeExports } from "./server-B9xMLAOv.mjs";
import { R as Route$3, j as useStore, L as Link, e as createLucideIcon, p as placeBid, c as buyDutchAuction, b as addToCart } from "./router-DSaVKr07.mjs";
import { C as CountdownTimer } from "./countdown-C7diJynH.mjs";
import { t as toast } from "./index-BGdxJUrd.mjs";
import { b as lotCar, l as lotArt, a as lotBag, c as lotMacbook, h as heroWatch } from "./hero-watch-Ba2e7wSI.mjs";
import { A as ArrowLeft } from "./arrow-left-DM1emS09.mjs";
import { S as ShieldCheck } from "./shield-check-D-Ze7dF3.mjs";
import { a as Truck, G as Gavel, T as TrendingUp } from "./truck-DHgAiw6F.mjs";
import { S as ShoppingBag } from "./shopping-bag-CxU4GZFf.mjs";
import { L as Lock } from "./lock--waskNz-.mjs";
import { P as Plus, H as History } from "./plus-DrxAMe2d.mjs";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$2 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$2);
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }]
];
const Clock = createLucideIcon("clock", __iconNode$1);
const __iconNode = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode);
function AuctionDetailPage() {
  const {
    productId
  } = Route$3.useParams();
  const router = useRouter();
  const {
    products,
    bids,
    currentUser
  } = useStore();
  const product = products.find((p) => p.id === productId);
  const IMAGES = {
    "/src/assets/hero-watch.jpg": heroWatch,
    "/src/assets/lot-macbook.jpg": lotMacbook,
    "/src/assets/lot-bag.jpg": lotBag,
    "/src/assets/lot-art.jpg": lotArt,
    "/src/assets/lot-car.jpg": lotCar
  };
  const getImageSrc = (path) => IMAGES[path] || path;
  const [customBid, setCustomBid] = reactExports.useState("");
  const [buyNowQty, setBuyNowQty] = reactExports.useState(1);
  const [activeTab, setActiveTab] = reactExports.useState("details");
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[50vh] flex-col items-center justify-center py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold text-zinc-900", children: "Listing Not Found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-zinc-500 text-sm", children: "The lot you are looking for does not exist." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products", className: "mt-6 inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4" }),
        " Back to catalog"
      ] })
    ] });
  }
  const currentPrice = product.currentBid || product.price;
  const lotBids = bids.filter((b) => b.productId === product.id).sort((a, b) => b.amount - a.amount);
  const minNextBid = currentPrice + (product.increment || 0);
  reactExports.useEffect(() => {
    if (product.type === "English" || product.type === "Reverse") {
      setCustomBid(String(minNextBid));
    } else if (product.type === "Sealed Bid") {
      setCustomBid(String(product.price));
    }
  }, [product.id, currentPrice, product.increment]);
  const handleQuickBid = (incrementAmount) => {
    const target = minNextBid + incrementAmount;
    setCustomBid(String(target));
  };
  const handlePlaceBid = (e) => {
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
      router.navigate({
        to: "/cart"
      });
    } else {
      toast.error(res.message);
    }
  };
  const handleAddBuyNowToCart = () => {
    const res = addToCart(product.id, buyNowQty, "buy_now");
    if (res.success) {
      toast.success(res.message);
      router.navigate({
        to: "/cart"
      });
    } else {
      toast.error(res.message);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-surface py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "mb-8 flex items-center gap-2 text-xs font-medium text-zinc-500", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-ink transition-colors", children: "Home" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "size-3 text-zinc-400" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "hover:text-ink transition-colors", children: "Catalog" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "size-3 text-zinc-400" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-zinc-950 truncate max-w-[200px]", children: product.title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products", className: "mb-6 inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 transition-colors hover:text-ink", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-3.5" }),
      " Back to Floor Listings"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-12 lg:grid-cols-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-7 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-2xl border border-zinc-950/5 bg-white shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: getImageSrc(product.image), alt: product.title, className: "w-full aspect-[4/3] object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute left-4 top-4 rounded-full border border-zinc-200 bg-white/95 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand shadow-sm", children: [
            product.type,
            " format"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-zinc-950/5 bg-white p-6 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex border-b border-zinc-950/5 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("details"), className: `pb-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === "details" ? "border-brand text-brand" : "border-transparent text-zinc-400 hover:text-zinc-600"}`, children: "Lot Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveTab("escrow"), className: `ml-6 pb-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === "escrow" ? "border-brand text-brand" : "border-transparent text-zinc-400 hover:text-zinc-600"}`, children: "Escrow & Shipping Rules" })
          ] }),
          activeTab === "details" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-zinc-900 mb-3", children: "About this item" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-600 text-sm leading-relaxed whitespace-pre-line", children: product.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-2 gap-4 border-t border-zinc-950/5 pt-6 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-400 uppercase font-semibold", children: "Catalog Category" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-zinc-800 mt-1", children: product.category })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-400 uppercase font-semibold", children: "Verification Trust" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-emerald-600 mt-1 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-3.5" }),
                  "Kilimanjaro Certified"
                ] })
              ] })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 text-sm text-zinc-600 leading-relaxed", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-5 shrink-0 text-brand" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-zinc-900 text-xs", children: "2-Stage Custody Escrow" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-500 text-xs mt-0.5", children: 'Your bid capital is locked safely in regional banking custody (NGN, GBP, or EUR). Funds will NOT be disbursed to the vendor until you receive the lot and click "Confirm Delivery".' })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "size-5 shrink-0 text-brand" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-zinc-900 text-xs", children: "Verified Tracked Transit" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-500 text-xs mt-0.5", children: "Shipping occurs via Kilimanjaro global logistics partners. Tracking codes will populate in your Transactions ledger within 24 hours of checkout." })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-5 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-zinc-950/5 bg-white p-6 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-zinc-950/5 pb-4 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase font-bold tracking-wider text-zinc-400", children: product.type === "Buy Now" ? "Instant Catalog" : "Live Bidding Room" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold tracking-tight text-zinc-900 mt-1", children: product.title })
            ] }),
            product.status === "active" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-1.5 rounded-full bg-emerald-500 animate-ping" }),
              "Live"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 bg-zinc-50 rounded-xl p-4 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase font-bold tracking-wider text-zinc-400", children: product.type === "Buy Now" ? "Price" : product.type === "Reverse" ? "Current Target" : "Current Price" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-2xl font-medium text-zinc-900 mt-1", children: [
                "₦",
                currentPrice.toLocaleString()
              ] }),
              product.type !== "Buy Now" && product.reservePrice && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-zinc-400 mt-0.5", children: [
                "Reserve Price: ₦",
                product.reservePrice.toLocaleString()
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-l border-zinc-950/5 pl-4", children: product.status === "active" && product.endTime ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] uppercase font-bold tracking-wider text-zinc-400 flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-3 text-orange-600 animate-pulse-bid" }),
                "Closing In"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-medium text-orange-600 mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CountdownTimer, { endTime: product.endTime }) })
            ] }) : product.status === "upcoming" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase font-bold tracking-wider text-zinc-400", children: "Starts At" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-blue-600 mt-1", children: product.startsAt ? new Date(product.startsAt).toLocaleString() : "TBD" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase font-bold tracking-wider text-zinc-400", children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-zinc-500 mt-1 capitalize", children: product.status === "sold" ? "Sold / Closed" : product.status })
            ] }) })
          ] }),
          product.status === "active" ? currentUser ? currentUser.role === "buyer" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            product.type === "English" && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handlePlaceBid, className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-xs text-zinc-500 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "Min Next Bid: ₦",
                    minNextBid.toLocaleString()
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "Increment: ₦",
                    product.increment?.toLocaleString()
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400 font-medium text-sm", children: "₦" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: customBid, onChange: (e) => setCustomBid(e.target.value), min: minNextBid, step: product.increment, className: "w-full rounded-lg border border-zinc-950/10 py-3 pl-8 pr-4 text-sm ring-brand/10 transition-shadow focus:border-brand focus:outline-none focus:ring-4", placeholder: String(minNextBid) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: ["+50k", "+100k", "+500k"].map((val) => {
                const amount = val.includes("500k") ? 5e5 : val.includes("100k") ? 1e5 : 5e4;
                return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => handleQuickBid(amount), className: "rounded-lg border border-zinc-950/10 bg-zinc-50 py-2 text-xs font-semibold hover:bg-zinc-100 transition-colors", children: val }, val);
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "w-full flex items-center justify-center gap-2 rounded-lg bg-zinc-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 shadow", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Gavel, { className: "size-4" }),
                " Place Ascending Bid"
              ] })
            ] }),
            product.type === "Dutch" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-zinc-500 leading-relaxed", children: [
                "Dutch prices decrease automatically until a buyer claims the item. Click the button to buy immediately at the current price of ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
                  "₦",
                  product.price.toLocaleString()
                ] }),
                "."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleBuyDutch, className: "w-full flex items-center justify-center gap-2 rounded-lg bg-brand py-3 text-sm font-semibold text-white transition-all hover:bg-brand/90 shadow active:scale-98", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "size-4" }),
                " Claim at ₦",
                product.price.toLocaleString()
              ] })
            ] }),
            product.type === "Sealed Bid" && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handlePlaceBid, className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-zinc-50 border border-zinc-200/50 p-3 flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "size-4 text-blue-600 shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-zinc-500 leading-relaxed", children: "This is a Sealed Bid auction. Offers are hidden. The highest offer submitted at the end of the duration wins the lot at their bid. Enter your maximum offer:" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs text-zinc-500 mb-1.5", children: "Your Private Bid (₦)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400 font-medium", children: "₦" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: customBid, onChange: (e) => setCustomBid(e.target.value), min: product.price, className: "w-full rounded-lg border border-zinc-950/10 py-3 pl-8 pr-4 text-sm ring-brand/10 transition-shadow focus:border-brand focus:outline-none focus:ring-4", placeholder: String(product.price) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "w-full flex items-center justify-center gap-2 rounded-lg bg-zinc-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 shadow", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Gavel, { className: "size-4" }),
                " Submit Confidential Offer"
              ] })
            ] }),
            product.type === "Reverse" && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handlePlaceBid, className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-zinc-50 border border-zinc-200/50 p-3 flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "size-4 text-purple-600 shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-zinc-500 leading-relaxed", children: [
                  "Vendors compete by placing lower bids to fulfill this procurement brief. Your bid must be lower than the current price of ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
                    "₦",
                    currentPrice.toLocaleString()
                  ] }),
                  "."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400 font-medium", children: "₦" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: customBid, onChange: (e) => setCustomBid(e.target.value), max: currentPrice - 1, className: "w-full rounded-lg border border-zinc-950/10 py-3 pl-8 pr-4 text-sm focus:border-brand focus:outline-none", placeholder: String(currentPrice - 1e4) })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "w-full flex items-center justify-center gap-2 rounded-lg bg-zinc-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Gavel, { className: "size-4" }),
                " Submit Lower Offer"
              ] })
            ] }),
            product.type === "Buy Now" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-zinc-500 font-medium", children: "Quantity" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border border-zinc-200 rounded-lg bg-white overflow-hidden shadow-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setBuyNowQty(Math.max(1, buyNowQty - 1)), className: "px-3 py-2 text-zinc-500 hover:bg-zinc-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "size-3" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-4 text-xs font-semibold text-zinc-800", children: buyNowQty }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setBuyNowQty(Math.min(product.stock || 1, buyNowQty + 1)), className: "px-3 py-2 text-zinc-500 hover:bg-zinc-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-3" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-zinc-400", children: [
                  "(",
                  product.stock,
                  " available)"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleAddBuyNowToCart, className: "w-full flex items-center justify-center gap-2 rounded-lg bg-brand py-3 text-sm font-semibold text-white transition-all hover:bg-brand/90 shadow active:scale-98", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "size-4" }),
                " Add to Cart & Checkout"
              ] })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-zinc-200 bg-amber-50/50 p-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-800 font-medium", children: "You are logged in as an Administrator. Admins are blocked from placing offers on listings." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/dashboard", className: "mt-3 inline-flex items-center gap-1 text-xs font-semibold text-amber-900 underline hover:text-amber-950", children: [
              "Open Admin Console ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "size-3.5" })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-zinc-950/5 bg-zinc-50 p-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-zinc-500", children: "You must be logged in with a buyer account to bid on auctions or purchase." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex justify-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth/login", className: "rounded-lg bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors", children: "Sign In" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth/register", className: "rounded-lg border border-zinc-950/10 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors shadow-sm", children: "Register" })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-zinc-100 p-4 text-center border border-zinc-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-zinc-500 font-medium", children: "This listing is closed or has settled. Offers are disabled." }),
            product.highestBidderName && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-brand font-semibold mt-2", children: [
              "Winning Bid: ₦",
              currentPrice.toLocaleString(),
              " by ",
              product.highestBidderName
            ] })
          ] })
        ] }),
        product.type !== "Buy Now" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-zinc-950/5 bg-white p-6 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-zinc-950/5 pb-4 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-zinc-900 text-sm flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "size-4 text-zinc-400" }),
              "Offers Room Activity"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-bold text-zinc-400 uppercase", children: [
              lotBids.length,
              " Offers"
            ] })
          ] }),
          product.type === "Sealed Bid" && product.status === "active" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-8 text-center text-zinc-400 text-xs flex flex-col items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "size-6 text-zinc-300 stroke-1 mb-2" }),
            "Bids feed is encrypted for privacy during active bidding."
          ] }) : lotBids.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-8 text-center text-zinc-400 text-xs", children: "No offers placed yet. Be the first to place a bid!" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-h-60 overflow-y-auto pr-1", children: lotBids.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center justify-between p-3 rounded-lg border text-xs transition-all ${i === 0 ? "bg-brand/5 border-brand/20 animate-pulse-bid" : "bg-zinc-50 border-zinc-100"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `size-2 rounded-full ${i === 0 ? "bg-brand" : "bg-zinc-300"}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-zinc-800", children: b.userName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-zinc-400", children: new Date(b.timestamp).toLocaleTimeString() })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-bold text-zinc-900", children: [
              "₦",
              b.amount.toLocaleString()
            ] })
          ] }, b.id)) })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  AuctionDetailPage as component
};
