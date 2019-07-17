// @flow
import RestClient from './RestClient';

export class CursosService extends RestClient {
    constructor(secured) {
        super(secured);
    }

    get = async(filters, myCursos) => {
        const token = await this.tokenServiceInstance.getToken();
        if(token) {
            this.instance.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(token)}`;
            return this.instance.post('curso/get', {
                filters,
                myCursos
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
        return Promise.reject('No hay Token');
    }

    addUserToCurso(cursoId) {
        return this.instance.post('curso/addUserToCurso', {
            cursoId
        }).then(result => {
            if(typeof result.data.curso !== 'undefined') {
                return Promise.resolve(result.data.curso);
            } else {
                return Promise.reject(result.data);
            }   
        }).catch(error => {
            return Promise.reject(error);
        });
    }
}
