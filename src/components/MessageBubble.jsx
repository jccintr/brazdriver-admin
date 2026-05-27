import util from '../util.js';

const MessageBubble = ({ message }) => {
  const isPassenger = message.sender === 'Passenger';

  return (
    <div className={`flex mb-4 ${isPassenger ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`
          max-w-[75%] px-4 py-3 rounded-3xl text-[15px] leading-relaxed break-words
          ${isPassenger 
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none' 
            : 'bg-blue-600 text-white rounded-tr-none'
          }
        `}
      >
        {/* Hora */}
        <span className={`text-xs block mb-1.5 opacity-75 ${isPassenger ? 'text-gray-500 dark:text-gray-400' : 'text-blue-100'}`}>
          {util.formataHora(message.sentAt)}
        </span>

        {/* Mensagem */}
        <p>{message.message}</p>
      </div>
    </div>
  );
};

export default MessageBubble;