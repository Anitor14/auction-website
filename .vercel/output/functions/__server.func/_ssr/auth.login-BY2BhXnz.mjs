import { P as reactExports, a2 as useRouter, H as jsxRuntimeExports } from "./server-B9xMLAOv.mjs";
import { j as useStore, L as Link, l as login, e as createLucideIcon } from "./router-DSaVKr07.mjs";
import { t as toast } from "./index-BGdxJUrd.mjs";
import { M as Mail } from "./mail-Bre5eLTT.mjs";
import { A as ArrowRight } from "./arrow-right-kFkrzZJQ.mjs";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }]
];
const ShieldAlert = createLucideIcon("shield-alert", __iconNode$1);
const __iconNode = [
  ["path", { d: "m16 11 2 2 4-4", key: "9rsbq5" }],
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const UserCheck = createLucideIcon("user-check", __iconNode);
function LoginPage() {
  const [email, setEmail] = reactExports.useState("");
  const router = useRouter();
  const {
    currentUser
  } = useStore();
  if (currentUser) {
    if (currentUser.role === "admin") {
      router.navigate({
        to: "/admin/dashboard"
      });
    } else {
      router.navigate({
        to: "/"
      });
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter an email address.");
      return;
    }
    const success = login(email);
    if (success) {
      const user = useStore().currentUser;
      toast.success(`Welcome back, ${user?.name || "User"}!`);
      if (user?.role === "admin") {
        router.navigate({
          to: "/admin/dashboard"
        });
      } else {
        router.navigate({
          to: "/"
        });
      }
    } else {
      toast.error("Account not found. For testing, use a demo account below or register.");
    }
  };
  const handleQuickLogin = (demoEmail) => {
    setEmail(demoEmail);
    const success = login(demoEmail);
    if (success) {
      const user = useStore().currentUser;
      toast.success(`Logged in as ${user?.name} (${user?.role})`);
      if (user?.role === "admin") {
        router.navigate({
          to: "/admin/dashboard"
        });
      } else {
        router.navigate({
          to: "/"
        });
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[75vh] items-center justify-center bg-zinc-50/50 py-12 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md space-y-8 rounded-2xl border border-zinc-950/5 bg-white p-8 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-widest text-brand", children: "Secure Access" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-4xl font-semibold tracking-tight text-zinc-900", children: "Sign in to Kilimanjaro" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-zinc-500", children: "Enter your credentials or select a demo role below to begin bidding." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-zinc-600 mb-1.5", children: "Email Address" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "size-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", placeholder: "you@kilimanjaro.com", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full rounded-lg border border-zinc-950/10 bg-white py-2.5 pl-10 pr-4 text-sm ring-brand/10 transition-shadow focus:border-brand focus:outline-none focus:ring-4", required: true })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "w-full flex items-center justify-center gap-1.5 rounded-lg bg-zinc-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 shadow", children: [
        "Continue ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-6 border-t border-zinc-950/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold uppercase tracking-wider text-zinc-400 text-center mb-3", children: "Testing Quick Roles" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleQuickLogin("buyer@kilimanjaro.com"), className: "flex flex-col items-center gap-1.5 rounded-lg border border-zinc-200 bg-white p-3 hover:bg-zinc-50 transition-colors text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "size-5 text-brand" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-zinc-800", children: "Adaeze O." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-zinc-400", children: "Buyer Profile" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleQuickLogin("admin@kilimanjaro.com"), className: "flex flex-col items-center gap-1.5 rounded-lg border border-zinc-200 bg-white p-3 hover:bg-zinc-50 transition-colors text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "size-5 text-zinc-800" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-zinc-800", children: "Admin Console" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-zinc-400", children: "Manage Listings" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-xs text-zinc-500 pt-2", children: [
      "New to Kilimanjaro?",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth/register", className: "font-semibold text-brand hover:underline", children: "Register a new account" })
    ] })
  ] }) });
}
export {
  LoginPage as component
};
