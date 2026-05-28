import { P as reactExports, H as jsxRuntimeExports } from "./server-B9xMLAOv.mjs";
import { j as useStore, W as Wallet, L as Link, e as createLucideIcon, t as topUpWallet, w as withdrawWallet, u as updateEscrowStatus } from "./router-DSaVKr07.mjs";
import { t as toast } from "./index-BGdxJUrd.mjs";
import { b as lotCar, l as lotArt, a as lotBag, c as lotMacbook, h as heroWatch } from "./hero-watch-Ba2e7wSI.mjs";
import { P as Plus, H as History } from "./plus-DrxAMe2d.mjs";
import { C as CircleCheckBig } from "./circle-check-big-DK5SAtL1.mjs";
import { L as Lock } from "./lock--waskNz-.mjs";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$1 = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
];
const ArrowUpRight = createLucideIcon("arrow-up-right", __iconNode$1);
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const CircleQuestionMark = createLucideIcon("circle-question-mark", __iconNode);
function TransactionsPage() {
  const {
    transactions,
    currentUser
  } = useStore();
  const [topUpAmount, setTopUpAmount] = reactExports.useState("");
  const [withdrawAmount, setWithdrawAmount] = reactExports.useState("");
  const [showTopUp, setShowTopUp] = reactExports.useState(false);
  const [showWithdraw, setShowWithdraw] = reactExports.useState(false);
  const IMAGES = {
    "/src/assets/hero-watch.jpg": heroWatch,
    "/src/assets/lot-macbook.jpg": lotMacbook,
    "/src/assets/lot-bag.jpg": lotBag,
    "/src/assets/lot-art.jpg": lotArt,
    "/src/assets/lot-car.jpg": lotCar
  };
  const getImageSrc = (path) => IMAGES[path] || path;
  if (!currentUser) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[50vh] flex-col items-center justify-center py-20 text-center px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "size-12 text-zinc-400 stroke-1 mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-zinc-900", children: "Wallet & Transactions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-zinc-500 text-sm max-w-sm", children: "Please log in to manage your bidding wallet, deposit capital, or view escrow transaction histories." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth/login", className: "mt-6 rounded-lg bg-zinc-900 px-6 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-zinc-800", children: "Sign In" })
    ] });
  }
  const userTransactions = transactions.filter((t) => t.buyerId === currentUser.id);
  const handleDepositSubmit = (e) => {
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
  const handleWithdrawSubmit = (e) => {
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
  const handleConfirmDelivery = (txId) => {
    const res = updateEscrowStatus(txId, "disbursed");
    if (res.success) {
      toast.success("Delivery confirmed. Escrow disbursement released to vendor.");
    } else {
      toast.error(res.message);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-surface py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-widest text-brand", children: "Bidding Ledger" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-5xl font-medium tracking-tight", children: "Wallet & Escrow Vault" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-8 lg:grid-cols-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-4 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-bold uppercase tracking-wider text-zinc-400", children: "Your Wallet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-zinc-950/5 bg-zinc-900 p-6 text-white shadow-lg relative overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-10 bg-radial-gradient", style: {
            backgroundImage: "radial-gradient(circle at 100% 0%, var(--brand) 0%, transparent 60%)"
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-zinc-400", children: "Available bidding capital" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-4xl font-medium mt-2", children: [
                "₦",
                currentUser.walletBalance.toLocaleString()
              ] })
            ] }),
            currentUser.role === "buyer" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
                setShowTopUp(true);
                setShowWithdraw(false);
              }, className: "flex items-center justify-center gap-1 rounded-lg bg-brand px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-brand/90", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-3.5" }),
                " Deposit"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
                setShowWithdraw(true);
                setShowTopUp(false);
              }, className: "flex items-center justify-center gap-1 rounded-lg bg-zinc-800 px-4 py-2.5 text-xs font-semibold text-zinc-200 transition-colors hover:bg-zinc-700", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "size-3.5" }),
                " Withdraw"
              ] })
            ] })
          ] })
        ] }),
        showTopUp && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleDepositSubmit, className: "rounded-2xl border border-zinc-950/5 bg-white p-5 shadow-sm space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center border-b pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-zinc-800 text-xs", children: "Deposit Demo Capital" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowTopUp(false), className: "text-xs text-zinc-400 hover:text-zinc-600", children: "Cancel" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] font-semibold text-zinc-500 mb-1", children: "Deposit Amount (₦)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400 font-medium", children: "₦" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", placeholder: "5,000,000", value: topUpAmount, onChange: (e) => setTopUpAmount(e.target.value), className: "w-full rounded-lg border border-zinc-950/10 bg-white py-2 pl-7 pr-4 text-xs focus:border-brand focus:outline-none", required: true })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "w-full rounded-lg bg-zinc-900 py-2 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors", children: "Fund Wallet Balance" })
        ] }),
        showWithdraw && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleWithdrawSubmit, className: "rounded-2xl border border-zinc-950/5 bg-white p-5 shadow-sm space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center border-b pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-zinc-800 text-xs", children: "Withdraw Bidding Capital" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowWithdraw(false), className: "text-xs text-zinc-400 hover:text-zinc-600", children: "Cancel" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] font-semibold text-zinc-500 mb-1", children: "Withdraw Amount (₦)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400 font-medium", children: "₦" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", placeholder: "1,000,000", value: withdrawAmount, onChange: (e) => setWithdrawAmount(e.target.value), className: "w-full rounded-lg border border-zinc-950/10 bg-white py-2 pl-7 pr-4 text-xs focus:border-brand focus:outline-none", required: true })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "w-full rounded-lg bg-zinc-900 py-2 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors", children: "Withdraw Capital" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-zinc-950/5 bg-zinc-50/50 p-4 space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleQuestionMark, { className: "size-4 text-zinc-400 shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-semibold text-zinc-800", children: "How Escrow works here?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-zinc-500 mt-1 leading-relaxed", children: [
              'When you win an auction or complete a buy-now purchase, your money enters a locked escrow status. The vendor ships the package and tags it as "Shipped" in our admin system. Once you physically receive the item, verify its parameters and click ',
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Confirm Delivery" }),
              " on this page to release custody payout."
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-8 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-bold uppercase tracking-wider text-zinc-400", children: "Escrow Transaction Ledger" }),
        userTransactions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-center border border-dashed border-zinc-950/10 rounded-2xl bg-zinc-50/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "size-10 text-zinc-400 stroke-1 mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-zinc-800 text-sm", children: "No transactions logged" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-zinc-500 max-w-xs", children: "Your transaction ledger is empty. Add Buy Now products to your cart or place high bids to win live auctions." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", className: "mt-6 rounded-lg bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors", children: "Enter Auction Floor" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-zinc-950/5 bg-white overflow-hidden shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-xs border-collapse", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-zinc-50 border-b border-zinc-950/5 text-zinc-400 font-bold uppercase tracking-wider text-[9px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-4 px-6", children: "Transaction ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-4 px-6", children: "Lot Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-4 px-6", children: "Settled Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-4 px-6", children: "Principal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-4 px-6", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-4 px-6 text-right", children: "Escrow Action" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-zinc-950/5", children: userTransactions.map((tx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-zinc-50/50 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-4 px-6 font-mono font-semibold text-zinc-500", children: tx.id }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-4 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: getImageSrc(tx.productImage), alt: tx.productTitle, className: "size-8 rounded-md object-cover border shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-zinc-800 truncate max-w-[130px]", children: tx.productTitle })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-4 px-6 text-zinc-500", children: new Date(tx.date).toLocaleDateString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-4 px-6 font-mono font-bold text-zinc-900", children: [
              "₦",
              tx.amount.toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-4 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${tx.status === "disbursed" ? "bg-emerald-50 text-emerald-700 border-emerald-200/50" : tx.status === "refunded" ? "bg-red-50 text-red-700 border-red-200/50" : tx.status === "shipped" ? "bg-blue-50 text-blue-700 border-blue-200/50" : "bg-orange-50 text-orange-700 border-orange-200/50"}`, children: tx.status.replace("_", " ") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-4 px-6 text-right", children: tx.status === "shipped" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleConfirmDelivery(tx.id), className: "inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-700 shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "size-3.5" }),
              " Confirm Delivery"
            ] }) : tx.status === "escrow_funded" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-zinc-400 font-medium flex items-center justify-end gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "size-3 text-zinc-400" }),
              " Wait for shipment"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-zinc-400 font-medium", children: "Completed" }) })
          ] }, tx.id)) })
        ] }) }) })
      ] })
    ] })
  ] }) });
}
export {
  TransactionsPage as component
};
