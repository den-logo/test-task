const initialState = {
  name: '',
  option: 'by Name'
};

export default function filterFilms(state = initialState, action) {
  if (action.type === 'FIND_FILM') {
    return action.payload
  }
  return state
}
