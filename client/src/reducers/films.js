import {
  ADD_FILM, UPLOAD_FILMS, DELETE_FILM
} from '../actions/films';

export default function films(state = [], action) {
  switch(action.type) {
    case ADD_FILM: 
      return [
        ...state,
        action.payload
      ]
    // case UPLOAD_FILMS: 
    //   return action.payload;
    case DELETE_FILM:
      return [
        ...action.payload
      ]
    default: return state;
  }
}