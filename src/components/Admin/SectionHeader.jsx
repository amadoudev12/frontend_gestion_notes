import { cls } from "../../utils/cls";
function SectionHeader({ icon: Icon, title, subtitle, color = "blue" }) {
    const colors = {
        blue:    "bg-blue-100 text-blue-600",
        emerald: "bg-emerald-100 text-emerald-600",
        amber:   "bg-amber-100 text-amber-600",
        rose:    "bg-rose-100 text-rose-600",
    };
    return (
        <div className="mb-5">
        <div className="flex items-center gap-3">
            <div className={cls("rounded-xl p-2", colors[color] ?? colors.blue)}>
            <Icon size={18} />
            </div>
            <div>
            <h2 className="text-lg font-bold text-slate-800">{title}</h2>
            {subtitle && <p className="text-slate-500 text-xs">{subtitle}</p>}
            </div>
        </div>
        </div>
    );
}

export default SectionHeader