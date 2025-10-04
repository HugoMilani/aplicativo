
import axios from 'axios';

const fakeStoreApi = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000, 
});

export default fakeStoreApi;