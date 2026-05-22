import { H as jsxRuntimeExports } from "./server-Cfk_oS8j.mjs";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const heroWatch = "/assets/hero-watch-DpWRVUr6.jpg";
const lotMacbook = "/assets/lot-macbook-CljSjcfm.jpg";
const lotBag = "/assets/lot-bag-DVu21tcA.jpg";
const lotArt = "/assets/lot-art-CxrcEJgn.jpg";
const lotCar = "/assets/lot-car-CweIejGh.jpg";
const tickerItems = ["LAGOS: 2022 TOYOTA PRADO — CURRENT BID ₦42,500,000", "LONDON: ROLEX DATEJUST 41 — CURRENT BID £9,200", "ABUJA: LUXURY PENTHOUSE GWARINPA — STARTS IN 2H", "BERLIN: HASSELBLAD 907X — CURRENT BID €4,800", "ACCRA: BENIN BRONZE HEAD — CURRENT BID $45,200"];
const lots = [{
  image: lotMacbook,
  category: "Electronics",
  type: "English Auction",
  typeColor: "text-emerald-600",
  title: "MacBook Pro M1 Max 64GB",
  leftLabel: "Current Bid",
  leftValue: "₦1,450,000",
  rightLabel: "Ends In",
  rightValue: "04:12:09",
  rightColor: "text-orange-600"
}, {
  image: lotBag,
  category: "Luxury",
  type: "Sealed Bid",
  typeColor: "text-blue-600",
  title: "Chanel Classic Flap Bag",
  leftLabel: "Est. Value",
  leftValue: "₦3,200,000",
  rightLabel: "Status",
  rightValue: "Verified",
  rightColor: "text-emerald-600"
}, {
  image: lotArt,
  category: "Art",
  type: "Dutch Auction",
  typeColor: "text-orange-600",
  title: "'Genesis' by Kolawole",
  leftLabel: "Current Price",
  leftValue: "₦850,000",
  rightLabel: "Drops",
  rightValue: "Every 1h",
  rightColor: "text-ink"
}, {
  image: lotCar,
  category: "Automotive",
  type: "English Auction",
  typeColor: "text-emerald-600",
  title: "2021 Acura TLX Tech",
  leftLabel: "Highest Bid",
  leftValue: "₦24,000,000",
  rightLabel: "Ends In",
  rightValue: "00:45:12",
  rightColor: "text-orange-600"
}];
const auctionTypes = [{
  code: "01",
  name: "English",
  desc: "Open ascending bids. Highest offer at close wins the lot."
}, {
  code: "02",
  name: "Dutch",
  desc: "Price descends until a buyer accepts. Ideal for time-sensitive inventory."
}, {
  code: "03",
  name: "Sealed Bid",
  desc: "Private one-shot offers. Discreet for high-value real estate and art."
}, {
  code: "04",
  name: "Reverse",
  desc: "Vendors compete to fulfill buyer briefs. Built for B2B procurement."
}];
const categories = ["Electronics", "Luxury Watches", "Fine Art", "Automotive", "Real Estate", "Collectibles", "Agriculture", "B2B Procurement"];
const stats = [{
  value: "₦412M",
  label: "GMV This Quarter"
}, {
  value: "12,480",
  label: "Active Bidders"
}, {
  value: "99.8%",
  label: "Settlement Rate"
}, {
  value: "47",
  label: "Countries Served"
}];
const faqs = [{
  q: "How does escrow work across borders?",
  a: "Funds are held in regional custody accounts (NGN in Lagos, EUR in Frankfurt, GBP in London) and only released once the buyer confirms physical receipt and condition of the lot."
}, {
  q: "What stops shill bidding?",
  a: "Every bidder over $500 completes biometric KYC. Our anti-collusion engine flags bid patterns in real time and voids suspicious activity before settlement."
}, {
  q: "What commission does Kilimanjaro charge?",
  a: "Standard vendors pay 8% on sale. Verified Premium vendors pay 5% plus a flat monthly subscription. No listing fees on standard lots."
}, {
  q: "Can I bid from anywhere?",
  a: "Yes. We support 47 countries with multi-currency settlement in NGN, USD, EUR, GBP, and KES. Mobile bidding works on any device."
}];
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-surface font-sans text-ink selection:bg-brand/10 selection:text-brand", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden border-b border-zinc-950/5 bg-zinc-900 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex whitespace-nowrap animate-ticker", children: [0, 1].map((dup) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-12 pr-12 shrink-0", children: tickerItems.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 text-xs font-medium tracking-tight text-zinc-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-1.5 rounded-full bg-emerald-500" }),
      " ",
      item
    ] }, i)) }, dup)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "sticky top-0 z-50 border-b border-zinc-950/5 bg-surface/80 backdrop-blur-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl font-semibold tracking-tighter", children: "KILIMANJARO" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden items-center gap-6 sm:flex", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#auctions", className: "text-sm font-medium text-zinc-500 transition-colors hover:text-ink", children: "Auctions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#how", className: "text-sm font-medium text-zinc-500 transition-colors hover:text-ink", children: "How it works" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#vendors", className: "text-sm font-medium text-zinc-500 transition-colors hover:text-ink", children: "Vendors" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#pricing", className: "text-sm font-medium text-zinc-500 transition-colors hover:text-ink", children: "Pricing" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-sm font-medium text-zinc-600 px-4 py-2 hover:text-ink transition-colors", children: "Sign in" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "rounded-full bg-brand px-5 py-2 text-sm font-medium text-white ring-1 ring-brand ring-offset-2 transition-transform active:scale-95", children: "Start Selling" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-6 py-20 lg:py-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 items-end gap-16 lg:grid-cols-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full border border-zinc-950/10 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-1.5 rounded-full bg-brand" }),
          " Cross-border bidding · Live now"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-6 text-balance font-display text-6xl leading-[0.95] lg:text-8xl", children: [
          "Bid from Lagos.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic text-brand", children: "Win in London." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 max-w-[48ch] text-lg leading-relaxed text-zinc-500 text-pretty", children: "The hybrid marketplace connecting West African capital with European secondary markets. Real-time bidding engine with integrated escrow, KYC, and four auction formats." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-wrap gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex items-center gap-2 rounded-lg bg-zinc-900 py-3 pl-4 pr-5 text-sm font-medium text-white transition-colors hover:bg-zinc-800", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "size-4 shrink-0", fill: "none", viewBox: "0 0 24 24", strokeWidth: 2, stroke: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" }) }),
            "Browse Live Auctions"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "flex items-center gap-2 rounded-lg bg-white py-3 pl-4 pr-5 text-sm font-medium text-zinc-900 ring-1 ring-zinc-950/10 transition-colors hover:bg-zinc-50", children: "Become a Vendor" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl bg-zinc-100 p-2 ring-1 ring-black/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroWatch, alt: "Featured Rolex GMT Master II auction lot", width: 1024, height: 1024, className: "aspect-square w-full rounded-[12px] object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -left-6 bottom-12 rounded-xl bg-white p-4 shadow-2xl ring-1 ring-black/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-8 items-center justify-center rounded-full bg-emerald-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "size-4 text-emerald-600", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold", children: "Escrow Secured" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-zinc-400", children: "₦12M held in custody" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -right-4 top-8 rounded-xl bg-zinc-900 p-4 text-white shadow-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-zinc-400", children: "Current Bid" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-medium", children: "$18,400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[10px] text-emerald-400", children: "Reserve met · 14 bidders" })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "auctions", className: "bg-zinc-50 border-y border-zinc-950/5 py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-widest text-brand", children: "Live Now" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-4xl font-medium tracking-tight", children: "Closing Soon" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "text-sm font-medium text-zinc-500 hover:text-brand", children: "View all 482 auctions →" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4", children: lots.map((lot) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative flex flex-col overflow-hidden rounded-xl bg-white ring-1 ring-black/5 transition-all hover:ring-black/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: lot.image, alt: lot.title, loading: "lazy", width: 800, height: 600, className: "aspect-[4/3] w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-zinc-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: lot.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: lot.typeColor, children: lot.type })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 font-medium", children: lot.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-2 border-t border-zinc-950/5 pt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase text-zinc-400", children: lot.leftLabel }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-medium", children: lot.leftValue })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase text-zinc-400", children: lot.rightLabel }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-display text-lg font-medium ${lot.rightColor}`, children: lot.rightValue })
            ] })
          ] })
        ] })
      ] }, lot.title)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-6 py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-12 lg:grid-cols-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-widest text-brand", children: "Four Formats" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-4xl font-medium tracking-tight text-balance", children: "Every kind of price discovery." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-zinc-500 leading-relaxed", children: "From classic ascending bids to silent sealed offers — pick the format that fits the lot." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-8 grid grid-cols-1 gap-px bg-zinc-200 sm:grid-cols-2 ring-1 ring-zinc-200 rounded-xl overflow-hidden", children: auctionTypes.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-xs text-zinc-400", children: [
          "/ ",
          t.code
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "mt-4 font-display text-2xl font-medium tracking-tight", children: [
          t.name,
          " Auction"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-zinc-500 leading-relaxed", children: t.desc })
      ] }, t.code)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "how", className: "bg-zinc-900 text-white py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end justify-between mb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-widest text-brand", children: "How it works" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-4xl font-medium tracking-tight", children: "Two flows. One marketplace." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-12 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-brand mb-6", children: "For Buyers" }),
          ["Register & complete biometric KYC", "Fund wallet in NGN, USD, EUR or GBP", "Bid live or set auto-bid ceiling", "Win, pay via escrow, receive lot"].map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6 py-5 border-b border-white/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-3xl font-medium text-zinc-600 w-10", children: [
              "0",
              i + 1
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pt-2 text-zinc-300", children: step })
          ] }, i))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-brand mb-6", children: "For Vendors" }),
          ["Apply & pass vendor verification", "List inventory, set reserve & format", "Run live auction with real-time analytics", "Ship after escrow confirms — get paid"].map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6 py-5 border-b border-white/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-3xl font-medium text-zinc-600 w-10", children: [
              "0",
              i + 1
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pt-2 text-zinc-300", children: step })
          ] }, i))
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "vendors", className: "mx-auto max-w-7xl px-6 py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-12 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-widest text-brand", children: "Trust Infrastructure" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 text-balance font-display text-4xl font-medium tracking-tight", children: "Secure commerce across borders." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-[48ch] text-zinc-500 leading-relaxed text-pretty", children: "Our multi-layered security infrastructure ensures every bid is verified and every payment protected by regional escrow centers in Lagos, London, and Frankfurt." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-10 space-y-6", children: [["Escrow Payments", "Funds only release after the buyer confirms physical receipt and condition."], ["Biometric KYC", "All high-value bidders complete identity verification before bidding."], ["Anti-shill Engine", "Real-time pattern detection voids collusion before settlement."], ["Multi-currency Settlement", "Hold and pay out in NGN, USD, EUR, GBP, or KES."]].map(([t, d]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-zinc-900", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "size-3 text-white", fill: "none", viewBox: "0 0 24 24", strokeWidth: 3, stroke: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4.5 12.75l6 6 9-13.5" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: t }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-zinc-500", children: d })
          ] })
        ] }, t)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-zinc-900 p-8 text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-2 rounded-full bg-emerald-400 animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-widest text-zinc-400", children: "Vendor Console · Live" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-zinc-500", children: "Q3 2025" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-zinc-800/50 p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-wider text-zinc-500", children: "Total GMV" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-emerald-400 font-medium", children: "+12.4%" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-display text-4xl font-medium tracking-tighter", children: "₦412,850,000" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex items-end gap-2 h-20", children: [40, 65, 30, 80, 55, 90, 70, 100, 60, 85, 75, 95].map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 rounded-sm bg-brand/40", style: {
              height: `${h}%`
            } }, i)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-zinc-800/40 p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase text-zinc-500", children: "Active Lots" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-display text-2xl font-medium", children: "128" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-zinc-800/40 p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase text-zinc-500", children: "Avg. Sell-through" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-display text-2xl font-medium", children: "87%" })
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-y border-zinc-950/5 bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4", children: stats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-10 ${i !== 0 ? "lg:border-l border-zinc-950/5" : ""} ${i === 2 ? "lg:border-l border-zinc-950/5" : ""} border-zinc-950/5`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-5xl font-medium tracking-tighter", children: s.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs uppercase tracking-widest text-zinc-400", children: s.label })
    ] }, s.label)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-6 py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end justify-between mb-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-widest text-brand", children: "Inventory" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-4xl font-medium tracking-tight", children: "Categories on the floor." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-200 ring-1 ring-zinc-200 rounded-xl overflow-hidden", children: categories.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#", className: "group bg-white p-8 hover:bg-zinc-50 transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-xs text-zinc-400", children: [
          "/ ",
          String(i + 1).padStart(2, "0")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 font-display text-xl font-medium tracking-tight group-hover:text-brand transition-colors", children: c }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-zinc-400", children: [
          Math.floor(Math.random() * 200) + 40,
          " live lots"
        ] })
      ] }, c)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-brand-muted py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-widest text-brand", children: "From the floor" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-4xl font-medium tracking-tight", children: "Trusted by serious collectors." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid grid-cols-1 md:grid-cols-3 gap-6", children: [{
        quote: "Sold a 1972 Mercedes 280SE to a buyer in Geneva in 48 hours. Escrow cleared before the truck reached the port.",
        name: "Adaeze O.",
        role: "Vintage Auto Vendor · Lagos"
      }, {
        quote: "The sealed-bid format finally gave my gallery a way to move six-figure pieces without public price exposure.",
        name: "Tobias R.",
        role: "Gallery Director · Berlin"
      }, {
        quote: "I bid from Nairobi on a London estate sale at 2am. Won, paid in KES, shipped door-to-door. Unreal.",
        name: "Wanjiru K.",
        role: "Collector · Nairobi"
      }].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-white p-8 ring-1 ring-black/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-lg leading-snug tracking-tight", children: [
          '"',
          t.quote,
          '"'
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 border-t border-zinc-950/5 pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: t.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-zinc-500", children: t.role })
        ] })
      ] }, t.name)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "pricing", className: "mx-auto max-w-7xl px-6 py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-widest text-brand", children: "Commission Model" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-4xl font-medium tracking-tight", children: "Pay only when you sell." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [{
        name: "Buyer",
        price: "Free",
        sub: "No fees to bid or win.",
        features: ["Unlimited bidding", "Auto-bid up to your ceiling", "Escrow protection included", "Multi-currency wallet"],
        cta: "Open a wallet",
        highlight: false
      }, {
        name: "Vendor",
        price: "8%",
        sub: "Standard seller commission.",
        features: ["Unlimited listings", "All 4 auction formats", "Real-time analytics", "Buyer messaging"],
        cta: "Apply to sell",
        highlight: true
      }, {
        name: "Premium",
        price: "5% + $99/mo",
        sub: "For high-volume houses.",
        features: ["Reduced commission", "Featured placements", "Dedicated account manager", "API access"],
        cta: "Talk to sales",
        highlight: false
      }].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-2xl p-8 ${p.highlight ? "bg-zinc-900 text-white ring-1 ring-brand" : "bg-white ring-1 ring-zinc-950/10"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-xs uppercase tracking-widest ${p.highlight ? "text-brand" : "text-zinc-400"}`, children: p.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 font-display text-5xl font-medium tracking-tighter", children: p.price }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `mt-2 text-sm ${p.highlight ? "text-zinc-400" : "text-zinc-500"}`, children: p.sub }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-8 space-y-3", children: p.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: `flex items-center gap-3 text-sm ${p.highlight ? "text-zinc-200" : "text-zinc-700"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `size-1 rounded-full ${p.highlight ? "bg-brand" : "bg-zinc-400"}` }),
          f
        ] }, f)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `mt-8 w-full rounded-lg py-3 text-sm font-medium transition-colors ${p.highlight ? "bg-brand text-white hover:bg-brand/90" : "bg-zinc-900 text-white hover:bg-zinc-800"}`, children: p.cta })
      ] }, p.name)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-zinc-50 border-y border-zinc-950/5 py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-widest text-brand", children: "FAQ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-4xl font-medium tracking-tight", children: "Common questions." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-white ring-1 ring-zinc-950/5 divide-y divide-zinc-950/5", children: faqs.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "group p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("summary", { className: "flex cursor-pointer items-center justify-between font-display text-lg font-medium tracking-tight list-none", children: [
          f.q,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-4 text-2xl text-zinc-400 group-open:rotate-45 transition-transform", children: "+" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-zinc-500 leading-relaxed", children: f.a })
      ] }, f.q)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-y border-zinc-950/5 bg-white py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-400 mb-10", children: "Featured in" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-6 gap-8 items-center", children: ["BLOOMBERG", "TechCabal", "Financial Times", "Quartz Africa", "WIRED", "The Economist"].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-center font-display text-2xl italic text-zinc-400 hover:text-ink transition-colors", children: p }, p)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-6 py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-widest text-brand", children: "Hammer prices" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-2 font-display text-5xl", children: [
            "Recently ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic", children: "settled" }),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "text-sm font-medium text-zinc-500 hover:text-brand", children: "Full results archive →" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl ring-1 ring-zinc-950/5 bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-zinc-50 border-b border-zinc-950/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-left text-[10px] uppercase tracking-widest text-zinc-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-4 px-6 font-medium", children: "Lot" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-4 px-6 font-medium hidden md:table-cell", children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-4 px-6 font-medium hidden md:table-cell", children: "Format" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-4 px-6 font-medium text-right", children: "Hammer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-4 px-6 font-medium text-right hidden sm:table-cell", children: "vs Estimate" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-zinc-950/5", children: [["Patek Philippe Nautilus 5711", "Watches", "Sealed", "$142,500", "+18%"], ["1965 Mercedes 230SL Pagoda", "Automotive", "English", "€87,200", "+24%"], ["Ben Enwonwu — Tutu Study", "Fine Art", "English", "£312,000", "+41%"], ["Lekki Phase 1 Penthouse", "Real Estate", "Sealed", "₦480M", "+9%"], ["Hermès Birkin 30 Himalaya", "Luxury", "English", "$248,000", "+31%"], ["1976 Leica M4 Black", "Collectibles", "Dutch", "€8,400", "+12%"]].map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-zinc-50/50 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-4 px-6 font-medium", children: row[0] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-4 px-6 text-sm text-zinc-500 hidden md:table-cell", children: row[1] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-4 px-6 text-sm text-zinc-500 hidden md:table-cell", children: row[2] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-4 px-6 text-right font-display text-lg", children: row[3] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-4 px-6 text-right text-sm text-emerald-600 hidden sm:table-cell", children: row[4] })
        ] }, row[0])) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-zinc-900 text-white py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end justify-between mb-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-widest text-brand", children: "Auction Calendar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-2 font-display text-5xl", children: [
          "Mark your ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic", children: "dates" }),
          "."
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden ring-1 ring-white/10", children: [{
        day: "14",
        month: "FEB",
        title: "Lagos Modern & Contemporary",
        lots: "84 lots",
        city: "Lagos · 18:00 WAT"
      }, {
        day: "02",
        month: "MAR",
        title: "London Watch Sale Vol. XII",
        lots: "126 lots",
        city: "London · 14:00 GMT"
      }, {
        day: "21",
        month: "MAR",
        title: "Berlin Design Auction",
        lots: "57 lots",
        city: "Berlin · 16:00 CET"
      }, {
        day: "08",
        month: "APR",
        title: "African Heritage & Sculpture",
        lots: "42 lots",
        city: "Accra · 17:00 GMT"
      }, {
        day: "19",
        month: "APR",
        title: "Cross-Border Automotive",
        lots: "31 lots",
        city: "Live online · 15:00 WAT"
      }, {
        day: "03",
        month: "MAY",
        title: "Estate Real Property — Nairobi",
        lots: "12 lots",
        city: "Nairobi · 11:00 EAT"
      }].map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-zinc-900 p-8 hover:bg-zinc-800 transition-colors cursor-pointer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-5xl", children: e.day }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest text-zinc-500", children: e.month })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-6 font-display text-2xl", children: e.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-zinc-500", children: e.city }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-brand", children: [
          e.lots,
          " · Preview open"
        ] })
      ] }, e.title)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-6 py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-16 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-widest text-brand", children: "On the go" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-2 font-display text-5xl lg:text-6xl text-balance", children: [
          "The auction floor ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic", children: "in your pocket" }),
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-lg text-zinc-500 leading-relaxed max-w-[48ch]", children: "One-tap bidding, push alerts for outbid moments, biometric login, and live video lots — native iOS and Android, built for thin-bandwidth networks." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-8 grid grid-cols-2 gap-x-8 gap-y-3 max-w-md", children: ["Outbid push alerts", "Auto-bid ceiling", "Camera lot upload", "Wallet & escrow", "Offline draft bids", "Biometric login"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 text-sm text-zinc-700", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-1 rounded-full bg-brand" }),
          " ",
          f
        ] }, f)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "rounded-lg bg-zinc-900 text-white px-5 py-3 text-sm font-medium", children: "Download for iOS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "rounded-lg bg-white text-zinc-900 px-5 py-3 text-sm font-medium ring-1 ring-zinc-950/10", children: "Get on Android" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto w-64 aspect-[9/19] rounded-[2.5rem] bg-zinc-900 p-3 ring-1 ring-black/10 shadow-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-1/2 -translate-x-1/2 h-5 w-24 bg-zinc-900 rounded-b-2xl z-10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full w-full rounded-[2rem] bg-surface overflow-hidden flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-brand p-4 pt-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] uppercase tracking-widest text-white/70", children: "Live · Ends 02:14" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl text-white mt-1", children: "Rolex GMT II" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl text-white mt-3", children: "$18,400" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 p-4 space-y-3 bg-zinc-50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-white p-3 ring-1 ring-zinc-950/5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] uppercase text-zinc-400", children: "You're winning" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium", children: "Auto-bid up to $22,000" })
            ] }),
            ["adaeze.o · $18,400", "luxe_ldn · $18,200", "you · $18,000"].map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg bg-white p-3 ring-1 ring-zinc-950/5 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-zinc-600", children: b.split(" · ")[0] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: b.split(" · ")[1] })
            ] }, i))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-white border-t border-zinc-950/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-brand text-white py-3 text-center text-xs font-medium", children: "Bid $18,600" }) })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-y border-zinc-950/5 bg-brand-muted py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-widest text-brand", children: "The Gavel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-2 font-display text-5xl lg:text-6xl text-balance", children: [
        "Weekly dispatch from the ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic", children: "auction floor" }),
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-zinc-600 max-w-xl mx-auto", children: "Upcoming sales, hammer-price reports, and verified vendor watchlists. Delivered every Thursday. No spam, ever." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, placeholder: "you@studio.com", className: "flex-1 rounded-lg bg-white px-4 py-3 text-sm ring-1 ring-zinc-950/10 focus:ring-brand focus:outline-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "rounded-lg bg-zinc-900 text-white px-6 py-3 text-sm font-medium hover:bg-zinc-800 transition-colors", children: "Subscribe" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-[10px] uppercase tracking-widest text-zinc-400", children: "Joining 28,400+ collectors & dealers" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-6 py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-3xl bg-zinc-900 p-12 lg:p-20 text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-30", style: {
        backgroundImage: "radial-gradient(circle at 80% 20%, rgba(255,140,60,0.4) 0%, transparent 50%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl lg:text-6xl font-medium leading-none tracking-tighter text-balance", children: "The next gavel falls in 3 minutes." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-lg text-zinc-400 max-w-[44ch]", children: "Join 12,000+ bidders trading across Lagos, London, Berlin and Nairobi. Open a wallet in 90 seconds." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-wrap gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "rounded-lg bg-brand px-6 py-3 text-sm font-medium hover:bg-brand/90 transition-colors", children: "Enter the auction floor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "rounded-lg bg-white/10 px-6 py-3 text-sm font-medium ring-1 ring-white/20 hover:bg-white/15 transition-colors", children: "Talk to a vendor lead" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-zinc-950/5 bg-white py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl font-semibold tracking-tighter", children: "KILIMANJARO" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-zinc-500 max-w-xs", children: "A hybrid African marketplace combining instant commerce with competitive auction-driven pricing." })
        ] }),
        [["Platform", ["Auctions", "Sell", "Categories", "Featured Lots"]], ["Trust", ["KYC/AML", "Escrow", "Anti-shill", "Disputes"]], ["Company", ["About", "Careers", "Press", "Contact"]]].map(([title, links]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wider text-zinc-400", children: title }),
          links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "text-sm text-zinc-600 hover:text-brand transition-colors", children: l }, l))
        ] }, title))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 pt-8 border-t border-zinc-950/5 flex flex-col sm:flex-row justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-zinc-400", children: "© 2025 Kilimanjaro Bids Ltd. Lagos · London · Berlin." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-zinc-400", children: "Regulated · PCI-DSS · GDPR compliant" })
      ] })
    ] }) })
  ] });
}
export {
  Index as component
};
