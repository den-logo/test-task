import ApiClient from './ApiClient';
import FilmsAPI from './Films';

export default function () {
  const api = new ApiClient();
  
  return {
      apiClient: api,
      films: new FilmsAPI({ apiClient: api }),
  };
}