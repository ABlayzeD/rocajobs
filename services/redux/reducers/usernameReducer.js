import { SIGNINUSERNAME, SIGNOUT } from '../actions/authActions';

const usernameReducer = (state = {username: null}, action) => {
    switch (action.type) {
        case SIGNINUSERNAME:
            return {...state, username: action.payload};
        case SIGNOUT:
            return {...state, username: null};
        default:
            return {...state};
    }
};

export default usernameReducer;
