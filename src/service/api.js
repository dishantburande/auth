import axios from 'axios';

const url = 'http://localhost:8000';



export const authenticateSignup = async (user) => {
    try {
        return await axios.post(`${url}/signup`, user)
        
    } catch (error) {
        console.log('Error while calling Signup API: ', error);
    }
}



export const authenticateLogin = async (user) => {
    try {
        return await axios.post(`${url}/login`, user)
    } catch (error) {
        console.log('Error while calling login API: ', error);
    }
}

