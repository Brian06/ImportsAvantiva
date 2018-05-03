export default function(state = {name:'carlos'}, action) {
    switch(action.type) {
        case 'SET_LOGGED_USER':
            return action.payload;
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
}