import axios from 'axios'
import { CLEAR_ERRORS, CREATE_NEW_COMPANY_FAIL, CREATE_NEW_COMPANY_REQUEST, CREATE_NEW_COMPANY_SUCEESS, GET_ALL_COMPANY_FAIL, GET_ALL_COMPANY_REQUEST, GET_ALL_COMPANY_SUCEESS, GET_COMPANY_DETAILS_FAIL, GET_COMPANY_DETAILS_REQUEST, GET_COMPANY_DETAILS_SUCEESS, UPDATE_COMPANY_DETAILS_FAIL, UPDATE_COMPANY_DETAILS_REQUEST, UPDATE_COMPANY_DETAILS_SUCEESS } from '../constants/companyConstant';


// REGISTER COMPANY
const createCompany = (name, location) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_NEW_COMPANY_REQUEST })
        const response = await axios.post(
            '/api/v1/company/register',
            { name, location },
            { headers: { "Content-Type": "application/json" } }
        );

        if (response.data.success) {
            dispatch({
                type: CREATE_NEW_COMPANY_SUCEESS,
                payload: response.data,
            });
        }
        else {
            dispatch({
                type: CREATE_NEW_COMPANY_FAIL,
                payload: response.data.message,
            })
        }

    } catch (error) {
        dispatch({
            type: CREATE_NEW_COMPANY_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}


// UPDATE COMPANY DETAILS
const updateCompanyDetails = (id, companyData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_COMPANY_DETAILS_REQUEST })
        const response = await axios.put(
            `/api/v1/company/update/${id}`, // company id
            companyData,
            { headers: { "Content-Type": "application/json" } },
        );
        if (response.data.success) {
            dispatch({
                type: UPDATE_COMPANY_DETAILS_SUCEESS,
                payload: response.data,
            })
        }
        else {
            dispatch({
                type: UPDATE_COMPANY_DETAILS_FAIL,
                payload: response.data.message,
            });
        }
    } catch (error) {
        dispatch({
            type: UPDATE_COMPANY_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}


// GET COMPANY BY ID
const getCompanyById = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_COMPANY_DETAILS_REQUEST })
        const response = await axios.get(
            `/api/v1/company/get/${id}`
        );
        if (response.data.success) {
            dispatch({
                type: GET_COMPANY_DETAILS_SUCEESS,
                payload: response.data,
            })
        }
        else {
            dispatch({
                type: GET_COMPANY_DETAILS_FAIL,
                payload: response.data.message,
            });
        }
    } catch (error) {
        dispatch({
            type: GET_COMPANY_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}


// GET ALL COMPANY 
const getALLCompany = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_COMPANY_REQUEST })
        const response = await axios.get(
            `/api/v1/company/get`
        );
        if (response.data.success) {
            dispatch({
                type: GET_ALL_COMPANY_SUCEESS,
                payload: response.data,
            })
        }
        else {
            dispatch({
                type: GET_ALL_COMPANY_FAIL,
                payload: response.data.message,
            });
        }
    } catch (error) {
        dispatch({
            type: GET_ALL_COMPANY_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}


const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}

export {
    createCompany,
    updateCompanyDetails,
    getCompanyById,
    getALLCompany,
    clearErrors,
}