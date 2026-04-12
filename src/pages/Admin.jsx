    import { useState, useEffect } from "react";
    import {
    LayoutDashboard, Calendar, UserX, FileText, Building2,
    BarChart3, Menu, X, Users, TrendingUp, Award, AlertCircle,
    ChevronRight, Plus, Check, Edit3, Trash2, Bell, Search,
    GraduationCap, BookOpen, Clock, Phone, Mail, MapPin,
    Sun, Moon, ChevronDown, Star
    } from "lucide-react";
import adminService from "../../services/adminService";
import ElevesForts from "../components/Admin/elevesFort";
import ElevesFaibles from "../components/Admin/elevesFaibles";
    // ─── HELPER ──────────────────────────────────────────────────────────────────
    export const cls = (...args) => args.filter(Boolean).join(" ");
    // ─── STAT CARD ───────────────────────────────────────────────────────────────

    function StatCard({ title, value, subtitle, icon: Icon, color, delay = 0 }) {
        const [visible, setVisible] = useState(false);
        useEffect(() => {
            const t = setTimeout(() => setVisible(true), delay);
            return () => clearTimeout(t);
        }, [delay]);

        const colors = {
            blue: "from-blue-500 to-blue-700",
            emerald: "from-emerald-500 to-emerald-700",
            amber: "from-amber-500 to-amber-600",
            rose: "from-rose-500 to-rose-700",
            success: "from-green-500 to-green-700",   // moyenne ≥ 10 
            danger: "from-red-500 to-red-700",        // moyenne < 10
        };

        return (
            <div
            className={cls(
                "rounded-2xl p-6 text-white shadow-lg transition-all duration-700 ease-out cursor-default group",
                "bg-linear-to-br", colors[color],
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
            style={{ transitionDelay: `${delay}ms` }}
            >
            <div className="flex items-start justify-between">
                <div>
                <p className="text-white/70 text-sm font-medium tracking-wide uppercase">{title}</p>
                <p className="text-4xl font-bold mt-2 mb-1 tracking-tight">{value}</p>
                {subtitle && <p className="text-white/80 text-sm">{subtitle}</p>}
                </div>
                <div className="bg-white/20 rounded-xl p-3 group-hover:scale-110 transition-transform duration-300">
                <Icon size={24} />
                </div>
            </div>
            </div>
        );
    }

    // ─── SECTION TITLE ───────────────────────────────────────────────────────────

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

    //DASHBOARD PAGE 

    function DashboardPage() {
    const [stat, setStat] = useState(null)
    useEffect(()=>{
        const Total = async ()=>{
            try{
                const res = await adminService.Stat()
                if(res.data){
                    setStat(res.data)
                }
            }catch(err){
                console.log(err)
            }
        }
        Total()
    },[])
    console.log(stat)
    return (
        <div>
        <SectionTitle icon={LayoutDashboard} title="Tableau de bord" subtitle="Vue d'ensemble de l'établissement" />

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
            <StatCard title="Total élèves" value={stat?.nombreEleves ?? ""} subtitle="Inscrits cette année" icon={Users} color="blue" delay={0} />
            <StatCard title="Classe" value={stat?.nombreClasses ?? ""}icon={TrendingUp} color="emerald" delay={100} />
            <StatCard title="Enseignants" value={stat?.nombreEnseignants ?? ""}  icon={Award} color="amber" delay={200} />
            <StatCard title="Moyenne" value={stat?.moyenneEtablissement ?? ""}  icon={Award} color={stat?.moyenneEtablissement > 10 ? "succes":"danger"} delay={200} />
            {/* <StatCard title="Total absences" value={`${totalAbsences}h`} subtitle="Heures cumulées" icon={AlertCircle} color="rose" delay={300} /> */}
        </div>
        </div>
    );
    }

    
    function Topbar({ page, setOpen }) {
    return (
        <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center gap-4 sticky top-0 z-10">
        <button
            className="lg:hidden text-slate-500 hover:text-slate-800 transition"
            onClick={() => setOpen(o => !o)}
        >
            <Menu size={22} />
        </button>
        <div className="flex items-center gap-2 text-slate-400 text-sm">
            <span>EduAdmin</span>
            <ChevronRight size={14} />
            <span className="text-slate-800 font-semibold"></span>
        </div>
        <div className="ml-auto flex items-center gap-3">
            <div className="relative hidden md:block">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
                type="text"
                placeholder="Rechercher..."
                className="bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-52"
            />
            </div>
            <button className="relative p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
        </div>
        </header>
    );
    }

    //APP

    export default function App() {
    const activePage = "dashboard"
    return (
        <div className="min-h-screen bg-slate-50 flex">
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
            * { font-family: 'Plus Jakarta Sans', sans-serif; }
            @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
            .animate-fadeIn { animation: fadeIn 0.35s ease-out; }
        `}</style>



        <div className="flex-1 flex flex-col min-h-screen lg:ml-38">
            {/* <Topbar page={activePage} setOpen={setSidebarOpen} /> */}
            <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto animate-fadeIn" key={activePage}>
                <DashboardPage />
                <ElevesForts/>
                <ElevesFaibles/>
            </main>
        </div>
        </div>
    );
    }