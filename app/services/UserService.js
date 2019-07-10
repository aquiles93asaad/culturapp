// @flow
import RestClient from './RestClient';

export class UserService extends RestClient {
    constructor(secured) {
        super(secured);
    }

    get(filters) {
        return this.instance.post('user/get', {
            filters
        }).then(result => {
            if(typeof result.data.users !== 'undefined') {
                return Promise.resolve(result.data.users);
            } else {
                return Promise.reject(result.data);
            }   
        }).catch(error => {
            return Promise.reject(error);
        });
    }
}