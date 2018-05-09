import { combineReducers } from 'redux';
import LoggedUser from './loggedUser.reducer';
import IsUserLogged from './isUserLogged.reducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  loggedUser: LoggedUser,
  isUserLogged: IsUserLogged, 
  form: formReducer
});

export default rootReducer;