const initialState = {
  option: 'Sort by ID',
  order: 'asc'
};

export default function sortFilms(state = initialState, action) {
  if (action.type === 'SORT_FILMS') {
    return action.payload;
  } 
  return state;
}