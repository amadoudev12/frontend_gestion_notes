import React, { useEffect, useState } from 'react'
import enseignantService from '../../services/enseignantService'
import { Link, useLocation, useParams } from 'react-router-dom'
function StatCard({ items}) {
    const location = useLocation()
    const path = location.pathname
    const last = path.split('/').filter(Boolean).pop()
    const isNotes = last == "notes" || "eleves"
    const selectMatiere = ()=> {
            localStorage.setItem('matiere',items.matiere)
    }
    return (
       isNotes ? (
            <Link onClick={selectMatiere} to={`/dashboard/liste-eleve/${items.classe?.id}`} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default">
                <p className="text-3xl font-bold text-slate-800 tracking-tight">{items.classe?.libelle}</p>
                <p className="text-sm text-slate-500 mt-1">{items.matiere}</p>
            </Link>
       ):(
            <Link className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default">
                <p className="text-3xl font-bold text-slate-800 tracking-tight">{items.classe?.libelle}</p>
                <p className="text-sm text-slate-500 mt-1">{items.matiere}</p>
            </Link>
       )
    )
}
export default function ClasseList() {
    const  [classes, setClasse]=useState(null)
    useEffect(()=>{
        const getClasses = async ()=>{
            try{
                const res = await enseignantService.getClassesApi()
                if(res.data){
                    setClasse(res.data.classeEnseigner)
                }
            }catch(err){
                console.log('erreur serveur')
            }
        }
        getClasses()
    },[])
return (
    <>
        {
            classes && (
                <div className="ml-50 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    {classes.map((classeItems, i) => <StatCard key={i} items={classeItems} />)}
                </div>
            )
        }
    </>
)
}
