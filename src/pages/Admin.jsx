import { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard, Users, TrendingUp, Award, AlertCircle,
  ChevronRight, Bell, Search, GraduationCap, BookOpen,
  Star, AlertTriangle, BarChart3, PieChart,
} from "lucide-react";
import adminService from "../../services/adminService";
import etablissementService from "../../services/etablissementService";
import noteService from "../../services/noteService";

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
export function SectionTitle({ icon: Icon, title, subtitle }) {
    return (
        <div className="mb-8 hidden">
        <div className="flex items-center gap-3 mb-1">
            <div className="bg-blue-100 text-blue-600 rounded-xl p-2">
            <Icon size={20} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
        </div>
        {subtitle && <p className="text-slate-500 text-sm pl-12">{subtitle}</p>}
        </div>
    );
}
    // ─── ANIMATED NUMBER ─────────────────────────────────────────────────────────
import AnimatedNumber from "../components/Admin/AnimatedNumber";

    // ─── STAT CARD ───────────────────────────────────────────────────────────────
import StatCard from "../components/Admin/StatCard";

    // ─── MINI CHART — LINE (SVG, no lib) ─────────────────────────────────────────
import LineSparkChart from "../components/Admin/miniLineChart";

    // ─── BAR CHART (SVG, no lib) ──────────────────────────────────────────────────
import BarChart from "../components/Admin/BarChart";
    // ─── DONUT CHART (SVG) ────────────────────────────────────────────────────────
import DonutChart from "../components/Admin/DonutChart";

    // ─── STUDENT ROW ─────────────────────────────────────────────────────────────
import StudentRow from "../components/Admin/StudentRow";
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

    // ─── DASHBOARD PAGE ───────────────────────────────────────────────────────────
import DashboardPage from "../components/Admin/DashboardPage";
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
            setChartData({
            courbeData:     moyenneEvolution?.data,
            moyenneClasses: moyenneClasses?.data,
            moyenneMatieres: moyenneMatieres?.data,
            repartition:    repartition?.data,
            elevesForts:    elevesForts?.data ,   // remplace par ton service si disponible
            elevesFaibles:  elevesFaibles?.data // idem
            });
        } catch (err) {
            console.log('erreur serveur')
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