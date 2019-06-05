// @flow
import RestClient from './RestClient';

export class AuthService extends RestClient {
    constructor(secured) {
        super(secured);
    }

    login(params) {
        return this.instance.post('auth/login', {
            email: params.email,
            password: params.password
        }).then(result => {
            this.saveToken(result.data.token);
            return Promise.resolve(result.data.user);
        }).catch(error => {
            return Promise.reject(error);
        });
    }

    me() {
        if (this.authToken) {
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
        } else {
            console.log('por acá');
            return Promise.reject('No token');
        }
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
}
