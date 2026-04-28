import { cls } from "../../utils/cls";
function StudentRow({ rank, nom, moyenne, classe, isTop }) {
    const pct = (moyenne / 20) * 100;
    const scoreColor = isTop ? "text-emerald-600" : "text-rose-500";
    const barColor   = isTop ? "bg-emerald-500"   : "bg-rose-400";
    const badgeBg    = isTop
        ? ["bg-amber-400 text-amber-900", "bg-slate-300 text-slate-700", "bg-amber-600 text-amber-100"][rank - 1] ?? "bg-blue-100 text-blue-700"
        : "bg-rose-100 text-rose-600";

    return (
        <div className="flex items-center gap-3 py-2.5 border-b border-slate-100 last:border-0 group hover:bg-slate-50 -mx-2 px-2 rounded-lg transition">
        <div className={cls("w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0", badgeBg)}>
            {isTop ? rank : "!"}
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">{nom}</p>
            <p className="text-xs text-slate-400">{classe}</p>
            <div className="flex items-center gap-1.5 mt-1">
            <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
                <div className={cls("h-full rounded-full transition-all duration-700", barColor)} style={{ width: `${pct}%` }} />
            </div>
            </div>
        </div>
        <span className={cls("text-sm font-bold shrink-0", scoreColor)}>{moyenne.toFixed(1)}</span>
        </div>
    );
    }


    export default StudentRow