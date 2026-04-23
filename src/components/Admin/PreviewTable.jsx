function PreviewTable({ data, mode }) {
  const cfg = MODES[mode];
  if (!data?.length) return null;
  const headers = Object.keys(data[0]);

  const cell = (h, v) => {
    if (v === null || v === undefined || v === "") return <span className="text-slate-300">—</span>;
    if (h === "matricule") return <span className="font-mono font-bold text-xs" style={{ color: cfg.accent }}>{v}</span>;
    if (h === "sexe") {
      const m = v?.toString().toLowerCase() === "m" || v?.toString().toLowerCase() === "masculin";
      return (
        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${m ? "bg-blue-50 text-blue-700" : "bg-pink-50 text-pink-700"}`}>
          {m ? "♂ M" : "♀ F"}
        </span>
      );
    }
    if (["affecte", "boursier", "redoublant"].includes(h)) {
      const yes = v?.toString().toLowerCase() === "oui" || v === 1 || v === true;
      return (
        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${yes ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-400"}`}>
          {yes ? "Oui" : "Non"}
        </span>
      );
    }
    return <span className="text-slate-700">{v}</span>;
  };

  return (
    <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm">
      <div
        className="px-5 py-3.5 flex items-center justify-between"
        style={{ background: `linear-gradient(135deg, ${cfg.accent}ee, ${cfg.accent})` }}
      >
        <span className="text-white font-semibold text-sm">
          Aperçu — {data.length} {cfg.importLabel} détecté{data.length > 1 ? "s" : ""}
        </span>
        <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full">
          {headers.length} col.
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {headers.map((h) => (
                <th key={h} className="px-4 py-2.5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/70 transition-colors">
                {headers.map((h) => (
                  <td key={h} className="px-4 py-2.5 whitespace-nowrap text-sm">{cell(h, row[h])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PreviewTable