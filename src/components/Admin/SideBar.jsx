import { jwtDecode } from "jwt-decode";
import {
  LayoutDashboard,
  Calendar,
  UserX,
  FileText,
  Building2,
  GraduationCap,
  Trophy,
  Users,
  BookOpen,
  School,
  Upload,
  X,
  LogOut,
  ChevronRight
} from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// ─── NAV CONFIG ───────────────────────────────────────────────────────────────

const NAV = [
    { icon: LayoutDashboard, label: "Tableau de bord",  path: "/dashboard/admin" , end:true},
    { icon: Calendar,        label: "Trimestres",        path: "/dashboard/admin/trimestre" },
    { icon: UserX,           label: "Absences",          path: "/dashboard/admin/absences" },
    { icon: FileText,        label: "Bulletins et Notes",         path: "/dashboard/bulletins" },
    { icon: Building2,       label: "Établissement",     path: "/dashboard/admin/etablissement" },
    { icon: Trophy, label: "Top", path: "/dashboard/admin/topClasse" },
    { icon: Users, label: "Affectation", path: "/dashboard/admin/affectation" },
    { icon: BookOpen, label: "Matières", path: "/dashboard/admin/matieres" },
    { icon: School, label: "Classes", path: "/dashboard/admin/classes" },
    { icon: Upload, label: "Importer", path: "/dashboard/admin/import" },
    // { icon: School2,       label: "Classes",     path: "/dashboard/admin/classes" },
];

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────

function Sidebar({ open, setOpen }) {
    const navigate = useNavigate();
    const [user, setUser]= useState(null)
    const logOut = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
    useEffect(()=>{
        const token =localStorage.getItem('token')
        if(token){
            const decoded = jwtDecode(token)
            setUser(decoded)
        }
    },[])
    return (
        <>
            {/* Overlay mobile */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/30 z-20 lg:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            <aside
                className={`fixed top-0 left-0 h-full w-64 flex flex-col z-30
                    transition-transform duration-300 ease-in-out
                    ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
                style={{ background: "linear-gradient(to bottom, #0f2557, #1a3a8f)" }}
            >
                {/* Logo */}
                <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
                    <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                        <GraduationCap size={20} className="text-white" />
                    </div>
                    <div>
                        <p className="text-white font-bold text-base leading-tight">
                            {
                                user && (
                                    user.profil.etablissement.nom
                                )
                            }
                        </p>
                        <p className="text-blue-300 text-xs">Espace Administrateur</p>
                    </div>
                    <button
                        onClick={() => setOpen(false)}
                        className="ml-auto lg:hidden text-white/60 hover:text-white"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    {NAV.map(({ icon: Icon, label, path, end }, index) => (
                        <NavLink
                            key={index}
                            to={path} 
                            end={end}
                            onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                                `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
                                ${
                                    isActive
                                        ? "bg-white text-[#1a3a8f] shadow-lg shadow-blue-900/30"
                                        : "text-blue-200 hover:bg-white/10 hover:text-white"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon
                                        size={18}
                                        className={
                                            isActive
                                                ? "text-[#1a3a8f]"
                                                : "text-blue-300 group-hover:text-white"
                                        }
                                    />
                                    {label}
                                    {isActive && (
                                        <ChevronRight
                                            size={14}
                                            className="ml-auto text-blue-400"
                                        />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Profile + Logout */}
                <div className="px-3 pb-5 pt-2 border-t border-white/10 space-y-2">
                    <div className="flex items-center gap-3 px-3 py-2">
                        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold shrink-0">
                            A
                        </div>
                        <div className="min-w-0">
                            <p className="text-white text-sm font-semibold truncate">
                                Administrateur
                            </p>
                            <p className="text-blue-300 text-xs truncate">
                                {
                                    user && (
                                        user.profil.nom +" "+ user.profil.prenom
                                    )
                                }
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={logOut}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-all duration-200"
                    >
                        <LogOut size={18} />
                        Déconnexion
                    </button>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;