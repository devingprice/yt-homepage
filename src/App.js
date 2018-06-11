import React, { Component } from 'react';
import './App.css';
import ChannelHeader from './channelHeader';
import Bookcase from './Bookcase';
import {sampleData} from './sampleData';
import Parser from 'rss-parser';


class App extends Component {
  /** TODO: How yt does grid rows/ hidden items
   * row contents > row renderer (set width) > 
   * left right arrow divs (moves translateX of items)
   *  + scroll container (set width) (hide overflow) > 
   * items (huge width) (nowrap + will-change) [transform:translateX(0)]
  **/

  /* YT changes div attrib to hide sidebar but @media for content width
   * not sure why
   * if(window.screen.width > 1276){leftPaneVis=true; guide=true}
   * else{leftPaneVis=false;guide=false};
   *  persistent-guide={guide?"":false}
   *  opened={leftPaneVis?"":false}
   * https://www.hawatel.com/blog/handle-window-resize-in-react/
  */
  constructor(props){
    super(props);
    this.state = {
      collections : [],
      rssFeeds : []
    }
  }

  componentWillMount(){
    //gets user collections 
    //***also a possibility to pass those down in props 
    //instead to use oauth component around app.js
    this.setState({
      collections : sampleData.collectionResponse,
      rssFeeds : this.state.rssFeeds
    });
  }
  
  componentDidMount(){
    let channelsArray = [];
    this.state.collections.forEach(function(collection){
      if(collection.reservedName ==="subscriptions"){
        collection.channels.forEach(function(channel){
          channelsArray.push("https://www.youtube.com/feeds/videos.xml?channel_id=" + channel.channelId)
        })
      }
    })

    let parser = new Parser({
      customFields: {
        feed: [ 'yt:channelId'],
        item: ["media:group", "yt:videoId", "yt:channelId", "published"]
      }
    });

    
    let requests = channelsArray.map(url => 
      parser.parseURL(url)
    );
    
    let channelFeeds = {};
    Promise.all(requests)
      .then(responses => responses.forEach( response => {
        //console.log(response);
        channelFeeds[response["yt:channelId"]] = response.items;
      })
      )
      .then(blank => {
        //console.log(channelFeeds);
        this.setState({
          collections : this.state.collections,
          rssFeeds : channelFeeds
        })}
      )
    
  }

  render() {
    console.log("This is rss state:");
    console.log(this.state.rssFeeds)
    console.log(this.state.collections)
    return (
      <div className="App">

        <div className="toolbar"></div>
        
        <div className="pageCont">
          <div className="page">
            <div className="pageContent">
              <div className="App-body">
                <Bookcase 
                collections={this.state.collections}
                rssFeeds={this.state.rssFeeds}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="leftPane"></div>
      </div>
    );
  }
}

export default App;
