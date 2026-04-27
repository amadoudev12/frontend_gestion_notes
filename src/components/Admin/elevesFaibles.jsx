import React, { useEffect, useState } from 'react'
import adminService from '../../../services/adminService'

export default function ElevesFaibles() {
const [elevesFaibles, setElevesFaibles] =  useState([])
const [erreur, setErreur] = useState(null)
const [loading, setLoading] = useState(true)
useEffect(()=>{
    const getElevesFaibles = async ()=>{
        try{
            const res = await adminService.faiblesMoyenne()
            if(res.data){
                setElevesFaibles(res.data.moyennesEleves)
            }
        }catch(err){
            setErreur(err?.message || "erreur serveur")
            console.log('erreur serveur')
        }finally{
            setLoading(false)
        }
    }
    getElevesFaibles()
},[])
    return (
        <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

            {/* En-tête */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700 tracking-wide uppercase">
                Élèves en échec
            </h2>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">
                {elevesFaibles.length} élève(s)
            </span>
            </div>
            {erreur && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 border border-red-200 text-sm">
                    {erreur}
                </div>
            )}
            {/* Tableau */}
            {loading ? (
                <div className="py-10 text-center text-sm text-gray-400">
                    Chargement...
                </div>
            ) : elevesFaibles.length === 0 ? (
            <div className="py-10 text-center text-sm text-gray-400">
                Aucun élève
            </div>
            ) : (
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                    <tr>
                    <th className="px-5 py-3 text-left font-medium border-b border-gray-100">
                        Matricule
                    </th>
                    <th className="px-5 py-3 text-left font-medium border-b border-gray-100">
                        Nom complet
                    </th>
                    <th className="px-5 py-3 text-left font-medium border-b border-gray-100">
                        Classe
                    </th>
                    <th className="px-5 py-3 text-left font-medium border-b border-gray-100">
                        Moyenne
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {elevesFaibles.map((eleve, index) => (
                    <tr
                        key={index}
                        className="border-b border-gray-100 hover:bg-red-50 transition-colors duration-150"
                    >
                        <td className="px-5 py-3 font-mono text-xs text-gray-500">
                            {eleve.matricule}
                        </td>
                        <td className="px-5 py-3 font-medium text-gray-800">
                            {eleve.nom.toUpperCase()} {eleve.prenom}
                        </td>
                        <td className="px-5 py-3 font-medium text-gray-800">
                            {eleve.classe}
                        </td>
                        <td className="px-5 py-3 font-semibold text-red-600">
                            {eleve.moyenne? eleve.moyenne.toFixed(2) : "00"} / 20
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            )}
        </div>
        </div>
    );
};

