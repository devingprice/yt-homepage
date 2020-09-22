import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { collectionActions } from '../../../actions/collection.actions';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const DeleteButtonDialog = (props) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    
    const deleteDialogOpen = () => {
        setOpen(true);
    }
    const deleteDialogClose = () => {
        setOpen(false);
    }
    
    const deleteCollection = () => {
        const collectionId = props.id;
        console.log('delete ' + collectionId);
        dispatch(collectionActions.delete(collectionId));
        deleteDialogClose();
    };

    return (
        <React.Fragment>
            <Button variant="outlined" color="secondary" onClick={deleteDialogOpen}>
                Delete Collection
            </Button>
            <Dialog
                open={open}
                onClose={deleteDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete this collection?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Permanently delete collection "{props.name}". This action is irreversible.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={deleteDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={deleteCollection} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default DeleteButtonDialog;
