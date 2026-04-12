import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classeService from "../../services/classeService";
import noteService from "../../services/noteService";

const TYPE_OPTIONS = [
    { value: "interro", label: "Interrogation" },
    { value: "devoir", label: "Devoir" },
    { value: "examen", label: "Examen" },
]
const TRIMESTRE_OPTIONS = [
    { value: "1", label: "1er Trimestre" },
    { value: "2", label: "2ème Trimestre" },
    { value: "3", label: "3ème Trimestre" },
]
export default function StudentTable() {
    const navigate = useNavigate()
    // const matiere  = localStorage.getItem('matiere')
    const [eleves, setEleves] = useState([]);
    const [step, setStep] = useState(null); // null | "config" | "saisie"
    const [config, setConfig] = useState({ type: "", trimestre: "", coefficient: "", matiere:localStorage.getItem("matiere")??"", });
    const [configErrors, setConfigErrors] = useState({});
    const [notes, setNotes] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const { id } = useParams();
    useEffect(() => {
        const getListe = async () => {
            try {
                const res = await classeService.getListApi(id);
                if (res.data) setEleves(res.data.listeEleves);
            } catch (err) {
                console.log("erreur lors de la recuperation", err);
            }
        };
        getListe();
    }, [id]);

    const openConfig = () => {
        setConfig({ type: "", trimestre: "", coefficient: "" ,matiere:localStorage.getItem("matiere")??""});
        setConfigErrors({});
        setSubmitted(false);
        setStep("config");
    }

    const closeModal = () => setStep(null);

    const validateConfig = () => {
        const errors = {};
        if (!config.type) errors.type = "Veuillez choisir un type de note.";
        if (!config.trimestre) errors.trimestre = "Veuillez choisir un trimestre.";
        if (!config.coefficient || isNaN(config.coefficient) || Number(config.coefficient) <= 0)
            errors.coefficient = "Veuillez entrer un coefficient valide.";
        setConfigErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const goToSaisie = () => {
        if (!validateConfig()) return;
        const init = {};
        eleves.forEach((e) => { init[e.matricule] = notes[e.matricule] ?? ""; });
        setNotes(init);
        setStep("saisie");
    };

    const handleNoteChange = (matricule, value) => {
        if (value === "" || (Number(value) >= 0 && Number(value) <= 20)) {
            setNotes((prev) => ({ ...prev, [matricule]: value }));
        }
    };

    const handleSubmit = async () => {
        const allFilled = eleves.every(
            (e) => notes[e.matricule] !== "" && notes[e.matricule] !== undefined
        );
        if (!allFilled) {
            alert("Veuillez renseigner la note de chaque élève.");
            return;
        }
        try {
            const notesArray = eleves.map((e) => ({
                matricule: e.matricule,
                note: Number(notes[e.matricule]),
            }));

            const payload = { config, notes: notesArray };
            // envoi des données au backend 
            const res = await noteService.postNote(payload)
            if(res.data){
                console.log(res.data.message)
                localStorage.removeItem('matiere')
            }
            // await noteService.saveNotes(id, payload);
            console.log("Données à enregistrer :", payload)
            setSubmitted(true);
            setTimeout(() => setStep(null), 1800);
            localStorage.removeItem("matiere")
        } catch (err) {
            console.log("Erreur lors de l'enregistrement", err);
        }
    };

    const cols = [
        { key: "matricule", label: "Matricule" },
        { key: "nom", label: "Nom" },
        { key: "prenom", label: "Prénom" },
    ];

    const typeLabel = TYPE_OPTIONS.find((t) => t.value === config.type)?.label ?? "";
    const trimestreLabel = TRIMESTRE_OPTIONS.find((t) => t.value === config.trimestre)?.label ?? "";

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center px-4 py-12">

            {/* Header */}
            <div className="text-center mb-10">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3">
                    Gestion Académique
                </span>
                <h1 className="text-4xl font-extrabold text-gray-800 leading-tight">
                    Liste des{" "}
                    <span className="text-indigo-500">Étudiants</span>
                    <span className="ml-3 align-middle text-sm font-semibold bg-indigo-100 text-indigo-500 px-3 py-1 rounded-full">
                        {eleves.length}
                    </span>
                </h1>
                <p className="mt-2 text-sm text-gray-400">
                    Consultez, ajoutez et gérez les informations des étudiants
                </p>
                <button
                    onClick={openConfig}
                    className="mt-5 inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm transition">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a2.1 2.1 0 1 1 2.97 2.97L8.75 18.54l-4 1 1-4 11.112-11.053z" />
                    </svg>
                    Saisir les notes
                </button>
            </div>

            {/* Table */}
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            {cols.map(({ key, label }) => (
                                <th key={key} className="px-6 py-3.5 text-left text-xs font-bold uppercase tracking-widest text-gray-400">
                                    {label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {eleves.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="py-16 text-center text-gray-300">
                                    <svg className="w-10 h-10 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                        <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                                    </svg>
                                    <p className="text-sm">Aucun étudiant trouvé</p>
                                </td>
                            </tr>
                        ) : (
                            eleves.map((s, i) => (
                                <tr key={i} className={`border-b border-gray-50 last:border-0 hover:bg-indigo-50/40 transition ${i % 2 === 0 ? "" : "bg-slate-50/50"}`}>
                                    <td className="px-6 py-4">
                                        <span className="font-mono text-indigo-500 font-semibold text-xs bg-indigo-50 px-2.5 py-1 rounded-lg">
                                            {s.matricule}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-700">{s.nom}</td>
                                    <td className="px-6 py-4 text-gray-500">{s.prenom}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* ── OVERLAY ── */}
            {step && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
                    {/* ── ÉTAPE 1 : Configuration ── */}
                    {step === "config" && (
                        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                                <div>
                                    <h2 className="text-lg font-extrabold text-gray-800">Configurer la note</h2>
                                    <p className="text-xs text-gray-400 mt-0.5">Étape 1 sur 2</p>
                                </div>
                                <button onClick={closeModal} className="text-gray-300 hover:text-gray-500 transition">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="px-6 py-5 space-y-6">
                                {/* Type de note */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                                        Type de note
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {TYPE_OPTIONS.map((t) => (
                                            <button
                                                key={t.value}
                                                onClick={() => setConfig((p) => ({ ...p, type: t.value }))}
                                                className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border-2 text-sm font-semibold transition
                                                    ${config.type === t.value
                                                        ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                                                        : "border-gray-100 bg-gray-50 text-gray-500 hover:border-indigo-200"}`}>
                                                {/* <span className="text-xl">{t.icon}</span> */}
                                                {t.label}
                                            </button>
                                        ))}
                                    </div>
                                    {configErrors.type && (
                                        <p className="text-xs text-red-400 mt-1.5">{configErrors.type}</p>
                                    )}
                                </div>

                                {/* Trimestre */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                                        Trimestre
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {TRIMESTRE_OPTIONS.map((t) => (
                                            <button
                                                key={t.value}
                                                onClick={() => setConfig((p) => ({ ...p, trimestre: t.value }))}
                                                className={`py-2.5 px-3 rounded-xl border-2 text-sm font-semibold transition
                                                    ${config.trimestre === t.value
                                                        ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                                                        : "border-gray-100 bg-gray-50 text-gray-500 hover:border-indigo-200"}`}>
                                                {t.label}
                                            </button>
                                        ))}
                                    </div>
                                    {configErrors.trimestre && (
                                        <p className="text-xs text-red-400 mt-1.5">{configErrors.trimestre}</p>
                                    )}
                                </div>

                                {/* Coefficient */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                                        Coefficient
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        placeholder="Ex : 2"
                                        value={config.coefficient}
                                        onChange={(e) => setConfig((p) => ({ ...p, coefficient: e.target.value }))}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition"
                                    />
                                    {configErrors.coefficient && (
                                        <p className="text-xs text-red-400 mt-1.5">{configErrors.coefficient}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
                                <button onClick={closeModal} className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-700 transition">
                                    Annuler
                                </button>
                                <button
                                    onClick={goToSaisie}
                                    className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold px-5 py-2 rounded-xl transition shadow-sm">
                                    Suivant
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ── ÉTAPE 2 : Saisie des notes ── */}
                    {step === "saisie" && (
                        <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                                <div>
                                    <h2 className="text-lg font-extrabold text-gray-800">Saisie des notes</h2>
                                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                                        <span className="text-xs bg-indigo-100 text-indigo-600 font-semibold px-2.5 py-0.5 rounded-full">
                                            {typeLabel}
                                        </span>
                                        <span className="text-xs bg-violet-100 text-violet-600 font-semibold px-2.5 py-0.5 rounded-full">
                                            {trimestreLabel}
                                        </span>
                                        <span className="text-xs bg-amber-100 text-amber-600 font-semibold px-2.5 py-0.5 rounded-full">
                                            Coeff. {config.coefficient}
                                        </span>
                                        <span className="text-xs bg-amber-100 text-amber-600 font-semibold px-2.5 py-0.5 rounded-full">
                                            Matiere {config.matiere}
                                        </span>
                                    </div>
                                </div>
                                <button onClick={closeModal} className="text-gray-300 hover:text-gray-500 transition">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
                                {submitted ? (
                                    <div className="flex flex-col items-center justify-center py-12 gap-3">
                                        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                                            <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-700 font-semibold">Notes enregistrées avec succès !</p>
                                    </div>
                                ) : (
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-gray-100">
                                                <th className="py-2.5 text-left text-xs font-bold uppercase tracking-widest text-gray-400">Matricule</th>
                                                <th className="py-2.5 text-left text-xs font-bold uppercase tracking-widest text-gray-400">Nom & Prénom</th>
                                                <th className="py-2.5 text-center text-xs font-bold uppercase tracking-widest text-gray-400">Note /20</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {eleves.map((s, i) => (
                                                <tr key={i} className="border-b border-gray-50 last:border-0">
                                                    <td className="py-3 pr-4">
                                                        <span className="font-mono text-indigo-500 font-semibold text-xs bg-indigo-50 px-2 py-1 rounded-lg">
                                                            {s.matricule}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 pr-4 text-gray-700 font-medium">
                                                        {s.nom} {s.prenom}
                                                    </td>
                                                    <td className="py-3 text-center">
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            max="20"
                                                            step="0.25"
                                                            placeholder="—"
                                                            value={notes[s.matricule] ?? ""}
                                                            onChange={(e) => handleNoteChange(s.matricule, e.target.value)}
                                                            className="w-20 text-center border border-gray-200 rounded-lg px-2 py-1.5 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition"
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>

                            {!submitted && (
                                <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
                                    <button
                                        onClick={() => setStep("config")}
                                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-gray-700 transition">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                        </svg>
                                        Retour
                                    </button>
                                    <div className="flex gap-3">
                                        <button onClick={closeModal} className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-700 transition">
                                            Annuler
                                        </button>
                                        <button
                                            onClick={handleSubmit}
                                            className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold px-5 py-2 rounded-xl transition shadow-sm">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                            Enregistrer
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}