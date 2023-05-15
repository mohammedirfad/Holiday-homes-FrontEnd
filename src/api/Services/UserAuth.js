import axios from '../../api/Axios.js';


// login-auth 
export const UserLogin = async (num)=>{
        try{
            const response = await axios({
                url: "/login",
                method: "post",
                data: {
                   num
                }
             });
             const data = response
             if(data) return data;
        }
        catch(err){
            console.log(err,"errr occured")
        }

}


// otp 
export const OtpSubmit = async (otp,num) =>{
    try{
        const response = await axios({
            url: "/otp-verify",
            method: "post",
            data: {
               otp, num
            }
         });
         const data = response
         if(data) return data;
    }
    catch(err){
        console.log(err,"errr occured")
    }
}


export const getUsers = async (id,token) =>{
    try{
        const response = await axios({
            url: `/users?id=${id}`,
            method: "get",
           
         });
         const data = response
         if(data) return data;
    }
    catch(err){
        console.log(err,"errr occured")
    }
}


export const SearchResultjob=async(location)=>{
    try{
            const response=await axios({
            url:"/searchjobterm",
            method:"post",
            data:{location},
          

        })  
       return response;
    }catch(error){
        console.log(error);
        return error
    }
}

// export const SearchResultcompany=async(date)=>{
//     try{
//             const response=await axios({
//             url:"/searchcompanyterm",
//             method:"post",
//             data:{termcompany},
            
//         })  
//        return response;
//     }catch(error){
//         console.log(error);
//         return error
//     }
// }
