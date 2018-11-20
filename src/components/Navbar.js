import React, { Component } from "react";
import { Link /* , withRouter */} from "react-router-dom";
import { connect } from "react-redux";
//import { bindActionCreators } from 'redux';


/*
const AuthButton = withRouter(
    ({ history }) =>
        fakeAuth.isAuthenticated ? 
        (
            <p>
                Welcome!{" "}
                <button
                    onClick={() => {
                        fakeAuth.signout(() => history.push("/"));
                    }}
                >Sign out</button>
            </p>
        ) : 
        (<p>You are not logged in.</p>)
);*/
const AuthButton = (loggedIn ) => (
    <li>
    { loggedIn ?
        <button onclick={()=>{
            //signout and push history "/"
        }}>Logout</button>:
        <Link to="/login">Login</Link>
    }
    </li>
);
/* will have to map dispatch to sign out when it matters
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        logout
    }, dispatch)
}

AuthButton = connect(null, mapDispatchToProps)(AuthButton);
*/

class Navbar extends Component {
    render() {
        return (<nav>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <AuthButton/>
                </ul>
            </div>
        </nav>);
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.authDummy.loggedIn
    };
};

Navbar = connect(mapStateToProps, null)(Navbar);

export default Navbar;