import { useEffect, useState } from "react";
function AnimatedNumber({ value, decimals = 0 }) {
    const [display, setDisplay] = useState(0);
    useEffect(() => {
        if (!value && value !== 0) return;
        const target = parseFloat(value);
        const duration = 900;
        const steps = 40;
        const inc = target / steps;
        let current = 0;
        const timer = setInterval(() => {
        current = Math.min(current + inc, target);
        setDisplay(current);
        if (current >= target) clearInterval(timer);
        }, duration / steps);
        return () => clearInterval(timer);
    }, [value]);
    return <>{display.toFixed(decimals)}</>;
}

export default AnimatedNumber