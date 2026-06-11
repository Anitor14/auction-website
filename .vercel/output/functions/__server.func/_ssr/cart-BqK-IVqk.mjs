import { a2 as useRouter, P as reactExports, H as jsxRuntimeExports } from "./server-DzVaOEge.mjs";
import { j as useStore, L as Link, g as removeFromCart, W as Wallet, S as Sparkles, e as createLucideIcon, d as checkoutCart, t as topUpWallet } from "./router-DJW8gmps.mjs";
import { t as toast } from "./index-BOlsHHHl.mjs";
import { b as lotCar, l as lotArt, a as lotBag, c as lotMacbook, h as heroWatch } from "./hero-watch-Ba2e7wSI.mjs";
import { S as ShoppingBag } from "./shopping-bag-D9cpI2uJ.mjs";
import { C as CircleCheckBig } from "./circle-check-big-C08f_D9K.mjs";
import { A as ArrowRight } from "./arrow-right-BJ8sesk6.mjs";
import { S as ShieldCheck } from "./shield-check-BMu97Egj.mjs";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$2 = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode$2);
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode$1);
const __iconNode = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
function CartPage() {
  const {
    cart,
    currentUser
  } = useStore();
  useRouter();
  const [paymentMethod, setPaymentMethod] = reactExports.useState("wallet");
  const [isSuccess, setIsSuccess] = reactExports.useState(false);
  const [cardNum, setCardNum] = reactExports.useState("");
  const [cardExp, setCardExp] = reactExports.useState("");
  const [cardCvv, setCardCvv] = reactExports.useState("");
  const IMAGES = {
    "/src/assets/hero-watch.jpg": heroWatch,
    "/src/assets/lot-macbook.jpg": lotMacbook,
    "/src/assets/lot-bag.jpg": lotBag,
    "/src/assets/lot-art.jpg": lotArt,
    "/src/assets/lot-car.jpg": lotCar
  };
  const getImageSrc = (path) => IMAGES[path] || path;
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const escrowFee = subtotal * 0.02;
  const shippingFee = subtotal > 0 ? 5e4 : 0;
  const grandTotal = subtotal + escrowFee + shippingFee;
  const hasInsufficientWallet = currentUser !== null && paymentMethod === "wallet" && currentUser.walletBalance < grandTotal;
  const handleCheckout = (e) => {
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
    const topUpAmount = Math.ceil(need / 1e5) * 1e5;
    topUpWallet(topUpAmount);
    toast.success(`Credited ₦${topUpAmount.toLocaleString()} to your wallet balance!`);
  };
  if (!currentUser) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[50vh] flex-col items-center justify-center py-20 text-center px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "size-12 text-zinc-400 stroke-1 mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-zinc-900", children: "Your Cart" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-zinc-500 text-sm max-w-sm", children: "Please log in to view items in your shopping cart or complete transactions." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth/login", className: "mt-6 rounded-lg bg-zinc-900 px-6 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-zinc-800", children: "Sign In" })
    ] });
  }
  if (isSuccess) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-xl px-6 py-24 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "size-8" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl font-semibold tracking-tight text-zinc-900", children: "Escrow Custody Active" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-zinc-500 text-sm leading-relaxed", children: [
        "Your payment of ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
          "₦",
          grandTotal.toLocaleString()
        ] }),
        " has been successfully secured in our multi-sig custody account. The vendor has been notified to prepare and ship your lots."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 rounded-xl border border-zinc-950/5 bg-zinc-50 p-5 text-left text-xs space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-semibold text-zinc-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Funding Method:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "capitalize", children: [
            paymentMethod,
            " Payment"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-zinc-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Escrow Agent:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Kilimanjaro Bids Ltd." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-zinc-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Escrow Status:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-emerald-600", children: "Funded / Secured" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-col sm:flex-row justify-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/transactions", className: "flex items-center justify-center gap-1.5 rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800", children: [
          "Track Escrow & Shipment ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "rounded-lg border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-colors", children: "Back to Catalog" })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-surface py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-widest text-brand", children: "Checkout Desk" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-5xl font-medium tracking-tight", children: "Shopping Cart" })
    ] }),
    cart.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-center border border-dashed border-zinc-950/10 rounded-2xl bg-zinc-50/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "size-12 text-zinc-400 stroke-1 mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-zinc-800 text-sm", children: "Your cart is empty" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-zinc-500 max-w-xs", children: "Go bid on active auctions or add Buy Now items from the floor catalog to populate checkout." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "mt-6 rounded-lg bg-zinc-900 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-zinc-800", children: "Browse Catalog" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-12 lg:grid-cols-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-7 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold uppercase tracking-wider text-zinc-400 mb-2", children: "Items Summary" }),
        cart.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 rounded-xl border border-zinc-950/5 bg-white p-4 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: getImageSrc(item.productImage), alt: item.productTitle, className: "size-16 rounded-lg object-cover bg-zinc-50 border shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block rounded-full border px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider ${item.type === "auction_win" ? "bg-amber-50 text-amber-700 border-amber-200/50" : "bg-zinc-50 text-zinc-700 border-zinc-200/50"}`, children: item.type === "auction_win" ? "Auction Win" : "Buy It Now" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-zinc-800 text-sm truncate mt-1", children: item.productTitle }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-mono font-bold text-zinc-900 mt-1", children: [
              "₦",
              item.price.toLocaleString(),
              " ",
              item.quantity > 1 && `x ${item.quantity}`
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeFromCart(item.productId), className: "flex size-8 items-center justify-center rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" }) })
        ] }, item.productId)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-emerald-100 bg-emerald-50/20 p-5 flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-5 text-emerald-600 shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold text-emerald-800", children: "Escrow Security Covered" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-emerald-700 leading-relaxed mt-1", children: "Funds are secured in multi-currency bank accounts managed by Kilimanjaro. Payout is released to the seller only when delivery transit matches specifications and you authorize clearance." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-5 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold uppercase tracking-wider text-zinc-400 mb-2", children: "Payment" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-zinc-950/5 bg-white p-6 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3.5 border-b border-zinc-950/5 pb-4 mb-6 text-xs text-zinc-500", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Items Subtotal:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-zinc-800", children: [
                "₦",
                subtotal.toLocaleString()
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                "Escrow Custody Fee (2%):",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { title: "Fee to cover multi-sig transaction routing and verification mechanisms.", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "size-3 text-zinc-400 cursor-pointer" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-zinc-800", children: [
                "₦",
                escrowFee.toLocaleString()
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Insured Courier Delivery:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-zinc-800", children: [
                "₦",
                shippingFee.toLocaleString()
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm font-semibold text-zinc-900 border-t border-zinc-950/5 pt-3.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total Bill:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-brand", children: [
                "₦",
                grandTotal.toLocaleString()
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleCheckout, className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-zinc-600 mb-3", children: "Choose Payment Method" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setPaymentMethod("wallet"), className: `rounded-lg border p-3.5 text-center flex flex-col items-center justify-center transition-all ${paymentMethod === "wallet" ? "border-brand bg-brand/5 text-brand" : "border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50"}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "size-4 mb-1" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold", children: "Kilimanjaro Wallet" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] opacity-75 mt-0.5", children: [
                    "Bal: ₦",
                    currentUser.walletBalance.toLocaleString()
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setPaymentMethod("card"), className: `rounded-lg border p-3.5 text-center flex flex-col items-center justify-center transition-all ${paymentMethod === "card" ? "border-zinc-800 bg-zinc-50 text-zinc-900" : "border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50"}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "size-4 mb-1" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold", children: "Insured Card Link" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] opacity-75 mt-0.5", children: "Visa/Mastercard" })
                ] })
              ] })
            ] }),
            hasInsufficientWallet && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-red-50 border border-red-200/50 p-4 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-800 font-medium", children: "Insufficient balance in your Kilimanjaro wallet." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: handleQuickFund, className: "mt-3.5 inline-flex items-center gap-1 rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 transition-colors", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-3.5" }),
                " Instant Demo Fund (₦",
                (grandTotal - currentUser.walletBalance).toLocaleString(),
                ")"
              ] })
            ] }),
            paymentMethod === "card" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3.5 border border-zinc-200 rounded-xl p-4 bg-zinc-50/50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1", children: "Card Number" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "4111 2222 3333 4444", value: cardNum, onChange: (e) => setCardNum(e.target.value), className: "w-full rounded-md border border-zinc-950/10 bg-white px-2.5 py-1.5 text-xs focus:border-brand focus:outline-none", required: true })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1", children: "Expiry Date" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "MM/YY", value: cardExp, onChange: (e) => setCardExp(e.target.value), className: "w-full rounded-md border border-zinc-950/10 bg-white px-2.5 py-1.5 text-xs focus:border-brand focus:outline-none", required: true })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1", children: "CVV Code" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", placeholder: "123", maxLength: 3, value: cardCvv, onChange: (e) => setCardCvv(e.target.value), className: "w-full rounded-md border border-zinc-950/10 bg-white px-2.5 py-1.5 text-xs focus:border-brand focus:outline-none", required: true })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: hasInsufficientWallet, className: "w-full flex items-center justify-center gap-1.5 rounded-lg bg-zinc-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed shadow", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-4" }),
              " Secure Funds in Escrow"
            ] })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  CartPage as component
};
