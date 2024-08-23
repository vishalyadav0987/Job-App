import React from 'react'
import { GET_ALL_JOB_PRESENT_ADMIN_FAIL, GET_ALL_JOB_PRESENT_ADMIN_REQUEST, GET_ALL_JOB_PRESENT_ADMIN_SUCEESS, POST_NEW_JOB_FAIL, POST_NEW_JOB_REQUEST, POST_NEW_JOB_RESET, POST_NEW_JOB_SUCEESS } from '../constants/jobConstants';
import { CLEAR_ERRORS } from '../constants/userConstants';

const jobReducer = (state = { Job: {} }, action) => {
    switch (action.type) {
        case POST_NEW_JOB_REQUEST:
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
        case POST_NEW_JOB_FAIL:
            return {
                ...state,
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
            return {
                loading: true,
                jobs: [],
            }
        case GET_ALL_JOB_PRESENT_ADMIN_SUCEESS:
            return {
                loading: false,
                jobs: action.payload.data,
            }
        case GET_ALL_JOB_PRESENT_ADMIN_FAIL:
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

export { jobReducer, getAllJobs }
