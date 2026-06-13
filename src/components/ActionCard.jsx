import { Link } from "react-router-dom";

function ActionCard({ to, title, description, image, actionLabel }) {
  return (
    <Link
      to={to}
      className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-brand-magenta/50 hover:shadow-md md:flex-row"
    >
      <img
        src={image}
        alt=""
        className="mb-4 h-48 w-full rounded-lg object-cover md:mb-0 md:mr-4 md:h-auto md:w-48"
      />

      <div className="flex flex-col justify-between">
        <div>
          <h3 className="mb-2 text-xl font-bold text-slate-900">{title}</h3>
          <p className="mb-6 text-sm text-slate-500">{description}</p>
        </div>

        <span className="inline-flex w-fit items-center rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white">
          {actionLabel}
          <span className="ml-2">→</span>
        </span>
      </div>
    </Link>
  );
}

export default ActionCard;
