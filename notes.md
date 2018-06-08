Need:
youtube player modal
settings drop down boxes/dialogs (clicking button can change dialog size)
    yt uses polymer-dialog
modal with slide tile to add to collection

##Front End

OAuth Login Component To Be added
    1) react oauth library may work for this
    2) on page open, default account is loaded with example collections
        grey alert area shows up as first collection to tell you to log in to start
        another grey area tells you how the site works and tells you to try
Collection Editing should be possible

<Base App />
    OnLoad: will fetch subs / collections / user settings
    AfterDomRendered: will fetch rss feeds for all channels

    <Top Bar />
        Icon 
            + searchbar for new channels (can drag off the search bar which opens "bottom bar of collections as tiles")
            + controls button 
                can click to 'unlock' shelf movement for reordering
                can set shelf ordering to "Preset Order" or "Sort by newest/most new contained video(s)"


    <Grid collections + rssFeeds/>
        d
        **purpose**: create the bookcase with moving shelves

        <Collection rssFeeds/>
            will sort tiles based on user/collection settings

            Title + Controls Button
                control modal: change sort/change view
            <Tile rssFeedData/>
                will load placeholder until info is loaded from rssfeedsdata
            
    
    <LeftPane collections + rssFeeds/>
        **purpose**: shows list of your collections with number of new videos


## Other components
<Edit Collections />
    <topbar of channels />
    <bottom bar of collections />

<CollectionPage />
    hides homepage and shows collection page
    **purpose**:page for showing videos of a collection

    <Collection Title + Collection Details />
        Row 1: title + collection details
        Row 2: tiles of channels
        Row 3: link to share (can add collection to your user with link)
        Row 4: youtube's tabs (for home/videos/playlists) but for sort types (newest, most viewed, custom sort)
        Row 5: video grid





1)x collection can either be show more/show less OR arrows to slide videos
2)x react placeholders on tiles
3)x can reorder shelves easily
4)x channel adding should have option to window with topbar as sliding "shelf" of unassociated channels and bottom bar of collections as "tiles"; can drag and drop channels onto tiles 
    maybe like a windows explorer folders
    maybe have channel "tiles" with last video thumbnail with channel icon/name under it
5)x collections have "tags" such as new 





##Back End

gfynonce library to create adjadjnoun for url for each collection to share
    (share boolean + gfynonce; if share turned true and no gfynonce=generate gfynonce)
collections variables:
    collectionID: autoincremented
    userID: what it belongs to
    gfynonce + share boolean
    reservedName: to hide from frontpage(subscriptions + nonsubscriptions)
    
    collectionName
    [settings]
    displayType: one row (arrows), onlyNew, showMore1Row, showMore2Row (2 rows visable with show more button to double)
    ORDER: order to show on frontpage if selected
    sort: by order, by new, only new


users variables:
    userId: autoincremented
    userName

    lastSignOn: most recent sign on time
    secondSignOn: 2nd most recent sign on
        (used for calculating new in client)
    
    [settings] (not sure if these should be saved on db or on client)
    showNewTag: display new on videos posted since last sign on
    defaultPageSort: by order, by new, only new, all subs
    newCalc: since last login/since 2nd last login/since 1 day(or 2/3/etc)



channel variables:
    ID: autoincremented (will have duplicated channels)
    collectionID: what it belongs to
    channelName
    channelId
    channelThumb
    
    [potential setting]
    highlight: add highlighting to 'key' channels


1)x save last 2 login dates and any video since those is "new"
2)x Every user gets 2 default collections
    1: subs
    2: extra channels (if they add channels they aren't subbed to)
