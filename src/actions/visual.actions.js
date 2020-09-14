import { visualTypes } from './actionTypes';

export const setHover = (input) => ({ type: visualTypes.SET_HOVER, hovering: input });
export const setShowChannels = (input) => ({ type: visualTypes.SET_SHOW_CHANNELS, showChannelPills: input });
export const setShelfDrag = (input) => ({ type: visualTypes.SET_SHELF_DRAG, draggableShelves: input});

