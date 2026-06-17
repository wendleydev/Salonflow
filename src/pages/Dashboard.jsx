import ActionCard from "../components/ActionCard";
import PageHeader from "../components/PageHeader";
import appointmentsImage from "../assets/card-appointments.webp";
import clientsImage from "../assets/card-clients.webp";

function Dashboard() {
  const quickActions = [
    {
      to: "/dashboard/clientes",
      title: "Clientes e pendências",
      description:
        "Acompanhe clientes cadastrados, dados incompletos e itens que precisam de atenção.",
      image: clientsImage,
      imageAlt: "Cliente sendo atendido no salão",
      actionLabel: "Ver clientes",
    },
    {
      to: "/dashboard/agendamentos",
      title: "Agendamentos",
      description:
        "Veja os próximos horários, atendimentos pendentes e agendamentos do dia.",
      image: appointmentsImage,
      imageAlt: "Agenda de horários e compromissos do salão",
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
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {quickActions.map((action) => (
            <ActionCard
              key={action.to}
              to={action.to}
              title={action.title}
              description={action.description}
              image={action.image}
              imageAlt={action.imageAlt}
              actionLabel={action.actionLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
