const RideStatusBadge = ({ status }) => {
  let containerClass;
  let textClass;
  let textLabel;

  switch (status) {
    case 5:
      containerClass = 'bg-green-100 dark:bg-green-600';
      textClass = 'text-green-800 dark:text-green-300';
      textLabel = 'Finalizada';
      break;
    case -2:
      containerClass = 'bg-red-100 dark:bg-red-600';
      textClass = 'text-red-800 dark:text-red-300';
      textLabel = 'Cancelada';
      break;
    case -1:
      containerClass = 'bg-yellow-100 dark:bg-yellow-600';
      textClass = 'text-yellow-900 dark:text-yellow-200';
      textLabel = 'Não Atendida';
      break;
    default:
      containerClass = 'bg-gray-100 dark:bg-gray-700';
      textClass = 'text-gray-800 dark:text-gray-300';
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