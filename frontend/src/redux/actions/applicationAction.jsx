import { CLEAR_ERRORS, GET_ALL_APPLICATION_OF_APPLICANT_FAIL, GET_ALL_APPLICATION_OF_APPLICANT_REQUEST, GET_ALL_APPLICATION_OF_APPLICANT_SUCEESS, GET_ALL_APPLICATION_ON_JOB_FAIL, GET_ALL_APPLICATION_ON_JOB_REQUEST, GET_ALL_APPLICATION_ON_JOB_SUCEESS, UPDATE_JOB_STATUS_FAIL, UPDATE_JOB_STATUS_REQUEST, UPDATE_JOB_STATUS_SUCEESS } from "../constants/applicationConstant"
import axios from 'axios'


// getApplicatonOfApplicant
const getApplicatonOfApplicant = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_APPLICATION_OF_APPLICANT_REQUEST });
        const response = await axios.get(
            '/api/v1/application/get'
        );
        if (response.data.success) {
            dispatch({
                type: GET_ALL_APPLICATION_OF_APPLICANT_SUCEESS,
                payload: response.data,
            })
        }
        else {
            dispatch({
                type: GET_ALL_APPLICATION_OF_APPLICANT_FAIL,
                payload: response.data.message,
            });
        }
    } catch (error) {
        dispatch({
            type: GET_ALL_APPLICATION_OF_APPLICANT_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}


// getAllApplicantOnJob
const getAllApplicantOnJob = (jobId) => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_APPLICATION_ON_JOB_REQUEST });
        const response = await axios.get(
            `/api/v1/application/get/applicant/${jobId}`
        );
        if (response.data.success) {
            dispatch({
                type: GET_ALL_APPLICATION_ON_JOB_SUCEESS,
                payload: response.data,
            })
        }
        else {
            dispatch({
                type: GET_ALL_APPLICATION_ON_JOB_FAIL,
                payload: response.data.message,
            });
        }
    } catch (error) {
        dispatch({
            type: GET_ALL_APPLICATION_ON_JOB_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

//UPDATE JOB STATUS
const updateJobStatus = (applicantionId, jobStatus) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_JOB_STATUS_REQUEST });
        const response = await axios.post(
            `/api/v1/application/status/update/${applicantionId}`,
            { status: jobStatus },
            { headers: { "Content-Type": "application/json" } }
        );
        if (response.data.success) {

            dispatch({
                type: UPDATE_JOB_STATUS_SUCEESS,
                payload: response.data,
            })
        }
    } catch (error) {
        dispatch({
            type: UPDATE_JOB_STATUS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}
export { getApplicatonOfApplicant, getAllApplicantOnJob, updateJobStatus, clearErrors };