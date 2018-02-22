import React, { Component } from 'react';
import {ApiCaller} from './Components/ApiWrapper.js'

class App extends Component {
  constructor(props) {
    super(props)

    this.renderMenu = this.renderMenu.bind(this)
  }
  renderMenu(result) {
    const urlRoot = "http://127.0.0.1:8000/api/";
    return (
      <ol>
        {result.categories.map((category) => {
          return (
            <li key={category.id}>
              <div>{category.name}</div>
              <div>
                <ApiCaller 
                  urlRoot={urlRoot} 
                  urls={["categories", category.id.toString()]}
                />
              </div>
              <div>
                <ApiCaller 
                  urlRoot={urlRoot} 
                  urls={["categories", category.id.toString(), "articles"]}
                />
              </div>
            </li>
          )
        }) }
      </ol>
    );
  }
  render() {  const urlRoot = "http://127.0.0.1:8000/api";
  const urls = ["categories"];
    return (
      <ApiCaller 
        urlRoot={urlRoot} 
        urls={urls}
        success={this.renderMenu}
      />
    );
  }
}

export default App;
