import axios from 'axios';
import TokenService from './TokenService';

export default class RestClient {
    instance = null;
    tokenServiceInstance = null;

    constructor(secured) {
        // Create the axios instance
        this.tokenServiceInstance = TokenService.getInstance();
        this.instance = axios.create({
            baseURL: `http://192.168.43.29:3000/api/`,
            timeout: 30000,
        });

        if(secured) {
            this.tokenInterceptor();
        }
    }

    tokenInterceptor = async () => {
        const token = await this.tokenServiceInstance.getToken();
        if (token != null) {
            this.instance.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(token)}`;
        }
    }
}
