import {
    CLEAR_ERRORS,
    REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCEESS
} from "../constants/userConstants";

const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            }
        case REGISTER_USER_SUCEESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.data,
                message: action.payload.message,
            }
        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                error: null,
                ...state,
            }

        default:
            return state;
    }
}

export { userReducer };