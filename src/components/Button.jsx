const variants = {
  primary:
    "bg-brand-purple text-white hover:bg-brand-dark focus:ring-brand-purple",
  gold: "bg-brand-gold text-slate-900 hover:bg-brand-gold-light focus:ring-brand-gold",
  secondary:
    "bg-slate-100 text-slate-800 hover:bg-slate-200 focus:ring-slate-400",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
};

function Button({
  children,
  variant = "primary",
  type = "button",
  className = "",
  disabled,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
