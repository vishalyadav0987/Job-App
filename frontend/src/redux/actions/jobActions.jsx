import { CLEAR_ERRORS, GET_ALL_JOB_PRESENT_ADMIN_FAIL, GET_ALL_JOB_PRESENT_ADMIN_REQUEST, GET_ALL_JOB_PRESENT_ADMIN_SUCEESS, POST_NEW_JOB_FAIL, POST_NEW_JOB_REQUEST, POST_NEW_JOB_SUCEESS } from "../constants/jobConstants"
import axios from 'axios'


// POST JOB -- ADMIN
const postNewJob = (jobData) => async (dispatch) => {
    try {
        dispatch({ type: POST_NEW_JOB_REQUEST });
        const response = await axios.post(
            '/api/v1/job/post',
            jobData,
            { headers: { "Content-Type": "application/json" } }
        );

        if (response.data.success) {
            dispatch({
                type: POST_NEW_JOB_SUCEESS,
                payload: response.data,
            });
        }
        else {
            dispatch({
                type: POST_NEW_JOB_FAIL,
                payload: response.data.message,
            });
        }
    } catch (error) {
        dispatch({
            type: POST_NEW_JOB_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

// GET ALL JOBS OF ADMIN CREATED
const getAllJobsOfAdmin = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_JOB_PRESENT_ADMIN_REQUEST })
        const response = await axios.get(
            '/api/v1/job/getall' // of Admin
        );
        if (response.data.success) {
            dispatch({
                type: GET_ALL_JOB_PRESENT_ADMIN_SUCEESS,
                payload: response.data,
            });
        }
        else {
            dispatch({
                type: GET_ALL_JOB_PRESENT_ADMIN_FAIL,
                payload: response.data.message,
            });
        }
    } catch (error) {
        dispatch({
            type: GET_ALL_JOB_PRESENT_ADMIN_FAIL,
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

export { postNewJob, getAllJobsOfAdmin, clearError }