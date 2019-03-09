import React, { Component } from 'react';
import { setShelfDrag, setShowChannels } from '../actions/state.actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './toggles.scss';

class Toggles extends Component {
    render() {
        return (
            <div className="toggles">
                <div> Shelf Drag </div>
                <Switch
                    isOn={this.props.draggableShelves}
                    handleToggle={(newState) => {
                        this.props.setShelfDrag(newState)
                    }}
                />
                <div> Show Channels </div>
                <Switch
                    isOn={this.props.showChannelPills}
                    handleToggle={(newState) => {
                        this.props.setShowChannels(newState)
                    }}
                />
            </div>
        );
    }
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

const mapStateToProps = state => {
    return {
        showChannelPills: state.settings.showChannelPills,
        draggableShelves: state.settings.draggableShelves
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setShelfDrag,
        setShowChannels
    }, dispatch)
};

export default connect(mapStateToProps,
    mapDispatchToProps)(Toggles);