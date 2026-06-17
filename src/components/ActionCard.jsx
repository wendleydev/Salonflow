import { useNavigate } from "react-router-dom";
import Button from "./Button.jsx";

function ActionCard({ to, title, description, image, imageAlt, actionLabel }) {
  const navigate = useNavigate();

  return (
    <article
      className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-brand-magenta/50 hover:shadow-md md:flex-row"
    >
      <img
        src={image}
        alt={imageAlt}
        className="mb-4 h-48 w-full rounded-lg object-cover md:mb-0 md:mr-4 md:h-auto md:w-48"
      />

      <div className="flex flex-col justify-between">
        <div>
          <h3 className="mb-2 text-xl font-bold text-slate-900">{title}</h3>
          <p className="mb-6 text-sm text-slate-500">{description}</p>
        </div>

        <Button
          variant="ghost"
          className="w-fit text-brand-purple hover:bg-brand-purple/10"
          onClick={() => navigate(to)}
        >
          {actionLabel}
          <span className="ml-2">→</span>
        </Button>
      </div>
    </article>
  );
}

export default ActionCard;
