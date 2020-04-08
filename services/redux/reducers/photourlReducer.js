import { SIGNINPHOTOURL, SIGNOUT } from '../actions/authActions';

const photourlReducer = (state = {photourl: null}, action) => {
    switch (action.type) {
        case SIGNINPHOTOURL:
            return {...state, photourl: action.photourl};
        case SIGNOUT:
            return {...state, photourl: null};
        default:
            return {...state};
    }
};

export default photourlReducer;
