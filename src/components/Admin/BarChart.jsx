function BarChart({ data, labelKey = "classe", valueKey = "moyenne", color = "#3b82f6", maxVal = 20 }) {
    if (!data?.length) return null;
    const H = 180, PAD_L = 48, PAD_B = 36, PAD_T = 16, W_AVAIL = 100;
    const barW = Math.min(36, Math.floor((W_AVAIL / data.length) * 0.6));
    const gap  = Math.floor(W_AVAIL / data.length);
    const totalW = PAD_L + data.length * gap + 20;
    const yScale = v => H - PAD_B - (v / maxVal) * (H - PAD_B - PAD_T);

    return (
        <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${totalW} ${H}`} className="w-full" style={{ minWidth: Math.max(260, totalW), height: 180 }}>
            {/* Y-axis */}
            {[0, 5, 10, 15, 20].map(v => {
            const y = yScale(v);
            return (
                <g key={v}>
                <line x1={PAD_L} y1={y} x2={totalW - 10} y2={y} stroke="#f1f5f9" strokeWidth="1" />
                <text x={PAD_L - 6} y={y + 4} textAnchor="end" fontSize="9" fill="#94a3b8">{v}</text>
                </g>
            );
            })}
            {data.map((d, i) => {
                const x = PAD_L + i * gap + gap / 2 - barW / 2;
                const val = parseFloat(d[valueKey]);
                const y = yScale(val);
                const barH = H - PAD_B - y;
                const barColor = val >= 10 ? color : "#f87171";
                return (
                    <g key={i}>
                    <rect x={x} y={y} width={barW} height={barH} rx="4" fill={barColor} opacity="0.85" />
                    <text x={x + barW / 2} y={y - 4} textAnchor="middle" fontSize="9" fontWeight="600" fill={barColor}>
                        {val.toFixed(1)}
                    </text>
                    <text
                        x={x + barW / 2} y={H - PAD_B + 14}
                        textAnchor="middle" fontSize="9" fill="#64748b"
                        transform={`rotate(-25, ${x + barW / 2}, ${H - PAD_B + 14})`}
                    >
                        {d[labelKey]}
                    </text>
                    </g>
                );
            })}
            {/* Axis line */}
            <line x1={PAD_L} y1={H - PAD_B} x2={totalW - 10} y2={H - PAD_B} stroke="#e2e8f0" strokeWidth="1.5" />
        </svg>
        </div>
    );
    }
export default BarChart