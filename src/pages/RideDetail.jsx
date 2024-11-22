import { useState,useContext, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card , Button, Spinner,Table} from 'flowbite-react';
import DataContext from '../context/DataContext';
import Api from '../api/Api';
import { HiOutlineArrowLeft } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { Rating } from "flowbite-react";
import { PiMapPinAreaFill } from "react-icons/pi";
import util from '../util.js';


const formataData = (d)=> {

    const data = new Date(d);
    return data.toLocaleDateString('pt-BR') + ' ' + data.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"});

}

const RideDetail = () => {
  const {loggedUser} = useContext(DataContext);
  const params = useLocation();
  const {rideId} = params.state;
  const [ride,setRide] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(false);
  const [isLoadingData,setIsLoadingData] = useState(false);


  useEffect(()=>{
      
    const getRide = async () => {
        setIsLoadingData(true);            
        let response = await Api.getRideDetail(loggedUser.token,rideId);
        if (response.ok){
            let json = await response.json();
            setRide(json);
            console.log('ride',json);
        }
     
        setIsLoadingData(false);
    }
    getRide();
    
}, []);


return (
    <div className='p-3 mx-auto min-h-screen dark:bg-slate-800'>
    {!isLoadingData&&ride!==null?(<>
    <Button color="blue" pill size='xs' onClick={()=> navigate('/?tab=rides')}>
        <HiOutlineArrowLeft className="h-5 w-5" />
    </Button>
    <h1 className='text-center text-3xl my-7 font-semibold dark:text-gray-100'>Detalhes da Corrida</h1>

    <Card  className="max-w-screen-xl mx-auto">
      <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Data</h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">{formataData(ride?.data)}</p>
    </Card>
    <div className='h-5'/>
    <Card  className="max-w-screen-xl mx-auto">
      <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Passageiro</h5>
      <div className='flex items-center flex-row gap-5'>
         {ride?.passenger.avatar?<img className="w-[60px] h-[60px] rounded-full shadow-lg" src={`${ride?.passenger.avatar}`} alt="" />:<FaUserCircle className='text-gray-400 dark:text-white mb-3' size={60} />}
         <div className='flex flex-col justify-around gap-2'>
            <p className="font-normal text-gray-700 dark:text-gray-400">{ride?.passenger.name}</p>
            <Rating>
                <Rating.Star />
                <p className="ml-2 text-sm font-medium text-gray-900 dark:text-white">{ride?.passenger.rating.toFixed(1)}</p>
            </Rating>
         </div>
      </div>
    </Card>
    <div className='h-5'/>
    <Card  className="max-w-screen-xl mx-auto">
      <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        Motorista
      </h5>
      <div className='flex items-center flex-row gap-5'>
         {ride?.driver.avatar?<img className="w-[60px] h-[60px] rounded-full shadow-lg" src={`${ride?.driver.avatar}`} alt="" />:<FaUserCircle className='text-gray-400 dark:text-white mb-3' size={60} />}
         <div className='flex flex-col justify-around gap-2'>
            <p className="font-normal text-gray-700 dark:text-gray-400">{ride?.driver.name}</p>
            <Rating>
                <Rating.Star />
                <p className="ml-2 text-sm font-medium text-gray-900 dark:text-white">{ride?.driver.rating.toFixed(1)}</p>
            </Rating>
         </div>
      </div>
    </Card>
    <div className='h-5'/>
    <Card  className="max-w-screen-xl mx-auto">
      <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Veículo</h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">{ride?.veiculo.modelo} - {ride?.veiculo.cor} - {ride?.veiculo.placa}</p>
    </Card>
    <div className='h-5'/>
    <Card  className="max-w-screen-xl mx-auto">
      <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Origem</h5>
      <div className='flex flex-row items-center gap-2'>
         <PiMapPinAreaFill color='#39ac39' size='24px'/>
         <p className="font-normal text-gray-700 dark:text-gray-400">{ride?.origem.address}</p>
      </div>
      <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Destino</h5>
      <div className='flex flex-row items-center gap-2'>
         <PiMapPinAreaFill color='red' size='24px'/>
         <p className="font-normal text-gray-700 dark:text-gray-400">{ride?.destino.address}</p>
      </div>
    </Card>
    <div className='h-5'/>
    {ride.driverRating!==null&&<><Card  className="max-w-screen-xl mx-auto">
      <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Avaliação do Motorista</h5>
      <Rating size="lg" className='flex justify-center'>
        <Rating.Star />
        <p className="ml-2 text-2xl font-medium text-gray-900 dark:text-white">4.4</p>
      </Rating>
     </Card>
    <div className='h-5'/></>}
    {ride.passengerRating!==null&&<><Card  className="max-w-screen-xl mx-auto">
      <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Avaliação do Passageiro</h5>
      <Rating size="lg" className='flex justify-center'>
        <Rating.Star />
        <p className="ml-2 text-2xl font-medium text-gray-900 dark:text-white">4.4</p>
      </Rating>
     </Card>
     <div className='h-5'/></>}
     <Card  className="max-w-screen-xl mx-auto">
        <div className='flex flex-col gap-2 md:flex-row justify-between '>
            <div className='flex flex-col gap-2 md:gap-4'>
                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Distância</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">{util.distancia(ride.distancia)}</p>
            </div>
            <div className='flex flex-col gap-2 md:gap-4'>
                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Duração</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">{util.duracao(ride.duracao)}</p>
            </div>
            <div className='flex flex-col gap-2 md:gap-4'>
                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Pagamento</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">{ride.pagamento.nome}</p>
            </div>
            <div className='flex flex-col gap-2 md:gap-4'>
                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Valor</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">R$ {ride.valor.toFixed(2)}</p>
            </div>
            <div className='flex flex-col gap-2 md:gap-4'>
                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Taxa</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">R$ {ride.valorPlataforma.toFixed(2)}</p>
            </div>
        </div>
    </Card>
    {/*<Table className='mx-auto max-w-screen-xl'>
       <Table.Head>
                  <Table.HeadCell>Distância</Table.HeadCell>
                  <Table.HeadCell className='hidden md:table-cell'>Duração</Table.HeadCell>
                  <Table.HeadCell className='hidden md:table-cell'>Pagamento</Table.HeadCell>
                  <Table.HeadCell>Valor</Table.HeadCell>
                  <Table.HeadCell>Taxa</Table.HeadCell>
        </Table.Head>
        <Table.Body >
           <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
              <Table.Cell>{util.distancia(ride.distancia)}</Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{util.duracao(ride.duracao)}</Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{ride.pagamento.nome}</Table.Cell>
              <Table.Cell>R$ {ride.valor.toFixed(2)}</Table.Cell>
              <Table.Cell>R$ {ride.valorPlataforma.toFixed(2)}</Table.Cell>
           </Table.Row>
        </Table.Body>
    </Table>*/}
    <div className='h-5'/>
    <Card  className="max-w-screen-xl mx-auto">
      <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Eventos</h5>
      {ride.events.map((evento,index)=>(
      <p key={index} className="font-normal text-gray-700 dark:text-gray-400"><span className='font-semibold mr-2'>{util.formataHora(evento.data)}</span>{evento.descricao}</p>
      ))}
    </Card>
  
    
    </>):<Spinner className='flex-1 w-full mt-10' color="info" aria-label="Info spinner example" size="xl" />}
    </div>
  )
}

export default RideDetail