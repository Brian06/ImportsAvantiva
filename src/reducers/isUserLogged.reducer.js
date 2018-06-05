export default function(state = false, action) {
  switch(action.type) {
    case 'LOGOUT':
      return false;
    case 'SET_LOGGED_USER':
      return true;
    default:
      return state;
  }
}