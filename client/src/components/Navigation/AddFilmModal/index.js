import React from 'react';
import { connect } from 'react-redux';
import { 
  Button, Modal, Row, Col, 
  Form, FormControl, FormGroup, ControlLabel,
  Radio 
} from 'react-bootstrap';
import { addFilm } from '../../../actions/films';
import './AddFilmModal.css';

const initialState = {
  show: false,
  form: {
    title: '',
    release: '',
    radio: '',
    stars: ''
  }
}

class AddFilmModal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);

    this.state = initialState;
  }
  handleShow() {
    this.setState({ show: true });
  }

  handleHide() {
    this.setState({ show: false });
  }

  handleChange(e) {
    let { name, value } = e.target;
    if(name === 'release' && value.length > 4) return;
    this.setState(prevState => ({
      ...prevState,
      form: {
        ...prevState.form,
        [name]: value
      }
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onAddFilm(this.props.films.length, this.state.form);
    this.setState({ ...initialState })
  }

  render() {
    return (
      <span>
        <content onClick={this.handleShow}>{this.props.children}</content>
        <Modal
          show={this.state.show}
          onHide={this.handleHide}
          className="text-center"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">
              Add info about film down below
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={event => this.handleSubmit(event)}
            >
              <Row>
                <Col sm={12}>
                  <FormControl
                    type="text"
                    name="title"
                    value={this.state.form.title}
                    className="modal-input"
                    placeholder="Film title"
                    onChange={(event) => this.handleChange(event)}
                    required
                  />
                </Col>
                <Col sm={6}>
                  <FormControl
                    type="number"
                    style={{ verticalAlign: 'middle' }}
                    name="release"
                    value={this.state.form.release}
                    className="modal-input"
                    placeholder="Release"
                    onChange={(event) => this.handleChange(event)}
                    required
                  />
                </Col>
                <Col sm={6} className="modal-input">
                <ControlLabel >Format</ControlLabel>
                  <FormGroup onChange={(event) => this.handleChange(event)} required>
                    <Radio name="radio" value="DVD" inline required>
                      DVD
                    </Radio>{' '}
                    <Radio name="radio" value="Blu-Ray" inline>
                      Blu-Ray
                    </Radio>{' '}
                    <Radio name="radio" value="VHS" inline>
                      VHS 
                    </Radio>
                  </FormGroup>
                </Col>
                <Col sm={12}>
                  <FormGroup controlId="formControlsTextarea">
                    <FormControl
                      name="stars"
                      value={this.state.form.stars}
                      onChange={(event) => this.handleChange(event)}
                      componentClass="textarea"
                      placeholder="Actors: Keanu Reeves, ..."
                    />
                  </FormGroup>
                </Col>
                <FormGroup>
                  <Button type="submit" disabled={this.state.sbmtBtnIsLoading}>Add</Button>
                </FormGroup>
              </Row>
            </Form>
          </Modal.Body>
        </Modal>
      </span>
    );
  }
}

export default connect(
  state => ({
    films: state.films
  }),
  dispatch => ({
    onAddFilm: (id, film) => dispatch(addFilm(id, film))
  })
)(AddFilmModal);