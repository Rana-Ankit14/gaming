import axios from "axios";


export const postApiCall = async (path, body) => {
    // console.log('apicall')
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const access_token = (user != null) ? user.access_token : '';
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
        const res = await axios.post(path, body, {headers: headers});
        // console.log(res.data)
        return res.data;
    }catch (err){
        throw (err.response.data)
    }
}

// export const getApiCall = async (path, params) => {
//     // console.log('apicall')
//     try {
//         console.log('get api call')
//         const user = JSON.parse(localStorage.getItem('user'));
//         const access_token = (user != null) ? user.access_token : '';
//         const headers = {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${access_token}`
//         }
//         const res = await axios.get(path,{headers: headers ,params} );
//         // console.log(res.data)
//         return res.data;
//     }catch (err){
//         throw (err.response.data)
//     }
// }
