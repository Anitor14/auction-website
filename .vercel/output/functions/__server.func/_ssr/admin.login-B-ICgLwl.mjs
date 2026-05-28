import { P as reactExports, a2 as useRouter, H as jsxRuntimeExports } from "./server-B9xMLAOv.mjs";
import { j as useStore, L as Link, l as login, e as createLucideIcon } from "./router-DSaVKr07.mjs";
import { t as toast } from "./index-BGdxJUrd.mjs";
import { S as ShieldCheck } from "./shield-check-D-Ze7dF3.mjs";
import { M as Mail } from "./mail-Bre5eLTT.mjs";
import { L as Lock } from "./lock--waskNz-.mjs";
import { A as ArrowRight } from "./arrow-right-kFkrzZJQ.mjs";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode);
function AdminLoginPage() {
  const [email, setEmail] = reactExports.useState("");
  const router = useRouter();
  const {
    currentUser
  } = useStore();
  if (currentUser?.role === "admin") {
    router.navigate({
      to: "/admin/dashboard"
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter email address.");
      return;
    }
    const success = login(email);
    if (success) {
      const user = useStore().currentUser;
      if (user?.role === "admin") {
        toast.success("Admin access granted. Opening Dashboard...");
        router.navigate({
          to: "/admin/dashboard"
        });
      } else {
        toast.error("Account does not possess administrator permissions.");
      }
    } else {
      toast.error("Admin account not found. For testing, use the bypass login below.");
    }
  };
  const handleQuickBypass = () => {
    setEmail("admin@kilimanjaro.com");
    const success = login("admin@kilimanjaro.com");
    if (success) {
      toast.success("Admin dashboard access granted.");
      router.navigate({
        to: "/admin/dashboard"
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[75vh] items-center justify-center bg-zinc-950 py-12 px-6 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-5", style: {
      backgroundImage: "radial-gradient(circle at 50% 50%, #ffffff 1px, transparent 1px)",
      backgroundSize: "20px 20px"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md space-y-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl relative z-10 text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex size-12 items-center justify-center rounded-full bg-zinc-800 text-brand mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl font-semibold tracking-tight text-white", children: "Gavel Console" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-zinc-400", children: "Secure admin authentication portal. Authorized access only." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5", children: "Admin Identity / Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "size-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", placeholder: "admin@kilimanjaro.com", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 focus:border-brand focus:outline-none", required: true })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5", children: "Passkey" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "size-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", value: "••••••••", readOnly: true, className: "w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2.5 pl-10 pr-4 text-sm text-zinc-500 focus:outline-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "size-4" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "w-full flex items-center justify-center gap-1.5 rounded-lg bg-white py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-100 shadow", children: [
          "Access Dashboard ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-6 border-t border-zinc-850 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-bold uppercase tracking-wider text-zinc-500 mb-3", children: "Testing Override" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleQuickBypass, className: "w-full rounded-lg border border-zinc-850 bg-zinc-950 px-4 py-2.5 text-xs font-semibold text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white", children: "Bypass & Login as Admin" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-xs text-zinc-600 pt-2", children: [
        "Want to browse as user?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth/login", className: "font-semibold text-zinc-400 hover:underline", children: "Go to Buyer Sign-in" })
      ] })
    ] })
  ] });
}
export {
  AdminLoginPage as component
};
