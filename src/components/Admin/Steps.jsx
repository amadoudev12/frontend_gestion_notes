function Steps({ labels, done, accent }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-6">
      {labels.map((l, i) => (
        <div key={l} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
              style={{
                background: done[i] ? accent : "#f1f5f9",
                color: done[i] ? "#fff" : "#94a3b8",
                border: done[i] ? "none" : "1.5px solid #e2e8f0",
                boxShadow: done[i] ? `0 0 0 3px ${accent}22` : "none",
              }}
            >
              {done[i] ? "✓" : i + 1}
            </div>
            <span
              className="text-[9px] font-bold tracking-wider uppercase transition-colors duration-300"
              style={{ color: done[i] ? accent : "#94a3b8" }}
            >
              {l}
            </span>
          </div>
          {i < labels.length - 1 && (
            <div
              className="w-12 h-px mb-4 mx-1 transition-all duration-300"
              style={{ background: done[i] ? accent : "#e2e8f0" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
export default Steps