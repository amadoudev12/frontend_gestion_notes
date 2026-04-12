import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            const decodedToken = jwtDecode(token)
            //console.log('token home:' ,dec)
            if(decodedToken.user.role === "ENSEIGNANT"){
                navigate('/dashboard/enseignant')
            }else{
                navigate('/dashboard/eleve')
            }
        }else{
            return
        }
    },[])

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-12">
            {/* Hero */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 text-center leading-tight tracking-tight max-w-xl">
                Bienvenue sur l'application<br />de gestion des notes
            </h1>
            <p className="mt-3 text-sm text-slate-400 text-center">
                Veuillez sélectionner votre profil pour continuer
            </p>

            {/* Cards */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-2xl">

                {/* Enseignant */}
                <div
                    onClick={() => navigate("/login")}
                    className="group bg-white border border-slate-100 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:shadow-indigo-100 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
                >
                    <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-indigo-100 transition-colors duration-300">
                        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="3" width="20" height="14" rx="2" />
                            <path d="M8 21h8M12 17v4" />
                            <path d="M9 8h6M9 11h4" />
                        </svg>
                    </div>
                    <h2 className="text-lg font-bold text-slate-800 mb-1.5">Je suis Enseignant</h2>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6">
                        Saisir et gérer les notes des élèves
                    </p>
                    <button className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-sm shadow-indigo-200 transition-colors duration-200">
                        Continuer
                    </button>
                </div>

                {/* Élève */}
                <div
                    onClick={() => navigate("/login")}
                    className="group bg-white border border-slate-100 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:shadow-green-100 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
                >
                    <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-green-100 transition-colors duration-300">
                        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                            <path d="M2 17l10 5 10-5" />
                            <path d="M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <h2 className="text-lg font-bold text-slate-800 mb-1.5">Je suis Élève</h2>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6">
                        Consulter mes notes et moyennes
                    </p>
                    <button className="w-full py-2.5 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white text-sm font-semibold rounded-xl shadow-sm shadow-green-200 transition-colors duration-200">
                        Continuer
                    </button>
                </div>

            </div>

            {/* Footer */}
            <p className="mt-12 text-xs text-slate-300">
                © 2026 SchoolNote — Tous droits réservés
            </p>
        </div>
    );
}