
import axios from '../../api/Axios.js';


// HOST_REQUESTS......

export const Hostdata = async (id,token) => {
   
    try{
        const response = await axios({
            method: 'get',
            url: `/become-a-host/gethostdetails?filter=${id}`,
            headers: {
                Authorization: `Bearer ${token}`,
              },
           
        });
        const data = response
        if(data) return data;
    }
    catch(error){
        console.error(error,"error while creating host get data")
    }
}



export const HostverifyStatus = async (host,token) => {

    try{
        const response = await axios({
            method: 'get',
            url: `/become-a-host/gethostverification?host=${host}`,
            headers: {
                Authorization: `Bearer ${token}`,
              },
          
            
        });
        const data = response
        if(data) return data;
    }
    catch(error){
        console.error(error,"error while creating host get status")
    }
}

export const getSingledata = async (host) => {
    
    try{
        const response = await axios({
            method: 'get',
            url: `/become-a-host/getdata?host=${host}`,
            
            
        });
        const data = response
        if(data) return data;
    }
    catch(error){
        console.error(error,"error while creating host get status")
    }
}




// ADMIN -REQUESTS ..................

export const HostPendingstatus = async (token) =>{

    try{
        const response = await axios({
            method: "GET",
            url : "/admin/pendingRequest",
            headers: {
                Authorization: `Bearer ${token}`,
              },

        });
        const data = response
        if(data) return data;
    }
    catch(error){
        console.error(error,"error while creating host get pending status")
    }
}



export const HostApprovedstatus = async (token) =>{

    try{
        const response = await axios({
            method: "GET",
            url : "/admin/ApprovedRequest",
            headers: {
                Authorization: `Bearer ${token}`,
              },

        });
        const data = response
        if(data) return data;
    }
    catch(error){
        console.error(error,"error while creating host get approved status")
    }
}


export const HostRejectedstatus = async (token) =>{

    try{
        const response = await axios({
            method: "GET",
            url : "/admin/rejectedRequest",
            headers: {
                Authorization: `Bearer ${token}`,
              },

        });
        const data = response
        if(data) return data;
    }
    catch(error){
        console.error(error,"error while creating host get rejected status")
    }
}