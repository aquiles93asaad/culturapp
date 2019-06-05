import axios from 'axios';
import { SecureStore } from 'expo';

export default class RestClient {
    instance = null;
    authToken = null;

    constructor(secured) {
        // Create the axios instance
        this.instance = axios.create({
            baseURL: `http://190.210.180.225:3000/api/`,
            timeout: 30000,
        });
        if (secured) {
            this.tokenInterceptor();
        }
    }

    tokenInterceptor = async () => {
        if (this.authToken == null) {
            this.authToken = await this.getToken();
            console.log(this.authToken);
        } else {
            this.instance.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(token)}`;

            // this.instance.interceptors.request.use( (config) => {
            //     config.headers.Authorization = `Bearer ${token}`;
            //     console.log(config);
            //     return config;
            // },
            //     error => Promise.reject('request error')
            // );
        }
    }

    /**
     *  Use request interceptor to add credentials
     *  to the request
    */
    getToken = async () => {
        try {
            const token = await SecureStore.getItemAsync('AuthToken');
            return token;
        } catch (error) {
            // Error retrieving data
            console.log(error);
        }
    };

    saveAuthToken(token) {
        this.authToken = token;
    }
}
