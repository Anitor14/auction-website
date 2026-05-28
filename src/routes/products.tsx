import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { CountdownTimer } from "@/components/countdown";
import { Search, SlidersHorizontal, ArrowUpDown, Tag, Percent, RefreshCw, Layers } from "lucide-react";
import heroWatch from "@/assets/hero-watch.jpg";
import lotMacbook from "@/assets/lot-macbook.jpg";
import lotBag from "@/assets/lot-bag.jpg";
import lotArt from "@/assets/lot-art.jpg";
import lotCar from "@/assets/lot-car.jpg";

export const Route = createFileRoute("/products")({
  component: ProductsPage,
});

function ProductsPage() {
  const { products } = useStore();

  // Filters State
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [format, setFormat] = useState("All");
  const [status, setStatus] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("ends-soonest");

  // Assets image helper
  const IMAGES: Record<string, string> = {
    "/src/assets/hero-watch.jpg": heroWatch,
    "/src/assets/lot-macbook.jpg": lotMacbook,
    "/src/assets/lot-bag.jpg": lotBag,
    "/src/assets/lot-art.jpg": lotArt,
    "/src/assets/lot-car.jpg": lotCar,
  };
  const getImageSrc = (path: string) => IMAGES[path] || path;

  // Categories list
  const categoriesList = [
    "All",
    "Electronics",
    "Luxury Watches",
    "Fine Art",
    "Automotive",
    "Real Estate",
    "Collectibles",
    "B2B Procurement",
  ];

  const formatsList = ["All", "English", "Dutch", "Sealed Bid", "Reverse", "Buy Now"];
  const statusesList = [
    { value: "All", label: "All Statuses" },
    { value: "active", label: "Live Now" },
    { value: "upcoming", label: "Upcoming" },
    { value: "closed", label: "Completed" },
  ];

  // Filtering Logic
  const filteredProducts = products.filter((product) => {
    // Search
    const matchesSearch =
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase());

    // Category
    const matchesCategory = category === "All" || product.category === category;

    // Format
    const matchesFormat = format === "All" || product.type === format;

    // Status
    let matchesStatus = true;
    if (status === "active") {
      matchesStatus = product.status === "active";
    } else if (status === "upcoming") {
      matchesStatus = product.status === "upcoming" || product.status === "draft";
    } else if (status === "closed") {
      matchesStatus = product.status === "closed" || product.status === "sold";
    }

    // Price Range
    const currentPrice = product.currentBid || product.price;
    const matchesMinPrice = minPrice === "" || currentPrice >= parseFloat(minPrice);
    const matchesMaxPrice = maxPrice === "" || currentPrice <= parseFloat(maxPrice);

    return matchesSearch && matchesCategory && matchesFormat && matchesStatus && matchesMinPrice && matchesMaxPrice;
  });

  // Sorting Logic
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

  // Format Helper Colors
  const getFormatBadge = (type: string) => {
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

  return (
    <div className="bg-surface py-12">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header Title */}
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">Kilimanjaro Floor</span>
          <h1 className="mt-2 font-display text-5xl font-medium tracking-tight">Active Floor Listings</h1>
          <p className="mt-2 text-zinc-500 text-sm">
            Place verified bids in real-time or purchase instantly with secure escrow protections.
          </p>
        </div>

        {/* Toolbar controls */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
              <Search className="size-4" />
            </span>
            <input
              type="text"
              placeholder="Search products, details..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-zinc-950/10 bg-white py-2.5 pl-10 pr-4 text-sm ring-brand/10 transition-shadow focus:border-brand focus:outline-none focus:ring-4"
            />
          </div>

          {/* Sort & Reset */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-zinc-950/10 bg-white px-3 py-2 text-xs font-medium text-zinc-700 shadow-sm">
              <ArrowUpDown className="size-3.5 text-zinc-400" />
              <span>Sort By</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-semibold focus:outline-none cursor-pointer"
              >
                <option value="ends-soonest">Closing Soon</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Bids</option>
              </select>
            </div>

            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-950/10 bg-white px-3 py-2 text-xs font-medium text-zinc-600 shadow-sm transition-colors hover:bg-zinc-50"
            >
              <RefreshCw className="size-3.5" />
              Reset Filters
            </button>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="rounded-xl border border-zinc-950/5 bg-zinc-50/50 p-6">
              <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal className="size-4 text-zinc-900" />
                <h2 className="font-semibold text-sm text-zinc-900">Filter Listings</h2>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Category
                </label>
                <div className="space-y-1.5">
                  {categoriesList.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`block w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                        category === cat
                          ? "bg-zinc-900 text-white"
                          : "text-zinc-600 hover:bg-zinc-950/5"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selling Formats */}
              <div className="mb-6">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Auction Format
                </label>
                <div className="space-y-1.5">
                  {formatsList.map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setFormat(fmt)}
                      className={`block w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                        format === fmt
                          ? "bg-zinc-900 text-white"
                          : "text-zinc-600 hover:bg-zinc-950/5"
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="mb-6">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Listing Status
                </label>
                <div className="space-y-1.5">
                  {statusesList.map((st) => (
                    <button
                      key={st.value}
                      onClick={() => setStatus(st.value)}
                      className={`block w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                        status === st.value
                          ? "bg-zinc-900 text-white"
                          : "text-zinc-600 hover:bg-zinc-950/5"
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Price Limit (₦)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full rounded-md border border-zinc-950/10 bg-white px-2.5 py-1.5 text-xs focus:border-brand focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full rounded-md border border-zinc-950/10 bg-white px-2.5 py-1.5 text-xs focus:border-brand focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Listings Catalog */}
          <div className="lg:col-span-9">
            {sortedProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-zinc-950/10 rounded-xl bg-zinc-50/20">
                <Layers className="size-10 text-zinc-400 stroke-1 mb-4" />
                <h3 className="font-semibold text-zinc-800 text-sm">No listings found</h3>
                <p className="mt-1 text-xs text-zinc-500 max-w-xs">
                  We couldn't find any items matching your selected filters. Try resetting the filters or modifying your query.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 rounded-lg bg-zinc-900 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-zinc-800"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sortedProducts.map((lot) => {
                  const currentPrice = lot.currentBid || lot.price;
                  const isClosed = lot.status === "closed" || lot.status === "sold";
                  const isUpcoming = lot.status === "upcoming" || lot.status === "draft";

                  return (
                    <Link
                      key={lot.id}
                      to="/auction/$productId"
                      params={{ productId: lot.id }}
                      className="group flex flex-col overflow-hidden rounded-xl bg-white border border-zinc-950/5 ring-1 ring-black/3 transition-all hover:ring-black/5 hover:shadow-md cursor-pointer"
                    >
                      {/* Image Box */}
                      <div className="relative aspect-4/3 overflow-hidden bg-zinc-100">
                        <img
                          src={getImageSrc(lot.image)}
                          alt={lot.title}
                          className="size-full object-cover transition-transform duration-300 group-hover:scale-102"
                        />
                        {/* Format Badge */}
                        <span
                          className={`absolute left-3 top-3 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider shadow-sm ${getFormatBadge(
                            lot.type
                          )}`}
                        >
                          {lot.type}
                        </span>

                        {/* Status Badge overlays */}
                        {isClosed && (
                          <span className="absolute right-3 top-3 rounded-full bg-zinc-900 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm">
                            Settled
                          </span>
                        )}
                        {isUpcoming && (
                          <span className="absolute right-3 top-3 rounded-full bg-blue-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm animate-pulse">
                            Starts Soon
                          </span>
                        )}
                        {lot.status === "active" && (
                          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-emerald-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm">
                            <span className="size-1 rounded-full bg-white animate-ping" />
                            Live
                          </span>
                        )}
                      </div>

                      {/* Content Box */}
                      <div className="flex flex-1 flex-col p-5">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                          {lot.category}
                        </span>
                        <h3 className="mt-1 font-medium text-zinc-800 line-clamp-1 group-hover:text-brand transition-colors">
                          {lot.title}
                        </h3>
                        <p className="mt-1.5 text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                          {lot.description}
                        </p>

                        <div className="mt-auto pt-4">
                          <div className="grid grid-cols-2 border-t border-zinc-950/5 pt-4">
                            <div>
                              <p className="text-[9px] uppercase tracking-wider text-zinc-400">
                                {lot.type === "Buy Now"
                                  ? "Price"
                                  : lot.type === "Reverse"
                                    ? "Lowest Offer"
                                    : "Current Offer"}
                              </p>
                              <p className="font-display text-lg font-medium text-zinc-900">
                                ₦{currentPrice.toLocaleString()}
                              </p>
                            </div>
                            <div className="text-right">
                              {lot.endTime && lot.status === "active" ? (
                                <>
                                  <p className="text-[9px] uppercase tracking-wider text-zinc-400">Ends In</p>
                                  <p className="font-display text-lg font-medium text-orange-600">
                                    <CountdownTimer endTime={lot.endTime} />
                                  </p>
                                </>
                              ) : lot.status === "upcoming" ? (
                                <>
                                  <p className="text-[9px] uppercase tracking-wider text-zinc-400">Starts At</p>
                                  <p className="font-display text-xs font-semibold text-blue-600 mt-1">
                                    {lot.startsAt ? new Date(lot.startsAt).toLocaleDateString() : "Pending"}
                                  </p>
                                </>
                              ) : (
                                <>
                                  <p className="text-[9px] uppercase tracking-wider text-zinc-400">Activity</p>
                                  <p className="font-display text-sm font-semibold text-zinc-600 mt-0.5">
                                    {lot.type === "Buy Now"
                                      ? `${lot.stock || 0} in stock`
                                      : `${lot.bidsCount} offers placed`}
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
