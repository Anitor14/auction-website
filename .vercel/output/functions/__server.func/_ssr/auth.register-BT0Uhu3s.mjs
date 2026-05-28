import { P as reactExports, a2 as useRouter, H as jsxRuntimeExports } from "./server-B9xMLAOv.mjs";
import { j as useStore, S as Sparkles, L as Link, r as register, e as createLucideIcon } from "./router-DSaVKr07.mjs";
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
  ]
];
const Shield = createLucideIcon("shield", __iconNode$1);
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
function RegisterPage() {
  const [email, setEmail] = reactExports.useState("");
  const [name, setName] = reactExports.useState("");
  const [role, setRole] = reactExports.useState("buyer");
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
    if (!email || !name) {
      toast.error("Please fill in all fields.");
      return;
    }
    const success = register(email, name, role);
    if (success) {
      toast.success(`Account created successfully! Welcome to Kilimanjaro, ${name}.`);
      if (role === "admin") {
        router.navigate({
          to: "/admin/dashboard"
        });
      } else {
        router.navigate({
          to: "/"
        });
      }
    } else {
      toast.error("An account with this email already exists.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[75vh] items-center justify-center bg-zinc-50/50 py-12 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md space-y-8 rounded-2xl border border-zinc-950/5 bg-white p-8 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-widest text-brand", children: "Floor Enrollment" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-4xl font-semibold tracking-tight text-zinc-900", children: "Create your account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-zinc-500", children: "Open a secure wallet-enabled bidder profile in less than 90 seconds." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-zinc-600 mb-1.5", children: "Full Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "size-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Adaeze Obi", value: name, onChange: (e) => setName(e.target.value), className: "w-full rounded-lg border border-zinc-950/10 bg-white py-2.5 pl-10 pr-4 text-sm ring-brand/10 transition-shadow focus:border-brand focus:outline-none focus:ring-4", required: true })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-zinc-600 mb-1.5", children: "Email Address" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "size-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", placeholder: "you@kilimanjaro.com", value: email, onChange: (e) => setEmail(e.target.value), className: "w-full rounded-lg border border-zinc-950/10 bg-white py-2.5 pl-10 pr-4 text-sm ring-brand/10 transition-shadow focus:border-brand focus:outline-none focus:ring-4", required: true })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-zinc-600 mb-1.5", children: "Floor Role" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setRole("buyer"), className: `rounded-lg border p-3 text-center transition-all ${role === "buyer" ? "border-brand bg-brand/5 text-brand" : "border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "mx-auto size-4 mb-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs font-semibold", children: "Buyer / Bidder" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[9px] opacity-75 mt-0.5", children: "Wallet Enabled" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setRole("admin"), className: `rounded-lg border p-3 text-center transition-all ${role === "admin" ? "border-zinc-800 bg-zinc-50 text-zinc-900" : "border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "mx-auto size-4 mb-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs font-semibold", children: "Admin Console" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[9px] opacity-75 mt-0.5", children: "Manage Platform" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "w-full flex items-center justify-center gap-1.5 rounded-lg bg-zinc-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 shadow", children: [
        "Create Account ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-xs text-zinc-500 pt-2", children: [
      "Already have an account?",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth/login", className: "font-semibold text-brand hover:underline", children: "Sign in" })
    ] })
  ] }) });
}
export {
  RegisterPage as component
};
