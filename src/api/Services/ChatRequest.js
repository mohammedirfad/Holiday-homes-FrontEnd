import axios from '../../api/Axios.js';


export const createChat = async (senderId, receiverId, token) => {

    try {
        const response = await axios({
            method: 'post',
            url: `/chat`,
            // headers: {
            //     Authorization: `Bearer ${token}`,
            //   },
            data: {
                senderId, receiverId
            }

        });
        const data = response
        if (data) return data;
    }
    catch (error) {
        console.error(error, "error while creating host structure")
    }
}




export const userChats = async (id, token) => {

    try {
        const response = await axios({
            method: 'Get',
            url: `/chat/${id}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },

        });
        const data = response
        if (data) return data;
    }
    catch (error) {
        console.error(error, "error while creating host structure")
    }
}