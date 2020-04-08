import { SIGNINUID, SIGNOUT } from '../actions/authActions';

const uidReducer = (state = {uid: null}, action) => {
    switch (action.type) {
        case SIGNINUID:
            return {...state, uid: action.uid};
        case SIGNOUT:
            return {...state, uid: null};
        default:
            return {...state};
    }
};

export default uidReducer;
