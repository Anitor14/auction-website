import { P as reactExports, H as jsxRuntimeExports } from "./server-B9xMLAOv.mjs";
import { j as useStore, L as Link, e as createLucideIcon } from "./router-DSaVKr07.mjs";
import { C as CountdownTimer } from "./countdown-C7diJynH.mjs";
import { b as lotCar, l as lotArt, a as lotBag, c as lotMacbook, h as heroWatch } from "./hero-watch-Ba2e7wSI.mjs";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$4 = [
  ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
  ["path", { d: "M17 20V4", key: "1ejh1v" }],
  ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }]
];
const ArrowUpDown = createLucideIcon("arrow-up-down", __iconNode$4);
const __iconNode$3 = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
const Layers = createLucideIcon("layers", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$1);
const __iconNode = [
  ["path", { d: "M10 5H3", key: "1qgfaw" }],
  ["path", { d: "M12 19H3", key: "yhmn1j" }],
  ["path", { d: "M14 3v4", key: "1sua03" }],
  ["path", { d: "M16 17v4", key: "1q0r14" }],
  ["path", { d: "M21 12h-9", key: "1o4lsq" }],
  ["path", { d: "M21 19h-5", key: "1rlt1p" }],
  ["path", { d: "M21 5h-7", key: "1oszz2" }],
  ["path", { d: "M8 10v4", key: "tgpxqk" }],
  ["path", { d: "M8 12H3", key: "a7s4jb" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
function ProductsPage() {
  const {
    products
  } = useStore();
  const [search, setSearch] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("All");
  const [format, setFormat] = reactExports.useState("All");
  const [status, setStatus] = reactExports.useState("All");
  const [minPrice, setMinPrice] = reactExports.useState("");
  const [maxPrice, setMaxPrice] = reactExports.useState("");
  const [sortBy, setSortBy] = reactExports.useState("ends-soonest");
  const IMAGES = {
    "/src/assets/hero-watch.jpg": heroWatch,
    "/src/assets/lot-macbook.jpg": lotMacbook,
    "/src/assets/lot-bag.jpg": lotBag,
    "/src/assets/lot-art.jpg": lotArt,
    "/src/assets/lot-car.jpg": lotCar
  };
  const getImageSrc = (path) => IMAGES[path] || path;
  const categoriesList = ["All", "Electronics", "Luxury Watches", "Fine Art", "Automotive", "Real Estate", "Collectibles", "B2B Procurement"];
  const formatsList = ["All", "English", "Dutch", "Sealed Bid", "Reverse", "Buy Now"];
  const statusesList = [{
    value: "All",
    label: "All Statuses"
  }, {
    value: "active",
    label: "Live Now"
  }, {
    value: "upcoming",
    label: "Upcoming"
  }, {
    value: "closed",
    label: "Completed"
  }];
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase()) || product.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || product.category === category;
    const matchesFormat = format === "All" || product.type === format;
    let matchesStatus = true;
    if (status === "active") {
      matchesStatus = product.status === "active";
    } else if (status === "upcoming") {
      matchesStatus = product.status === "upcoming" || product.status === "draft";
    } else if (status === "closed") {
      matchesStatus = product.status === "closed" || product.status === "sold";
    }
    const currentPrice = product.currentBid || product.price;
    const matchesMinPrice = minPrice === "" || currentPrice >= parseFloat(minPrice);
    const matchesMaxPrice = maxPrice === "" || currentPrice <= parseFloat(maxPrice);
    return matchesSearch && matchesCategory && matchesFormat && matchesStatus && matchesMinPrice && matchesMaxPrice;
  });
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const aPrice = a.currentBid || a.price;
    const bPrice = b.currentBid || b.price;
    if (sortBy === "price-low") {
      return aPrice - bPrice;
    }
    if (sortBy === "price-high") {
      return bPrice - aPrice;
    }
    if (sortBy === "popular") {
      return b.bidsCount - a.bidsCount;
    }
    if (sortBy === "ends-soonest") {
      if (!a.endTime) return 1;
      if (!b.endTime) return -1;
      return new Date(a.endTime).getTime() - new Date(b.endTime).getTime();
    }
    return 0;
  });
  const getFormatBadge = (type) => {
    switch (type) {
      case "English":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/50";
      case "Dutch":
        return "bg-orange-50 text-orange-700 border-orange-200/50";
      case "Sealed Bid":
        return "bg-blue-50 text-blue-700 border-blue-200/50";
      case "Reverse":
        return "bg-purple-50 text-purple-700 border-purple-200/50";
      default:
        return "bg-zinc-50 text-zinc-700 border-zinc-200/50";
    }
  };
  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setFormat("All");
    setStatus("All");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("ends-soonest");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-surface py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-widest text-brand", children: "Kilimanjaro Floor" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-5xl font-medium tracking-tight", children: "Active Floor Listings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-zinc-500 text-sm", children: "Place verified bids in real-time or purchase instantly with secure escrow protections." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "size-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Search products, details...", value: search, onChange: (e) => setSearch(e.target.value), className: "w-full rounded-lg border border-zinc-950/10 bg-white py-2.5 pl-10 pr-4 text-sm ring-brand/10 transition-shadow focus:border-brand focus:outline-none focus:ring-4" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-lg border border-zinc-950/10 bg-white px-3 py-2 text-xs font-medium text-zinc-700 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "size-3.5 text-zinc-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Sort By" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: sortBy, onChange: (e) => setSortBy(e.target.value), className: "bg-transparent font-semibold focus:outline-none cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "ends-soonest", children: "Closing Soon" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "price-low", children: "Price: Low to High" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "price-high", children: "Price: High to Low" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "popular", children: "Most Bids" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: resetFilters, className: "flex items-center gap-1.5 rounded-lg border border-zinc-950/10 bg-white px-3 py-2 text-xs font-medium text-zinc-600 shadow-sm transition-colors hover:bg-zinc-50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "size-3.5" }),
          "Reset Filters"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-8 lg:grid-cols-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "lg:col-span-3 space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-zinc-950/5 bg-zinc-50/50 p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "size-4 text-zinc-900" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-sm text-zinc-900", children: "Filter Listings" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2", children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: categoriesList.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCategory(cat), className: `block w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${category === cat ? "bg-zinc-900 text-white" : "text-zinc-600 hover:bg-zinc-950/5"}`, children: cat }, cat)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2", children: "Auction Format" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: formatsList.map((fmt) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setFormat(fmt), className: `block w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${format === fmt ? "bg-zinc-900 text-white" : "text-zinc-600 hover:bg-zinc-950/5"}`, children: fmt }, fmt)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2", children: "Listing Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: statusesList.map((st) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setStatus(st.value), className: `block w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${status === st.value ? "bg-zinc-900 text-white" : "text-zinc-600 hover:bg-zinc-950/5"}`, children: st.label }, st.value)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2", children: "Price Limit (₦)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", placeholder: "Min", value: minPrice, onChange: (e) => setMinPrice(e.target.value), className: "w-full rounded-md border border-zinc-950/10 bg-white px-2.5 py-1.5 text-xs focus:border-brand focus:outline-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", placeholder: "Max", value: maxPrice, onChange: (e) => setMaxPrice(e.target.value), className: "w-full rounded-md border border-zinc-950/10 bg-white px-2.5 py-1.5 text-xs focus:border-brand focus:outline-none" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-9", children: sortedProducts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-center border border-dashed border-zinc-950/10 rounded-xl bg-zinc-50/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "size-10 text-zinc-400 stroke-1 mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-zinc-800 text-sm", children: "No listings found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-zinc-500 max-w-xs", children: "We couldn't find any items matching your selected filters. Try resetting the filters or modifying your query." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: resetFilters, className: "mt-4 rounded-lg bg-zinc-900 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-zinc-800", children: "Clear All Filters" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3", children: sortedProducts.map((lot) => {
        const currentPrice = lot.currentBid || lot.price;
        const isClosed = lot.status === "closed" || lot.status === "sold";
        const isUpcoming = lot.status === "upcoming" || lot.status === "draft";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/auction/$productId", params: {
          productId: lot.id
        }, className: "group flex flex-col overflow-hidden rounded-xl bg-white border border-zinc-950/5 ring-1 ring-black/[0.03] transition-all hover:ring-black/5 hover:shadow-md cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/3] overflow-hidden bg-zinc-100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: getImageSrc(lot.image), alt: lot.title, className: "size-full object-cover transition-transform duration-300 group-hover:scale-102" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute left-3 top-3 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider shadow-sm ${getFormatBadge(lot.type)}`, children: lot.type }),
            isClosed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-3 top-3 rounded-full bg-zinc-900 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm", children: "Settled" }),
            isUpcoming && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-3 top-3 rounded-full bg-blue-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm animate-pulse", children: "Starts Soon" }),
            lot.status === "active" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute right-3 top-3 flex items-center gap-1 rounded-full bg-emerald-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-1 rounded-full bg-white animate-ping" }),
              "Live"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wider text-zinc-400", children: lot.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-1 font-medium text-zinc-800 line-clamp-1 group-hover:text-brand transition-colors", children: lot.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-xs text-zinc-500 line-clamp-2 leading-relaxed", children: lot.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 border-t border-zinc-950/5 pt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] uppercase tracking-wider text-zinc-400", children: lot.type === "Buy Now" ? "Price" : lot.type === "Reverse" ? "Lowest Offer" : "Current Offer" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-lg font-medium text-zinc-900", children: [
                  "₦",
                  currentPrice.toLocaleString()
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right", children: lot.endTime && lot.status === "active" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] uppercase tracking-wider text-zinc-400", children: "Ends In" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-medium text-orange-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CountdownTimer, { endTime: lot.endTime }) })
              ] }) : lot.status === "upcoming" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] uppercase tracking-wider text-zinc-400", children: "Starts At" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xs font-semibold text-blue-600 mt-1", children: lot.startsAt ? new Date(lot.startsAt).toLocaleDateString() : "Pending" })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] uppercase tracking-wider text-zinc-400", children: "Activity" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-sm font-semibold text-zinc-600 mt-0.5", children: lot.type === "Buy Now" ? `${lot.stock || 0} in stock` : `${lot.bidsCount} offers placed` })
              ] }) })
            ] }) })
          ] })
        ] }, lot.id);
      }) }) })
    ] })
  ] }) });
}
export {
  ProductsPage as component
};
