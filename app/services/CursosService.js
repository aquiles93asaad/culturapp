// @flow
import RestClient from './RestClient';

export class CursosService extends RestClient {
    constructor(secured) {
        super(secured);
    }

    get(filters) {
        return this.instance.post('curso/get', {
            filters
        }).then(result => {
            if(typeof result.data.cursos !== 'undefined') {
                return Promise.resolve(result.data.cursos);
            } else {
                return Promise.reject(result.data);
            }   
        }).catch(error => {
            return Promise.reject(error);
        });
    }

    create(company) {
        return this.instance.post('curso/create', {
            company
        }).then(result => {
            if(typeof result.data.company !== 'undefined') {
                return Promise.resolve(result.data.company);
            } else {
                return Promise.reject(result.data);
            }   
        }).catch(error => {
            return Promise.reject(error);
        });
    }
}
