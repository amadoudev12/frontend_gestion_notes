function PageLoader({message}) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-blue-600">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-white/30 border-t-white" />
      <p className="text-sm font-medium tracking-wide text-white/85">
        {message}
      </p>
    </div>
  );
}

export default PageLoader