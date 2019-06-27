import RestClient from './RestClient';

export class OpportunityService extends RestClient {
    constructor(secured) {
        super(secured);
    }

    create(opportunity) {
        return this.instance.post('/opportunity/create', {
            opportunity
        }).then(result => {
            if(typeof result.data.opportunity !== 'undefined') {
                // console.log(result.data.opportunity);
                return Promise.reject(result.data.opportunity);
            } else {
                return Promise.reject(result.data);
            }
        }).catch(error => {
            return Promise.reject(error);
        });
    }
}



