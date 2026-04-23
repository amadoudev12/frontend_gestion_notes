import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import eleveService from "../../services/eleveService";
const getMoyenneGenerale = (matieres) => {
    if(!matieres.length){
        return 0
    }
    const totalPoints = matieres.reduce(
        (acc, m) => acc + Number(m.moyenne) * Number(m.coefficient), 
        0
    )
    const totalCoef = matieres.reduce((acc, m) => acc + m.coefficient, 0);
    return (totalPoints / totalCoef).toFixed(2);
}

const getMention = (moy) => {
    const m = parseFloat(moy);
    if (m >= 16) return { label: "Très Bien", color: "text-emerald-400" };
    if (m >= 14) return { label: "Bien", color: "text-teal-400" };
    if (m >= 12) return { label: "Assez Bien", color: "text-sky-400" };
    if (m >= 10) return { label: "Passable", color: "text-yellow-400" };
    return { label: "Insuffisant", color: "text-red-400" };
}
const getMeilleureMatiere = (matieres) => {
    if (!matieres || matieres.length === 0) {
        return null
    }
    return matieres.reduce((best, m) => (Number(m.moyenne) > Number(best.moyenne) ? m : best), matieres[0]);
} 
function StatsCards({matiereMoyenne, eleve}) {
    
        const [rang, setRang]= useState(null)
        useEffect (()=>{
            const getRangFunction = async () => {
                try{
                    const res = await eleveService.getRang()
                    if(res.data){
                        setRang(res.data.rang)
                    }
                }catch(err){
                    console.log('erreur serveur')
                }
            }
            getRangFunction()
        },[eleve])
        const moy = getMoyenneGenerale(matiereMoyenne);
        const mention = getMention(moy);
        const meilleure = getMeilleureMatiere(matiereMoyenne);
        // const totalEvals = notesRecentes.length;
        return (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard  label="Moyenne générale" value={`${moy}/20`} sub={mention.label} subColor={mention.color} accent="#6366f1" />
            <StatCard  label="Matières" value={matiereMoyenne.length} sub="au programme" subColor="text-slate-400" accent="#a78bfa" />
            {/* <StatCard icon="✏️" label="Évaluations" value={totalEvals} sub="ce trimestre" subColor="text-slate-400" accent="#38bdf8" /> */}
            <StatCard  label="Meilleure matière" value={`${Number(meilleure?.moyenne ?? 0)}/20`} sub={meilleure?.nom} subColor="text-emerald-400" accent="#34d399" />
            <StatCard  label="Rang" value={rang != null ? `${rang}` : "Non classe"} sub={meilleure?.nom} subColor="text-emerald-400" accent="#34d399" />
            </div>
        );
}
export default StatsCards