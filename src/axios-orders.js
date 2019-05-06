import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-2a0ec.firebaseio.com/'
});

export default instance;