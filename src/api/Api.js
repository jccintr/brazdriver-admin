// --host=192.168.0.107

//const BASE_API = 'http://localhost:8000/api';
//const BASE_API = 'http://192.168.0.107:8000/api';
const BASE_API = 'https://rmrparttime.com/api';



export default {
   
  // base_storage: 'http://localhost:8000/storage',
 base_storage: 'https://rmrparttime.com/storage',
   // base_storage: 'http://192.168.0.107:8000/storage',
    
    

    getUser: async (token) => {
        const response = await fetch(`${BASE_API}/user`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },

    login: async (fd) => {
        const response = await fetch(`${BASE_API}/signin`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fd)
        });
       // const json = await response.json();        
        return response;
    },
    logout: async (token) => {
        const response = await fetch(`${BASE_API}/logout`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            
        });
        return response;
    },
    getCategorias: async (token) => {
        const req = await fetch(`${BASE_API}/categorias/all`, {
            method: 'GET', 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
           
        });
        const json = await req.json();        
    return json;
    },
    getCategoria: async (id) => {
        const req = await fetch(`${BASE_API}/categorias/${id}`, {
            method: 'GET', 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
           
        });
        const json = await req.json();        
    return json;
    },
   
    addCategoria: async (token,fd) => {
        const response = await fetch(`${BASE_API}/categorias`, {
            method: 'POST',
            headers: { 
             
            'Authorization': 'Bearer ' + token
            },

            body: fd
        });
        return response;
    },
    updateCategoria: async (token,fd,id) => {
        const response = await fetch(`${BASE_API}/categorias/${id}`, {
            method: 'POST',
            headers: { 
              'Authorization': 'Bearer ' + token
            },

            body: fd
     });
        return response;
    },
    getClientes: async (token) => {
        const response = await fetch(`${BASE_API}/clientes`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
    getCliente: async (token,id) => {
        const response = await fetch(`${BASE_API}/clientes/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
    getWorkers: async (token) => {
        const response = await fetch(`${BASE_API}/workers`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
    getDistritos: async () => {
        const req = await fetch(`${BASE_API}/distritos`, {
            method: 'GET', 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
           
        });
        const json = await req.json();        
        return json;
    },

    getConcelhos: async (idDistrito) => {
        const req = await fetch(`${BASE_API}/concelhos/${idDistrito}`, {
            method: 'GET', 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
           
        });
        const json = await req.json();        
        return json;
    },
    updateCliente: async (token,fd,id) => {
        const response = await fetch(`${BASE_API}/clientes/${id}`, {
            method: 'POST',
            headers: { 
              'Authorization': 'Bearer ' + token
            },

            body: fd
     });
        return response;
    },
    updateWorker: async (token,fd,id) => {
        const response = await fetch(`${BASE_API}/workers/${id}`, {
            method: 'POST',
            headers: { 
              'Authorization': 'Bearer ' + token
            },

            body: fd
     });
        return response;
    },
    getAllOrcamentos: async (token) => {
        const response = await fetch(`${BASE_API}/orcamentos/all`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        const json = await response.json();
        return json;
    },
    getOrcamento: async (token,id) => {
        const response = await fetch(`${BASE_API}/orcamentos/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        const json = await response.json();
        return json;
    },
    getParametros: async (token) => {
        const response = await fetch(`${BASE_API}/config`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
      
        return response;
    },
   
    updateParametros: async (token,fd) => {
        const response = await fetch(`${BASE_API}/config`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json', 
              'Authorization': 'Bearer ' + token
            },

            body: JSON.stringify(fd)
        });
        return response;
    },
    getDashboardData: async (token) => {
        const response = await fetch(`${BASE_API}/dashboard`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
    getOrders: async (token) => {
        const response = await fetch(`${BASE_API}/orders`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        const json = await response.json();
        return json;
    },
    addCliente: async (token,fd) => {
        const response = await fetch(`${BASE_API}/user/create-client`, {
            method: 'POST',
            headers: { 
              'Authorization': 'Bearer ' + token
            },

            body: fd
     });
        return response;
    },
    addWorker: async (token,fd) => {
        const response = await fetch(`${BASE_API}/user/create-worker`, {
            method: 'POST',
            headers: { 
              'Authorization': 'Bearer ' + token
            },

            body: fd
     });
        return response;
    },

    
};