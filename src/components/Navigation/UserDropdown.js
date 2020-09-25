import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import { withStyles  } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';


import Popover from '@material-ui/core/Popover';
import Toggles from '../toggles/material';
import {history} from '../../store';
import {userActions} from '../../actions/user.actions';


const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
));

export default (props) => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.authentication); //loggedIn loggingIn user
    const loggedIn = useSelector(state => state.authentication.loggedIn);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const menuOpen = Boolean(anchorEl);
    
    const [anchorElPop, setAnchorElPop] = React.useState(null);
    const popOpen = Boolean(anchorElPop);
    const id = popOpen ? 'simple-popover' : undefined;

    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleSettings = () => {
        setAnchorElPop(anchorEl);
        handleCloseMenu();
    }

    const handleClickPop = (event) => {
        setAnchorElPop(event.currentTarget);
    };

    const handleClosePop = () => {
        setAnchorElPop(null);
    };

    return (
        <React.Fragment>
            {/* {loggedIn && ( */}
                <div>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleClickMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>

                    { loggedIn
                    ? <StyledMenu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                    >
                        <MenuItem onClick={handleCloseMenu}>{auth.user.email}</MenuItem>
                        <Divider />
                        <MenuItem onClick={handleSettings}>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={()=> {
                            handleCloseMenu();
                            dispatch(userActions.logout())
                        }}>
                            Log Out
                        </MenuItem>
                    </StyledMenu>
                    : <StyledMenu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                    >
                        <MenuItem onClick={()=> {history.push('/login')}}>
                            Login
                        </MenuItem>
                        <MenuItem onClick={()=> {history.push('/register')}}>
                            Register
                        </MenuItem>
                    </StyledMenu>
                    }

                    <div>
                        <Popover
                            id={id}
                            open={popOpen}
                            anchorEl={anchorElPop}
                            onClose={handleClosePop}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <Typography>The content of the Popover.</Typography>
                            <Toggles/>
                        </Popover>
                    </div>
                </div>
            {/* )} */}
        </React.Fragment>
    )
}
/* without stylized menu
<Menu
    id="menu-appbar"
    anchorEl={anchorEl}
    keepMounted
    open={menuOpen}
    onClose={handleCloseMenu}
> 
*/