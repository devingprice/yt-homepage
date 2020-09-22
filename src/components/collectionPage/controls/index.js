import React from 'react';

import Share from './Share';
import DeleteButtonDialog from './DeleteButtonDialog';
import PrivateToggle from './PrivateToggle';

export default (props) => {
    if(!props.collection) return (<React.Fragment/>)
    return (
        <div className="collection-controls">
            {props.owned ? 
                <DeleteButtonDialog id={props.collection.id} name={props.collection.name} /> :
                "Not the owner"
            }
            {
                props.collection  ?
                <Share uniqueid={props.collection.uniqueid} /> :
                ""
            }
            <div>Owner: {props.collection.ownerId}</div>
            <PrivateToggle checked={props.collection.private} id={props.collection.id} name={props.collection.name}/>
        </div>
    )
}
