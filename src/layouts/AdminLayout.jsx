import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Admin/SideBar'
import Header from '../components/Header'
export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
return (
    <div className="min-h-screen bg-slate-50 flex ">
        {/* Sidebar */}
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
            {/* Main */}
            <div className="lg:ml-15 flex flex-col flex-1 min-h-screen">
                <Header setOpen={setSidebarOpen} />
                <main className="flex-1 px-4 lg:px-8 py-6">
                    <Outlet />
                </main>
            </div>
    </div>
)
}
