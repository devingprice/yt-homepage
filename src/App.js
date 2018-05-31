import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tile from './tile';

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

  render() {
    

    return (
      <div className="App">

        <div className="toolbar"></div>
        
        <div className="pageCont">

          

          <div className="page">
            <div className="pageContent">

              <header className="App-header">
                <div className="App-banner">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h1 className="App-title">Welcome to React</h1>
                </div>

                <div className="App-channel-info"></div>
              </header>

              <div className="App-body">
                <div className="bookcase">
                  <div className="shelf">
                    <h2 className="shelfTitle">
                    The Philip DeFranco Show (Every Mon-Tues-Wed-Thursday!)
                    </h2>
                    
                    <div className="grid">
                      <Tile />
                      <Tile />
                      <Tile />
                      <Tile />
                    </div>
                  </div>

                  <div className="shelf">
                    <h2 className="shelfTitle">
                    The Philip DeFranco Show (Every Mon-Tues-Wed-Thursday!)
                    </h2>
                    <div className="grid">
                      <Tile />
                      <Tile />
                      <Tile />
                      <Tile />
                    </div>
                  </div>

                </div>
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
