import React from 'react';
// import { useDispatch } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

export default (props) => {
    // const dispatch = useDispatch(); //TODO

    const onDelete = () => {
        console.log(`Deleted channel from collection`)
    }

    return (
        <Chip
            avatar={<Avatar alt={props.name} src={props.thumbnail} />}
            label={props.name}
            onDelete={onDelete}
        />
    )
}