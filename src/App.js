import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tile from './tile';

class App extends Component {
  render() {
    return (
      <div className="App">

        <div className="toolbar"></div>

        <div className="pageCont">

          <div className="leftPane"></div>

          <div className="page">
            <div className="content">

              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to React</h1>
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
        
      </div>
    );
  }
}

export default App;
