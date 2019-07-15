// @flow
import RestClient from './RestClient';

export class CompanyService extends RestClient {
    constructor(secured) {
        super(secured);
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
    }

    create(company) {
        return this.instance.post('company/create', {
            company
        }).then(result => {
            if(typeof result.data.companies !== 'undefined') {
                return Promise.resolve(result.data.companies);
            } else {
                return Promise.reject(result.data);
            }   
        }).catch(error => {
            return Promise.reject(error);
        });
    }
}
