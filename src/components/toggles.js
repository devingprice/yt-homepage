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
                    isOn={this.props.shelfDrag}
                    handleToggle={(newState) => {
                        this.props.setShelfDrag(newState)
                    }}
                />
                <div> Show Channels </div>
                <Switch
                    isOn={this.props.showChannels}
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
            isOn={props.isOn} 
            onClick={()=>{props.handleToggle(!props.isOn)}}
            >
            <div className={"toggle-button toggle-button" + (props.isOn ? "--left" : "--right")}//ToggleButton
                isOn={props.isOn}
            />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        shelfDrag: state.shelfDrag.shelfDrag,
        showChannels: state.showChannels.showChannels
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