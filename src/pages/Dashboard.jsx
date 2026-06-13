import ActionCard from "../components/ActionCard";
import PageHeader from "../components/PageHeader";

function Dashboard() {
  const quickActions = [
    {
      to: "/dashboard/clientes",
      title: "Clientes e pendências",
      description:
        "Acompanhe clientes cadastrados, dados incompletos e itens que precisam de atenção.",
      image: "/icons.svg",
      actionLabel: "Ver clientes",
    },
    {
      to: "/dashboard/agendamentos",
      title: "Agendamentos",
      description:
        "Veja os próximos horários, atendimentos pendentes e agendamentos do dia.",
      image: "/icons.svg",
      actionLabel: "Ver agendamentos",
    },
  ];

  return (
    <section className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Visão geral do seu salão e atalhos para as principais áreas."
      />

      <div>
        <h2 className="text-lg font-semibold text-slate-900">Ações rápidas</h2>
        <div className="mt-4 grid gap-4 xl:grid-cols-2">
          {quickActions.map((action) => (
            <ActionCard
              key={action.to}
              to={action.to}
              title={action.title}
              description={action.description}
              image={action.image}
              actionLabel={action.actionLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
