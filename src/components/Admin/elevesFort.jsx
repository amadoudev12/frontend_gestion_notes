import React, { useEffect, useState } from 'react'
import adminService from '../../../services/adminService'

export default function ElevesForts() {
const [ElevesFort, setElevesFort] =  useState([])
useEffect(()=>{
    const getElevesFort = async ()=>{
        try{
            const res = await adminService.fortesMoyenne()
            if(res.data){
                setElevesFort(res.data.moyennesEleves)
            }
        }catch(err){
            console.log(err)
        }
    }
    getElevesFort()
},[])
    return (
        <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

            {/* En-tête */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700 tracking-wide uppercase">
                Meilleure Eleves
            </h2>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-red-50 text-green-700 border border-red-200">
                {ElevesFort.length} élève(s)
            </span>
            </div>

            {/* Tableau */}
            {ElevesFort.length === 0 ? (
            <div className="py-10 text-center text-sm text-gray-400">
                Aucun élève en échec.
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
                    {ElevesFort.map((eleve, index) => (
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
                        <td className="px-5 py-3 font-semibold text-green-600">
                            {eleve.moyenne.toFixed(2)} / 20
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

