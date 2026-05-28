import { P as reactExports, H as jsxRuntimeExports } from "./server-B9xMLAOv.mjs";
function CountdownTimer({ endTime, onEnd, className = "" }) {
  const [timeLeft, setTimeLeft] = reactExports.useState("");
  reactExports.useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(endTime) - +/* @__PURE__ */ new Date();
      if (difference <= 0) {
        if (onEnd) onEnd();
        return "Closed";
      }
      const days = Math.floor(difference / (1e3 * 60 * 60 * 24));
      const hours = Math.floor(difference / (1e3 * 60 * 60) % 24);
      const minutes = Math.floor(difference / 1e3 / 60 % 60);
      const seconds = Math.floor(difference / 1e3 % 60);
      const parts = [];
      if (days > 0) {
        parts.push(`${days}d`);
      }
      const hStr = String(hours).padStart(2, "0");
      const mStr = String(minutes).padStart(2, "0");
      const sStr = String(seconds).padStart(2, "0");
      parts.push(`${hStr}:${mStr}:${sStr}`);
      return parts.join(" ");
    };
    setTimeLeft(calculateTime());
    const interval = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1e3);
    return () => clearInterval(interval);
  }, [endTime, onEnd]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className, children: timeLeft });
}
export {
  CountdownTimer as C
};
