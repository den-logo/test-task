const initialState = [];

export default function films(state = initialState, action) {
  switch(action.type) {
    case 'ADD_FILM': 
      // add to db
      fetch('http://localhost:3001/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({film: action.payload})
      })
      return [
        ...state,
        action.payload
      ]
    case 'UPLOAD_FILM': 
      return [
        ...state,
        action.payload
      ]
    case 'DELETE_FILM':
      // update IDs
      state.splice(action.payload, 1);
      if (state.length) {
        for(let i = action.payload; i < state.length; i++) {
          state[i].id--;
        }
      }
      // update db 
      fetch('http://localhost:3001/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({films: state, update: true})
      }).then(() => {});
      return [
        ...state
      ]
    default: return state
  }
}