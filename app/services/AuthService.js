// @flow
import RestClient from './RestClient';
import { SecureStore } from 'expo';

export class AuthService extends RestClient {
    constructor(secured) {
        super(secured);
    }

    login(params) {
        return this.instance.post('auth/login', {
            email: params.email,
            password: params.password
        }).then(result => {
            if(typeof result.data.user !== 'undefined') {
                this.saveToken(result.data.token);
                return Promise.resolve(result.data.user);
            } else {
                return Promise.reject(result.data.message);
            }
        }).catch(error => {
            return Promise.reject(error);
        });
    }

    logout() {
        this.deleteToken();
        return Promise.resolve();
    }

    me = async() => {
        await this.tokenInterceptor();
        return this.instance.get('auth/me')
        .then(result => {
            if (typeof result.data.user !== 'undefined') {
                return Promise.resolve(result.data.user);
            } else {
                return Promise.reject('No token');
            }
        }).catch(error => {
            return Promise.reject(error);
        });
    }

    saveToken = async (token) => {
        if (token) {
            try {
                await SecureStore.setItemAsync('AuthToken', JSON.stringify(token));
                this.saveAuthToken(token);
            } catch (error) {
                return Promise.reject("Could not save the token");
            }
        }
    };

    deleteToken = async () => {
        try {
            await SecureStore.deleteItemAsync('AuthToken');
            this.deleteAuthToken();
        } catch (error) {
            return Promise.reject("Could not delete the token");
        }
    };
}
