import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import Layout from '../components/layout';
import './layout/home.scss';
import ChannelDrawer from '../components/channelDrawer';
import Bookcase from '../components/bookcase';
import DragDropContextWrapper from '../components/DragDropContextWrapper'
import Toggles from '../components/toggles';

import { makeFeedsRequest } from '../actions/feeds.actions';
import { filterDistinctChannelIds, objectEmpty } from '../helpers/utils';

import { collectionActions } from '../actions/collection.actions';
import Navigation from '../components/Navigation/Navigation';

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
}

export default (props) => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.authentication); //loggedIn loggingIn user
    const collections = useSelector(state => state.collectionsBoard);
    const prevCollections = usePrevious(collections);

    //should run only once
    useEffect(()=> {
        if ( objectEmpty(collections) ){
            console.log('***********NEW COLLECTIONS')
            if ( auth.user ) {
                dispatch( collectionActions.getAll() );
            }
            
        } else { 
            console.log("^^^^^^^^^^^^^^^^^^^^^^^^^NOT REQUESTING")
        }
    }, []);

    /*
    Walking through the logic:
    will load prev collections from local storage (on APP load, not page)
        will contain lastUpdated, if over certain amount, will update
    on first render, will request all collections for user from home page
    */

    // TODO this is a hacky comparison. 
    // redux has some way of doing it with useSelector's second argument function
    // || !objectEquivalent(prevCollections, collections)
    //and apparently it doesnt work, im regenerating uuid every time so they're not the same
    
    // currently only doing it the first load
    

    const uniqueChannels = filterDistinctChannelIds( collections )
    
    if (uniqueChannels.length > 0)
        dispatch( makeFeedsRequest(uniqueChannels) );

    console.log(prevCollections)
    console.log(collections)

    console.log(auth);

    return (
        // <div className="">
            <div className="gridWrapper">
                <DragDropContextWrapper>
                    <div className="headerControls">
                        <Navigation />
                        <Toggles/>
                    </div>
                    <div className="channelDrawer">
                        <ChannelDrawer />
                    </div>
                    <div className="bodyContent">
                        <Bookcase />
                    </div>
                </DragDropContextWrapper>
            </div>
        // </div>
    );
}
