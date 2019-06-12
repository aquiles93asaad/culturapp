import RestClient from './RestClient';

export class CompanyService extends RestClient {
    constructor(secured) {
        super(secured);
    }

    // login(params) {
    //     return this.instance.post('auth/login', {
    //         email: params.email,
    //         password: params.password
    //     }).then(result => {
    //         if(typeof result.data.user !== 'undefined') {
    //             this.saveToken(result.data.token);
    //             return Promise.resolve(result.data.user);
    //         } else {
    //             return Promise.reject(result.data.message);
    //         }
    //     }).catch(error => {
    //         return Promise.reject(error);
    //     });
    // }

    // logout() {
        
    //     return Promise.resolve();
    // }

    // me = async() => {
    //     await this.tokenInterceptor();
    //     return this.instance.get('auth/me')
    //     .then(result => {
    //         if (typeof result.data.user !== 'undefined') {
    //             return Promise.resolve(result.data.user);
    //         } else {
    //             return Promise.reject('No token');
    //         }
    //     }).catch(error => {
    //         return Promise.reject(error);
    //     });
    // }
}
