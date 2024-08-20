import {
    CLEAR_ERRORS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCEESS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCEESS,
    LOGOUT_USER_FAIL,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCEESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCEESS
} from "../constants/userConstants";

const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
        case LOGIN_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            }
        case LOGOUT_USER_REQUEST:
            return {
                loading: true,
            }
        case REGISTER_USER_SUCEESS:
        case LOAD_USER_SUCEESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.data,
                message: action.payload.message,
                token: action.payload.token,
            }
        case LOGIN_SUCEESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.data,
                message: action.payload.message,
                token: action.payload.token,
            }
        case LOGOUT_USER_SUCEESS:
            return {
                loading: false,
                isAuthenticate: false,
                user: null,
            }
        case REGISTER_USER_FAIL:
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            }
        case LOGOUT_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        case LOAD_USER_FAIL:
            return {
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