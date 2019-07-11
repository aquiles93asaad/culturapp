// @flow
import RestClient from './RestClient';

export class IndustryService extends RestClient {
    constructor(secured) {
        super(secured);
    }

    getindustries(filters) {
        return this.instance.post('industry/get', {
            filters
        }).then(result => {
            if(typeof result.data.industries !== 'undefined') {
                return Promise.resolve(result.data.industries);
            } else {
                return Promise.reject(result.data);
            }   
        }).catch(error => {
            return Promise.reject(error);
        });
    }
}
