import DashCorridasCanceladas from "../components/dashboard/DashCorridasCanceladas"
import DashCorridasConcluidas from "../components/dashboard/DashCorridasConcluidas"
import DashCorridasSolicitadas from "../components/dashboard/DashCorridasSolicitadas"
import DashDrivers from "../components/dashboard/DashDrivers"
import DashDriversOnline from "../components/dashboard/DashDriversOnline"
import DashFaturamentoDia from "../components/dashboard/DashFaturamentoDia"
import DashFaturamentoMes from "../components/dashboard/DashFaturamentoMes"
import DashFaturamentoSemana from "../components/dashboard/DashFaturamentoSemana"
import DashPassageiros from "../components/dashboard/DashPassageiros"


const Dashboard = () => {
  return (
     <div className='pt-4 w-full px-4  mx-auto dark:bg-slate-800'>
      <div className='flex flex-col items-center'>
     
       <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 pt-4 pb-4 mx-auto'>
          
           <DashPassageiros value={45}/>
           <DashDrivers value={10}/>
           <DashDriversOnline value={4}/>
           <DashCorridasConcluidas value={1}/>
           <DashCorridasCanceladas value={0}/>
           <DashCorridasSolicitadas value={10}/>
           <DashFaturamentoDia value={'54,30'}/>
           <DashFaturamentoSemana value={'250,63'}/>
           <DashFaturamentoMes value={'1.120,30'}/>
           
           
        </div>
      </div>
      
    </div>
  )
}

export default Dashboard

/*
No passageiros cadastrados
No motoristas cadastrados
No motoristas online

corridas em andamento

fat do dia
fat da semana
fat do mes

*/