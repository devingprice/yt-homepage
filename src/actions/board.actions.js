import { boardConstants } from './actionTypes';

export const setColumn = (input) => ({ type: boardConstants.SET_COLUMN, columns: input });
export const setOrdered = (input) => ({ type: boardConstants.SET_ORDERED, ordered: input });

