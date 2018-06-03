import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Film from './Film';

class FilmList extends React.Component {

  render() {
    return (
      <Row style={{ margin: 0, display: 'flex', flexFlow: 'wrap' }}>
        {this.props.films.map(film => {
          return (
            <Col xs={12} sm={6} md={4} lg={3} key={film.id} style={{ padding: 15 }}>
              <Film 
                style={{ padding: '15px !important' }}
                id={film.id} 
                title={film.title}
                release={film.release}
                radio={film.radio}
                stars={film.stars}
              />
            </Col>
          )
        })}
      </Row>
    )
  }
}  

const mapStateToProps = state => {
  let sortOption = state.sortFilms.option === 'Sort by Name' ? 'title' : 'id';
  if (state.filterFilms.option === 'by Name') {
    return getFilteredSortedFilms('title');
  } else if (state.filterFilms.option === 'by Actor') {
    return getFilteredSortedFilms('stars');
  }
  function getFilteredSortedFilms(searchOption) {
    switch (state.sortFilms.order) {
      case 'desc':
        return {
          films: state.films
            .filter(film => film[searchOption].toLowerCase().includes(state.filterFilms.name.toLowerCase()))
            .sort((a, b) => {
              if( sortOption === 'id' ) return b[sortOption] - a[sortOption];
              else { 
                if (a[sortOption].toLowerCase() > b[sortOption].toLowerCase()) return 1;
                if ((a[sortOption].toLowerCase() < b[sortOption].toLowerCase())) return -1;
                return 0;
              }
            })
          }
      case 'asc':
        return {
          films: state.films
            .filter(film => film[searchOption].toLowerCase().includes(state.filterFilms.name.toLowerCase()))
            .sort((a, b) => {
              if( sortOption === 'id' ) return a[sortOption] - b[sortOption];
              else { 
                if (a[sortOption].toLowerCase() < b[sortOption].toLowerCase()) return 1;
                if ((a[sortOption].toLowerCase() > b[sortOption].toLowerCase())) return -1;
                return 0;
              }
            })
        }
    }
  }
}

export default connect(mapStateToProps)(FilmList);