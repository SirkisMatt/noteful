import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import NoteListNav from './NoteListNav/NoteListNav';
import NotePageNav from './NotePageNav/NotePageNav';
import NoteListMain from './NoteListMain/NoteListMain';
import NotePageMain from './NotePageMain/NotePageMain';
import AddFolder from './AddFolder/AddFolder'
import AddNote from './AddNote/AddNote'
import ApiContext from './ApiContext';
import NoteError from './NoteError'
import config from './config';
import './App.css';

class App extends Component {
  state = {
      notes: [],
      folders: []
  };

  componentDidMount() {
      Promise.all([
          fetch(`${config.API_ENDPOINT}/api/notes`),
          fetch(`${config.API_ENDPOINT}/api/folders`)
      ])
          .then(([notesRes, foldersRes]) => {
              if (!notesRes.ok)
                  return notesRes.json().then(e => Promise.reject(e));
              if (!foldersRes.ok)
                  return foldersRes.json().then(e => Promise.reject(e));

              return Promise.all([notesRes.json(), foldersRes.json()]);
          })
          .then(([notes, folders]) => {
              this.setState({notes, folders});
          })
          .catch(error => {
              console.error({error});
          });
  }

  handleDeleteNote = noteId => {
    console.log(noteId)
      console.log(this.state.notes.filter(note => note.id !== noteId))
      this.setState({
          notes: this.state.notes.filter(note => note.id !== noteId)
      });
  };

  handleAddFolder = folder => {
    this.setState({
      folders: [
        ...this.state.folders,
        folder
      ]
    })
  }

  handleAddNote = note => {
    this.setState({
      notes: [
        ...this.state.notes,
        note
      ]
    })
  }

  renderNavRoutes() {
      return (
          <>
              {['/', '/folder/:folderId'].map(path => (
                  <Route
                      exact
                      key={path}
                      path={path}
                      component={NoteListNav}
                  />
              ))}
              <Route path="/note/:noteId" component={NotePageNav} />
              <Route path="/add-folder" component={NotePageNav} />
              <Route path="/add-note" component={NotePageNav} />
          </>
      );
  }

  renderMainRoutes() {
      return (
          <>
            {['/', '/folder/:folderId'].map(path => (
                <Route
                    exact
                    key={path}
                    path={path}
                    component={NoteListMain}
                />
            ))}
            <Route path="/note/:noteId" component={NotePageMain} />
            <Route
            path='/add-folder'
            component={AddFolder}
            />
             <Route
            path='/add-note'
            component={AddNote}
            />
          </>
      );
  }
          

  render() {
      const value = {
        notes: this.state.notes,
        folders: this.state.folders,
        deleteNote: this.handleDeleteNote,
        addFolder: this.handleAddFolder,
        addNote: this.handleAddNote
      };
      return (
          <ApiContext.Provider value={value}>
              <div className="App">
                <NoteError>
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                </NoteError>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>
                        </h1>
                    </header>
                <NoteError>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </NoteError>
              </div>
          </ApiContext.Provider>
      );
  }
}

export default App;