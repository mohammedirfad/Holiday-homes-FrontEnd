import axios from '../../api/Axios.js';


export const hostStruture = async (structures,id,token ) => {
    console.log(token,
        "<><>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    try{
        const response = await axios({
            method: 'post',
            url: '/become-a-host/host',
            headers: {
                Authorization: `Bearer ${token}`,
              },
            data: {
                structures,id
            }
        });
        const data = response
        if(data) return data;
    }
    catch(error){
        console.error(error,"error while creating host structure")
    }
}


export const hostFloorplan = async (guests,bedroom,bathroom,beds,host,token) => {
    try{
        const response = await axios({
            method: 'post',
            url: '/become-a-host/floorplan',
            headers: {
                Authorization: `Bearer ${token}`,
              },
            data: {
                guests,bedroom,bathroom,beds,host
            }
        });
        const data = response
        if(data) return data;
    }
    catch(error){
        console.error(error,"error while creating host floorplan")
    }
}


export const hostLocation = async (location,host,token) => {
    console.log(location,">>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    try{
        const response = await axios({
            method: 'post',
            url: '/become-a-host/location',
            headers: {
                Authorization: `Bearer ${token}`,
              },
            data: {
                location,host
            }
        });
        const data = response
        if(data) return data;
    }
    catch(error){
        console.error(error,"error while creating host host location")
    }
}

export const hostTitle= async (title,host,token ) => {
    try{
        const response = await axios({
            method: 'post',
            url: '/become-a-host/title',
            headers: {
                Authorization: `Bearer ${token}`,
              },
            data: {
                title,host
            }
        });
        const data = response
        if(data) return data;
    }
    catch(error){
        console.error(error,"error while creating host title")
    }
}


export const hostDesc= async (Desccription,host,token) => {
    try{
        const response = await axios({
            method: 'post',
            url: '/become-a-host/description',
            headers: {
                Authorization: `Bearer ${token}`,
              },
            data: {
                Desccription,host
            }
        });
        const data = response
        if(data) return data;
    }
    catch(error){
        console.error(error,"error while creating host hostDecs")
    }
}

export const hostAddDesc= async (AddDes,host,token) => {
    try{
        const response = await axios({
            method: 'post',
            url: '/become-a-host/AddDes',
            headers: {
                Authorization: `Bearer ${token}`,
              },
            data: {
                AddDes,host
            }
        });
        const data = response
        if(data) return data;
    }
    catch(error){
        console.error(error,"error while creating host hostAddDesc")
    }
}

export const hostAmenities= async (Amenities,host,token) => {
    try{
        const response = await axios({
            method: 'post',
            url: '/become-a-host/amenties',
            headers: {
                Authorization: `Bearer ${token}`,
              },
            data: {
                Amenities,host
            }
        });
        const data = response
        if(data) return data;
    }
    catch(error){
        console.error(error,"error while creating host structure")
    }
}

export const hostImages= async (formData,host,token) => {
    try{
        const response = await axios({
            method: 'post',
            url: '/become-a-host/Images',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
              },
            data: {
                formData,host
            }
        });
        const data = response
        if(data) return data;
    }
    catch(error){
        console.error(error,"error while creating host hostImages")
    }
}

export const hostPrice= async (Price,host,token) => {
    try{
        const response = await axios({
            method: 'post',
            url: '/become-a-host/Price',
            headers: {
                Authorization: `Bearer ${token}`,
              },
            data: {
                Price,host
            }
        });
        const data = response
        if(data) return data;
    }
    catch(error){
        console.error(error,"error while creating host hostPrice")
    }
}

export const hostAddress= async (streets,flats,citys,states,zipcodes,id,token) => {
    try{
        const response = await axios({
            method: 'post',
            url: '/become-a-host/hostAddress',
            headers: {
                Authorization: `Bearer ${token}`,
              },
            data: {
                streets,flats,citys,states,zipcodes,id
            }
        });
        const data = response
        if(data) return data;
    }
    catch(error){
        console.error(error,"error while creating host address")
    }
}

export const hostBankDetails= async (accountName,accountNumber,branch,ifscCode,pan,id,user_id,token) => {
    try{
        const response = await axios({
            method: 'post',
            url: '/become-a-host/BankDetails',
            headers: {
                Authorization: `Bearer ${token}`,
              },
            data: {
                accountName,accountNumber,branch,ifscCode,pan,id,user_id
            }
        });
        const data = response
        if(data) return data;
    }
    catch(error){
        console.error(error,"error while creating host bamksetup")
    }
}

export const HostVerification= async (image1,image2,host,IdType,token) => {
    console.log(".................................................")
    const datas = {
        image1,image2,host,IdType
    }
    try{
        const response = await axios({
            method: 'post',
            url: '/become-a-host/HostVerify',
            headers: {
                Authorization: `Bearer ${token}`,
              },
            data:datas
            
        });
        const data = response
        if(data) return data;
    }
    catch(error){
        console.error(error,"error while creating host verification")
    }
}


export const HostPhotoverify= async (image1,host,token) => {
    console.log(".................................................")
    const datas = {
        image1,host
    }
    try{
        const response = await axios({
            method: 'post',
            url: '/become-a-host/HostphotoVerify',
            headers: {
                Authorization: `Bearer ${token}`,
              },
            data:datas
            
        });
        const data = response
        if(data) return data;
    }
    catch(error){
        console.error(error,"error while creating host verification")
    }
}




///ADMIN-SETTINGS .............

export const adminLogin= async (email,password) => {
    try{
        const response = await axios({
            method: 'post',
            url: '/admin/adminLogin',
           
            data: {
                email,password
            }
        });
        const data = response
        if(data) return data;
    }
    catch(error){
        console.error(error,"error while creating adminlogin")
    }
}


export const hostApprovel= async (id,token) => {
    try{
        const response = await axios({
            method: 'post',
            url: '/admin/adminapprovel',
            headers: {
                Authorization: `Bearer ${token}`,
              },
            data: {
                id
            }
        });
        const data = response
        if(data) return data;
    }
    catch(error){
        console.error(error,"error while creating host bamksetup")
    }
}


export const hostRejected= async (id,token) => {
    try{
        const response = await axios({
            method: 'post',
            url: '/admin/adminrejected',
            headers: {
                Authorization: `Bearer ${token}`,
              },
            data: {
                id
            }
        });
        const data = response
        if(data) return data;
    }
    catch(error){
        console.error(error,"error while creating host bamksetup")
    }
}

export const getHostData= async (filterName) => {
    try{
        const response = await axios({
            method: 'GET',
            url:`/getHostdata?filter=${filterName}`,
            // headers: {
            //     Authorization: `Bearer ${token}`,
            //   },
            
        });
        const data = response
        if(data) return data;
    }
    catch(error){
        console.error(error,"error while creating host bamksetup")
    }
}


export const getPaymentRequests= async (token) => {
    try{
        const response = await axios({
            method: 'GET',
            url:`/admin/getpaymentRequests`,
            headers: {
                Authorization: `Bearer ${token}`,
              },
            
        });
        const data = response
        if(data) return data;
    }
    catch(error){
        console.error(error,"error while creating host bamksetup")
    }
}



export const getBankDetails= async (id ,token) => {
    try{
        const response = await axios({
            method: 'GET',
            url:`/admin/getBankDetails?id=${id}`,
            headers: {
                Authorization: `Bearer ${token}`,
              },
            
        });
        const data = response
        if(data) return data;
    }
    catch(error){
        console.error(error,"error while creating host bamksetup")
    }
}


export const paymentSucesss = async (host_id,token) => {
   
    try{
        const response = await axios({
            method: 'post',
            url: '/admin/paymentSucesss',
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


export const getOrders= async (token) => {
    try{
        const response = await axios({
            method: 'GET',
            url:`/admin/getorders`,
            headers: {
                Authorization: `Bearer ${token}`,
              },
            
        });
        const data = response
        if(data) return data;
    }
    catch(error){
        console.error(error,"error while creating host bamksetup")
    }
}



export const getdashBoard= async (token) => {
    console.log(token)
    try{
        const response = await axios({
            method: 'GET',
            url:`/admin/getdashBoard`,
            headers: {
                Authorization: `Bearer ${token}`,
              },
            
        });
        const data = response
        if(data) return data;
    }
    catch(error){
        console.error(error,"error while creating host bamksetup")
    }
}





