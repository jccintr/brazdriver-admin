const RideStatusBadge = ({ status }) => {
  let containerClass;
  let textClass;
  let textLabel;

  switch (status) {
    case 5:
      containerClass = 'bg-green-100';
      textClass = 'text-green-800';
      textLabel = 'Finalizada';
      break;
    case -2:
      containerClass = 'bg-red-100';
      textClass = 'text-red-800';
      textLabel = 'Cancelada pelo Motorista';
      break;
    case -1:
      containerClass = 'bg-yellow-100';
      textClass = 'text-yellow-900';
      textLabel = 'Não Atendida';
      break;
    default:
      containerClass = 'bg-yellow-100';
      textClass = 'text-yellow-900';
      textLabel = 'Desconhecido';
  }

  return (
    <span
      className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-bold ${containerClass} ${textClass}`}
    >
      {textLabel}
    </span>
  );
};

export default RideStatusBadge;