import { useState, useEffect } from "react";

interface CountdownTimerProps {
  endTime: string;
  onEnd?: () => void;
  className?: string;
}

export function CountdownTimer({ endTime, onEnd, className = "" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(endTime) - +new Date();
      if (difference <= 0) {
        if (onEnd) onEnd();
         return "Closed";
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      const parts: string[] = [];
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
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime, onEnd]);

  return <span className={className}>{timeLeft}</span>;
}
