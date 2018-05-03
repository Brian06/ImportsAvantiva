import { combineReducers } from 'redux';
import LoggedUser from './loggedUser.reducer';
import IsUserLogged from './isUserLogged.reducer';

const rootReducer = combineReducers({
  loggedUser: LoggedUser,
  isUserLogged: IsUserLogged
});

export default rootReducer;