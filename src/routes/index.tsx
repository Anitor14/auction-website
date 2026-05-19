import { createFileRoute } from "@tanstack/react-router";
import heroWatch from "@/assets/hero-watch.jpg";
import lotMacbook from "@/assets/lot-macbook.jpg";
import lotBag from "@/assets/lot-bag.jpg";
import lotArt from "@/assets/lot-art.jpg";
import lotCar from "@/assets/lot-car.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kilimanjaro — Bid from Lagos. Win in London." },
      {
        name: "description",
        content:
          "The hybrid marketplace connecting African capital with European secondary markets. Real-time bidding, escrow payments, and verified vendors.",
      },
      { property: "og:title", content: "Kilimanjaro — Cross-border auction marketplace" },
      {
        property: "og:description",
        content:
          "Real-time bidding engine with integrated escrow, KYC, and multi-auction support across Lagos and London.",
      },
    ],
  }),
  component: Index,
});

const tickerItems = [
  "LAGOS: 2022 TOYOTA PRADO — CURRENT BID ₦42,500,000",
  "LONDON: ROLEX DATEJUST 41 — CURRENT BID £9,200",
  "ABUJA: LUXURY PENTHOUSE GWARINPA — STARTS IN 2H",
  "BERLIN: HASSELBLAD 907X — CURRENT BID €4,800",
  "ACCRA: BENIN BRONZE HEAD — CURRENT BID $45,200",
];

const lots = [
  {
    image: lotMacbook,
    category: "Electronics",
    type: "English Auction",
    typeColor: "text-emerald-600",
    title: "MacBook Pro M1 Max 64GB",
    leftLabel: "Current Bid",
    leftValue: "₦1,450,000",
    rightLabel: "Ends In",
    rightValue: "04:12:09",
    rightColor: "text-orange-600",
  },
  {
    image: lotBag,
    category: "Luxury",
    type: "Sealed Bid",
    typeColor: "text-blue-600",
    title: "Chanel Classic Flap Bag",
    leftLabel: "Est. Value",
    leftValue: "₦3,200,000",
    rightLabel: "Status",
    rightValue: "Verified",
    rightColor: "text-emerald-600",
  },
  {
    image: lotArt,
    category: "Art",
    type: "Dutch Auction",
    typeColor: "text-orange-600",
    title: "'Genesis' by Kolawole",
    leftLabel: "Current Price",
    leftValue: "₦850,000",
    rightLabel: "Drops",
    rightValue: "Every 1h",
    rightColor: "text-ink",
  },
  {
    image: lotCar,
    category: "Automotive",
    type: "English Auction",
    typeColor: "text-emerald-600",
    title: "2021 Acura TLX Tech",
    leftLabel: "Highest Bid",
    leftValue: "₦24,000,000",
    rightLabel: "Ends In",
    rightValue: "00:45:12",
    rightColor: "text-orange-600",
  },
];

const auctionTypes = [
  { code: "01", name: "English", desc: "Open ascending bids. Highest offer at close wins the lot." },
  { code: "02", name: "Dutch", desc: "Price descends until a buyer accepts. Ideal for time-sensitive inventory." },
  { code: "03", name: "Sealed Bid", desc: "Private one-shot offers. Discreet for high-value real estate and art." },
  { code: "04", name: "Reverse", desc: "Vendors compete to fulfill buyer briefs. Built for B2B procurement." },
];

const categories = [
  "Electronics",
  "Luxury Watches",
  "Fine Art",
  "Automotive",
  "Real Estate",
  "Collectibles",
  "Agriculture",
  "B2B Procurement",
];

const stats = [
  { value: "₦412M", label: "GMV This Quarter" },
  { value: "12,480", label: "Active Bidders" },
  { value: "99.8%", label: "Settlement Rate" },
  { value: "47", label: "Countries Served" },
];

const faqs = [
  {
    q: "How does escrow work across borders?",
    a: "Funds are held in regional custody accounts (NGN in Lagos, EUR in Frankfurt, GBP in London) and only released once the buyer confirms physical receipt and condition of the lot.",
  },
  {
    q: "What stops shill bidding?",
    a: "Every bidder over $500 completes biometric KYC. Our anti-collusion engine flags bid patterns in real time and voids suspicious activity before settlement.",
  },
  {
    q: "What commission does Kilimanjaro charge?",
    a: "Standard vendors pay 8% on sale. Verified Premium vendors pay 5% plus a flat monthly subscription. No listing fees on standard lots.",
  },
  {
    q: "Can I bid from anywhere?",
    a: "Yes. We support 47 countries with multi-currency settlement in NGN, USD, EUR, GBP, and KES. Mobile bidding works on any device.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-surface font-sans text-ink selection:bg-brand/10 selection:text-brand">
      {/* Live Ticker */}
      <div className="overflow-hidden border-b border-zinc-950/5 bg-zinc-900 py-2.5">
        <div className="flex whitespace-nowrap animate-ticker">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-12 pr-12 shrink-0">
              {tickerItems.map((item, i) => (
                <span
                  key={i}
                  className="flex items-center gap-2 text-xs font-medium tracking-tight text-zinc-400"
                >
                  <span className="size-1.5 rounded-full bg-emerald-500" /> {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-zinc-950/5 bg-surface/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <span className="font-display text-xl font-semibold tracking-tighter">KILIMANJARO</span>
            <div className="hidden items-center gap-6 sm:flex">
              <a href="#auctions" className="text-sm font-medium text-zinc-500 transition-colors hover:text-ink">
                Auctions
              </a>
              <a href="#how" className="text-sm font-medium text-zinc-500 transition-colors hover:text-ink">
                How it works
              </a>
              <a href="#vendors" className="text-sm font-medium text-zinc-500 transition-colors hover:text-ink">
                Vendors
              </a>
              <a href="#pricing" className="text-sm font-medium text-zinc-500 transition-colors hover:text-ink">
                Pricing
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-sm font-medium text-zinc-600 px-4 py-2 hover:text-ink transition-colors">
              Sign in
            </button>
            <button className="rounded-full bg-brand px-5 py-2 text-sm font-medium text-white ring-1 ring-brand ring-offset-2 transition-transform active:scale-95">
              Start Selling
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-32">
        <div className="grid grid-cols-1 items-end gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-950/10 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
              <span className="size-1.5 rounded-full bg-brand" /> Cross-border bidding · Live now
            </span>
            <h1 className="mt-6 text-balance font-display text-6xl leading-[0.95] sm:text-8xl lg:text-9xl">
              Bid from Lagos.<br />
              <em className="italic text-brand">Win in London.</em>
            </h1>
            <p className="mt-8 max-w-[48ch] text-lg leading-relaxed text-zinc-500 text-pretty">
              The hybrid marketplace connecting West African capital with European secondary markets.
              Real-time bidding engine with integrated escrow, KYC, and four auction formats.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button className="flex items-center gap-2 rounded-lg bg-zinc-900 py-3 pl-4 pr-5 text-sm font-medium text-white transition-colors hover:bg-zinc-800">
                <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
                Browse Live Auctions
              </button>
              <button className="flex items-center gap-2 rounded-lg bg-white py-3 pl-4 pr-5 text-sm font-medium text-zinc-900 ring-1 ring-zinc-950/10 transition-colors hover:bg-zinc-50">
                Become a Vendor
              </button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-zinc-100 p-2 ring-1 ring-black/5">
              <img
                src={heroWatch}
                alt="Featured Rolex GMT Master II auction lot"
                width={1024}
                height={1024}
                className="aspect-square w-full rounded-[12px] object-cover"
              />
              <div className="absolute -left-6 bottom-12 rounded-xl bg-white p-4 shadow-2xl ring-1 ring-black/5">
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-full bg-emerald-100">
                    <svg className="size-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold">Escrow Secured</p>
                    <p className="text-[10px] text-zinc-400">₦12M held in custody</p>
                  </div>
                </div>
              </div>
              <div className="absolute -right-4 top-8 rounded-xl bg-zinc-900 p-4 text-white shadow-2xl">
                <p className="text-[10px] uppercase tracking-widest text-zinc-400">Current Bid</p>
                <p className="font-display text-2xl font-medium">$18,400</p>
                <p className="mt-1 text-[10px] text-emerald-400">Reserve met · 14 bidders</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live grid */}
      <section id="auctions" className="bg-zinc-50 border-y border-zinc-950/5 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-brand">Live Now</span>
              <h2 className="mt-2 font-display text-4xl font-medium tracking-tight">Closing Soon</h2>
            </div>
            <a href="#" className="text-sm font-medium text-zinc-500 hover:text-brand">
              View all 482 auctions →
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {lots.map((lot) => (
              <div
                key={lot.title}
                className="group relative flex flex-col overflow-hidden rounded-xl bg-white ring-1 ring-black/5 transition-all hover:ring-black/10"
              >
                <img
                  src={lot.image}
                  alt={lot.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="flex flex-col p-5">
                  <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                    <span>{lot.category}</span>
                    <span className={lot.typeColor}>{lot.type}</span>
                  </div>
                  <h3 className="mt-2 font-medium">{lot.title}</h3>
                  <div className="mt-4 grid grid-cols-2 border-t border-zinc-950/5 pt-4">
                    <div>
                      <p className="text-[10px] uppercase text-zinc-400">{lot.leftLabel}</p>
                      <p className="font-display text-lg font-medium">{lot.leftValue}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase text-zinc-400">{lot.rightLabel}</p>
                      <p className={`font-display text-lg font-medium ${lot.rightColor}`}>{lot.rightValue}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Auction Types */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand">Four Formats</span>
            <h2 className="mt-2 font-display text-4xl font-medium tracking-tight text-balance">
              Every kind of price discovery.
            </h2>
            <p className="mt-6 text-zinc-500 leading-relaxed">
              From classic ascending bids to silent sealed offers — pick the format that fits the lot.
            </p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 gap-px bg-zinc-200 sm:grid-cols-2 ring-1 ring-zinc-200 rounded-xl overflow-hidden">
            {auctionTypes.map((t) => (
              <div key={t.code} className="bg-white p-8">
                <span className="font-display text-xs text-zinc-400">/ {t.code}</span>
                <h3 className="mt-4 font-display text-2xl font-medium tracking-tight">{t.name} Auction</h3>
                <p className="mt-3 text-sm text-zinc-500 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="bg-zinc-900 text-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between mb-16">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-brand">How it works</span>
              <h2 className="mt-2 font-display text-4xl font-medium tracking-tight">Two flows. One marketplace.</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-brand mb-6">For Buyers</p>
              {["Register & complete biometric KYC", "Fund wallet in NGN, USD, EUR or GBP", "Bid live or set auto-bid ceiling", "Win, pay via escrow, receive lot"].map(
                (step, i) => (
                  <div key={i} className="flex gap-6 py-5 border-b border-white/10">
                    <span className="font-display text-3xl font-medium text-zinc-600 w-10">0{i + 1}</span>
                    <p className="pt-2 text-zinc-300">{step}</p>
                  </div>
                ),
              )}
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-brand mb-6">For Vendors</p>
              {["Apply & pass vendor verification", "List inventory, set reserve & format", "Run live auction with real-time analytics", "Ship after escrow confirms — get paid"].map(
                (step, i) => (
                  <div key={i} className="flex gap-6 py-5 border-b border-white/10">
                    <span className="font-display text-3xl font-medium text-zinc-600 w-10">0{i + 1}</span>
                    <p className="pt-2 text-zinc-300">{step}</p>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Trust + Dashboard */}
      <section id="vendors" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand">Trust Infrastructure</span>
            <h2 className="mt-2 text-balance font-display text-4xl font-medium tracking-tight">
              Secure commerce across borders.
            </h2>
            <p className="mt-6 max-w-[48ch] text-zinc-500 leading-relaxed text-pretty">
              Our multi-layered security infrastructure ensures every bid is verified and every payment
              protected by regional escrow centers in Lagos, London, and Frankfurt.
            </p>
            <ul className="mt-10 space-y-6">
              {[
                ["Escrow Payments", "Funds only release after the buyer confirms physical receipt and condition."],
                ["Biometric KYC", "All high-value bidders complete identity verification before bidding."],
                ["Anti-shill Engine", "Real-time pattern detection voids collusion before settlement."],
                ["Multi-currency Settlement", "Hold and pay out in NGN, USD, EUR, GBP, or KES."],
              ].map(([t, d]) => (
                <li key={t} className="flex items-start gap-4">
                  <div className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-zinc-900">
                    <svg className="size-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t}</p>
                    <p className="text-sm text-zinc-500">{d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-zinc-900 p-8 text-white">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest text-zinc-400">Vendor Console · Live</span>
              </div>
              <span className="text-xs font-medium text-zinc-500">Q3 2025</span>
            </div>
            <div className="space-y-4">
              <div className="rounded-xl bg-zinc-800/50 p-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500">Total GMV</span>
                  <span className="text-[10px] text-emerald-400 font-medium">+12.4%</span>
                </div>
                <p className="mt-2 font-display text-4xl font-medium tracking-tighter">₦412,850,000</p>
                <div className="mt-6 flex items-end gap-2 h-20">
                  {[40, 65, 30, 80, 55, 90, 70, 100, 60, 85, 75, 95].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-brand/40"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-zinc-800/40 p-5">
                  <p className="text-[10px] uppercase text-zinc-500">Active Lots</p>
                  <p className="mt-2 font-display text-2xl font-medium">128</p>
                </div>
                <div className="rounded-xl bg-zinc-800/40 p-5">
                  <p className="text-[10px] uppercase text-zinc-500">Avg. Sell-through</p>
                  <p className="mt-2 font-display text-2xl font-medium">87%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-zinc-950/5 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`p-10 ${i !== 0 ? "lg:border-l border-zinc-950/5" : ""} ${i === 2 ? "lg:border-l border-zinc-950/5" : ""} border-zinc-950/5`}
            >
              <p className="font-display text-5xl font-medium tracking-tighter">{s.value}</p>
              <p className="mt-3 text-xs uppercase tracking-widest text-zinc-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand">Inventory</span>
            <h2 className="mt-2 font-display text-4xl font-medium tracking-tight">Categories on the floor.</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-200 ring-1 ring-zinc-200 rounded-xl overflow-hidden">
          {categories.map((c, i) => (
            <a
              key={c}
              href="#"
              className="group bg-white p-8 hover:bg-zinc-50 transition-colors"
            >
              <span className="font-display text-xs text-zinc-400">/ {String(i + 1).padStart(2, "0")}</span>
              <p className="mt-4 font-display text-xl font-medium tracking-tight group-hover:text-brand transition-colors">
                {c}
              </p>
              <p className="mt-1 text-xs text-zinc-400">{Math.floor(Math.random() * 200) + 40} live lots</p>
            </a>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-brand-muted py-24">
        <div className="mx-auto max-w-7xl px-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">From the floor</span>
          <h2 className="mt-2 font-display text-4xl font-medium tracking-tight">Trusted by serious collectors.</h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "Sold a 1972 Mercedes 280SE to a buyer in Geneva in 48 hours. Escrow cleared before the truck reached the port.",
                name: "Adaeze O.",
                role: "Vintage Auto Vendor · Lagos",
              },
              {
                quote: "The sealed-bid format finally gave my gallery a way to move six-figure pieces without public price exposure.",
                name: "Tobias R.",
                role: "Gallery Director · Berlin",
              },
              {
                quote: "I bid from Nairobi on a London estate sale at 2am. Won, paid in KES, shipped door-to-door. Unreal.",
                name: "Wanjiru K.",
                role: "Collector · Nairobi",
              },
            ].map((t) => (
              <div key={t.name} className="rounded-2xl bg-white p-8 ring-1 ring-black/5">
                <p className="font-display text-lg leading-snug tracking-tight">"{t.quote}"</p>
                <div className="mt-8 border-t border-zinc-950/5 pt-4">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-zinc-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">Commission Model</span>
          <h2 className="mt-2 font-display text-4xl font-medium tracking-tight">Pay only when you sell.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Buyer",
              price: "Free",
              sub: "No fees to bid or win.",
              features: ["Unlimited bidding", "Auto-bid up to your ceiling", "Escrow protection included", "Multi-currency wallet"],
              cta: "Open a wallet",
              highlight: false,
            },
            {
              name: "Vendor",
              price: "8%",
              sub: "Standard seller commission.",
              features: ["Unlimited listings", "All 4 auction formats", "Real-time analytics", "Buyer messaging"],
              cta: "Apply to sell",
              highlight: true,
            },
            {
              name: "Premium",
              price: "5% + $99/mo",
              sub: "For high-volume houses.",
              features: ["Reduced commission", "Featured placements", "Dedicated account manager", "API access"],
              cta: "Talk to sales",
              highlight: false,
            },
          ].map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl p-8 ${
                p.highlight
                  ? "bg-zinc-900 text-white ring-1 ring-brand"
                  : "bg-white ring-1 ring-zinc-950/10"
              }`}
            >
              <p className={`text-xs uppercase tracking-widest ${p.highlight ? "text-brand" : "text-zinc-400"}`}>
                {p.name}
              </p>
              <p className="mt-4 font-display text-5xl font-medium tracking-tighter">{p.price}</p>
              <p className={`mt-2 text-sm ${p.highlight ? "text-zinc-400" : "text-zinc-500"}`}>{p.sub}</p>
              <ul className="mt-8 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className={`flex items-center gap-3 text-sm ${p.highlight ? "text-zinc-200" : "text-zinc-700"}`}>
                    <span className={`size-1 rounded-full ${p.highlight ? "bg-brand" : "bg-zinc-400"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`mt-8 w-full rounded-lg py-3 text-sm font-medium transition-colors ${
                  p.highlight
                    ? "bg-brand text-white hover:bg-brand/90"
                    : "bg-zinc-900 text-white hover:bg-zinc-800"
                }`}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-zinc-50 border-y border-zinc-950/5 py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand">FAQ</span>
            <h2 className="mt-2 font-display text-4xl font-medium tracking-tight">Common questions.</h2>
          </div>
          <div className="rounded-2xl bg-white ring-1 ring-zinc-950/5 divide-y divide-zinc-950/5">
            {faqs.map((f) => (
              <details key={f.q} className="group p-6">
                <summary className="flex cursor-pointer items-center justify-between font-display text-lg font-medium tracking-tight list-none">
                  {f.q}
                  <span className="ml-4 text-2xl text-zinc-400 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-sm text-zinc-500 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Press */}
      <section className="border-y border-zinc-950/5 bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-400 mb-10">
            Featured in
          </p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center">
            {["BLOOMBERG", "TechCabal", "Financial Times", "Quartz Africa", "WIRED", "The Economist"].map((p) => (
              <span
                key={p}
                className="text-center font-display text-2xl italic text-zinc-400 hover:text-ink transition-colors"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Past Results */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand">Hammer prices</span>
            <h2 className="mt-2 font-display text-5xl">
              Recently <em className="italic">settled</em>.
            </h2>
          </div>
          <a href="#" className="text-sm font-medium text-zinc-500 hover:text-brand">
            Full results archive →
          </a>
        </div>
        <div className="overflow-hidden rounded-2xl ring-1 ring-zinc-950/5 bg-white">
          <table className="w-full">
            <thead className="bg-zinc-50 border-b border-zinc-950/5">
              <tr className="text-left text-[10px] uppercase tracking-widest text-zinc-400">
                <th className="py-4 px-6 font-medium">Lot</th>
                <th className="py-4 px-6 font-medium hidden md:table-cell">Category</th>
                <th className="py-4 px-6 font-medium hidden md:table-cell">Format</th>
                <th className="py-4 px-6 font-medium text-right">Hammer</th>
                <th className="py-4 px-6 font-medium text-right hidden sm:table-cell">vs Estimate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-950/5">
              {[
                ["Patek Philippe Nautilus 5711", "Watches", "Sealed", "$142,500", "+18%"],
                ["1965 Mercedes 230SL Pagoda", "Automotive", "English", "€87,200", "+24%"],
                ["Ben Enwonwu — Tutu Study", "Fine Art", "English", "£312,000", "+41%"],
                ["Lekki Phase 1 Penthouse", "Real Estate", "Sealed", "₦480M", "+9%"],
                ["Hermès Birkin 30 Himalaya", "Luxury", "English", "$248,000", "+31%"],
                ["1976 Leica M4 Black", "Collectibles", "Dutch", "€8,400", "+12%"],
              ].map((row) => (
                <tr key={row[0]} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="py-4 px-6 font-medium">{row[0]}</td>
                  <td className="py-4 px-6 text-sm text-zinc-500 hidden md:table-cell">{row[1]}</td>
                  <td className="py-4 px-6 text-sm text-zinc-500 hidden md:table-cell">{row[2]}</td>
                  <td className="py-4 px-6 text-right font-display text-lg">{row[3]}</td>
                  <td className="py-4 px-6 text-right text-sm text-emerald-600 hidden sm:table-cell">{row[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Upcoming Calendar */}
      <section className="bg-zinc-900 text-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-brand">Auction Calendar</span>
              <h2 className="mt-2 font-display text-5xl">
                Mark your <em className="italic">dates</em>.
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden ring-1 ring-white/10">
            {[
              { day: "14", month: "FEB", title: "Lagos Modern & Contemporary", lots: "84 lots", city: "Lagos · 18:00 WAT" },
              { day: "02", month: "MAR", title: "London Watch Sale Vol. XII", lots: "126 lots", city: "London · 14:00 GMT" },
              { day: "21", month: "MAR", title: "Berlin Design Auction", lots: "57 lots", city: "Berlin · 16:00 CET" },
              { day: "08", month: "APR", title: "African Heritage & Sculpture", lots: "42 lots", city: "Accra · 17:00 GMT" },
              { day: "19", month: "APR", title: "Cross-Border Automotive", lots: "31 lots", city: "Live online · 15:00 WAT" },
              { day: "03", month: "MAY", title: "Estate Real Property — Nairobi", lots: "12 lots", city: "Nairobi · 11:00 EAT" },
            ].map((e) => (
              <div key={e.title} className="bg-zinc-900 p-8 hover:bg-zinc-800 transition-colors cursor-pointer">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-5xl">{e.day}</span>
                  <span className="text-xs uppercase tracking-widest text-zinc-500">{e.month}</span>
                </div>
                <h3 className="mt-6 font-display text-2xl">{e.title}</h3>
                <p className="mt-3 text-xs text-zinc-500">{e.city}</p>
                <p className="mt-1 text-xs text-brand">{e.lots} · Preview open</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand">On the go</span>
            <h2 className="mt-2 font-display text-5xl lg:text-6xl text-balance">
              The auction floor <em className="italic">in your pocket</em>.
            </h2>
            <p className="mt-6 text-lg text-zinc-500 leading-relaxed max-w-[48ch]">
              One-tap bidding, push alerts for outbid moments, biometric login, and live video lots —
              native iOS and Android, built for thin-bandwidth networks.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-x-8 gap-y-3 max-w-md">
              {["Outbid push alerts", "Auto-bid ceiling", "Camera lot upload", "Wallet & escrow", "Offline draft bids", "Biometric login"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-zinc-700">
                  <span className="size-1 rounded-full bg-brand" /> {f}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <button className="rounded-lg bg-zinc-900 text-white px-5 py-3 text-sm font-medium">Download for iOS</button>
              <button className="rounded-lg bg-white text-zinc-900 px-5 py-3 text-sm font-medium ring-1 ring-zinc-950/10">
                Get on Android
              </button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative mx-auto w-64 aspect-[9/19] rounded-[2.5rem] bg-zinc-900 p-3 ring-1 ring-black/10 shadow-2xl">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 h-5 w-24 bg-zinc-900 rounded-b-2xl z-10" />
              <div className="h-full w-full rounded-[2rem] bg-surface overflow-hidden flex flex-col">
                <div className="bg-brand p-4 pt-8">
                  <p className="text-[9px] uppercase tracking-widest text-white/70">Live · Ends 02:14</p>
                  <p className="font-display text-2xl text-white mt-1">Rolex GMT II</p>
                  <p className="font-display text-3xl text-white mt-3">$18,400</p>
                </div>
                <div className="flex-1 p-4 space-y-3 bg-zinc-50">
                  <div className="rounded-lg bg-white p-3 ring-1 ring-zinc-950/5">
                    <p className="text-[9px] uppercase text-zinc-400">You're winning</p>
                    <p className="text-xs font-medium">Auto-bid up to $22,000</p>
                  </div>
                  {["adaeze.o · $18,400", "luxe_ldn · $18,200", "you · $18,000"].map((b, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg bg-white p-3 ring-1 ring-zinc-950/5 text-xs">
                      <span className="text-zinc-600">{b.split(" · ")[0]}</span>
                      <span className="font-mono">{b.split(" · ")[1]}</span>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-white border-t border-zinc-950/5">
                  <div className="rounded-lg bg-brand text-white py-3 text-center text-xs font-medium">
                    Bid $18,600
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-y border-zinc-950/5 bg-brand-muted py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">The Gavel</span>
          <h2 className="mt-2 font-display text-5xl lg:text-6xl text-balance">
            Weekly dispatch from the <em className="italic">auction floor</em>.
          </h2>
          <p className="mt-6 text-zinc-600 max-w-xl mx-auto">
            Upcoming sales, hammer-price reports, and verified vendor watchlists.
            Delivered every Thursday. No spam, ever.
          </p>
          <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="you@studio.com"
              className="flex-1 rounded-lg bg-white px-4 py-3 text-sm ring-1 ring-zinc-950/10 focus:ring-brand focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-lg bg-zinc-900 text-white px-6 py-3 text-sm font-medium hover:bg-zinc-800 transition-colors"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-4 text-[10px] uppercase tracking-widest text-zinc-400">
            Joining 28,400+ collectors & dealers
          </p>
        </div>
      </section>



      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl bg-zinc-900 p-12 lg:p-20 text-white">
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: "radial-gradient(circle at 80% 20%, rgba(255,140,60,0.4) 0%, transparent 50%)"
          }} />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-4xl lg:text-6xl font-medium leading-none tracking-tighter text-balance">
              The next gavel falls in 3 minutes.
            </h2>
            <p className="mt-6 text-lg text-zinc-400 max-w-[44ch]">
              Join 12,000+ bidders trading across Lagos, London, Berlin and Nairobi. Open a wallet in 90 seconds.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button className="rounded-lg bg-brand px-6 py-3 text-sm font-medium hover:bg-brand/90 transition-colors">
                Enter the auction floor
              </button>
              <button className="rounded-lg bg-white/10 px-6 py-3 text-sm font-medium ring-1 ring-white/20 hover:bg-white/15 transition-colors">
                Talk to a vendor lead
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-950/5 bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
            <div className="col-span-2 space-y-4">
              <span className="font-display text-2xl font-semibold tracking-tighter">KILIMANJARO</span>
              <p className="text-sm text-zinc-500 max-w-xs">
                A hybrid African marketplace combining instant commerce with competitive auction-driven pricing.
              </p>
            </div>
            {[
              ["Platform", ["Auctions", "Sell", "Categories", "Featured Lots"]],
              ["Trust", ["KYC/AML", "Escrow", "Anti-shill", "Disputes"]],
              ["Company", ["About", "Careers", "Press", "Contact"]],
            ].map(([title, links]) => (
              <div key={title as string} className="flex flex-col gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">{title}</span>
                {(links as string[]).map((l) => (
                  <a key={l} href="#" className="text-sm text-zinc-600 hover:text-brand transition-colors">
                    {l}
                  </a>
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
  );
}
