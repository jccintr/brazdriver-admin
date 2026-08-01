import { useState, useEffect, useContext } from 'react';
import { Modal, Button, Spinner } from 'flowbite-react';
import DataContext from '../../context/DataContext';
import Api from '../../api/Api';
import InitialsAvatar from '../InitialsAvatar';
import TableDriverRides from '../tables/TableDriverRides';
import toast from 'react-hot-toast';

const ModalDriverRides = ({ openModal, setOpenModal, driver }) => {
  const { loggedUser } = useContext(DataContext);
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (openModal && driver?._id && loggedUser?.token) {
      fetchRides();
    }
  }, [openModal, driver?._id, loggedUser?.token]);

  const fetchRides = async () => {
    setLoading(true);
    setError(null);
    setRides([]);

    try {
      const response = await Api.getDriverRides(loggedUser.token, driver._id);
      const json = await response.json();

      if (!response.ok) {
        setError(json.message || json.error || 'Erro ao carregar corridas.');
        return;
      }

      setRides(Array.isArray(json) ? json : json.rides || []);
    } catch (err) {
      console.error(err);
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpenModal(false);
    setRides([]);
    setError(null);
  };

  if (!driver) return null;

  return (
    <Modal show={openModal} onClose={handleClose} size="4xl">
      <Modal.Header>
        <div className="flex items-center gap-3">
          {driver.avatar ? (
            <img
              className="w-10 h-10 rounded-full object-cover shadow"
              src={driver.avatar}
              alt={driver.name}
            />
          ) : (
            <InitialsAvatar name={driver.name} size={40} />
          )}
          <div className="flex flex-col">
            <span className="text-base font-semibold text-gray-900 dark:text-white">
              {driver.name}
            </span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Histórico de Corridas {rides.length>0 && `(${rides.length} ocorrências)`}
            </span>
          </div>
        </div>
      </Modal.Header>

      <Modal.Body className="p-0">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Spinner size="xl" />
          </div>
        ) : error ? (
          <p className="text-red-500 text-center py-8">{error}</p>
        ) : rides.length === 0 ? (
          <p className="text-center py-12 text-gray-500 dark:text-gray-400">
            Nenhuma corrida encontrada para este motorista.
          </p>
        ) : (
           
           <div className="flex justify-center w-full px-4 pb-4">
                <div className="w-full max-w-4xl">
                    <TableDriverRides rides={rides} />
                </div>
           </div>
           
         
        )}
      </Modal.Body>

      
    </Modal>
  );
};

export default ModalDriverRides;