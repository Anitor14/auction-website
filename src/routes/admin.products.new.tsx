import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useStore, addProduct, Product } from "@/lib/store";
import { toast } from "sonner";
import { ArrowLeft, Sparkles, Upload, FileText, Settings, Layers, Image as ImageIcon } from "lucide-react";
import heroWatch from "@/assets/hero-watch.jpg";
import lotMacbook from "@/assets/lot-macbook.jpg";
import lotBag from "@/assets/lot-bag.jpg";
import lotArt from "@/assets/lot-art.jpg";
import lotCar from "@/assets/lot-car.jpg";

export const Route = createFileRoute("/admin/products/new")({
  component: AddProductPage,
});

function AddProductPage() {
  const router = useRouter();
  const { currentUser } = useStore();

  // Role Guard
  if (!currentUser || currentUser.role !== "admin") {
    router.navigate({ to: "/admin/login" });
    return null;
  }

  // Assets image helper mappings
  const PRESET_IMAGES = [
    { label: "Rolex Watch", value: "/src/assets/hero-watch.jpg", asset: heroWatch },
    { label: "Macbook Pro", value: "/src/assets/lot-macbook.jpg", asset: lotMacbook },
    { label: "Chanel Bag", value: "/src/assets/lot-bag.jpg", asset: lotBag },
    { label: "Genesis Art", value: "/src/assets/lot-art.jpg", asset: lotArt },
    { label: "Acura Car", value: "/src/assets/lot-car.jpg", asset: lotCar },
  ];

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [type, setType] = useState<Product["type"]>("English");
  const [price, setPrice] = useState("");
  const [reservePrice, setReservePrice] = useState("");
  const [increment, setIncrement] = useState("");
  const [durationHours, setDurationHours] = useState("2");
  const [imagePath, setImagePath] = useState("/src/assets/hero-watch.jpg");
  const [stock, setStock] = useState("10");

  const activePreset = PRESET_IMAGES.find((img) => img.value === imagePath);
  const activeImageAsset = activePreset ? activePreset.asset : imagePath;

  const handleSubmit = (e: React.FormEvent) => {
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

    // Prepare duration times
    const hours = parseFloat(durationHours);
    const endTime = new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();

    const productPayload: Omit<Product, "id" | "bidsCount"> = {
      title,
      description,
      category,
      type,
      status: "upcoming", // seeded as upcoming first, so admin has to start it!
      price: startingPrice,
      image: imagePath,
      startsAt: new Date().toISOString(),
      endTime,
      reservePrice: reservePrice ? parseFloat(reservePrice) : undefined,
      increment: increment ? parseFloat(increment) : undefined,
      stock: type === "Buy Now" ? parseInt(stock) : undefined,
    };

    addProduct(productPayload);
    toast.success("Listing created as a draft upcoming product!");
    router.navigate({ to: "/admin/dashboard" });
  };

  return (
    <div className="bg-zinc-50 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-6">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 transition-colors hover:text-zinc-950 mb-6"
        >
          <ArrowLeft className="size-3.5" /> Back to Console Dashboard
        </Link>

        <div className="mb-8">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Inventory Cataloging</span>
          <h1 className="font-display text-5xl font-medium tracking-tight text-zinc-950 mt-2">
            Upload New Auction Lot
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Form fields */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm space-y-5">
              <h2 className="text-sm font-semibold text-zinc-900 flex items-center gap-2 border-b pb-3 mb-2">
                <FileText className="size-4 text-zinc-400" />
                Lot Specifications
              </h2>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Product Title</label>
                <input
                  type="text"
                  placeholder="e.g. Vintage Rolex Submariner Ref. 5513"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-zinc-950/10 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Description</label>
                <textarea
                  rows={4}
                  placeholder="Provide comprehensive details, sizing, history, and physical condition..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-lg border border-zinc-950/10 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-lg border border-zinc-950/10 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none cursor-pointer"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Luxury Watches">Luxury Watches</option>
                    <option value="Fine Art">Fine Art</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Collectibles">Collectibles</option>
                    <option value="B2B Procurement">B2B Procurement</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Selling Format</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as Product["type"])}
                    className="w-full rounded-lg border border-zinc-950/10 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none cursor-pointer font-semibold"
                  >
                    <option value="English">English Auction (Ascending)</option>
                    <option value="Dutch">Dutch Auction (Descending)</option>
                    <option value="Sealed Bid">Sealed Bid (Confidential)</option>
                    <option value="Reverse">Reverse Auction (Procurement)</option>
                    <option value="Buy Now">Direct Buy Now</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Price configuration */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm space-y-5">
              <h2 className="text-sm font-semibold text-zinc-900 flex items-center gap-2 border-b pb-3 mb-2">
                <Settings className="size-4 text-zinc-400" />
                Financial Configuration
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 mb-1.5">
                    {type === "Buy Now"
                      ? "Unit Price (₦)"
                      : type === "Dutch"
                        ? "Dutch Start Price (₦)"
                        : "Starting Price (₦)"}
                  </label>
                  <input
                    type="number"
                    placeholder="150000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full rounded-lg border border-zinc-950/10 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
                    required
                  />
                </div>

                {type !== "Buy Now" && type !== "Dutch" && (
                  <div>
                    <label className="block text-xs font-semibold text-zinc-600 mb-1.5">
                      Reserve Price (₦) <span className="text-zinc-400">(Optional)</span>
                    </label>
                    <input
                      type="number"
                      placeholder="200000"
                      value={reservePrice}
                      onChange={(e) => setReservePrice(e.target.value)}
                      className="w-full rounded-lg border border-zinc-950/10 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
                    />
                  </div>
                )}

                {type === "Buy Now" && (
                  <div>
                    <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Inventory Stock</label>
                    <input
                      type="number"
                      placeholder="10"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      className="w-full rounded-lg border border-zinc-950/10 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
                      required
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {type === "English" && (
                  <div>
                    <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Bid Step / Increment (₦)</label>
                    <input
                      type="number"
                      placeholder="10000"
                      value={increment}
                      onChange={(e) => setIncrement(e.target.value)}
                      className="w-full rounded-lg border border-zinc-950/10 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
                    />
                  </div>
                )}

                {type !== "Buy Now" && (
                  <div>
                    <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Auction Duration (Hours)</label>
                    <select
                      value={durationHours}
                      onChange={(e) => setDurationHours(e.target.value)}
                      className="w-full rounded-lg border border-zinc-950/10 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none cursor-pointer"
                    >
                      <option value="0.5">30 Minutes (Fast demo)</option>
                      <option value="2">2 Hours</option>
                      <option value="6">6 Hours</option>
                      <option value="24">24 Hours (1 Day)</option>
                      <option value="72">72 Hours (3 Days)</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Image selecting box */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm space-y-5">
              <h2 className="text-sm font-semibold text-zinc-900 flex items-center gap-2 border-b pb-3 mb-2">
                <ImageIcon className="size-4 text-zinc-400" />
                Seeded Asset Images
              </h2>
              <div>
                <label className="block text-xs font-semibold text-zinc-500 mb-3">
                  Select a high-quality preset listing image
                </label>
                <div className="grid grid-cols-5 gap-3">
                  {PRESET_IMAGES.map((img) => (
                    <button
                      key={img.value}
                      type="button"
                      onClick={() => setImagePath(img.value)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 bg-zinc-50 transition-all ${
                        imagePath === img.value ? "border-brand ring-4 ring-brand/15" : "border-zinc-200 hover:border-zinc-300"
                      }`}
                    >
                      <img src={img.asset} alt={img.label} className="size-full object-cover" />
                      <div className="absolute inset-x-0 bottom-0 bg-black/50 py-0.5 text-[8px] text-white text-center truncate">
                        {img.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-zinc-900 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 shadow"
            >
              <Upload className="size-4" /> Save Catalog Lot Draft
            </button>
          </form>

          {/* Catalog Preview */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Live catalog preview</h2>
            <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-sm sticky top-28">
              <div className="relative aspect-4/3 bg-zinc-50 border-b">
                {activeImageAsset ? (
                  <img
                    src={activeImageAsset}
                    alt="Preview lot item"
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center text-zinc-400 text-xs">
                    No image selected
                  </div>
                )}
                <span className="absolute left-3 top-3 rounded-full bg-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brand shadow-sm">
                  {type} format
                </span>
                <span className="absolute right-3 top-3 rounded-full bg-blue-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm">
                  Draft Preview
                </span>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">
                    {category}
                  </span>
                  <h3 className="font-semibold text-zinc-800 text-base leading-tight mt-0.5">
                    {title || "Untitled Lot Item"}
                  </h3>
                  <p className="text-xs text-zinc-500 line-clamp-3 leading-relaxed mt-1.5">
                    {description || "Provide a detailed product description in the fields to populate this preview area."}
                  </p>
                </div>

                <div className="grid grid-cols-2 border-t border-zinc-100 pt-4">
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-zinc-400">
                      {type === "Buy Now" ? "Price" : "Starting Bid"}
                    </p>
                    <p className="font-display text-xl font-medium text-zinc-950 mt-0.5">
                      ₦{price ? parseFloat(price).toLocaleString() : "0"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] uppercase tracking-wider text-zinc-400">
                      {type === "Buy Now" ? "Inventory" : "Ends In"}
                    </p>
                    <p className="font-semibold text-zinc-600 text-xs mt-1">
                      {type === "Buy Now" ? `${stock || 0} in stock` : `${durationHours} Hours`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
