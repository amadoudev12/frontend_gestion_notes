const CARD_THEMES = {
    blue:    { bg: "from-blue-500 to-blue-700",       icon: "bg-blue-400/30"    },
    emerald: { bg: "from-emerald-500 to-emerald-700", icon: "bg-emerald-400/30" },
    amber:   { bg: "from-amber-400 to-amber-600",     icon: "bg-amber-300/30"   },
    success: { bg: "from-green-500 to-green-700",     icon: "bg-green-400/30"   },
    danger:  { bg: "from-red-500 to-red-700",         icon: "bg-red-400/30"     },
};

function StatCard({ title, value, subtitle, icon: Icon, color = "blue", delay = 0, decimals = 0 }) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setVisible(true), delay);
        return () => clearTimeout(t);
    }, [delay]);

    const theme = CARD_THEMES[color] ?? CARD_THEMES.blue;

    return (
        <div
        className={cls(
            "rounded-2xl p-6 text-white shadow-lg transition-all duration-700 ease-out cursor-default group",
            "bg-linear-to-br", theme.bg,
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}
        style={{ transitionDelay: `${delay}ms` }}
        >
        <div className="flex items-start justify-between">
            <div>
            <p className="text-white/70 text-xs font-semibold tracking-widest uppercase mb-2">{title}</p>
            <p className="text-4xl font-bold tracking-tight leading-none mb-1">
                {value !== undefined && value !== null && value !== ""
                ? <AnimatedNumber value={value} decimals={decimals} />
                : <span className="text-white/40 text-2xl">—</span>}
            </p>
            {subtitle && <p className="text-white/75 text-sm mt-1">{subtitle}</p>}
            </div>
            <div className={cls("rounded-xl p-3 group-hover:scale-110 transition-transform duration-300", theme.icon)}>
            <Icon size={22} />
            </div>
        </div>
        </div>
    );
}

export default StatCard