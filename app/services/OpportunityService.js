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

    update(opportunity) {
        return this.instance.post('/opportunity/update', {
            opportunity
        }).then(result => {
            if(typeof result.data.opportunity !== 'undefined') {
                return Promise.reject(result.data.opportunity);
            } else {
                return Promise.reject(result.data);
            }
        }).catch(error => {
            return Promise.reject(error);
        });
    }

    get(filters, onlyUserOpportunities) {
        const params = {
            filters: filters,
            onlyUserOpportunities: onlyUserOpportunities,
        };
        return this.instance.post('/opportunity/get', {
            params
        }).then(result => {
            return Promise.resolve(result.data.opportunities);
        }).catch(error => {
            return Promise.reject(error);
        });
    }
}
