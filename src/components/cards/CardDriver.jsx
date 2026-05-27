import React, { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { Button } from "flowbite-react";
import { useNavigate } from 'react-router-dom';
import { FaCrown } from "react-icons/fa";
import { Rating } from "flowbite-react";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import ModalSendPushMessage from '../modals/ModalSendPushMessage';
import DriverStatus from '../DriverStatus';

const CardDriver = ({ driver, onView }) => {
  const [openPushModal, setOpenPushModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-[330px] md:w-[250px] lg:w-[300px] py-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative">
      
      {/* Status no canto superior esquerdo */}
      <div className="absolute top-4 left-4 z-10">
        <DriverStatus online={driver.online} />
      </div>

      <div className="flex flex-col items-center pt-2">
        {driver.avatar ? (
          <img
            className="mb-3 w-[60px] h-[60px] rounded-full shadow-lg"
            src={`${driver.avatar}`}
            alt=""
          />
        ) : (
          <FaUserCircle className="text-gray-400 dark:text-white mb-3" size={60} />
        )}

        <div className="flex flex-col items-center gap-1">
          <div className="flex flex-row gap-1 items-center">
            <h5 className="text-lg font-medium text-gray-900 dark:text-white">
              {driver.name}
            </h5>
            {driver.isAdmin && <FaCrown className="text-amber-400" size={20} />}
          </div>

          <Rating className="mt-1">
            <Rating.Star />
            <p className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
              {driver.rating?.toFixed(1) || '0.0'}
            </p>
          </Rating>
        </div>

        <div className="flex flex-row gap-2 mt-6">
          <Button
            size="xs"
            pill
            color="blue"
            onClick={() => onView(driver)}
          >
            <FaEye />
          </Button>
          <Button
            size="xs"
            pill
            color="success"
            onClick={() =>
              navigate('/edit-driver', { state: { driverId: driver._id } })
            }
          >
            <FaRegEdit />
          </Button>
          {driver.pushToken && (
            <Button
              size="xs"
              pill
              color="yellow"
              onClick={() => setOpenPushModal(true)}
            >
              <FaComment />
            </Button>
          )}
        </div>
      </div>

      {driver.pushToken && (
        <ModalSendPushMessage
          openModal={openPushModal}
          setOpenModal={setOpenPushModal}
          driver={driver}
        />
      )}
    </div>
  );
};

export default CardDriver;