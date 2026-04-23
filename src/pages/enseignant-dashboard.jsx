import {useEffect, useState } from "react";
import {
  BookOpen,
  ClipboardList,
  Users,
  FileText,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { jwtDecode } from "jwt-decode";
import enseignantService from "../../services/enseignantService";
import { NavLink } from "react-router-dom";

// ─── Stat Card ───────────────────────────────────────────────────────────────
function StatCard({ stat }) {
  const Icon = stat.icon;
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl ${stat.light} flex items-center justify-center`}>
          <Icon size={22} className={stat.text} />
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.light} ${stat.text}`}>
          {stat.sub}
        </span>
      </div>
      <p className="text-3xl font-bold text-slate-800 tracking-tight">{stat.value}</p>
      <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
    </div>
  );
}




// ─── Quick Actions ────────────────────────────────────────────────────────────
function QuickActions() {
  const actions = [
    { icon: ClipboardList, label: "Saisir des notes", color: "bg-blue-600 hover:bg-blue-700", text: "text-white", path:"/dashboard/classes" },
    { icon: FileText, label: "Générer bulletin", color: "bg-indigo-600 hover:bg-indigo-700", text: "text-white", path:"" },
    { icon: Users, label: "Liste de classe", color: "bg-white hover:bg-slate-50 border border-slate-200", text: "text-slate-700", path:"" },
    { icon: Calendar, label: "Mon planning", color: "bg-white hover:bg-slate-50 border border-slate-200", text: "text-slate-700", path:"" },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((a, i) => {
        const Icon = a.icon;
        return (
          <NavLink key={i} to={a.path}  className={`flex flex-col items-center gap-2 py-4 px-3 rounded-xl ${a.color} ${a.text} text-sm font-medium shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}>
            <button>
              <Icon size={20} />
              {a.label}
            </button>
          </NavLink>
        );
      })}
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
function DashboardContent({user}) {
  const [logOut, onLogout] = useState(false)
  const [statistique, setStatistique] = useState(null)
  useEffect(()=>{
    const getStatistique = async ()=>{
      try{
        const res = await enseignantService.getStat()
        if(res.data){
          setStatistique(res.data)
        }
      }catch(err){
        console.log('erreur serveur')
      }
    }
    getStatistique()
  },[])
  let STATS = [
    {
      label: "Mes Classes",
      value: statistique?.nombreClasse ||0,
      icon: BookOpen,
      color: "from-blue-600 to-blue-400",
      light: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      label: "Total Élèves",
      value: statistique?.nombreEleve || 0,
      icon: Users,
      color: "from-indigo-600 to-indigo-400",
      light: "bg-indigo-50",
      text: "text-indigo-600",
    },
    // {
    //   label: "Notes Saisies",
    //   value: "324",
    //   icon: ClipboardList,
    //   color: "from-sky-600 to-sky-400",
    //   light: "bg-sky-50",
    //   text: "text-sky-600",
    // },
  ]
  
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Bonjour {user?.nom + " " + user?.prenom}
          </h1>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded-xl text-sm font-medium border border-green-100">
          <CheckCircle2 size={16} />
          En ligne
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((s, i) => <StatCard key={i} stat={s} />)}
      </div>
    </div>
  )
}


// function Placeholder({ title, icon: Icon }) {
//   return (
//     <div className="flex flex-col items-center justify-center h-64 text-slate-400 space-y-3">
//       <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
//         <Icon size={28} />
//       </div>
//       <p className="text-lg font-semibold text-slate-600">{title}</p>
//       <p className="text-sm">Cette section est prête à être connectée à votre API.</p>
//     </div>
//   );
// }

//App
export default function TeacherDashboard() {
    const [profil, setProfile] = useState(null)
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
  return (
    <div
      className="min-h-screen bg-slate-50"
      style={{ fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
      {/* Main */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <main className="flex-1 px-4 lg:px-8 py-6">
          <DashboardContent user={profil}/>
        </main>
      </div>
    </div>
  );
}