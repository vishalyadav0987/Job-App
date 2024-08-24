import { CLEAR_ERRORS, GET_ALL_JOB_FAIL, GET_ALL_JOB_PRESENT_ADMIN_FAIL, GET_ALL_JOB_PRESENT_ADMIN_REQUEST, GET_ALL_JOB_PRESENT_ADMIN_SUCEESS, GET_ALL_JOB_REQUEST, GET_ALL_JOB_SUCEESS, POST_NEW_JOB_FAIL, POST_NEW_JOB_REQUEST, POST_NEW_JOB_SUCEESS, SINGLE_JOB_DETAILS_FAIL, SINGLE_JOB_DETAILS_REQUEST, SINGLE_JOB_DETAILS_SUCEESS, UPDATE_JOB_DETIALS_FAIL, UPDATE_JOB_DETIALS_REQUEST, UPDATE_JOB_DETIALS_SUCEESS } from "../constants/jobConstants"
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

// GET JOB BY ID
const jobById = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_JOB_DETAILS_REQUEST })
        const response = await axios.get(
            `/api/v1/job/get/${id}` // of Admin
        );
        if (response.data.success) {
            dispatch({
                type: SINGLE_JOB_DETAILS_SUCEESS,
                payload: response.data,
            });
        }
        else {
            dispatch({
                type: SINGLE_JOB_DETAILS_FAIL,
                payload: response.data.message,
            });
        }
    } catch (error) {
        dispatch({
            type: SINGLE_JOB_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

//UPDATE JOB 
const updateJob = (id, jobData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_JOB_DETIALS_REQUEST })
        const response = await axios.put(
            `/api/v1/job/update/${id}`,
            jobData,
            { headers: { "Content-Type": "application/json" } },
        );
        if (response.data.success) {
            dispatch({
                type: UPDATE_JOB_DETIALS_SUCEESS,
                payload: response.data,
            });
        }
        else {
            dispatch({
                type: UPDATE_JOB_DETIALS_FAIL,
                payload: response.data.message,
            });
        }
    } catch (error) {
        dispatch({
            type: UPDATE_JOB_DETIALS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}


// GET ALL JOBS FOR USER PANNEL
const getAllJobsForUser = (keyword = "", salary = [10000000, 250000000], location, title) => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_JOB_REQUEST });

        let link = `/api/v1/job/get?keyword=${keyword}&price[gte]=${salary[0]}&salary[lte]=${salary[1]}`;

        if (location) {
            let locationEncoded = encodeURIComponent(location);
            link += `&location=${locationEncoded}`;
        }

        if (title) {
            let titleEncoded = encodeURIComponent(title);
            link += `&title=${titleEncoded}`;
        }


        const response = await axios.get(link);

        if (response.data.success) {
            dispatch({
                type: GET_ALL_JOB_SUCEESS,
                payload: response.data,
            });
        } else {
            dispatch({
                type: GET_ALL_JOB_FAIL,
                payload: response.data.message,
            });
        }
    } catch (error) {
        dispatch({
            type: GET_ALL_JOB_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};


// clearing Error
const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}

export { postNewJob, getAllJobsOfAdmin, jobById, updateJob, getAllJobsForUser, clearError }