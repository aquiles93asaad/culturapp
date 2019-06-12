// @flow
import RestClient from './RestClient';

export class CompanyService extends RestClient {
    constructor(secured, quienllamo) {
        super(secured, quienllamo);
    }

    getCompanies(filters) {
        return this.instance.post('company/get', {
            filters
        }).then(result => {
            if(typeof result.data.companies !== 'undefined') {
                return Promise.resolve(result.data.companies);
            } else {
                return Promise.reject(result.data);
            }   
        }).catch(error => {
            return Promise.reject(error);
        });
            // .catch(error => {
            //     return Promise.reject(error);
            // });
            // this.authToken;
    }
}
