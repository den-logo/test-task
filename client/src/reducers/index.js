import { combineReducers } from 'redux';
import films from './films';
import filterFilms from './filterFilms';
import sortFilms from './sortFilms';

export default combineReducers({
  films,
  filterFilms,
  sortFilms
});