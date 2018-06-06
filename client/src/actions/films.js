export const ADD_FILM = 'ADD_FILM';

export const addFilm = (id, film) => dispatch => {
  const payload = {
    id,
    title: film.title,
    release: film.release,
    radio: film.radio,
    stars: film.stars
  };
  // add to db
  fetch('http://localhost:3001/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ film: payload })
  }).then(
    dispatch({ type: ADD_FILM, payload })
  );
}

/** 
  * TODO: find out why this action works with dispatching ADD_FILM action on every film, 
  * but doesn't work with UPLOAD_FILMS action (FilmList component won't re-render) 
  * that triggers onle one time with payload that contains all films from db
*/ 
export const UPLOAD_FILMS = 'UPLOAD_FILMS';
export const uploadFilms = () => (dispatch, getState) => {
  let films = [];
  fetch('http://localhost:3001/')
  .then(function(response) {
    return response.json();
   })
    .then(resp => {
      if (!resp.length) return;
      resp.forEach(elem => {
        let release = elem.release_year;
        delete elem.release_year;
        // films.push({ ...elem, release });
        dispatch({ type: ADD_FILM, payload:  { ...elem, release }})
      }); 
    })
    .then(
      // dispatch({ type: UPLOAD_FILMS, payload: films })
    )
    .catch(err => {
      console.log(err)
    })  
}

export const DELETE_FILM = 'DELETE_FILM';

export const deleteFilm = id => (dispatch, getState) => {
  // update IDs
  let { films } = getState();
  films.splice(id, 1);
  if (films.length) {
    for(let i = id; i < films.length; i++) {
      films[i].id--;
    }
  }
  // update db 
  fetch('http://localhost:3001/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({films, update: true})
  }).then(
    dispatch({ type: DELETE_FILM, payload: films })
  );
}

export const FIND_FILM = 'FIND_FILM';
export const SORT_FILMS = 'SORT_FILMS';