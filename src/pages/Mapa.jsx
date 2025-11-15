import  { useEffect,useState } from 'react';
import Api from '../api/Api';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import useTheme from '../context/ThemeContext';

const position = [-22.47405379939683, -45.61427286357874];

const customIcon = new L.Icon({
  iconUrl: "marker-car.png", // caminho da imagem
  iconSize: [30, 36],               // tamanho
  iconAnchor: [20, 36],             // ponto onde "segura" no mapa
  popupAnchor: [0, -36],            // onde o popup abre
});

//const darkMap = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}';
const darkMap = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png';
const lightMap = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const Mapa = () => {
  const {themeMode} = useTheme();
  const [drivers,setDrivers] = useState([]);
   const [isLoading,setIsLoading] = useState(false);

    useEffect(()=>{
           
        const getDrivers = async () => {
            setIsLoading(true);            
            let response = await Api.getDriversOnline();
            if(response.ok){
              let json = await response.json();
               setDrivers(json);
            }
            
           setIsLoading(false);
        }
        getDrivers();
        
    }, []);

  return (
   <div className='w-full  mx-auto dark:bg-slate-800'>
    <MapContainer style={{ height: '100%', width: '100%' }} center={position} zoom={16} scrollWheelZoom={false}>
  
     <TileLayer
       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
       url={themeMode=='dark'?darkMap:lightMap}
     />
     {drivers.map((driver)=><Marker key={driver._id} position={[driver.position.latitude, driver.position.longitude]} icon={customIcon}>
       <Popup>
         {driver.name}<br/> {driver.veiculo.modelo} {driver.veiculo.cor}<br/>Placa: {driver.veiculo.placa}
       </Popup>
     </Marker>)}
     
   </MapContainer>
   </div>
    
  )
}

export default Mapa