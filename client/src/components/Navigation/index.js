/* global $ */
import React from 'react';
import { connect } from 'react-redux';
import {
  Navbar, FormGroup, Button, FormControl, 
  InputGroup, DropdownButton, MenuItem, 
  ControlLabel, Glyphicon, ButtonGroup 
} from 'react-bootstrap';
import AddBrandModal from './AddFilmModal'; 
import { addFilm } from '../../actions/films';
import './Navigation.css';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      arrow: 'arrow-up',
      dropdownSearchTitle: 'by Name',
      dropdownSearchMenuItem: 'by Actor',
      dropdownSortTitle: 'Sort by ID',
      dropdownSortMenuItem: 'Sort by Name'
    }
  }

  handleChange(event) {
    this.props.onSearch(event.target.value, this.state.dropdownSearchTitle);
    this.setState({ searchValue: event.target.value  });
  }

  handleClick() {
    let tempTitle = this.state.dropdownSearchTitle;
    this.setState({
      dropdownSearchTitle: this.state.dropdownSearchMenuItem,
      dropdownSearchMenuItem: tempTitle
    })
    this.props.onSearch(this.state.searchValue, this.state.dropdownSearchTitle)
  }

  handleSortClick() {
    let tempTitle = this.state.dropdownSortTitle;
    this.setState({
      dropdownSortTitle: this.state.dropdownSortMenuItem,
      dropdownSortMenuItem: tempTitle
    })
    let order = this.state.arrow === 'arrow-down' ? 'desc' : 'asc';
    this.props.onSort(this.state.dropdownSortMenuItem, order);
  }

  handleOrderClick() {
    if (this.state.arrow === 'arrow-down') {
      this.setState({  arrow: 'arrow-up' });
      this.props.onSort(this.state.dropdownSortTitle, 'asc')
    } else {
      this.setState({ arrow: 'arrow-down' });  
      this.props.onSort(this.state.dropdownSortTitle, 'desc')  
    }
  }

  handleUpload() {
    let fileReader = new FileReader();
    fileReader.onload = e => {
        let text = e.target.result;
        text = text.split('\n').filter(elem => elem !== '');
        for(let i = 0; i < text.length; i += 4) {
          let film = {
            title: text[i].replace('Title: ',''),
            release: text[i+1].replace('Release Year: ',''),
            radio: text[i+2].replace('Format: ',''),
            stars: text[i+3].replace('Stars: ','')
          };
          this.props.onAddFilm(this.props.films.length, film);
        }
    };
    fileReader.readAsText($('#upload-films-from-txt').prop('files')[0]);
  }
  
  render() {
    return (
      <Navbar inverse className="navigation" style={{ borderRadius: 0 }}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">CMDb</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullLeft>
            <FormGroup>
              <InputGroup>
                <FormControl 
                  type="text" 
                  value={this.state.searchValue}
                  onChange={event => this.handleChange(event)}
                  placeholder="Search ..."
                />
                <DropdownButton
                  componentClass={InputGroup.Button}
                  id="input-dropdown-search"
                  title={this.state.dropdownSearchTitle}
                >
                  <MenuItem key="1" onClick={() => this.handleClick()}>{this.state.dropdownSearchMenuItem}</MenuItem>
                </DropdownButton>
              </InputGroup>
            </FormGroup>{' '}
            <InputGroup>
              <ButtonGroup>
                <DropdownButton
                  id="input-dropdown-addon"
                  title={this.state.dropdownSortTitle}
                >
                  <MenuItem 
                    onClick={() => this.handleSortClick()}
                    key="1"
                  >
                    {this.state.dropdownSortMenuItem}
                  </MenuItem>
                </DropdownButton>
                <Button onClick={() => this.handleOrderClick()}><Glyphicon glyph={this.state.arrow} /></Button>
              </ButtonGroup>
            </InputGroup>
          </Navbar.Form>
          <Navbar.Form pullRight>
            <FormGroup>
              <ControlLabel className="btn btn-link">
                  Import films from txt
                    <FormControl type="file" onChange={() => this.handleUpload()} onClick={e => e.target.value = null} style={{ display: 'none' }} id="upload-films-from-txt" />
              </ControlLabel>    
              <AddBrandModal>
                <Button bsStyle="primary" className="pull-right" onClick={this.handleShow}>+ Add Film</Button>
              </AddBrandModal>  
            </FormGroup>
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default connect(
  state => ({
    films: state.films
  }),
  dispatch => ({
    onSort: (option, order) => {
      dispatch({ type: 'SORT_FILMS', payload: {option, order } })
    },
    onSearch: (name, option) => {
      dispatch({ type: 'FIND_FILM', payload: {name, option} })
    },
    onAddFilm: (id, film) => dispatch(addFilm(id, film))
  })
)(Navigation);