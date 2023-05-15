import axios from '../../api/Axios.js';


export const getMessages = async (id,token ) => {

    try{
        const response = await axios({
            method: 'get',
            url: `/message/${id}/`,
            // headers: {
            //     Authorization: `Bearer ${token}`,
            //   },
          
          
        });
        const data = response
        if(data) return data;
    }
    catch(error){
        console.error(error,"error at getting meesahes")
    }
}


export const addMessage = async (datas,token ) => {

    try{
        const response = await axios({
            method: 'post',
            url: `/message`,
            // headers: {
            //     Authorization: `Bearer ${token}`,
            //   },
            data:{
                datas
            }
            
          
        });
        const data = response
        if(data) return data;
    }
    catch(error){
        console.error(error,"error at getting meesahes")
    }
}