import React, { Component } from 'react';
import styled from 'styled-components';
import { setShelfDrag, setShowChannels } from '../../actions/state.actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './toggles.scss';

const Container = styled('div')`
    display:flex;
    flex-direction:row;
`;
// ${props.isOn ? "#3DDC97" : "#FCFCFC"}
//${({ isDropDisabled }) => (isDropDisabled ? 0.5 : 'inherit')};
const SwitchDiv = styled('div')`
    margin: 0 24px;
    position: relative;
	width: 4rem;
	height: 2.5rem;
	border-radius: 20%;
	transition: background-color 100ms ease-out;
	z-index: 1;
	background-color: ${({ isOn }) => (isOn ? "#3DDC97"  : "#FF495C")};
	&:before, &:after {
		content: "";
		position: absolute;
		top: 0;
		background-color: inherit;
		border-radius: 50%;
		width: 2.5rem;
		height: 2.5rem;
		z-index: 2;
		}
	&:before{
		left: -0.5rem}
	&:after{
		right: -0.5rem}
`;

// ${props.isOn ? "translateX(-1.05rem)" : "translateX(4.05rem)"};
const ToggleButton = styled('div')`
    position: absolute;
	width: 2.5rem;
	height: 2.5rem;
	background-color: #353535;
	border-radius: 50%;
	transition: transform 100ms ease-in-out;
	z-index: 3;
	border: 0.05rem solid #353535;
	top: -0.05rem;
    transform: ${({ isOn }) => (isOn ?  "translateX(2.05rem)" : "translateX(-1.05rem)")};
    
`;

class ComponentWrapper extends Component {

    render() {
        return (
            <Container>
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
            </Container>
        );
    }
}


const Switch = function(props) {
    let classNames = ["switch", (props.isOn) ? "switch_is-on" : "switch_is-off"].join(" ");

    return (
        <SwitchDiv isOn={props.isOn} onClick={()=>{props.handleToggle(!props.isOn)}}>
            <ToggleButton
                isOn={props.isOn}
            />
        </SwitchDiv>
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
    mapDispatchToProps)(ComponentWrapper);