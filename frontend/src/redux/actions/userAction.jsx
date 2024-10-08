import axios from 'axios';
import {
    APPLY_FOR_JOB_FAIL,
    APPLY_FOR_JOB_REQUEST,
    APPLY_FOR_JOB_SUCCESS,
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
    REGISTER_USER_SUCEESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCEESS,
} from '../constants/userConstants';
import Cookies from 'js-cookie'


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
            });
            Cookies.set('token', response.data.token);
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
            });
            Cookies.set('token', response.data.token);
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
            });
        }
        else {
            dispatch({
                type: LOAD_USER_FAIL,
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

// LOGOUT USER
const logout = () => async (dispatch) => {
    try {
        dispatch({ type: LOGOUT_USER_REQUEST });
        const response = await axios.get(
            '/api/v1/user/logout'
        );
        if (response.data.success) {
            dispatch({
                type: LOGOUT_USER_SUCEESS,
            })
        }
    } catch (error) {
        dispatch({
            type: LOGOUT_USER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}


// UPDATE PROFILE
const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });
        const response = await axios.post(
            '/api/v1/user/profile/update',
            userData,
            { headers: { "Content-Type": "application/json" } }
        );



        if (response.data.success) {
            dispatch({
                type: UPDATE_PROFILE_SUCEESS,
                payload: response.data,
            });
        }
        else {
            dispatch({
                type: UPDATE_PROFILE_FAIL,
                payload: response.data.message,
            })
        }
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}


// APLLY FOR JOB
const applyJob = (jobId) => async (dispatch) => {
    try {
        dispatch({ type: APPLY_FOR_JOB_REQUEST });
        const response = await axios.post(
            `/api/v1/application/apply/${jobId}`
        );
        if (response.data.success) {
            dispatch({
                type: APPLY_FOR_JOB_SUCCESS,
                payload: response.data,
            });
        }
        else {
            dispatch({
                type: APPLY_FOR_JOB_FAIL,
                payload: response.data.message,
            })
        }
    } catch (error) {
        dispatch({
            type: APPLY_FOR_JOB_FAIL,
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

export { register, login, loadUser, logout, updateProfile, applyJob, clearError };