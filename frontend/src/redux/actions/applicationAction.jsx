import { CLEAR_ERRORS, GET_ALL_APPLICATION_OF_APPLICANT_FAIL, GET_ALL_APPLICATION_OF_APPLICANT_REQUEST, GET_ALL_APPLICATION_OF_APPLICANT_SUCEESS, GET_ALL_APPLICATION_ON_JOB_FAIL, GET_ALL_APPLICATION_ON_JOB_REQUEST, GET_ALL_APPLICATION_ON_JOB_SUCEESS } from "../constants/applicationConstant"
import axios from 'axios'

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

const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}
export { getApplicatonOfApplicant, getAllApplicantOnJob, clearErrors };