function ColumnLegend({ columns, accent, accentLight, accentBorder }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">
        Colonnes attendues dans le fichier
      </p>
      <div className="flex flex-wrap gap-1.5">
        {columns.map((c) => (
          <span
            key={c.key}
            className="text-xs px-2.5 py-1 rounded-md font-mono"
            style={c.required
              ? { background: accentLight, color: accent, border: `1px solid ${accentBorder}`, fontWeight: 700 }
              : { background: "#f1f5f9", color: "#94a3b8", border: "1px solid #e2e8f0" }
            }
          >
            {c.key}{c.required && <span className="opacity-60 ml-0.5">*</span>}
          </span>
        ))}
      </div>
      <p className="text-[10px] text-slate-400 mt-2">* Obligatoires · Les autres colonnes sont ignorées si absentes</p>
    </div>
  );
}

export default ColumnLegend