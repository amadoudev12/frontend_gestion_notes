import {
    LayoutDashboard,
    BookOpen,
    ClipboardList,
    Users,
    FileText,
    Settings,
    LogOut,
    GraduationCap,
    X,
    ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { NavLink, useNavigate } from "react-router-dom";

const NAV = [
    { icon: LayoutDashboard, label: "Tableau de bord", path: "/dashboard/enseignant",},
    { icon: BookOpen, label: "Mes Classes", path: "/dashboard/classes" },
    { icon: ClipboardList, label: "Ajouter des Notes", path: "/dashboard/notes" },
    { icon: Users, label: "Liste des Élèves", path: "/dashboard/eleves" },
    //{ icon: FileText, label: "Bulletins", path: "/dashboard/classes" },
    //{ icon: Settings, label: "Paramètres", path: "/dashboard/settings" },
];

function Sidebar({ open, setOpen }) {
    const navigate = useNavigate()
    const [loggedOut, setLoggedOut] = useState(false)
    const [Profile, setProfile] = useState(null)
    useEffect(() => {
            const token = localStorage.getItem('token')
            if (token) {
                try{
                    const user = jwtDecode(token)
                    setProfile(user.profil)
                }catch(err){
                    console.log('erreur serveur')
                }
            }
    }, [])
    const logOut = ()=>{
        localStorage.removeItem("token")
        navigate('/login')
    }
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
                className={`fixed top-0 left-0 h-full w-64 bg-linear-to-b from-[#0f2557] to-[#1a3a8f] flex flex-col z-30
                transition-transform duration-300 ease-in-out
                ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
            >
                {/* Logo */}
                <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                    <GraduationCap size={20} className="text-white" />
                </div>
                <div>
                    <p className="text-white font-bold text-base leading-tight">Marie Blanche</p>
                    <p className="text-blue-300 text-xs">Espace Enseignant</p>
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
                {NAV.map(({ icon: Icon, label, path }, index) => (
                    <NavLink
                    key={index}
                    to={path}
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
                    {/* <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=teacher42&backgroundColor=b6e3f4"
                    alt="avatar"
                    className="w-9 h-9 rounded-full bg-white/20 object-cover"
                    /> */}
                    <div className="min-w-0">
                    <p className="text-white text-sm font-semibold truncate">
                        M. {Profile ?.nom}
                    </p>
                    {/* <p className="text-blue-300 text-xs truncate">
                        Professeur principal
                    </p> */}
                    </div>
                </div>

                <button onClick={logOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-all duration-200">
                    <LogOut size={18} />
                    Déconnexion
                </button>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;