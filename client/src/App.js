import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from './components/Navigation';
import FilmList from './components/FilmsList';

class App extends Component {
  componentDidMount() {
    // TODO: find out why proxy doesn't work
    fetch('http://localhost:3001/')
    .then(function(response) {
      return response.json();
     })
      .then(resp => {
        if (!resp.length) return;
        resp.forEach(elem => {
          this.props.onAddFilm({...elem, release: elem.release_year});
        }); 
      })
      .catch(err => {
        console.log(err)
      })  
  }
  render() {
    return (
      <div>
      <Navigation />
      <div className="App container" style={{ padding: 0 }}>
        <FilmList />
      </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    films: state.films
  }),
  dispatch => ({
    onAddFilm: (film) => {
      const payload = {
        id: film.id,
        title: film.title,
        release: film.release,
        radio: film.radio,
        stars: film.stars
      };
      dispatch({ type: 'UPLOAD_FILM', payload });
    }
  })
)(App);
