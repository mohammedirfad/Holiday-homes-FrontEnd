import axios from '../../api/Axios.js';


//User - Request

export const OrderData = async (user_id,host_id,checkin,checkout,NumberOffdays,Amount,PaymentMethod,token) => {
   
    try{
        const response = await axios({
            method: 'post',
            url: '/become-a-host/orderDetails',
            headers: {
                Authorization: `Bearer ${token}`,
              },
            data:{
                user_id,host_id,checkin,checkout,NumberOffdays,Amount,PaymentMethod,
            }
        });
        const data = response
        if(data) return data;
    }
    catch(error){
        console.error(error,"error while creating host get data")
    }
}



export const getMyBookings = async (id,token) => {
   
    try{
        const response = await axios({
            method: 'get',
            url: `/myBookings?id=${id}`,
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



export const OrderCancell = async (order_id,host_id,checkin,token) => {
   
    try{
        const response = await axios({
            method: 'post',
            url: '/canelbooking',
            headers: {
                Authorization: `Bearer ${token}`,
              },
            data:{
                order_id,host_id,checkin
            }
        });
        const data = response
        if(data) return data;
    }
    catch(error){
        console.error(error,"error while creating host get data")
    }
}


export const OrderStatus= async (owner_id,token) => {
   
    try{
        const response = await axios({
            method: 'get',
            url: `/orderstatus?orderstatus=${owner_id}`,
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

export const paymentRequest = async (host_id,token) => {
    
    try{
        const response = await axios({
            method: 'post',
            url: '/hostPayment',
            headers: {
                Authorization: `Bearer ${token}`,
              },
            data:{
                host_id,
            }
        });
        const data = response
        if(data) return data;
    }
    catch(error){
        console.error(error,"error while creating host payment data")
    }
}

export const complaintRegister = async (order_id,complaint,token) => {
    
    try{
        const response = await axios({
            method: 'post',
            url: '/complaintRegister ',
            headers: {
                Authorization: `Bearer ${token}`,
              },
            data:{
                order_id,complaint
            }
        });
        const data = response
        if(data) return data;
    }
    catch(error){
        console.error(error,"error while sending complaint to he order")
    }
}


export const BlocktheHost = async (host_id,complaint,token) => {
   
    try{
        const response = await axios({
            method: 'post',
            url: '/admin/blockhost ',
            headers: {
                Authorization: `Bearer ${token}`,
              },
            data:{
                complaint, host_id ,
            }
        });
        const data = response
        if(data) return data;
    }
    catch(error){
        console.error(error,"error while sending complaint to he order")
    }
}

