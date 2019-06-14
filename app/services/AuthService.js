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
            if (typeof result.data.user !== 'undefined') {
                this.tokenServiceInstance.saveToken(result.data.token);
                return Promise.resolve(result.data.user);
            } else {
                return Promise.reject(result.data.message);
            }
        }).catch(error => {
            return Promise.reject(error);
        });
    }

    logout() {
        this.tokenServiceInstance.deleteToken();
        return Promise.resolve();
    }

    me = async () => {
        const token = await this.tokenServiceInstance.getToken();
        if (token != null) {
            this.instance.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(token)}`;
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
        console.log('No hay Token');
        return Promise.reject('No hay Token');
    }
}

