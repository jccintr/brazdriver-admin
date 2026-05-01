import { useEffect,useState,useContext } from 'react';
import Api from '../api/Api';
import DataContext from '../context/DataContext';
import { CiSearch } from "react-icons/ci";
import { TextInput,Spinner,Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import TableBairros from '../components/tables/TableBairros';
import ModalNovaLocalidade from '../components/modals/ModalNovaLocalidade';
import ModalEditLocalidade from '../components/modals/ModalEditLocalidade';

const Bairros = () => {
    const [bairros,setBairros] = useState([]);
    const [searchText,setSearchText] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [openModalNovaLocalidade,setOpenModalNovaLocalidade] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [localidadeSelecionada, setLocalidadeSelecionada] = useState(null);
    const [bairroSelecionado,setBairroSelecionado] = useState(null);
    const [isSavingLocalidade,setIsSavingLocalidade] = useState(false);
    const {loggedUser} = useContext(DataContext);
    
    const bairrosFiltrados = bairros.filter(
            bairro => bairro.nome && bairro.nome.toLowerCase().includes(searchText.toLowerCase()),
    );

    useEffect(()=>{
           
        const getBairros = async () => {
            setIsLoading(true);            
            let response = await Api.getAllBairros();
            if(response.ok){
              let json = await response.json();
               setBairros(json.data);
            }
            
           setIsLoading(false);
        }
        getBairros();
        
    }, []);

    const onAddLocalidade = (bairro) => {
        setBairroSelecionado(bairro);
        setOpenModalNovaLocalidade(true);
    }

    // === Editar Localidade ===
    const onEditLocalidade = (bairro, localidade) => {
        setBairroSelecionado(bairro);
        setLocalidadeSelecionada(localidade);
        setOpenModalEdit(true);
    };

    const handleSaveLocalidade = async (localidadeData) => {
        console.log('Salvando localidade para bairro:', bairroSelecionado, localidadeData);
        setIsSavingLocalidade(true);
        const response = await Api.addLocalidade(loggedUser.token, bairroSelecionado._id, localidadeData);
        if(response.ok){
            // Atualiza a lista de bairros para refletir a nova localidade
            const updatedBairros = bairros.map(bairro => {
                if (bairro._id === bairroSelecionado._id) {
                    return {
                        ...bairro,
                        localidades: [...bairro.localidades, localidadeData]
                    };
                }
                return bairro;
            });
            setBairros(updatedBairros);
        } else {
            console.error('Erro ao salvar localidade');
        }
        setIsSavingLocalidade(false);
       
        setOpenModalNovaLocalidade(false)
    }

    const handleUpdateLocalidade = async (localidadeData) => {
        setIsSavingLocalidade(true);
        
        const response = await Api.updateLocalidade(
            loggedUser.token, 
            bairroSelecionado._id, 
            localidadeSelecionada._id, 
            localidadeData
        );

        if (response.ok) {
            // Atualiza estado local
            const updatedBairros = bairros.map(bairro => {
                if (bairro._id === bairroSelecionado._id) {
                    return {
                        ...bairro,
                        localidades: bairro.localidades.map(loc => 
                            loc._id === localidadeSelecionada._id ? { ...loc, ...localidadeData } : loc
                        )
                    };
                }
                return bairro;
            });
            setBairros(updatedBairros);
            setOpenModalEdit(false);
        } else {
            console.error('Erro ao atualizar localidade');
        }
        setIsSavingLocalidade(false);
    };

  return (
     <div className='pt-4 w-full px-4  mx-auto dark:bg-slate-800'>
      <div className='flex flex-col items-center'>
          <div className='flex w-full flex-col md:flex-row md:justify-between'>
                  <Button color="blue" onClick={()=>navigate('/new-driver')}>Novo Bairro</Button>
                  <TextInput type='text' placeholder='pesquisar...' rightIcon={CiSearch} className='mt-2 md:mt-0 lg:inline' onChange={e => setSearchText(e.target.value)}/>
          </div>
          
          {bairrosFiltrados.length>0?<TableBairros bairros={bairrosFiltrados} onAddLocalidade={onAddLocalidade} onEditLocalidade={onEditLocalidade}/>:!isLoading?<h3 className='mt-10 text-gray-900 dark:text-white'>Bairros não encontrados.</h3>:<Spinner className='mt-10' color="info" aria-label="Info spinner example" size="xl" />}
      </div>
      <ModalNovaLocalidade 
         openModal={openModalNovaLocalidade} 
         setOpenModal={setOpenModalNovaLocalidade}
         nomeBairro={bairroSelecionado?.nome}
         isLoading={isSavingLocalidade}
         onSubmit={handleSaveLocalidade}
        />

        <ModalEditLocalidade 
                openModal={openModalEdit} 
                setOpenModal={setOpenModalEdit}
                localidade={localidadeSelecionada}
                bairroId={bairroSelecionado?._id}
                nomeBairro={bairroSelecionado?.nome}
                isLoading={isSavingLocalidade}
                onSubmit={handleUpdateLocalidade}
            />

     

   </div>
  )
}

export default Bairros