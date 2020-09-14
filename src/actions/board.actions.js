import { boardTypes } from './actionTypes';

export const setColumn = (input) => ({ type: boardTypes.SET_COLUMN, columns: input });
export const setOrdered = (input) => ({ type: boardTypes.SET_ORDERED, ordered: input });
export const newBoard = (input) => ({ type: boardTypes.NEW_BOARD, data: input });
    //has to be own action because if dragdrop tries to update when ordered != column keys then it crashes
