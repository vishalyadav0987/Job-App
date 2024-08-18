import axios from 'axios';
import {
    CLEAR_ERRORS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCEESS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCEESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCEESS,
} from '../constants/userConstants';


// REGISTER
const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST })
        const config = { headers: { "Content-Type": "application/json" } };

        const response = await axios.post(
            `/api/v1/user/register`,
            userData, // data
            config,
        );

        if (response.data.success) {
            dispatch({
                type: REGISTER_USER_SUCEESS,
                payload: response.data,
            })
        }
        else {
            dispatch({
                type: REGISTER_USER_FAIL,
                payload: response.data.message
            });
        }
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });

    }
}

//LOGIN
const login = (email, password, role) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const response = await axios.post(
            '/api/v1/user/login',
            { email, password, role },
            { headers: { "Content-Type": "application/json" } }
        );

        if (response.data.success) {
            dispatch({
                type: LOGIN_SUCEESS,
                payload: response.data,
            })
        }
        else {
            dispatch({
                type: LOGIN_FAIL,
                payload: response.data.message
            });
        }
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });

    }
}

// LOAD USER
const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });
        const response = await axios.get(`/api/v1/user/me`);
        if (response.data.success) {
            dispatch({
                type: LOAD_USER_SUCEESS,
                payload: response.data,
            })
        }
        else {
            dispatch({
                type: LOAD_USER_FAIL,
                payload: response.data.message,
            })
        }
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

// clearing Error
const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}

export { register, login, loadUser, clearError };