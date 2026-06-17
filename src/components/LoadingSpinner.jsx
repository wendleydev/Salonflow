function LoadingSpinner({ label = "Carregando..." }) {
  return (
    <div className="flex flex-col items-center gap-3 text-slate-600">
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-brand-purple/20 border-t-brand-purple"
        aria-hidden
      />
      <p className="text-sm">{label}</p>
    </div>
  );
}

export default LoadingSpinner;
