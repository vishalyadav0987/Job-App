import React from 'react'
import { GET_ALL_JOB_FAIL, GET_ALL_JOB_PRESENT_ADMIN_FAIL, GET_ALL_JOB_PRESENT_ADMIN_REQUEST, GET_ALL_JOB_PRESENT_ADMIN_SUCEESS, GET_ALL_JOB_REQUEST, GET_ALL_JOB_SUCEESS, POST_NEW_JOB_FAIL, POST_NEW_JOB_REQUEST, POST_NEW_JOB_RESET, POST_NEW_JOB_SUCEESS, SET_SESSION, SINGLE_JOB_DETAILS_FAIL, SINGLE_JOB_DETAILS_REQUEST, SINGLE_JOB_DETAILS_SUCEESS, UPDATE_JOB_DETIALS_FAIL, UPDATE_JOB_DETIALS_REQUEST, UPDATE_JOB_DETIALS_RESET, UPDATE_JOB_DETIALS_SUCEESS } from '../constants/jobConstants';
import { CLEAR_ERRORS } from '../constants/userConstants';

const jobReducer = (state = { Job: {} }, action) => {
    switch (action.type) {
        case POST_NEW_JOB_REQUEST:
        case SINGLE_JOB_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case POST_NEW_JOB_SUCEESS:
            return {
                loading: false,
                success: action.payload.success,
                Job: action.payload.data,
                message: action.payload.message,
            }
        case SINGLE_JOB_DETAILS_SUCEESS:
            return {
                loading: false,
                job: action.payload.data
            }
        case POST_NEW_JOB_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case SINGLE_JOB_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case POST_NEW_JOB_RESET:
            return {
                ...state,
                success: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}


const getAllJobs = (state = { jobs: [] }, action) => {
    switch (action.type) {
        case GET_ALL_JOB_PRESENT_ADMIN_REQUEST:
        case GET_ALL_JOB_REQUEST:
            return {
                loading: true,
                jobs: [],
            }
        case GET_ALL_JOB_PRESENT_ADMIN_SUCEESS:
        case GET_ALL_JOB_SUCEESS:
            return {
                loading: false,
                jobs: action.payload.data,
            }
        case GET_ALL_JOB_PRESENT_ADMIN_FAIL:
        case GET_ALL_JOB_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}

const updateJobDetaailsReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_JOB_DETIALS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case UPDATE_JOB_DETIALS_SUCEESS:
            return {
                ...state,
                loading: false,
                isUpdate: true,
                message: action.payload.message,
            }
        case UPDATE_JOB_DETIALS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_JOB_DETIALS_RESET:
            return {
                ...state,
                isUpdate: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}


const initialState = {
    searchQueryuery: null,
};

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SESSION:
            return {
                ...state,
                searchQueryuery: action.payload,
            };
        default:
            return state;
    }
};

export { jobReducer, getAllJobs, updateJobDetaailsReducer, sessionReducer }
