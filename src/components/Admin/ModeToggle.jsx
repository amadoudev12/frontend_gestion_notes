import MODES from "../../utils/Mode";
function ModeToggle({ mode, onSwitch }) {
  return (
    <div className="inline-flex items-center bg-slate-100 rounded-xl p-1 gap-1">
      {["eleve", "enseignant"].map((m) => {
        const cfg = MODES[m];
        const active = mode === m;
        return (
          <button
            key={m}
            onClick={() => onSwitch(m)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200
              ${active
                ? m === "eleve"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-violet-600 text-white shadow-sm"
                : "text-slate-500 hover:text-slate-700 hover:bg-white"
              }`}
          >
            {m === "eleve" ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            )}
            {cfg.badge}
          </button>
        );
      })}
    </div>
  );
}

export default ModeToggle