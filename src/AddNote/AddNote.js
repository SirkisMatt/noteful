import React, {Component} from 'react';
import ApiContext from '../ApiContext'
import config from '../config'
import PropTypes from 'prop-types';
import './AddNote.css'

export default class AddNote extends Component {
    static defaultProps = {
        history: {
          push: () => { }
        },
      }

    static contextType = ApiContext;

    constructor() {
        super()
        this.state = {
          error: false
        }
    }

    handleSubmit = e => {
        e.preventDefault()
        const newNote = {
          name: e.target['note-name'].value,
          content: e.target['note-content'].value,
          folderId: e.target['note-folder-id'].value,
          modified: new Date(),
        }
        fetch(`${config.API_ENDPOINT}/notes`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(newNote),
        })
          .then(res => {
            if (!res.ok)
              return res.json().then(e => Promise.reject(e))
            return res.json()
          })
          .then(note => {
            this.context.addNote(note)
            this.props.history.push(`/folder/${note.folderId}`)
          })
          .catch(error => {
            console.error({ error })
            this.setState({error: true})
          })
      }

    render(){
        const folders= this.context.folders;
        return(
            <section className='AddNote'>
                <h2>Create a note</h2>
                <form className="Noteful-form" onSubmit={this.handleSubmit}>
                    <div className='field'>
                        <label htmlFor='note-name-input'>
                            Name
                        </label>
                        <input type="text" id="note-name-input" name="note-name" required/>
                    </div>
                    <div className="field">
                        <label htmlFor="note-content-input">
                            Content
                        </label>
                        <textarea id='note-content-input' name="note-content" required/>
                    </div>
                    <div className="field">
                        <label htmlFor='note-folder-select'>
                            Folder
                        </label>
                        <select id='note-folder-select' name='note-folder-id'>
                            <option value={null}>...</option>
                            {folders.map(folder =>
                                <option key={folder.id} value={folder.id}>
                                {folder.name}
                                </option>
                            )}
                        </select>
                    </div>
                    <div className="buttons">
                        <button type='submit'>
                            Add Note
                        </button>
                        {(this.state.error) ? <p className="Error-message">There was an error, please try again later.</p> : null}
                    </div>
                </form>
            </section>
        )
    }
}

AddNote.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func
    })
}