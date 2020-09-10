import React, {Component} from 'react';
import ApiContext from '../ApiContext'
import config from '../config'
import PropTypes from 'prop-types';
import ValidationError from '../ValidationError'
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
            error: false,
            name: {
                value: "",
                touched: false
            },
            content: {
                value: "",
                touched: false
            },
            select: {
                value: "",
                touched: false
            }
        }
    }

    handleNameChange = e => {
        this.setState({
          name: {
              value: e.target.value,
              touched: true
          }
        })
    }

    handleContentChange = e => {
        this.setState({
          content: {
              value: e.target.value,
              touched: true
          }
        })
    }

    handleSelectChange = e => {
        this.setState({
            select: {
                value: e.target.value,
                touched: true
            }
        })
    }

    validateName = () => {
      const name = this.state.name.value.trim();
      if (name.length === 0) {
        return 'Name is required';
      }
    }

    validateContent = () => {
        const content = this.state.content.value.trim();
        if (content.length === 0) {
            return 'Content is required';
          }
    }

    validateSelect = () => {
        const select = this.state.select.value.trim();
        if (select.length === 0) {
            return 'Please select folder';
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
            this.setState({error: true})
          })
      }

    render(){
        const nameError = this.validateName();
        const contentError = this.validateContent();
        const selectError = this.validateSelect();
        const folders= this.context.folders;
        return(
            <section className='AddNote'>
                <h2>Create a note</h2>
                <form className="Noteful-form" onSubmit={this.handleSubmit}>
                    <div className='field'>
                        <label htmlFor='note-name-input'>
                            Name
                        </label>
                        <input type="text" id="note-name-input" name="note-name" onChange={e => this.handleNameChange(e)}/>
                        {this.state.name.touched && <ValidationError message={nameError} />}
                    </div>
                    <div className="field">
                        <label htmlFor="note-content-input">
                            Content
                        </label>
                        <textarea id='note-content-input' name="note-content" onChange={e => this.handleContentChange(e)}/>
                        {this.state.content.touched && <ValidationError message={contentError} />}
                    </div>
                    <div className="field">
                        <label htmlFor='note-folder-select'>
                            Folder
                        </label>
                        <select id='note-folder-select' name='note-folder-id' onChange={e => this.handleSelectChange(e)}>
                            <option value={null}>...</option>
                            {folders.map(folder =>
                                <option key={folder.id} value={folder.id}>
                                {folder.name}
                                </option>
                            )}
                        </select>
                        {this.state.content.touched && <ValidationError message={selectError} />}
                    </div>
                    <div className="buttons">
                        <button 
                        type='submit' 
                        disabled={
                            this.validateName() ||
                            this.validateContent() ||
                            this.validateSelect()
                        }>
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