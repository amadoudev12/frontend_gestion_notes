import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";
import eleveService from "../../services/eleveService";
import noteService from "../../services/noteService";
import HeaderEleve from "../components/HeaderEleve";
import StatsCards from "../components/StatsCards";
//Helpers 


const getAppreciation = (moy) => {
    if (moy >= 16) return "Excellent";
    if (moy >= 14) return "Très bien";
    if (moy >= 12) return "Bien";
    if (moy >= 10) return "Assez bien";
    if (moy >= 8) return "Insuffisant";
    return "Très insuffisant";
}

function ResumeParMatiere({matiereMoyenne}) {
    return (
        <div className="rounded-2xl p-6 mb-6" style={{ background: "linear-gradient(135deg, #1e1b4b, #0f172a)", border: "1px solid rgba(99,102,241,0.2)" }}>
        <h2 className="text-white text-lg font-bold mb-1">Résumé par matière</h2>
        <p className="text-slate-400 text-sm mb-5">Vue d'ensemble de toutes les matières</p>
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
            <thead>
                <tr style={{ borderBottom: "1px solid rgba(99,102,241,0.2)" }}>
                {["Matière", "Moyenne", "Coefficient", "Appréciation"].map((h) => (
                    <th key={h} className="text-left py-3 px-3 text-slate-400 text-xs font-semibold tracking-widest uppercase">{h}</th>
                ))}
                </tr>
            </thead>
            <tbody>
                {matiereMoyenne.map((m, i) => {
                const isGood = m.moyenne >= 10;
                return (
                    <tr key={i}
                    className="transition-colors hover:bg-white/5"
                    style={{ borderBottom: i < matiereMoyenne.length - 1 ? "1px solid rgba(99,102,241,0.1)" : "none" }}>
                    <td className="py-3.5 px-3 text-white font-medium">{m.matiere}</td>
                    <td className="py-3.5 px-3">
                        <span className={`inline-flex items-center gap-1.5 font-bold text-base ${isGood ? "text-emerald-400" : "text-rose-400"}`}>
                        {isGood ? "▲" : "▼"} {Number(m.moyenne).toFixed(1)}
                        </span>
                    </td>
                    <td className="py-3.5 px-3">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold text-indigo-300"
                        style={{ background: "rgba(99,102,241,0.15)" }}>×{m.coefficient}</span>
                    </td>
                    <td className="py-3.5 px-3">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${isGood ? "text-emerald-400 bg-emerald-400/10" : "text-rose-400 bg-rose-400/10"}`}>
                        {getAppreciation(m.moyenne)}
                        </span>
                    </td>
                    </tr>
                );
                })}
            </tbody>
            </table>
        </div>
        </div>
    )
}

function NotesRecentes() {
        const navigate = useNavigate()
        const [notesRecentes, setNotesRecentes] = useState([])
        const [message, setMessage] = useState("")
        useEffect(()=>{
            const token = localStorage.getItem('token')
            if(!token){
                navigate('/login')
                return
            }
            const token_decoded = jwtDecode(token)
            const getNotes = async () => {
                const matricule = token_decoded.profil.matricule
                try {
                    const res = await noteService.getNoteByMatricule(matricule)
                    if(res.data){
                        setNotesRecentes(res.data.noteFinal)
                        setMessage(res.data.message)
                    }
                }catch(err){
                    console.log('erreur serveur')
                }
            }
            getNotes()
        },[])
    return (
        <div className="rounded-2xl p-6" style={{ background: "linear-gradient(135deg, #1e1b4b, #0f172a)", border: "1px solid rgba(99,102,241,0.2)" }}>
        <div className="flex items-center justify-between mb-5">
            <div>
            <h2 className="text-white text-lg font-bold">Notes récentes</h2>
            <p className="text-slate-400 text-sm">Dernières évaluations enregistrées</p>
            </div>
            <span className="text-xs font-bold text-indigo-300 px-3 py-1 rounded-full" style={{ background: "rgba(99,102,241,0.15)" }}>
            {notesRecentes.length} notes
            </span>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
            <thead>
                <tr style={{ borderBottom: "1px solid rgba(99,102,241,0.2)" }}>
                {["Matière", "Type", "Note", "Coef."].map((h) => (
                    <th key={h} className="text-left py-3 px-3 text-slate-400 text-xs font-semibold tracking-widest uppercase">{h}</th>
                ))}
                </tr>
            </thead>
            <tbody>
                {notesRecentes?.reverse().map((n, i) => {
                const isGood = n.valeur >= 10;
                return (
                    <tr key={i}
                    className="transition-colors hover:bg-white/5"
                    style={{ borderBottom: i < notesRecentes.length - 1 ? "1px solid rgba(99,102,241,0.1)" : "none" }}>
                    <td className="py-3.5 px-3 text-white font-semibold">{n.matiere}</td>
                    <td className="py-3.5 px-3 text-slate-300">{n.type}</td>
                    <td className="py-3.5 px-3">
                        <span className={`text-lg font-extrabold ${isGood ? "text-emerald-400" : "text-rose-400"}`}>
                        {n.valeur}
                        <span className="text-slate-500 text-sm font-normal">/20</span>
                        </span>
                    </td>
                    <td className="py-3.5 px-3">
                        <span className="text-indigo-300 font-bold text-xs px-2 py-1 rounded-lg" style={{ background: "rgba(99,102,241,0.15)" }}>×{n.coefficient}</span>
                    </td>
                    {/* <td className="py-3.5 px-3 text-slate-400 text-xs">{formatDate(n.date)}</td> */}
                    </tr>
                )
                })}
            </tbody>
            </table>
            {
                notesRecentes.length == 0 && ( <div className="flex items-center justify-center text-2xl text-white mt-2.5">Aucune note enregistrées</div>)
            }
        </div>
        </div>
    );
    }

    //Dashboard
    export default function DashboardEleve() {
    const [loggedOut, setLoggedOut] = useState(false)
    const [matiereMoyenne, setMatierneMoyenne] = useState([])
    const [eleve, setEleve] = useState(null)
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
        if(!token){
            return navigate('/login')
        }
        const eleveInfo = jwtDecode(token)
        const matricule =  eleveInfo.profil.matricule
    useEffect(()=>{
        const getEleveInformation = async ()=>{
            try{
                const res = await eleveService.getEleve(matricule)
                if(res.data){
                    setEleve(res.data.eleveInformation)
                }
            }catch(err){
                return err
            }
        }
        getEleveInformation()
    },[])
    useEffect(()=>{
            const getMoyenneMat = async ()=>{
                const res = await eleveService.getMoyenneMat(matricule)
                if(res.data){
                    setMatierneMoyenne(res.data.moyenne)
                }
            }
            getMoyenneMat()
        },[])
    if (loggedOut) {
        return (
        <div className="min-h-screen flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #0a0a1a, #0f172a, #1e1b4b)" }}>
            <div className="text-center p-10 rounded-3xl" style={{ background: "rgba(30,27,75,0.8)", border: "1px solid rgba(99,102,241,0.3)" }}>
            <div className="text-5xl mb-4">👋</div>
            <h2 className="text-white text-2xl font-bold mb-2">À bientôt, {eleve.eleve.prenom} !</h2>
            <p className="text-slate-400 mb-6">Vous avez été déconnecté avec succès.</p>
            <button onClick={() => setLoggedOut(false)}
                className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #6366f1, #a78bfa)" }}>
                Se reconnecter
            </button>
            </div>
        </div>
        );
    }

    return (
        <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8"
            style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #0f172a 50%, #1a0f2e 100%)", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
            <div className="max-w-6xl mx-auto">
                <HeaderEleve eleve={eleve} onLogout={() => setLoggedOut(true)} />
                <StatsCards matiereMoyenne={matiereMoyenne} eleve={eleve}/>
                {/* <GraphPerformance /> */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <ResumeParMatiere matiereMoyenne={matiereMoyenne}  />
                    <NotesRecentes />
                </div>
                <p className="text-center text-slate-600 text-xs mt-8">
                    Dashboard Élève © 2025 — {eleve?.eleve.prenom} {eleve?.nom} · {eleve?.classe?.libelle}
                </p>
            </div>
        </div>
    );
    }