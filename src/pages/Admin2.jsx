import { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard, Users, TrendingUp, Award, AlertCircle,
  ChevronRight, Bell, Search, GraduationCap, BookOpen,
  Star, AlertTriangle, BarChart3, PieChart, Activity
} from "lucide-react";
import adminService from "../../services/adminService";
import etablissementService from "../../services/etablissementService";
import noteService from "../../services/noteService";

// ─── UTILS ───────────────────────────────────────────────────────────────────
export const cls = (...args) => args.filter(Boolean).join(" ");

// ─── MOCK FALLBACK (retire si tu as le vrai backend) ─────────────────────────
const MOCK = {
    stat: {
        nombreEleves: 487,
        nombreClasses: 18,
        nombreEnseignants: 42,
        moyenneEtablissement: { moyenneEtablissement: 13.4, trimestre: "Trimestre 3" },
    },
    courbeData: [
        { trimestre: "T1", moyenne: 12.8 },
        { trimestre: "T2", moyenne: 13.0 },
        { trimestre: "T3", moyenne: 13.4 },
    ],
    moyenneClasses: [
        { classe: "6ème A", moyenne: 14.1 }, { classe: "5ème B", moyenne: 13.6 },
        { classe: "4ème A", moyenne: 12.9 }, { classe: "3ème C", moyenne: 13.3 },
        { classe: "2nde B", moyenne: 13.8 }, { classe: "1ère S", moyenne: 12.7 },
        { classe: "Tle ES", moyenne: 14.2 },
    ],
    moyenneMatieres: [
        { matiere: "Maths", moyenne: 11.8 },    { matiere: "Français", moyenne: 13.4 },
        { matiere: "Histoire", moyenne: 14.7 }, { matiere: "Anglais", moyenne: 15.1 },
        { matiere: "SVT", moyenne: 12.6 },      { matiere: "Physique", moyenne: 11.2 },
        { matiere: "Arts", moyenne: 16.3 },
    ],
    repartition: [
        { range: "0–5",   count: 4  },
        { range: "5–10",  count: 18 },
        { range: "10–15", count: 54 },
        { range: "15–20", count: 24 },
    ],
    elevesForts: [
        { nom: "Amara Koné",     moyenne: 18.2, classe: "Terminale S" },
        { nom: "Léa Marchetti",  moyenne: 17.8, classe: "1ère ES"     },
        { nom: "Youssef Benali", moyenne: 17.4, classe: "Terminale L" },
        { nom: "Chloé Dupont",   moyenne: 16.9, classe: "2nde A"      },
        { nom: "Ibrahim Diallo", moyenne: 16.5, classe: "Terminale S" },
    ],
    elevesFaibles: [
        { nom: "Théo Martin",    moyenne: 5.8, classe: "3ème B" },
        { nom: "Sarah Ould",     moyenne: 6.2, classe: "4ème A" },
        { nom: "Karim Ndiaye",   moyenne: 6.7, classe: "6ème C" },
        { nom: "Emma Leroy",     moyenne: 7.1, classe: "5ème B" },
        { nom: "Lucas Pereira",  moyenne: 7.4, classe: "3ème A" },
    ],
    };

    // ─── ANIMATED NUMBER ─────────────────────────────────────────────────────────
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

    // ─── STAT CARD ───────────────────────────────────────────────────────────────
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

    // ─── SECTION HEADER ──────────────────────────────────────────────────────────
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

    // ─── MINI CHART — LINE (SVG, no lib) ─────────────────────────────────────────
function LineSparkChart({ data }) {
    if (!data?.length) return null;
    const W = 600, H = 200, PAD = 40;
    const values = data.map(d => parseFloat(d.moyenne));
    const min = Math.min(...values) - 1;
    const max = Math.max(...values) + 1;
    const xStep = (W - PAD * 2) / (values.length - 1);
    const yScale = v => H - PAD - ((v - min) / (max - min)) * (H - PAD * 2);
    const points = values.map((v, i) => [PAD + i * xStep, yScale(v)]);
    const linePath = points.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `C${p[0] - xStep / 2},${points[i-1][1]} ${p[0] - xStep / 2},${p[1]} ${p[0]},${p[1]}`)).join(" ");
    const areaPath = linePath + ` L${points[points.length-1][0]},${H-PAD} L${PAD},${H-PAD} Z`;

    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 180 }}>
        <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
        </defs>
        {/* Grid lines */}
        {[0,1,2,3].map(i => {
            const y = PAD + i * ((H - PAD * 2) / 3);
            const val = (max - (i * (max - min) / 3)).toFixed(1);
            return (
            <g key={i}>
                <line x1={PAD} y1={y} x2={W - PAD} y2={y} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4,4" />
                <text x={PAD - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#94a3b8">{val}</text>
            </g>
            );
        })}
        {/* Area fill */}
        <path d={areaPath} fill="url(#lineGrad)" />
        {/* Line */}
        <path d={linePath} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Points + labels */}
        {points.map((p, i) => (
            <g key={i}>
            <circle cx={p[0]} cy={p[1]} r="5" fill="#3b82f6" stroke="white" strokeWidth="2" />
            <text x={p[0]} y={p[1] - 12} textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">
                {values[i].toFixed(1)}
            </text>
            <text x={p[0]} y={H - PAD + 16} textAnchor="middle" fontSize="11" fill="#64748b">
                {data[i].trimestre}
            </text>
            </g>
        ))}
        </svg>
    );
}

    // ─── BAR CHART (SVG, no lib) ──────────────────────────────────────────────────
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

    // ─── DONUT CHART (SVG) ────────────────────────────────────────────────────────
function DonutChart({ data }) {
    if (!data?.length) return null;
    const COLORS = ["#f87171", "#fbbf24", "#60a5fa", "#34d399"];
    const total = data.reduce((s, d) => s + d.count, 0);
    const R = 60, CX = 80, CY = 80, INNER = 36;
    let cumAngle = -Math.PI / 2;

    const slices = data.map((d, i) => {
        const angle = (d.count / total) * 2 * Math.PI;
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

    // ─── STUDENT ROW ─────────────────────────────────────────────────────────────
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

    // TOPBAR 
    // function Topbar({ setOpen }) {
    // return (
    //     <header className="bg-white border-b border-slate-100 px-6 py-3.5 flex items-center gap-4 top-0 z-10">
    //     {/* <button className="lg:hidden text-slate-500 hover:text-slate-800 transition" onClick={() => setOpen(o => !o)}>
    //         <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
    //     </button> */}
    //     <div className="flex items-center gap-2 text-slate-400 text-sm">
    //         <span className="font-semibold text-slate-700">EduAdmin</span>
    //         <ChevronRight size={14} />
    //         <span className="text-slate-500">Tableau de bord</span>
    //     </div>
    //     <div className="ml-auto flex items-center gap-3">
    //         <div className="relative hidden md:block">
    //         <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
    //         <input type="text" placeholder="Rechercher..." className="bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-52 transition" />
    //         </div>
    //         <button className="relative p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition">
    //         <Bell size={19} />
    //         <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
    //         </button>
    //     </div>
    //     </header>
    // );
    // }

    // ─── LOADING SKELETON ─────────────────────────────────────────────────────────
    function Skeleton({ className }) {
    return <div className={cls("animate-pulse bg-slate-200 rounded-xl", className)} />;
    }

    // ─── DASHBOARD PAGE ───────────────────────────────────────────────────────────
function DashboardPage({ stat, chartData, loading }) {
    const moyVal = stat?.moyenneEtablissement?.moyenneEtablissement;
    const moyColor = (moyVal ?? 0) >= 10 ? "success" : "danger";

    return (
        <div className="space-y-8">

        {/* ── Stat Cards ── */}
        <section>
            {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32" />)}
            </div>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                <StatCard title="Total élèves"  value={stat?.nombreEleves}       subtitle="Inscrits cette année"                             icon={Users}       color="blue"     delay={0}   />
                <StatCard title="Classes"        value={stat?.nombreClasses}                                                                   icon={BookOpen}    color="emerald"  delay={100} />
                <StatCard title="Enseignants"    value={stat?.nombreEnseignants}  subtitle="Corps enseignant"                                 icon={GraduationCap} color="amber"  delay={200} />
                <StatCard title="Moyenne générale" value={moyVal}                 subtitle={stat?.moyenneEtablissement?.trimestre}            icon={Award}       color={moyColor} delay={300} decimals={1} />
            </div>
            )}
        </section>

        {/* ── Evolution + Répartition ── */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <SectionHeader icon={Activity} title="Évolution de la moyenne générale" subtitle="Par trimestre" color="blue" />
            {loading ? <Skeleton className="h-44" /> : <LineSparkChart data={chartData.courbeData?.courbeData} />}
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <SectionHeader icon={PieChart} title="Répartition des notes" subtitle="Tous trimestres" color="rose" />
            {loading ? <Skeleton className="h-44" /> : <DonutChart data={chartData.repartition?.repartition} />}
            </div>
        </section>

        {/* ── Moyennes par classe & matière ── */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <SectionHeader icon={BarChart3} title="Moyenne par classe" color="emerald" />
            {loading ? <Skeleton className="h-44" /> : <BarChart data={chartData.moyenneClasses?.moyenneClasses} labelKey="classe" valueKey="moyenne" color="#10b981" />}
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <SectionHeader icon={BarChart3} title="Moyenne par matière" color="amber" />
            {loading ? <Skeleton className="h-44" /> : <BarChart data={chartData.moyenneMatieres?.moyenneMatieres} labelKey="matiere" valueKey="moyenne" color="#f59e0b" />}
            </div>
        </section>

        {/* ── Classements ── */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <SectionHeader icon={Star} title="Top 5 meilleurs élèves" subtitle="Ce trimestre" color="amber" />
            {loading
                ? [...Array(5) || []].map((_, i) => <Skeleton key={i} className="h-12 mb-2" />)
                : chartData.elevesForts?.elevesForts.map((e, i) => <StudentRow key={i} rank={i+1} {...e} isTop={true} />)
            }
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <SectionHeader icon={AlertTriangle} title="Élèves en difficulté" subtitle="Suivi prioritaire" color="rose" />
            {loading
                ? [...Array(5) || [] ].map((_, i) => <Skeleton key={i} className="h-12 mb-2" />)
                : chartData.elevesFaibles?.elevesFaibles.map((e, i) => <StudentRow key={i} rank={i+1} {...e} isTop={false} />)
            }
            </div>
        </section>
        </div>
    );
    }

    // ─── APP
export default function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [stat, setStat]           = useState(null);
    const [chartData, setChartData] = useState({});
    const [loading, setLoading]     = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
        try {
            // ── Stats card ──
            const statRes = await adminService.Stat();
            if (statRes?.data) setStat(statRes.data);

            // ── Charts — await Promise.all (bug fix) ──
            const [moyenneEvolution, moyenneClasses, moyenneMatieres, repartition, elevesForts, elevesFaibles] = await Promise.all([
                etablissementService.moyenneEvolution(),
                etablissementService.moyenneClasses(),
                etablissementService.moyenneMatieres(),
                noteService.noteRepartition(),
                adminService.fortesMoyenne(),
                adminService.faiblesMoyenne()
            ]);
            console.log(elevesForts.data)
            setChartData({
            courbeData:     moyenneEvolution?.data,
            moyenneClasses: moyenneClasses?.data,
            moyenneMatieres: moyenneMatieres?.data,
            repartition:    repartition?.data,
            elevesForts:    elevesForts?.data ,   // remplace par ton service si disponible
            elevesFaibles:  elevesFaibles?.data // idem
            });
        } catch (err) {
            console.error("Dashboard fetch error:", err);
            // Fallback sur les mock data si l'API est indisponible
            setStat(MOCK.stat);
            setChartData(MOCK);
        } finally {
            setLoading(false);
        }
        };

        fetchAll();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 flex">
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
            * { font-family: 'Plus Jakarta Sans', sans-serif; }
            @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
        `}</style>

        {/* Sidebar overlay (mobile) */}
        {sidebarOpen && (
            <div className="fixed inset-0 bg-black/30 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <div className="flex-1 flex flex-col min-h-screen lg:ml-38">
            {/* <Topbar setOpen={setSidebarOpen} /> */}
            <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto animate-fadeIn">
            {/* Page title */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Tableau de bord</h1>
                <p className="text-slate-500 text-sm mt-1">Vue d'ensemble de l'établissement</p>
            </div>
                <DashboardPage stat={stat} chartData={chartData} loading={loading} />
            </main>
        </div>
        </div>
    );
}