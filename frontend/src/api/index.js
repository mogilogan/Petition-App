import axios from 'axios';

const API  = axios.create({baseURL:'http://localhost:5000'});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }


    return req;
})

// login api
export const signIn = (formData) => API.post('/login',formData);
export const statusCheck = (petition_id) => API.post('/getpetition',petition_id);
export const addPetition = (formData) => API.post('/petition/add',formData);


// remaining apis: