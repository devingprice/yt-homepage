import { alertTypes } from './actionTypes';

export const alertActions = {
    success: (message) => ({ type: alertTypes.SUCCESS, message }),
    error: (message) => ({ type: alertTypes.ERROR, message }),
    clear: () => ({ type: alertTypes.CLEAR }),
}
