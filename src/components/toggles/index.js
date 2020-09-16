import React from 'react';
import { setShelfDrag, setShowChannels } from '../../actions/visual.actions';

import { useDispatch, useSelector } from 'react-redux';

import './toggles.scss';

export default (props) => {
    const dispatch = useDispatch();
    const showChannelPills = useSelector(state => state.visual.showChannelPills);
    const draggableShelves = useSelector(state => state.visual.draggableShelves);

    return (
        <div className="toggles">
            <div> Shelf Drag </div>
            <Switch
                isOn={draggableShelves}
                handleToggle={(newState) => {
                    dispatch( setShelfDrag(newState) )
                }}
            />
            <div> Show Channels </div>
            <Switch
                isOn={showChannelPills}
                handleToggle={(newState) => {
                    dispatch( setShowChannels(newState) )
                }}
            />
        </div>
    );
}


const Switch = function(props) {
    return (
        <div className={"switch switch"+ (props.isOn ? "--green" : "--red")}//SwitchDiv
            onClick={()=>{props.handleToggle(!props.isOn)}}
            >
            <div className={"toggle-button toggle-button" + (props.isOn ? "--left" : "--right")}//ToggleButton
            />
        </div>
    );
};
