function StatCard({ label, value, sub, subColor, accent }) {
    return (
        <div className="relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group"
        style={{ background: "linear-gradient(135deg, #1e1b4b, #0f172a)", border: "1px solid rgba(99,102,241,0.2)" }}>
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-5 group-hover:opacity-10 transition-opacity"
            style={{ background: `radial-gradient(circle, ${accent}, transparent)`, transform: "translate(30%,-30%)" }} />
        <div className="flex items-start justify-between mb-3">
            {/* <span className="text-2xl">{icon}</span> */}
            <div className="w-2 h-2 rounded-full mt-1" style={{ background: accent }} />
        </div>
        <p className="text-slate-400 text-xs font-semibold tracking-widest uppercase mb-1">{label}</p>
        <p className="text-white text-3xl font-extrabold tracking-tight">{value}</p>
        {sub && <p className={`text-sm font-semibold mt-1 ${subColor}`}>{sub}</p>}
        </div>
    );
}
export default StatCard