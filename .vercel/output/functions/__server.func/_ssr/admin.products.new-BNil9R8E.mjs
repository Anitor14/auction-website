import { a2 as useRouter, P as reactExports, H as jsxRuntimeExports } from "./server-DzVaOEge.mjs";
import { j as useStore, L as Link, a as addProduct, e as createLucideIcon } from "./router-DJW8gmps.mjs";
import { t as toast } from "./index-BOlsHHHl.mjs";
import { h as heroWatch, c as lotMacbook, a as lotBag, l as lotArt, b as lotCar } from "./hero-watch-Ba2e7wSI.mjs";
import { A as ArrowLeft } from "./arrow-left-BVaiFDWF.mjs";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$3 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode$3);
const __iconNode$2 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Settings = createLucideIcon("settings", __iconNode$1);
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
function AddProductPage() {
  const router = useRouter();
  const {
    currentUser
  } = useStore();
  if (!currentUser || currentUser.role !== "admin") {
    router.navigate({
      to: "/admin/login"
    });
    return null;
  }
  const PRESET_IMAGES = [{
    label: "Rolex Watch",
    value: "/src/assets/hero-watch.jpg",
    asset: heroWatch
  }, {
    label: "Macbook Pro",
    value: "/src/assets/lot-macbook.jpg",
    asset: lotMacbook
  }, {
    label: "Chanel Bag",
    value: "/src/assets/lot-bag.jpg",
    asset: lotBag
  }, {
    label: "Genesis Art",
    value: "/src/assets/lot-art.jpg",
    asset: lotArt
  }, {
    label: "Acura Car",
    value: "/src/assets/lot-car.jpg",
    asset: lotCar
  }];
  const [title, setTitle] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("Electronics");
  const [type, setType] = reactExports.useState("English");
  const [price, setPrice] = reactExports.useState("");
  const [reservePrice, setReservePrice] = reactExports.useState("");
  const [increment, setIncrement] = reactExports.useState("");
  const [durationHours, setDurationHours] = reactExports.useState("2");
  const [imagePath, setImagePath] = reactExports.useState("/src/assets/hero-watch.jpg");
  const [stock, setStock] = reactExports.useState("10");
  const activePreset = PRESET_IMAGES.find((img) => img.value === imagePath);
  const activeImageAsset = activePreset ? activePreset.asset : imagePath;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !price) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const startingPrice = parseFloat(price);
    if (isNaN(startingPrice) || startingPrice <= 0) {
      toast.error("Starting price must be a valid positive number.");
      return;
    }
    const hours = parseFloat(durationHours);
    const endTime = new Date(Date.now() + hours * 60 * 60 * 1e3).toISOString();
    const productPayload = {
      title,
      description,
      category,
      type,
      status: "upcoming",
      // seeded as upcoming first, so admin has to start it!
      price: startingPrice,
      image: imagePath,
      startsAt: (/* @__PURE__ */ new Date()).toISOString(),
      endTime,
      reservePrice: reservePrice ? parseFloat(reservePrice) : void 0,
      increment: increment ? parseFloat(increment) : void 0,
      stock: type === "Buy Now" ? parseInt(stock) : void 0
    };
    addProduct(productPayload);
    toast.success("Listing created as a draft upcoming product!");
    router.navigate({
      to: "/admin/dashboard"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-zinc-50 min-h-screen py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/dashboard", className: "inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 transition-colors hover:text-zinc-950 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-3.5" }),
      " Back to Console Dashboard"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-zinc-400", children: "Inventory Cataloging" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl font-medium tracking-tight text-zinc-950 mt-2", children: "Upload New Auction Lot" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-12 lg:grid-cols-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "lg:col-span-7 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold text-zinc-900 flex items-center gap-2 border-b pb-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-4 text-zinc-400" }),
            "Lot Specifications"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-zinc-600 mb-1.5", children: "Product Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "e.g. Vintage Rolex Submariner Ref. 5513", value: title, onChange: (e) => setTitle(e.target.value), className: "w-full rounded-lg border border-zinc-950/10 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none", required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-zinc-600 mb-1.5", children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 4, placeholder: "Provide comprehensive details, sizing, history, and physical condition...", value: description, onChange: (e) => setDescription(e.target.value), className: "w-full rounded-lg border border-zinc-950/10 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none", required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-zinc-600 mb-1.5", children: "Category" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: category, onChange: (e) => setCategory(e.target.value), className: "w-full rounded-lg border border-zinc-950/10 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none cursor-pointer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Electronics", children: "Electronics" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Luxury Watches", children: "Luxury Watches" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Fine Art", children: "Fine Art" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Automotive", children: "Automotive" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Real Estate", children: "Real Estate" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Collectibles", children: "Collectibles" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "B2B Procurement", children: "B2B Procurement" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-zinc-600 mb-1.5", children: "Selling Format" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: type, onChange: (e) => setType(e.target.value), className: "w-full rounded-lg border border-zinc-950/10 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none cursor-pointer font-semibold", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "English", children: "English Auction (Ascending)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Dutch", children: "Dutch Auction (Descending)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Sealed Bid", children: "Sealed Bid (Confidential)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Reverse", children: "Reverse Auction (Procurement)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Buy Now", children: "Direct Buy Now" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold text-zinc-900 flex items-center gap-2 border-b pb-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "size-4 text-zinc-400" }),
            "Financial Configuration"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-zinc-600 mb-1.5", children: type === "Buy Now" ? "Unit Price (₦)" : type === "Dutch" ? "Dutch Start Price (₦)" : "Starting Price (₦)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", placeholder: "150000", value: price, onChange: (e) => setPrice(e.target.value), className: "w-full rounded-lg border border-zinc-950/10 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none", required: true })
            ] }),
            type !== "Buy Now" && type !== "Dutch" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-xs font-semibold text-zinc-600 mb-1.5", children: [
                "Reserve Price (₦) ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-zinc-400", children: "(Optional)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", placeholder: "200000", value: reservePrice, onChange: (e) => setReservePrice(e.target.value), className: "w-full rounded-lg border border-zinc-950/10 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none" })
            ] }),
            type === "Buy Now" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-zinc-600 mb-1.5", children: "Inventory Stock" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", placeholder: "10", value: stock, onChange: (e) => setStock(e.target.value), className: "w-full rounded-lg border border-zinc-950/10 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none", required: true })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            type === "English" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-zinc-600 mb-1.5", children: "Bid Step / Increment (₦)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", placeholder: "10000", value: increment, onChange: (e) => setIncrement(e.target.value), className: "w-full rounded-lg border border-zinc-950/10 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none" })
            ] }),
            type !== "Buy Now" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-zinc-600 mb-1.5", children: "Auction Duration (Hours)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: durationHours, onChange: (e) => setDurationHours(e.target.value), className: "w-full rounded-lg border border-zinc-950/10 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none cursor-pointer", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "0.5", children: "30 Minutes (Fast demo)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "2", children: "2 Hours" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "6", children: "6 Hours" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "24", children: "24 Hours (1 Day)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "72", children: "72 Hours (3 Days)" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold text-zinc-900 flex items-center gap-2 border-b pb-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "size-4 text-zinc-400" }),
            "Seeded Asset Images"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-zinc-500 mb-3", children: "Select a high-quality preset listing image" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-3", children: PRESET_IMAGES.map((img) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setImagePath(img.value), className: `relative aspect-square rounded-lg overflow-hidden border-2 bg-zinc-50 transition-all ${imagePath === img.value ? "border-brand ring-4 ring-brand/15" : "border-zinc-200 hover:border-zinc-300"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img.asset, alt: img.label, className: "size-full object-cover" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 bg-black/50 py-0.5 text-[8px] text-white text-center truncate", children: img.label })
            ] }, img.value)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "w-full flex items-center justify-center gap-1.5 rounded-lg bg-zinc-900 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 shadow", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "size-4" }),
          " Save Catalog Lot Draft"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-5 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold uppercase tracking-wider text-zinc-400", children: "Live catalog preview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-sm sticky top-28", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-4/3 bg-zinc-50 border-b", children: [
            activeImageAsset ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: activeImageAsset, alt: "Preview lot item", className: "size-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-full items-center justify-center text-zinc-400 text-xs", children: "No image selected" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute left-3 top-3 rounded-full bg-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brand shadow-sm", children: [
              type,
              " format"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-3 top-3 rounded-full bg-blue-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm", children: "Draft Preview" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold uppercase tracking-wider text-zinc-400", children: category }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-zinc-800 text-base leading-tight mt-0.5", children: title || "Untitled Lot Item" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-zinc-500 line-clamp-3 leading-relaxed mt-1.5", children: description || "Provide a detailed product description in the fields to populate this preview area." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 border-t border-zinc-100 pt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] uppercase tracking-wider text-zinc-400", children: type === "Buy Now" ? "Price" : "Starting Bid" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-xl font-medium text-zinc-950 mt-0.5", children: [
                  "₦",
                  price ? parseFloat(price).toLocaleString() : "0"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] uppercase tracking-wider text-zinc-400", children: type === "Buy Now" ? "Inventory" : "Ends In" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-zinc-600 text-xs mt-1", children: type === "Buy Now" ? `${stock || 0} in stock` : `${durationHours} Hours` })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  AddProductPage as component
};
