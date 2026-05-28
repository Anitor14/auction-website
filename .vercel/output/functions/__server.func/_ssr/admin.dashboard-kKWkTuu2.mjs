import { a2 as useRouter, H as jsxRuntimeExports } from "./server-B9xMLAOv.mjs";
import { j as useStore, L as Link, e as createLucideIcon, h as resetStore, s as startAuctionNow, f as endAuctionEarly, u as updateEscrowStatus } from "./router-DSaVKr07.mjs";
import { t as toast } from "./index-BGdxJUrd.mjs";
import { C as CountdownTimer } from "./countdown-C7diJynH.mjs";
import { b as lotCar, l as lotArt, a as lotBag, c as lotMacbook, h as heroWatch } from "./hero-watch-Ba2e7wSI.mjs";
import { T as TrendingUp, G as Gavel, a as Truck } from "./truck-DHgAiw6F.mjs";
import { S as ShieldCheck } from "./shield-check-D-Ze7dF3.mjs";
import { C as CircleCheckBig } from "./circle-check-big-DK5SAtL1.mjs";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$5 = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$5);
const __iconNode$4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M12 8v8", key: "napkw2" }]
];
const CirclePlus = createLucideIcon("circle-plus", __iconNode$4);
const __iconNode$3 = [
  ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
  ["path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", key: "1b0p4s" }]
];
const DollarSign = createLucideIcon("dollar-sign", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
function AdminDashboardPage() {
  const {
    products,
    bids,
    transactions,
    currentUser
  } = useStore();
  const router = useRouter();
  if (!currentUser || currentUser.role !== "admin") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[60vh] flex-col items-center justify-center py-20 text-center px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "size-12 text-amber-500 mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-zinc-950", children: "Access Restriction" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-zinc-500 text-sm max-w-sm", children: "This portal requires administrator authorization levels. Please log in with a console key." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/login", className: "mt-6 rounded-lg bg-zinc-950 px-6 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-zinc-900", children: "Open Admin Login" })
    ] });
  }
  const totalGMV = transactions.filter((t) => t.status === "disbursed" || t.status === "delivered" || t.status === "shipped" || t.status === "escrow_funded").reduce((sum, t) => sum + t.amount, 0) + 41285e4;
  const activeCount = products.filter((p) => p.status === "active").length;
  const escrowHoldings = transactions.filter((t) => t.status === "escrow_funded" || t.status === "shipped" || t.status === "delivered").reduce((sum, t) => sum + t.amount, 0);
  const completedCount = products.filter((p) => p.status === "sold" || p.status === "closed").length;
  const settlementRate = completedCount > 0 ? Math.round(completedCount / (completedCount + activeCount) * 100) : 87;
  const IMAGES = {
    "/src/assets/hero-watch.jpg": heroWatch,
    "/src/assets/lot-macbook.jpg": lotMacbook,
    "/src/assets/lot-bag.jpg": lotBag,
    "/src/assets/lot-art.jpg": lotArt,
    "/src/assets/lot-car.jpg": lotCar
  };
  const getImageSrc = (path) => IMAGES[path] || path;
  const handleStartAuction = (id) => {
    startAuctionNow(id);
    toast.success("Auction listing has been activated successfully!");
  };
  const handleEndAuction = (id) => {
    endAuctionEarly(id);
    toast.success("Auction ended early. Bids analyzed, winner declared!");
  };
  const handleEscrowAction = (id, status) => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-zinc-50 min-h-screen py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-6 mb-8 border-zinc-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2 rounded-full bg-emerald-500 animate-ping" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-zinc-400", children: "Authorized System Console" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl font-medium tracking-tight text-zinc-950 mt-2", children: "Platform Dashboard" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/products/new", className: "flex items-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-zinc-800 shadow", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "size-4" }),
          "Upload Product"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleResetPlatform, className: "flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 shadow-sm", title: "Reset platform states for demo testing", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "size-4" }),
          "Reset Demo"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10", children: [{
      title: "Total GMV (NGN)",
      value: `₦${totalGMV.toLocaleString()}`,
      sub: "+12.4% vs last quarter",
      icon: TrendingUp,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100"
    }, {
      title: "Active Listings",
      value: activeCount,
      sub: "Live auctions in progress",
      icon: Gavel,
      color: "text-blue-600 bg-blue-50 border-blue-100"
    }, {
      title: "Escrow Pool",
      value: `₦${escrowHoldings.toLocaleString()}`,
      sub: "Funds locked in custody",
      icon: DollarSign,
      color: "text-orange-600 bg-orange-50 border-orange-100"
    }, {
      title: "Sell-Through Rate",
      value: `${settlementRate}%`,
      sub: "Completed vs Total lots",
      icon: Activity,
      color: "text-purple-600 bg-purple-50 border-purple-100"
    }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-zinc-200 bg-white p-5 shadow-sm flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-wider text-zinc-400", children: s.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-3xl font-medium tracking-tight text-zinc-900 mt-2", children: s.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-zinc-500 mt-1", children: s.sub })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-2 rounded-lg border ${s.color}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "size-4" }) })
    ] }, s.title)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-8 lg:grid-cols-12 mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-zinc-900 text-sm mb-6 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Gavel, { className: "size-4 text-zinc-400" }),
          "Auctions floor controller"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-xs border-collapse", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-zinc-100 text-zinc-400 font-bold uppercase tracking-wider text-[9px] pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3 pr-4", children: "Lot" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3 pr-4", children: "Format" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3 pr-4", children: "Price / High Bid" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3 pr-4", children: "Time Remaining" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3 text-right", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-zinc-50", children: products.map((p) => {
            const price = p.currentBid || p.price;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-zinc-50/50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: getImageSrc(p.image), alt: p.title, className: "size-10 rounded-md object-cover border bg-zinc-50 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-zinc-900 truncate max-w-[150px]", children: p.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-zinc-400 capitalize", children: p.category })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 pr-4 font-semibold text-zinc-600", children: p.type }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3.5 pr-4 font-mono font-bold text-zinc-800", children: [
                "₦",
                price.toLocaleString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 pr-4 text-zinc-500 font-medium", children: p.status === "active" && p.endTime ? /* @__PURE__ */ jsxRuntimeExports.jsx(CountdownTimer, { endTime: p.endTime, className: "text-orange-600 font-semibold" }) : p.status === "upcoming" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-600 font-semibold", children: "Upcoming" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize text-zinc-400", children: p.status }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1.5", children: [
                p.status === "upcoming" || p.status === "draft" ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleStartAuction(p.id), className: "rounded-md bg-zinc-900 text-white px-2.5 py-1.5 font-bold hover:bg-zinc-800", children: "Start Live" }) : p.status === "active" ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleEndAuction(p.id), className: "rounded-md bg-red-50 text-red-700 px-2.5 py-1.5 font-bold hover:bg-red-100 border border-red-100", children: "End Early" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-zinc-400 font-medium", children: "Closed" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auction/$productId", params: {
                  productId: p.id
                }, className: "p-1.5 rounded-md hover:bg-zinc-100 text-zinc-400 hover:text-zinc-950", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "size-4" }) })
              ] }) })
            ] }, p.id);
          }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm flex flex-col h-[400px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-zinc-900 text-sm mb-4 flex items-center gap-2 border-b pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "size-4 text-brand" }),
          "Live Bid Room Stream"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto space-y-3 pr-1", children: bids.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-zinc-400 text-center text-xs py-10", children: "No bid logs received yet." }) : bids.slice().reverse().map((b) => {
          const prod = products.find((p) => p.id === b.productId);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-zinc-100 bg-zinc-50 p-2.5 text-xs flex flex-col gap-1 border-l-4 border-l-brand", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[10px] text-zinc-400 font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: b.userName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(b.timestamp).toLocaleTimeString() })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-zinc-800 line-clamp-1", children: prod?.title || "Lot Item" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono font-bold text-zinc-900", children: [
              "₦",
              b.amount.toLocaleString()
            ] })
          ] }, b.id);
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-zinc-900 text-sm mb-6 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-4 text-emerald-600" }),
        "Escrow Settlement Ledger"
      ] }),
      transactions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-12 text-center text-zinc-400 text-xs", children: "No transactions currently locked in escrow. Test this by purchasing an item." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-xs border-collapse", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-zinc-100 text-zinc-400 font-bold uppercase tracking-wider text-[9px] pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3 pr-4", children: "Tx ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3 pr-4", children: "Item Detail" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3 pr-4", children: "Buyer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3 pr-4", children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3 pr-4", children: "Escrow Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3 text-right", children: "Escrow Settlement Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-zinc-50", children: transactions.map((tx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-zinc-50/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 pr-4 font-mono font-semibold text-zinc-500", children: tx.id }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: getImageSrc(tx.productImage), alt: tx.productTitle, className: "size-8 rounded-md object-cover border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-zinc-800 truncate max-w-[130px]", children: tx.productTitle })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 pr-4 font-medium text-zinc-600", children: tx.buyerName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3.5 pr-4 font-mono font-bold text-zinc-900", children: [
            "₦",
            tx.amount.toLocaleString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 pr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${tx.status === "disbursed" ? "bg-emerald-100 text-emerald-800" : tx.status === "refunded" ? "bg-red-100 text-red-800" : tx.status === "shipped" ? "bg-blue-100 text-blue-800" : "bg-orange-100 text-orange-850"}`, children: tx.status.replace("_", " ") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
            tx.status === "escrow_funded" && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleEscrowAction(tx.id, "shipped"), className: "flex items-center gap-1 rounded-md border border-blue-200 bg-blue-50 text-blue-700 px-2 py-1 hover:bg-blue-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "size-3" }),
              " Ship"
            ] }),
            (tx.status === "escrow_funded" || tx.status === "shipped" || tx.status === "delivered") && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleEscrowAction(tx.id, "disbursed"), className: "flex items-center gap-1 rounded-md border border-emerald-250 bg-emerald-50 text-emerald-850 px-2 py-1 hover:bg-emerald-100", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "size-3" }),
                " Disburse"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleEscrowAction(tx.id, "refunded"), className: "flex items-center gap-1 rounded-md border border-red-200 bg-red-50 text-red-700 px-2 py-1 hover:bg-red-100", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "size-3" }),
                " Refund"
              ] })
            ] }),
            (tx.status === "disbursed" || tx.status === "refunded") && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-zinc-400 font-medium", children: "Settled" })
          ] }) })
        ] }, tx.id)) })
      ] }) })
    ] })
  ] }) });
}
export {
  AdminDashboardPage as component
};
