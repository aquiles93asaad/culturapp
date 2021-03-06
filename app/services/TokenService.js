// @flow
import { SecureStore } from 'expo';

export default class TokenService {
    
    static tokenServiceInstance = null;
    authToken = null;

    /**
     * @returns {TokenService}
     */
    static getInstance() {
        if (TokenService.tokenServiceInstance == null) {
            TokenService.tokenServiceInstance = new TokenService();
        }

        return this.tokenServiceInstance;
    }

    getToken = async() => {
        try {
            if(this.authToken) {
            } else {
                const token = await SecureStore.getItemAsync('AuthToken');
                this.authToken = token;
            }
            return this.authToken;
        } catch (error) {
            // Error retrieving data
            console.log(error);
        }
    }

    saveToken = async (token) => {
        if (token) {
            try {
                this.authToken = null;
                await SecureStore.setItemAsync('AuthToken', JSON.stringify(token));
                console.log('se guardó');
            } catch (error) {
                return Promise.reject("Could not save the token");
            }
        }
    }

    deleteToken = async () => {
        try {
            await SecureStore.deleteItemAsync('AuthToken');
            console.log('lo borró');
        } catch (error) {
            return Promise.reject("Could not delete the token");
        }
    }
}
