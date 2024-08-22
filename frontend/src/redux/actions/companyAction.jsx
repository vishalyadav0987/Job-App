import axios from 'axios'
import { CLEAR_ERRORS, CREATE_NEW_COMPANY_FAIL, CREATE_NEW_COMPANY_REQUEST, CREATE_NEW_COMPANY_SUCEESS } from '../constants/companyConstant';
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

const clearErrors = () => async () => {
    dispatch({ type: CLEAR_ERRORS });
}

export {
    createCompany,
    clearErrors,
}