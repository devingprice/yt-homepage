import { boardConstants } from './actionTypes';

export const setColumn = (input) => ({ type: boardConstants.SET_COLUMN, columns: input });
export const setOrdered = (input) => ({ type: boardConstants.SET_ORDERED, ordered: input });
export const newBoard = (input) => ({ type: boardConstants.NEW_BOARD, data: input });
    //has to be own action because if dragdrop tries to update when ordered != column keys then it crashes