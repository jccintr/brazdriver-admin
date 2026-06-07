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
import MessageBubble from '../components/MessageBubble';
// imports do mapa
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from "leaflet";

const position = [-22.47405379939683, -45.61427286357874];
const lightMap = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const startIcon = new L.Icon({
  iconUrl: "start-marker.png", // caminho da imagem
  iconSize: [30, 36],               // tamanho
  iconAnchor: [20, 36],             // ponto onde "segura" no mapa
  popupAnchor: [0, -36],            // onde o popup abre
});

const finishIcon = new L.Icon({
  iconUrl: "finish-marker.png", // caminho da imagem
  iconSize: [30, 36],               // tamanho
  iconAnchor: [20, 36],             // ponto onde "segura" no mapa
  popupAnchor: [0, -36],            // onde o popup abre
});


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
    <Button color="blue" pill size='xs' onClick={()=> navigate(`/?tab=rides${ride.status===-2?'-cancelled':ride.status===-1?'-solicited':''}`)}>
        <HiOutlineArrowLeft className="h-5 w-5" />
    </Button>
    <h1 className='text-center text-3xl my-7 font-semibold dark:text-gray-100'>Detalhes da Corrida</h1>
    {ride.status===-2&&<h2 className='text-center mb-7 text-xl text-red-600'>CANCELADA PELO MOTORISTA</h2>}
    {ride.status===-1&&<h2 className='text-center mb-7 text-xl text-red-600'>CANCELADA PELO PASSAGEIRO</h2>}
    
       <div className="max-w-screen-xl mx-auto h-[400px] rounded-xl overflow-hidden">
          <MapContainer className='w-full h-[400px] md:h-full' center={position} zoom={16} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url={lightMap}
              />
              <Marker position={[ride.origem.latitude, ride.origem.longitude]} icon={startIcon}>
                  <Popup>{ride.origem.address}</Popup>
              </Marker>
              <Marker position={[ride.destino.latitude, ride.destino.longitude]} icon={finishIcon}>
                  <Popup>{ride.destino.address}</Popup>
              </Marker>
          </MapContainer>
       </div>
   
    <div className='h-5'/>
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
    {ride.status!==-1&&<><Card  className="max-w-screen-xl mx-auto">
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
    <div className='h-5'/></>}
    {ride.status!==-1&&<><Card  className="max-w-screen-xl mx-auto">
      <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Veículo</h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">{ride?.veiculo.modelo} - {ride?.veiculo.cor} - {ride?.veiculo.placa}</p>
    </Card></>}
    <div className='h-5'/>
    <Card  className="max-w-screen-xl mx-auto">
    <div className='flex flex-col gap-4 md:flex-row justify-around'>
          <div className='flex flex-col gap-4'>
              <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Origem</h5>
              <div className='flex flex-row items-center gap-2'>
                <PiMapPinAreaFill color='#39ac39' size='24px'/>
                <p className="font-normal text-gray-700 dark:text-gray-400">{ride?.origem.address}</p>
              </div>
          </div>

          <div className='flex flex-col gap-4'>
              <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Destino</h5>
              <div className='flex flex-row items-center gap-2'>
                <PiMapPinAreaFill color='red' size='24px'/>
                <p className="font-normal text-gray-700 dark:text-gray-400">{ride?.destino.address}</p>
              </div>
          </div>

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
   
    <div className='h-5'/>
    <Card  className="max-w-screen-xl mx-auto">
        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Eventos</h5>
        {ride.events.map((evento,index)=>(
            <p key={index} className="font-normal text-gray-700 dark:text-gray-400">
                <span className='font-semibold mr-2'>{util.formataHora(evento.data)}</span>{evento.descricao}</p>
        ))}
    </Card>

     {ride.messages.length>0&&<><div className='h-5'/><Card  className="max-w-screen-xl mx-auto">
       <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Mensagens</h5>
       <div className="flex flex-row justify-between">
        <span className="text-white">Passageiro</span>
        <span className="text-white">Motorista</span>
       </div>
          {ride.messages.map((message,index)=><MessageBubble key={index} message={message}/>)}
     </Card></>}

    {ride.status===-2&&<><div className='h-5'/>
    <Card  className="max-w-screen-xl mx-auto">
      <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Motivo do Cancelamento</h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">{ride.motivoCancelamento}</p>
    </Card></>}
    
    </>):<Spinner className='flex-1 w-full mt-10' color="info" aria-label="Info spinner example" size="xl" />}
    </div>
  )
}

export default RideDetail