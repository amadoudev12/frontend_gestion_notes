import noteService from "../../services/noteService";
import { useState } from "react";
import {
  BookOpen, ClipboardList, Users, FileText,
  Calendar, CheckCircle2, Bell, X, Download, ChevronRight,
} from "lucide-react";
function FicheNotesModal({ matieres, onClose }) {
  const [selected, setSelected] = useState(null)
  const [downloading, setDownloading] = useState(false)

  const triggerDownload = (data, filename) => {
    const blob = new Blob([data], { type: "application/pdf" })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  const handleDownload = async () => {
    if (!selected) return
    setDownloading(true)
    console.log(selected.classe.id)
    try {
      const res = await noteService.getListeNotes({
        id_classe: selected.classe.id,
        id_matiere: selected.matiere.id,
      })
      triggerDownload(res.data, `fiche_notes_${selected.classe.libelle}_${selected.matiere.nom}.pdf`)
    } catch (err) {
      console.log("erreur téléchargement")
    } finally {
      setDownloading(false)
    }
  }

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      onClick={handleBackdrop}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm"
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden animate-fadeIn">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center">
              <FileText size={15} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Générer une fiche de notes</p>
              <p className="text-xs text-slate-400">Sélectionne une matière</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X size={15} />
          </button>
        </div>

        {/* Liste des matières */}
        <div className="px-5 py-3 max-h-72 overflow-y-auto">
          {matieres.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-6">Aucune matière disponible</p>
          ) : (
            matieres.map((item, i) => {
              // item = { classe: { id, libelle }, matiere: "Physique" } (string)
              const isSelected =
                selected?.matiere === item.matiere &&
                selected?.classe?.id === item.classe?.id

              return (
                <button
                  key={i}
                  onClick={() => setSelected(item)}
                  className={`
                    w-full flex items-center justify-between px-4 py-3 rounded-xl mb-2 last:mb-0
                    border transition-all duration-150 text-left
                    ${isSelected
                      ? "border-indigo-300 bg-indigo-50"
                      : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                    }
                  `}
                >
                  <div>
                    <p className={`text-sm font-semibold ${isSelected ? "text-indigo-800" : "text-slate-800"}`}>
                      {item.matiere.nom}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.classe?.libelle}</p>
                  </div>
                  <div className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center transition
                    ${isSelected ? "border-indigo-600 bg-indigo-600" : "border-slate-200"}
                  `}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </button>
              )
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <p className="text-xs text-slate-400 truncate">
            {selected
              ? `"${selected.matiere.nom}" · ${selected.classe?.libelle}`
              : "Aucune matière sélectionnée"
            }
          </p>
          <button
            onClick={handleDownload}
            disabled={!selected || downloading}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition shrink-0
              ${selected && !downloading
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }
            `}
          >
            <Download size={14} />
            {downloading ? "En cours…" : "Télécharger"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default FicheNotesModal