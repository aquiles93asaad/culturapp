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

    check(email, dni) {
        return this.instance.post('user/check', {
            email: email,
            dni: dni
        }).then(result => {
            console.log("check:");
            console.log( result.data);
            if (typeof result.data.userExists !== 'undefined') {
                return Promise.resolve(result.data.userExists);
            } else {
                return Promise.reject(result.data.message);
            }
        }).catch(error => {
            return Promise.reject(error);
        });
    }

    register(user) {
        return this.instance.post('auth/register', {
            user: user
        }).then(result => {
            console.log("register:");
            console.log( result.data);
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
        return Promise.reject('No hay Token');
    }
}

