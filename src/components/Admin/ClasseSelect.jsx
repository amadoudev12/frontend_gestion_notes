function ClassSelect({ value, onChange, classes, loadingClasses, error, accent }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        Classe <span className="text-red-400 normal-case font-normal ml-0.5">*</span>
      </label>
      <div className="relative">
        {loadingClasses && (
          <span
            className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: `${accent}33`, borderTopColor: accent }}
          />
        )}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={loadingClasses}
          className={`w-full px-3 py-2.5 text-sm rounded-lg border bg-white text-slate-800 transition-all outline-none cursor-pointer appearance-none
            ${error ? "border-red-300 ring-2 ring-red-100" : "border-slate-200 hover:border-slate-300 focus:ring-2"}
            ${loadingClasses ? "pl-8 cursor-wait" : ""}`}
          style={{ "--tw-ring-color": `${accent}22` } }
          onFocus={(e) => { e.target.style.borderColor = accent; e.target.style.boxShadow = `0 0 0 3px ${accent}18`; }}
          onBlur={(e) => { if (!error) { e.target.style.borderColor = ""; e.target.style.boxShadow = ""; } }}
        >
          <option value="">{loadingClasses ? "Chargement…" : "Sélectionner une classe…"}</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>{c.libelle || c.nom || `Classe ${c.id}`}</option>
          ))}
        </select>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none">▾</span>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default ClassSelect