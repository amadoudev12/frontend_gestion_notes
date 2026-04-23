function ToastContainer({ toasts, remove }) {
  if (!toasts.length) return null;
  return (
    <div className="flex flex-col gap-2 mb-4">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-start gap-3 px-4 py-3 rounded-xl text-sm border font-medium
            ${t.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
            }`}
        >
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5
            ${t.type === "success" ? "bg-emerald-500" : "bg-red-500"}`}>
            {t.type === "success" ? "✓" : "✕"}
          </span>
          <span className="flex-1 leading-snug">{t.message}</span>
          <button onClick={() => remove(t.id)} className="text-current opacity-40 hover:opacity-70 transition-opacity text-base leading-none">✕</button>
        </div>
      ))}
    </div>
  );
}

export default ToastContainer