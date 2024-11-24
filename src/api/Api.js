// --host=192.168.0.107


const BASE_API = 'https://taxibraz.onrender.com';
//const BASE_API = 'http://192.168.0.108:3000';
//const BASE_API = 'http://192.168.1.8:3000';



export default {
      

  

    login: async (fd) => {
        const response = await fetch(`${BASE_API}/admin/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fd)
        });
        return response;
    },
    getPassengers: async (token) => {
        const response = await fetch(`${BASE_API}/admin/passengers`, {
            method: 'GET', 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
           
        });
        return response;
    },
    getDrivers: async (token) => {
        const response = await fetch(`${BASE_API}/admin/drivers`, {
            method: 'GET', 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
           
        });
        return response;
    },
    getDriver: async (token,id) => {
        const response = await fetch(`${BASE_API}/admin/drivers/${id}`, {
            method: 'GET', 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
           
        });
        return response;
    },
    getPassenger: async (token,id) => {
        const response = await fetch(`${BASE_API}/admin/passengers/${id}`, {
            method: 'GET', 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
           
        });
        return response;
    },
    addDriver: async (token,fd) => {
        const response = await fetch(`${BASE_API}/admin/drivers/register`, {
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
    updateDriver: async (token,id,fd) => {
        const response = await fetch(`${BASE_API}/admin/drivers/${id}`, {
            method: 'PUT', 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(fd)
        });
        return response;
    },
    updatePassenger: async (token,id,fd) => {
        const response = await fetch(`${BASE_API}/admin/passengers/${id}`, {
            method: 'PUT', 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(fd)
        });
        return response;
    },
    getPassengersLog: async (token) => {
        const response = await fetch(`${BASE_API}/admin/logs/passengers`, {
            method: 'GET', 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
           
        });
        return response;
    },
    getPassengersMessages: async (token) => {
        const response = await fetch(`${BASE_API}/admin/passengers/messages`, {
            method: 'GET', 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
           
        });
        return response;
    },
    deletePassengerMessage: async (token,id) => {
        const response = await fetch(`${BASE_API}/admin/passengers/messages/${id}`, {
            method: 'DELETE', 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
           
        });
        return response;
    },
    deletePassengerLog: async (token,id) => {
        const response = await fetch(`${BASE_API}/admin/logs/passengers/${id}`, {
            method: 'DELETE', 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
           
        });
        return response;
    },
    updateMensagemStatus: async (token,id,lida) => {
        const response = await fetch(`${BASE_API}/admin/passengers/messages/${id}`, {
            method: 'PUT', 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({lida})
        });
        return response;
    },
    getRides: async (token) => {
        const response = await fetch(`${BASE_API}/admin/rides`, {
            method: 'GET', 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
           
        });
        return response;
    },
    getRideDetail: async (token,id) => {
        const response = await fetch(`${BASE_API}/admin/rides/${id}`, {
            method: 'GET', 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
           
        });
        return response;
    },
    getCancelledRides: async (token) => {
        const response = await fetch(`${BASE_API}/admin/rides/cancelled`, {
            method: 'GET', 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
           
        });
        return response;
    },
    getSolicitedRides: async (token) => {
        const response = await fetch(`${BASE_API}/admin/rides/solicited`, {
            method: 'GET', 
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
           
        });
        return response;
    },

  




  
   
};