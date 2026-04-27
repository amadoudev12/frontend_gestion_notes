import { useNavigate } from "react-router-dom"
import eleveService from "../../services/eleveService"

function HeaderEleve({ eleve, onLogout }) {
    const navigate = useNavigate()
    const logOut = () => {
        localStorage.removeItem('token')
        onLogout()
    }

    const telechargerbulletin = async () => {
        try {
            const matricule = eleve.matricule
            const res = await eleveService.getEleveBulletin({ matricule: matricule })
            const blod = new Blob([res.data], { type: 'application/pdf' })
            const url = window.URL.createObjectURL(blod)
            const link = document.createElement('a')
            link.href = url
            const contentDisposition = res.headers['Content-Type']
            let fileName = "bulletin.pdf"
            if (contentDisposition) {
                const match = contentDisposition.match(/filename="?(.+)"?/)
                if (match && match[1]) { fileName = match[1] }
            }
            link.setAttribute('download', fileName)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
        } catch (err) {
            console.log('erreur serveur')
            navigate('/500')
        }
    }

    const initiales = `${eleve?.eleve.prenom?.[0] ?? ''}${eleve?.eleve.nom?.[0] ?? ''}`.toUpperCase()

    return (
        <header className="mb-6 rounded-2xl overflow-hidden"
            style={{ background: "#fff", border: "0.5px solid var(--color-border-tertiary)" }}>

            {/* Barre accent en haut */}
            <div style={{ height: "4px", background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)" }} />

            <div className="flex flex-wrap items-center justify-between gap-4 px-6 sm:px-8 py-5">

                {/* Infos élève */}
                <div className="flex items-center gap-4">
                    {/* Avatar initiales */}
                    <div className="flex items-center justify-center rounded-full text-sm font-medium"
                        style={{ width: 48, height: 48, background: "#eeedfe", color: "#3c3489", flexShrink: 0 }}>
                        {initiales}
                    </div>

                    <div>
                        <p className="text-xs font-medium uppercase tracking-widest"
                            style={{ color: "var(--color-text-secondary)", marginBottom: 2 }}>
                            Tableau de bord élève
                        </p>
                        <h1 className="text-xl font-medium" style={{ color: "var(--color-text-primary)" }}>
                            {eleve?.eleve?.prenom} <span style={{ color: "#7f77dd" }}>{eleve?.eleve?.nom}</span>
                        </h1>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="flex items-center gap-1 text-xs" style={{ color: "var(--color-text-secondary)" }}>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                </svg>
                                {eleve?.classe?.libelle}
                            </span>
                            <span className="rounded-full" style={{ width: 3, height: 3, background: "var(--color-border-secondary)" }} />
                            <span className="flex items-center gap-1 text-xs" style={{ color: "var(--color-text-secondary)" }}>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                {/* {eleve.trimestre} */}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Boutons */}
                <div className="flex items-center gap-2 flex-wrap">
                    <button onClick={telechargerbulletin}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 hover:scale-105 active:scale-95"
                        style={{ background: "#eeedfe", color: "#3c3489", border: "0.5px solid #afa9ec" }}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Imprimer bulletin
                    </button>

                    <button onClick={logOut}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 hover:scale-105 active:scale-95"
                        style={{ background: "#fcebeb", color: "#791f1f", border: "0.5px solid #f09595" }}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Déconnexion
                    </button>
                </div>

            </div>
        </header>
    )
}

export default HeaderEleve