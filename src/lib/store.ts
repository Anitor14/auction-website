import { useState, useEffect } from "react";

// --- Types ---
export interface User {
  id: string;
  email: string;
  name: string;
  role: "buyer" | "admin";
  walletBalance: number;
}

export interface Bid {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  amount: number;
  timestamp: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  type: "English" | "Dutch" | "Sealed Bid" | "Reverse" | "Buy Now";
  status: "draft" | "upcoming" | "active" | "closed" | "sold";
  price: number; // Starting price for auction, or current price for Dutch, or unit price for Buy Now
  reservePrice?: number;
  currentBid?: number;
  highestBidderId?: string;
  highestBidderName?: string;
  bidsCount: number;
  startsAt?: string; // ISO String
  endTime?: string; // ISO String
  increment?: number;
  stock?: number; // For Buy Now items
  dutchStartPrice?: number;
  dutchDropRate?: number; // Amount dropped per interval
  dutchDropIntervalHours?: number;
  dutchReservePrice?: number;
}

export interface CartItem {
  productId: string;
  productTitle: string;
  productImage: string;
  price: number;
  quantity: number;
  type: "auction_win" | "buy_now";
}

export interface Transaction {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  buyerId: string;
  buyerName: string;
  amount: number;
  type: "bid_escrow" | "buy_now";
  status: "escrow_pending" | "escrow_funded" | "shipped" | "delivered" | "disbursed" | "refunded";
  date: string;
}

export interface AppState {
  users: User[];
  currentUser: User | null;
  products: Product[];
  bids: Bid[];
  cart: CartItem[];
  transactions: Transaction[];
}

// --- Initial Mock Data ---
const DEFAULT_USERS: User[] = [
  {
    id: "user-1",
    email: "buyer@kilimanjaro.com",
    name: "Adaeze O.",
    role: "buyer",
    walletBalance: 15000000,
  },
  {
    id: "admin-1",
    email: "admin@kilimanjaro.com",
    name: "Auction Manager",
    role: "admin",
    walletBalance: 0,
  },
];

// Helper to generate ISO times relative to now
const hoursFromNow = (h: number) => new Date(Date.now() + h * 60 * 60 * 1000).toISOString();
const minutesFromNow = (m: number) => new Date(Date.now() + m * 60 * 1000).toISOString();
const daysFromNow = (d: number) => new Date(Date.now() + d * 24 * 60 * 60 * 1000).toISOString();

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "lot-1",
    title: "MacBook Pro M1 Max 64GB",
    description: "Apple MacBook Pro 16-inch with M1 Max chip (10-core CPU, 32-core GPU), 64GB Unified Memory, and 2TB SSD. Pristine condition with only 12 battery cycles. Includes original 140W fast charger and packaging. Fully verified by Kilimanjaro hardware team in Lagos.",
    image: "/src/assets/lot-macbook.jpg",
    category: "Electronics",
    type: "English",
    status: "active",
    price: 1000000,
    reservePrice: 1600000,
    currentBid: 1450000,
    highestBidderId: "user-1",
    highestBidderName: "Adaeze O.",
    bidsCount: 14,
    endTime: hoursFromNow(4.2),
    increment: 50000,
  },
  {
    id: "lot-2",
    title: "Chanel Classic Flap Bag",
    description: "Timeless Chanel Medium Classic Double Flap Bag in black caviar quilted leather with gold-tone hardware. Authenticity certified by luxury experts. Light wear on interior leather, exterior leather structure remains pristine. Includes original dust bag, box, and authenticity card.",
    image: "/src/assets/lot-bag.jpg",
    category: "Luxury Watches",
    type: "Sealed Bid",
    status: "active",
    price: 2500000,
    reservePrice: 3200000,
    bidsCount: 0,
    endTime: daysFromNow(2),
  },
  {
    id: "lot-3",
    title: "'Genesis' by Kolawole",
    description: "An original oil on canvas piece (120x150cm) by contemporary Nigerian artist Kolawole. Painted in 2023, 'Genesis' explores post-colonial themes using vibrant acrylic paint layers and local fabrics. Signed by the artist, with an official certificate of authenticity from the Nike Art Gallery.",
    image: "/src/assets/lot-art.jpg",
    category: "Fine Art",
    type: "Dutch",
    status: "active",
    price: 850000, // Current price
    dutchStartPrice: 1200000,
    dutchDropRate: 50000,
    dutchDropIntervalHours: 1,
    dutchReservePrice: 500000,
    bidsCount: 0,
    endTime: hoursFromNow(12),
  },
  {
    id: "lot-4",
    title: "2021 Acura TLX Tech",
    description: "Sleek 2021 Acura TLX Technology Package. 2.0L turbocharged inline-4 engine, 10-speed automatic transmission, with SH-AWD. Features a premium leather interior, a 10.2-inch center display, Els Studio 3D sound system, and blind-spot monitoring. Duty paid in full. Mileage: 18,400 miles. Located in Lagos.",
    image: "/src/assets/lot-car.jpg",
    category: "Automotive",
    type: "English",
    status: "active",
    price: 20000000,
    reservePrice: 26000000,
    currentBid: 24000000,
    highestBidderId: "other-user",
    highestBidderName: "Tunde A.",
    bidsCount: 22,
    endTime: minutesFromNow(45),
    increment: 500000,
  },
  {
    id: "lot-5",
    title: "Rolex Datejust 41 Blue Dial",
    description: "Rolex Datejust 41 Ref. 126334 with striking bright blue fluted dial on a Jubilee bracelet. White Rolesor bezel. Chronometer certified Calibre 3235 automatic movement with 70-hour power reserve. Box and papers dated December 2022. Immaculate condition with light hairline scratches on the clasp.",
    image: "/src/assets/hero-watch.jpg",
    category: "Luxury Watches",
    type: "English",
    status: "active",
    price: 8000000,
    reservePrice: 10000000,
    currentBid: 9200000,
    highestBidderId: "user-1",
    highestBidderName: "Adaeze O.",
    bidsCount: 9,
    endTime: daysFromNow(1),
    increment: 200000,
  },
  {
    id: "lot-6",
    title: "Premium Leather Wallet",
    description: "Handcrafted full-grain Italian leather wallet in tan. Minimalist bi-fold design with RFID protection, 6 card slots, and a bill compartment. Designed to age beautifully with a rich patina over time.",
    image: "/src/assets/lot-bag.jpg", // reuse bag image
    category: "Collectibles",
    type: "Buy Now",
    status: "active",
    price: 45000,
    stock: 15,
    bidsCount: 0,
  },
  {
    id: "lot-7",
    title: "Vintage Brass Desk Lamp",
    description: "Mid-century solid brass articulating banker desk lamp. Featuring a green glass shade and pull chain switch. Re-wired and polished for modern use while retaining classic vintage appeal.",
    image: "/src/assets/lot-art.jpg", // reuse art image
    category: "Collectibles",
    type: "Buy Now",
    status: "active",
    price: 120000,
    stock: 5,
    bidsCount: 0,
  },
];

const DEFAULT_BIDS: Bid[] = [
  {
    id: "bid-1",
    productId: "lot-1",
    userId: "user-1",
    userName: "Adaeze O.",
    amount: 1450000,
    timestamp: minutesFromNow(-5),
  },
  {
    id: "bid-2",
    productId: "lot-1",
    userId: "other-1",
    userName: "luxe_ldn",
    amount: 1400000,
    timestamp: minutesFromNow(-12),
  },
  {
    id: "bid-3",
    productId: "lot-4",
    userId: "other-user",
    userName: "Tunde A.",
    amount: 24000000,
    timestamp: minutesFromNow(-2),
  },
];

const DEFAULT_STATE: AppState = {
  users: DEFAULT_USERS,
  currentUser: null,
  products: DEFAULT_PRODUCTS,
  bids: DEFAULT_BIDS,
  cart: [],
  transactions: [],
};

// --- Store Implementation ---
const STORE_KEY = "kilimanjaro_auction_store_v1";

let state: AppState = DEFAULT_STATE;

// Initialize on the client side
if (typeof window !== "undefined") {
  const saved = localStorage.getItem(STORE_KEY);
  if (saved) {
    try {
      state = JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse saved state", e);
      state = DEFAULT_STATE;
    }
  } else {
    // Save defaults initially
    localStorage.setItem(STORE_KEY, JSON.stringify(DEFAULT_STATE));
  }
}

// Subscribers
const listeners = new Set<() => void>();

function saveAndNotify() {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  }
  listeners.forEach((l) => l());
}

export const getStoreState = () => state;

export const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

// --- Actions ---

export const login = (email: string): boolean => {
  const user = state.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (user) {
    state.currentUser = user;
    saveAndNotify();
    return true;
  }
  return false;
};

export const register = (email: string, name: string, role: "buyer" | "admin"): boolean => {
  if (state.users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return false; // already exists
  }
  const newUser: User = {
    id: `user-${Date.now()}`,
    email,
    name,
    role,
    walletBalance: role === "buyer" ? 10000000 : 0, // Seeding new buyers with 10M NGN for fun
  };
  state.users.push(newUser);
  state.currentUser = newUser;
  saveAndNotify();
  return true;
};

export const logout = () => {
  state.currentUser = null;
  saveAndNotify();
};

export const placeBid = (productId: string, amount: number): { success: boolean; message: string } => {
  if (!state.currentUser) {
    return { success: false, message: "Please log in to place bids." };
  }
  if (state.currentUser.role !== "buyer") {
    return { success: false, message: "Only buyers can place bids." };
  }

  const product = state.products.find((p) => p.id === productId);
  if (!product) {
    return { success: false, message: "Product not found." };
  }
  if (product.status !== "active") {
    return { success: false, message: "Auction is not active." };
  }

  // Check wallet balance
  if (state.currentUser.walletBalance < amount) {
    return { success: false, message: "Insufficient wallet balance. Please top up." };
  }

  if (product.type === "English") {
    const minBid = (product.currentBid || product.price) + (product.increment || 0);
    if (amount < minBid) {
      return { success: false, message: `Bid must be at least ₦${minBid.toLocaleString()}` };
    }

    product.currentBid = amount;
    product.highestBidderId = state.currentUser.id;
    product.highestBidderName = state.currentUser.name;
    product.bidsCount += 1;
  } else if (product.type === "Sealed Bid") {
    if (amount < product.price) {
      return { success: false, message: `Bid must be at least the reserve/starting price ₦${product.price.toLocaleString()}` };
    }
    // Just increment bidsCount for sealed, since high bid is kept private until close
    product.bidsCount += 1;
  } else if (product.type === "Reverse") {
    const maxBid = product.currentBid || product.price;
    if (amount >= maxBid) {
      return { success: false, message: `Your bid must be lower than the current offer of ₦${maxBid.toLocaleString()}` };
    }
    product.currentBid = amount;
    product.highestBidderId = state.currentUser.id;
    product.highestBidderName = state.currentUser.name;
    product.bidsCount += 1;
  } else {
    return { success: false, message: "Invalid auction format for bidding." };
  }

  // Record Bid History
  const newBid: Bid = {
    id: `bid-${Date.now()}`,
    productId,
    userId: state.currentUser.id,
    userName: state.currentUser.name,
    amount,
    timestamp: new Date().toISOString(),
  };
  state.bids.push(newBid);

  saveAndNotify();
  return { success: true, message: "Bid placed successfully!" };
};

export const buyDutchAuction = (productId: string): { success: boolean; message: string } => {
  if (!state.currentUser) {
    return { success: false, message: "Please log in to purchase." };
  }
  const product = state.products.find((p) => p.id === productId);
  if (!product || product.type !== "Dutch" || product.status !== "active") {
    return { success: false, message: "Product is not available for purchase." };
  }

  const purchasePrice = product.price;
  if (state.currentUser.walletBalance < purchasePrice) {
    return { success: false, message: "Insufficient wallet balance." };
  }

  // End auction immediately and add to cart
  product.status = "sold";
  product.highestBidderId = state.currentUser.id;
  product.highestBidderName = state.currentUser.name;

  addToCart(productId, 1, "auction_win", purchasePrice);
  saveAndNotify();

  return { success: true, message: "Item purchased and added to cart!" };
};

export const addToCart = (
  productId: string,
  quantity = 1,
  type: "auction_win" | "buy_now" = "buy_now",
  customPrice?: number
): { success: boolean; message: string } => {
  const product = state.products.find((p) => p.id === productId);
  if (!product) {
    return { success: false, message: "Product not found." };
  }

  const price = customPrice !== undefined ? customPrice : product.price;

  if (type === "buy_now" && product.stock !== undefined) {
    if (product.stock < quantity) {
      return { success: false, message: "Insufficient stock available." };
    }
  }

  // Check if item is already in cart
  const existing = state.cart.find((item) => item.productId === productId);
  if (existing) {
    if (type === "buy_now" && product.stock !== undefined) {
      if (product.stock < existing.quantity + quantity) {
        return { success: false, message: "Cannot add more. Insufficient stock." };
      }
      existing.quantity += quantity;
    } else {
      return { success: false, message: "Item is already in your cart." };
    }
  } else {
    state.cart.push({
      productId,
      productTitle: product.title,
      productImage: product.image,
      price,
      quantity,
      type,
    });
  }

  saveAndNotify();
  return { success: true, message: "Added to cart successfully!" };
};

export const removeFromCart = (productId: string) => {
  state.cart = state.cart.filter((item) => item.productId !== productId);
  saveAndNotify();
};

export const checkoutCart = (paymentMethod: "wallet" | "card"): { success: boolean; message: string } => {
  if (!state.currentUser) {
    return { success: false, message: "Please log in to checkout." };
  }

  let totalAmount = 0;
  for (const item of state.cart) {
    totalAmount += item.price * item.quantity;
  }

  // Escrow Fee: 2%, Shipping: 50,000 NGN flat
  const escrowFee = totalAmount * 0.02;
  const shippingFee = 50000;
  const grandTotal = totalAmount + escrowFee + shippingFee;

  if (paymentMethod === "wallet") {
    if (state.currentUser.walletBalance < grandTotal) {
      return { success: false, message: "Insufficient wallet balance. Please top up your wallet." };
    }
    // Deduct from wallet
    state.currentUser.walletBalance -= grandTotal;
    // Update matching user in user list
    const userInList = state.users.find((u) => u.id === state.currentUser?.id);
    if (userInList) {
      userInList.walletBalance = state.currentUser.walletBalance;
    }
  }

  // Create transactions for each item
  for (const item of state.cart) {
    const product = state.products.find((p) => p.id === item.productId);
    if (product) {
      if (item.type === "buy_now" && product.stock !== undefined) {
        product.stock = Math.max(0, product.stock - item.quantity);
        if (product.stock === 0) {
          product.status = "sold";
        }
      } else {
        product.status = "sold";
      }
    }

    const itemTotal = item.price * item.quantity;
    const newTx: Transaction = {
      id: `tx-${Math.floor(100000 + Math.random() * 900000)}`,
      productId: item.productId,
      productTitle: item.productTitle,
      productImage: item.productImage,
      buyerId: state.currentUser.id,
      buyerName: state.currentUser.name,
      amount: itemTotal,
      type: item.type === "auction_win" ? "bid_escrow" : "buy_now",
      status: "escrow_funded", // Payment completed, funds are now in escrow!
      date: new Date().toISOString(),
    };
    state.transactions.push(newTx);
  }

  // Clear cart
  state.cart = [];
  saveAndNotify();
  return { success: true, message: "Checkout successful! Funds are secured in Escrow." };
};

export const updateEscrowStatus = (
  transactionId: string,
  status: Transaction["status"]
): { success: boolean; message: string } => {
  const tx = state.transactions.find((t) => t.id === transactionId);
  if (!tx) {
    return { success: false, message: "Transaction not found." };
  }

  tx.status = status;

  // If status is disbursed, simulate vendor receiving the money
  if (status === "disbursed") {
    const adminUser = state.users.find((u) => u.role === "admin");
    if (adminUser) {
      adminUser.walletBalance += tx.amount;
    }
  }

  // If refunded, return funds to buyer's wallet
  if (status === "refunded") {
    const buyer = state.users.find((u) => u.id === tx.buyerId);
    if (buyer) {
      buyer.walletBalance += tx.amount;
      // sync current user if matching
      if (state.currentUser?.id === buyer.id) {
        state.currentUser.walletBalance = buyer.walletBalance;
      }
    }
  }

  saveAndNotify();
  return { success: true, message: `Transaction status updated to ${status}.` };
};

export const topUpWallet = (amount: number): boolean => {
  if (!state.currentUser) return false;
  state.currentUser.walletBalance += amount;
  const userInList = state.users.find((u) => u.id === state.currentUser?.id);
  if (userInList) {
    userInList.walletBalance = state.currentUser.walletBalance;
  }
  saveAndNotify();
  return true;
};

export const withdrawWallet = (amount: number): { success: boolean; message: string } => {
  if (!state.currentUser) return { success: false, message: "Not logged in" };
  if (state.currentUser.walletBalance < amount) {
    return { success: false, message: "Insufficient balance to withdraw." };
  }
  state.currentUser.walletBalance -= amount;
  const userInList = state.users.find((u) => u.id === state.currentUser?.id);
  if (userInList) {
    userInList.walletBalance = state.currentUser.walletBalance;
  }
  saveAndNotify();
  return { success: true, message: "Withdrawal processed successfully." };
};

export const addProduct = (product: Omit<Product, "id" | "bidsCount">): string => {
  const newId = `lot-${Date.now()}`;
  const newProduct: Product = {
    ...product,
    id: newId,
    bidsCount: 0,
  };
  state.products.push(newProduct);
  saveAndNotify();
  return newId;
};

export const startAuctionNow = (productId: string) => {
  const product = state.products.find((p) => p.id === productId);
  if (product) {
    product.status = "active";
    product.startsAt = new Date().toISOString();
    // default 2 hours duration if none exists
    product.endTime = hoursFromNow(2);
    saveAndNotify();
  }
};

export const endAuctionEarly = (productId: string) => {
  const product = state.products.find((p) => p.id === productId);
  if (product) {
    product.status = "closed";
    product.endTime = new Date().toISOString();

    // If English or Reverse auction, check if there's a winner
    if (product.type === "English" || product.type === "Reverse") {
      if (product.highestBidderId && product.currentBid) {
        // Winner declared! Add to their cart as "auction_win"
        // Let's add it to the winner's cart
        state.cart.push({
          productId: product.id,
          productTitle: product.title,
          productImage: product.image,
          price: product.currentBid,
          quantity: 1,
          type: "auction_win",
        });
      }
    } else if (product.type === "Sealed Bid") {
      // Find highest bid in bid history
      const lotBids = state.bids.filter((b) => b.productId === product.id);
      if (lotBids.length > 0) {
        const winningBid = lotBids.reduce((max, b) => (b.amount > max.amount ? b : max), lotBids[0]);
        product.currentBid = winningBid.amount;
        product.highestBidderId = winningBid.userId;
        product.highestBidderName = winningBid.userName;

        // Add to winner's cart
        state.cart.push({
          productId: product.id,
          productTitle: product.title,
          productImage: product.image,
          price: winningBid.amount,
          quantity: 1,
          type: "auction_win",
        });
      }
    }
    saveAndNotify();
  }
};

export const resetStore = () => {
  state = {
    users: JSON.parse(JSON.stringify(DEFAULT_USERS)),
    currentUser: null,
    products: JSON.parse(JSON.stringify(DEFAULT_PRODUCTS)),
    bids: JSON.parse(JSON.stringify(DEFAULT_BIDS)),
    cart: [],
    transactions: [],
  };
  saveAndNotify();
};

// --- React hook for global state ---
export function useStore() {
  const [currentState, setCurrentState] = useState<AppState>(() => getStoreState());

  useEffect(() => {
    // Set initial state client-side once hydrated
    setCurrentState(getStoreState());

    const unsubscribe = subscribe(() => {
      setCurrentState({ ...getStoreState() });
    });

    return unsubscribe;
  }, []);

  return currentState;
}
