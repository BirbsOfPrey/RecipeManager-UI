import { Component } from 'react';
import { Routes, Route} from 'react-router-dom'
import { Copyright } from './widgets/Copyright';
import './App.css';

export class App extends Component {



  render() {
    return (
      <div className={"app__container "}>
        <main>
          <Routes>
            {/* <Route exact path="/"
                  render={() => <Overview styleHandler={this.updateStyle} style={this.state.style}/>}/>
                <Route exact path="/notes/:id" component={NoteDetails}/>
                <Route exact path="/new-note" component={NoteDetails}/> */}
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
        </main>
        <Copyright />
      </div>
    )
  }
}

export default App;