const variants = {
  sidebar: {
    footer:
      "border-t border-white/10 px-3 py-4 text-xs text-violet-200 md:mt-auto",
    brand: "text-[11px] uppercase tracking-[0.2em] text-violet-300/70",
    link: "font-semibold text-brand-gold-light transition hover:text-brand-gold",
    meta: "mt-1 text-[11px] text-violet-300/60",
  },
  page: {
    footer:
      "border-t border-slate-200 bg-white px-4 py-5 text-center text-xs text-slate-500",
    brand: "text-[11px] uppercase tracking-[0.2em] text-slate-400",
    link: "font-semibold text-brand-purple transition hover:text-brand-dark",
    meta: "mt-1 text-[11px] text-slate-400",
  },
};

function Footer({ variant = "sidebar", className = "" }) {
  const currentYear = new Date().getFullYear();
  const styles = variants[variant];

  return (
    <footer className={`${styles.footer} ${className}`}>
      <p className={styles.brand}>SalonFlow</p>
      <p className="mt-2 leading-relaxed">
        Desenvolvido por{" "}
        <a
          href="https://wendley.dev"
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          wendley.dev
        </a>
      </p>
      <p className={styles.meta}>
        © {currentYear} Todos os direitos reservados.
      </p>
    </footer>
  );
}

export default Footer;
