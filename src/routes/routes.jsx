import React from 'react'
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './Private.Route.jsx'


const LoginPage = lazy(()=> import('../pages/login.jsx'))
const DashboardEnseignant = lazy(()=> import('../pages/enseignant-dashboard.jsx'))
const ListeEleve = lazy(()=>import('../pages/listEtudiants.jsx'))
const DashLayout = lazy(()=>import('../layouts/dashLayout.jsx'))
const Classes = lazy(()=>import('../pages/Classes.jsx'))
const Home = lazy(()=> import('../pages/home.jsx'))
const EleveDashboard = lazy(()=>import('../pages/eleve-dashboard.jsx'))
const AdminDashboard = lazy(()=> import('../pages/Admin.jsx'))
const AdminSideBar = lazy(()=> import('../layouts/AdminLayout.jsx'))
const Trimestre = lazy(()=> import('../pages/Trimestre.jsx'))
const Absence = lazy(()=> import('../pages/Absence.jsx'))
const Etablissement = lazy(()=> import('../pages/Etablissement.jsx'))
const Bulletins = lazy(()=> import('../pages/Bulletin.jsx'))
const TopClasse = lazy(()=> import('../pages/MeilleurEleves.jsx'))
export default function Approutes() {
return (
    <Suspense>
        <Routes>
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/' element={<LoginPage/>}/>
            <Route element={<PrivateRoute/>}>
                <Route element={<DashLayout/>}>
                    <Route path='/dashboard/enseignant' element={<DashboardEnseignant/>}/>
                    <Route path='/dashboard/classes' element={<Classes/>}/>
                    <Route path='/dashboard/eleves' element={<Classes/>}/>
                    <Route path='/dashboard/notes' element={<Classes/>}/>
                    <Route path='/dashboard/liste-eleve/:id' element={<ListeEleve/>}/>
                </Route>
                {/* Admin route */}
                <Route element={<AdminSideBar/>}>
                    <Route path='/dashboard-admin/liste-eleve/:id' element={<ListeEleve/>}/>
                    <Route path='/dashboard/admin/absences' element={<Absence/>}/>
                    <Route path='/dashboard/admin' element={<AdminDashboard/>}/>
                    <Route path='/dashboard/admin/trimestre' element={<Trimestre/>}/>
                    <Route path='/dashboard/admin/etablissement' element={<Etablissement/>}/>
                    <Route path='/dashboard/bulletins' element={<Bulletins/>}/>
                    <Route path='/dashboard/admin/topClasse' element={<TopClasse/>}/>
                </Route>
                <Route path='/dashboard/eleve' element={<EleveDashboard/>}/>
            </Route>
        </Routes>
    </Suspense>
)
}