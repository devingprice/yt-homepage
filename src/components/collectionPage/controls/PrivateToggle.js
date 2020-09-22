import React from 'react';
//import { useDispatch } from 'react-redux';

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export default function PrivateToggle(props) {
    //const dispatch = useDispatch();
    const [checked, setChecked] = React.useState(props.checked);
    const [open, setOpen] = React.useState(false);

    const handleChange = (event) => {
        //setChecked(event.target.checked);
        //TODO: add action to make collection private
        dialogOpen()
    };

    const dialogOpen = () => {
        setOpen(true);
    }

    const dialogClose = () => {
        setOpen(false);
    }
    
    const changePrivate = () => {
        const collectionId = 'TODO adding later'; //props.id;
        console.log(`make ${checked ? "Public" : "Private"} ` + collectionId);
        //dispatch(collectionActions.delete(collectionId));
        dialogClose();
        setChecked(!checked);
    };

    return (
        <React.Fragment>
            <FormControlLabel
                control={
                    <Switch checked={checked} onChange={handleChange} name="Private Collection" />
                }
                label="Private Collection"
            />
            <Dialog
                open={open}
                onClose={dialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{`Make this Collection ${checked ? "Public" : "Private"}?`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {checked ? 
                        `Make collection ${props.name} public? It will become visible to other users to subscribe to.` : 
                        `Make collection ${props.name} private? Other users will no longer be able to view the collection.`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={dialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={changePrivate} color="primary" autoFocus>
                        Make {checked ? "Public" : "Private"}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
