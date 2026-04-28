import { Calendar, Plus, Check,Trash2, BookOpen} from "lucide-react";
import { useEffect, useState } from "react";
import { cls } from "../utils/cls";
import trimestreService from "../../services/trimestreService";
function TrimestresPage() {
    const [trimestre, setTrimestres] = useState([])
    const [form, setForm] = useState({ nom: "", debut: "", fin: "" });
    const [success, setSuccess] = useState(false);
    useEffect (()=> {
        const getTrimestre = async () => {
            try {
                const res = await trimestreService.getTrimestres()
                if(res.data){
                    setTrimestres(res.data)
                }
            }catch(err){
                console.log('erreur serveur')
            }
        }
        getTrimestre()
    },[trimestre])
    const submitTrimestre = async () => {
        if(!form.nom || !form.debut || !form.fin) {
            return
        }
        try {
            await trimestreService.postTrimestre(form)
            setSuccess(true)
        }catch(err){
            console.log('erreur serveur')
        }
    }
    const toggleActif = async (id) => {
        try {
            await trimestreService.activeTrimestre(id)
        }catch(err){
            console.log('erreur serveur')
        }
    };

    const handleDelete = (id) => {
        setTrimestres(prev => prev.filter(t => t.id !== id));
    };

    return (
        <div className="ml-45">
        {/* <SectionTitle icon={Calendar} title="Trimestres" subtitle="Gérer les périodes scolaires" /> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-semibold text-slate-800 mb-5 flex items-center gap-2">
                <Plus size={18} className="text-blue-500" /> Ajouter un trimestre
            </h3>
            <div className="space-y-4">
                <div>
                <label className="text-sm font-medium text-slate-600 mb-1.5 block">Nom du trimestre</label>
                <input
                    type="text"
                    value={form.nom}
                    onChange={e => setForm(p => ({ ...p, nom: e.target.value }))}
                    placeholder="ex: 1er Trimestre"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                />
                </div>
                <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="text-sm font-medium text-slate-600 mb-1.5 block">Date de début</label>
                    <input
                    type="date"
                    value={form.debut}
                    onChange={e => setForm(p => ({ ...p, debut: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-slate-600 mb-1.5 block">Date de fin</label>
                    <input
                    type="date"
                    value={form.fin}
                    onChange={e => setForm(p => ({ ...p, fin: e.target.value }))}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                    />
                </div>
                </div>
                <button
                onClick={submitTrimestre}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition flex items-center justify-center gap-2"
                >
                <Plus size={16} /> Créer le trimestre
                </button>
                {success && (
                <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 rounded-xl px-4 py-2.5 text-sm animate-pulse">
                    <Check size={16} /> Trimestre ajouté avec succès !
                </div>
                )}
            </div>
            </div>

            {/* List */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-semibold text-slate-800 mb-5 flex items-center gap-2">
                <BookOpen size={18} className="text-blue-500" /> Trimestres enregistrés
            </h3>
            <div className="space-y-3">
                {trimestre.map(t => (
                <div key={t.id_trimestre} className={cls(
                    "rounded-xl p-4 border-2 transition-all duration-300",
                    t.actif ? "border-blue-300 bg-blue-50" : "border-slate-100 bg-slate-50 hover:border-slate-200"
                )}>
                    <div className="flex items-center justify-between">
                    <div>
                        <p className="font-semibold text-slate-800 flex items-center gap-2">
                        {t.libelle}
                        {t.actif && <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">Actif</span>}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                        {new Date(t.date_debut).toLocaleDateString("fr-FR")} → {new Date(t.date_fin).toLocaleDateString("fr-FR")}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                        onClick={() => toggleActif(t.id_trimestre)}
                        className={cls(
                            "text-xs font-medium px-3 py-1.5 rounded-lg transition",
                            t.actif ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600 hover:bg-blue-100 hover:text-blue-600"
                        )}
                        >{t.actif ? "Actif" : "Activer"}</button>
                        <button onClick={() => handleDelete(t.id_trimestre)} className="text-slate-400 hover:text-rose-500 transition p-1">
                        <Trash2 size={15} />
                        </button>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </div>
        </div>
    )};

    export default TrimestresPage