import Base from './Base';

export default class FilmsAPI extends Base {
    list(params) {
        return this.apiClient.get('http://localhost:3001/films', {}, params);
    }
    add(body) {
        return this.apiClient.post('http://localhost:3001/films', body);      
    }
}