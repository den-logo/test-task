import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from './components/Navigation';
import FilmList from './components/FilmsList';
import { uploadFilms } from './actions/films';

class App extends Component {
  componentDidMount() {
    this.props.onUploadFilms();
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
  state => ({}),
  dispatch => ({
    onUploadFilms: () => dispatch(uploadFilms())
  })
)(App);
