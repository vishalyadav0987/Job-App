import { CLEAR_ERRORS, POST_NEW_JOB_FAIL, POST_NEW_JOB_REQUEST, POST_NEW_JOB_SUCEESS } from "../constants/jobConstants"
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

// clearing Error
const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}

export { postNewJob, clearError }