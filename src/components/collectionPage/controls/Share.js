import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import IconButton from '@material-ui/core/IconButton';
import {clipboardCopy} from '../../../helpers/clipboardCopy';
import Tooltip from '@material-ui/core/Tooltip';

const Share = (props) => {
    const [open, setOpen] = useState(false);

    const onCopy = () => {
        setOpen(true);
        clipboardCopy(props.uniqueid);
    }

    return (
        <div className="collection-share">
            <TextField
                id="standard-read-only-input"
                label="Read Only"
                defaultValue={props.uniqueid}
                style={{width:'400px'}}
                InputProps={{
                    readOnly: true,
                }}
            />

            <Tooltip 
                open={open} 
                onClose={()=>{setOpen(false)}}
                title={"Copied to clipboard!"}
                leaveDelay={750}
            >
                <IconButton aria-label="delete" onClick={onCopy}>
                    <FileCopyOutlinedIcon />
                </IconButton>
            </Tooltip>
            
        </div>
    )
}

export default Share;
