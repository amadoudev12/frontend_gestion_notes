import { useState, useRef } from "react";
function DropZone({ file, onFile, error, accent, accentLight, accentBorder }) {
  const [drag, setDrag] = useState(false);
  const ref = useRef();

  const handle = useCallback((f) => {
    if (!f) return;
    const ext = f.name.split(".").pop().toLowerCase();
    if (!["xlsx", "xls"].includes(ext)) { onFile(null, "Format invalide — utilisez .xlsx ou .xls"); return; }
    onFile(f, null);
  }, [onFile]);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        Fichier Excel <span className="text-red-400 normal-case font-normal ml-0.5">*</span>
      </label>
      <div
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); handle(e.dataTransfer.files[0]); }}
        onClick={() => ref.current?.click()}
        className="rounded-xl border-2 border-dashed p-6 cursor-pointer text-center transition-all duration-200"
        style={{
          borderColor: error ? "#fca5a5" : drag ? accent : file ? "#86efac" : "#e2e8f0",
          background: drag ? accentLight : file ? "#f0fdf4" : error ? "#fff5f5" : "#fafafa",
          boxShadow: drag ? `0 0 0 3px ${accent}18` : error ? "0 0 0 3px rgba(239,68,68,0.1)" : "none",
        }}
      >
        <input ref={ref} type="file" accept=".xlsx,.xls" className="hidden" onChange={(e) => handle(e.target.files[0])} />
        {file ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-lg">📊</div>
            <p className="font-semibold text-emerald-700 text-sm">{file.name}</p>
            <p className="text-xs text-slate-400">{(file.size / 1024).toFixed(1)} Ko · Cliquer pour changer</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-xl transition-transform duration-200"
              style={{ background: accentLight, border: `1.5px solid ${accentBorder}`, transform: drag ? "scale(1.1)" : "scale(1)" }}
            >
              {drag ? "📂" : "📁"}
            </div>
            <div>
              <p className="font-semibold text-slate-600 text-sm" style={{ color: drag ? accent : undefined }}>
                {drag ? "Relâchez ici" : "Glisser-déposer ou cliquer"}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">Formats : .xlsx · .xls</p>
            </div>
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default DropZone