function DonutChart({ data }) {
    if (!data?.length) return null;
    const COLORS = ["#f87171", "#fbbf24", "#60a5fa", "#34d399"];
    const total = data.reduce((s, d) => s + (d.count || 0), 0);
    if (total === 0) return null;
    const R = 60, CX = 80, CY = 80, INNER = 36;
    let cumAngle = -Math.PI / 2;

    const slices = data.map((d, i) => {
        const angle = ((d.count || 0) / total) * 2 * Math.PI;
        const x1 = CX + R * Math.cos(cumAngle);
        const y1 = CY + R * Math.sin(cumAngle);
        cumAngle += angle;
        const x2 = CX + R * Math.cos(cumAngle);
        const y2 = CY + R * Math.sin(cumAngle);
        const large = angle > Math.PI ? 1 : 0;
        const ix1 = CX + INNER * Math.cos(cumAngle - angle);
        const iy1 = CY + INNER * Math.sin(cumAngle - angle);
        const ix2 = CX + INNER * Math.cos(cumAngle);
        const iy2 = CY + INNER * Math.sin(cumAngle);
        return {
        path: `M${x1},${y1} A${R},${R} 0 ${large},1 ${x2},${y2} L${ix2},${iy2} A${INNER},${INNER} 0 ${large},0 ${ix1},${iy1} Z`,
        color: COLORS[i],
        pct: Math.round((d.count / total) * 100),
        label: d.range,
        };
    });

    return (
        <div className="flex items-center gap-4 flex-wrap">
        <svg viewBox="0 0 160 160" style={{ width: 140, height: 140, flexShrink: 0 }}>
            {slices.map((s, i) => <path key={i} d={s.path} fill={s.color} />)}
            <text x={CX} y={CY - 4} textAnchor="middle" fontSize="12" fontWeight="700" fill="#1e293b">{total}</text>
            <text x={CX} y={CY + 10} textAnchor="middle" fontSize="8" fill="#64748b">élèves</text>
        </svg>
        <div className="flex flex-col gap-2">
            {slices.map((s, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
                <span className="w-3 h-3 rounded-sm shrink-0" style={{ background: s.color }} />
                <span className="text-slate-600 text-xs">{s.label}</span>
                <span className="font-semibold text-xs text-slate-800 ml-auto pl-3">{s.pct}%</span>
            </div>
            ))}
        </div>
        </div>
    );
}
export default DonutChart