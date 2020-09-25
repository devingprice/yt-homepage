import React from 'react';
import { setShelfDrag, setShowChannels } from '../../actions/visual.actions';

import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { useDispatch, useSelector } from 'react-redux';

import './toggles.scss';

export default (props) => {
    const dispatch = useDispatch();
    const showChannelPills = useSelector(state => state.visual.showChannelPills);
    const draggableShelves = useSelector(state => state.visual.draggableShelves);

    return (
        <FormGroup row>
            <FormControlLabel
                control={
                    <Switch 
                        checked={draggableShelves} 
                        onChange={()=>{dispatch(setShelfDrag(!draggableShelves))}} 
                        name="Shelf Drag"
                        color="primary"
                    />
                }
                label="Shelf Drag"
            />
            <FormControlLabel
                control={
                    <Switch
                        checked={showChannelPills}
                        onChange={()=>{dispatch(setShowChannels(!showChannelPills))}}
                        name="Show Channels"
                        color="primary"
                    />
                }
                label="Show Channels"
            />
        </FormGroup>
    );
}