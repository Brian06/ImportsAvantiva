export function setLoggedUser(user) {
  //this is an action creator, needs to return an action
  return {
    type: 'SET_LOGGED_USER',
    payload: user
  }
}

export function logout() {
  //this is an action creator, needs to return an action
  return {
    type: 'LOGOUT'
  }
}
