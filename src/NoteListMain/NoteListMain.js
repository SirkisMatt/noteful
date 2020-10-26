import React from 'react'
import { Link } from 'react-router-dom'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'
import NoteError from '../NoteError'
import { getNotesForFolder } from '../notes-helpers'
import PropTypes from 'prop-types';
import './NoteListMain.css'

export default class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  render() {
    const { folderId } = this.props.match.params
    const { notes=[] } = this.context
    const notesForFolder = getNotesForFolder(notes, folderId)
    return (
      <section className='NoteListMain'>
        <ul>
          {notesForFolder.map(note =>
            <li key={note.id}>
              <NoteError>
              <Note
                id={note.id.toString()}
                name={note.name}
                modified={note.modified}
              />
            </NoteError>
            </li>
          )}
        </ul>
        <NoteError>
        <div className='NoteListMain__button-container'>
          <Link
            to='/add-note'
            className='NoteListMain__add-note-button NavCircleButton'
          >
            Add Note
          </Link>
        </div>
        </NoteError>
      </section>
    )
  }
}

NoteListMain.propTypes = { 
  match: PropTypes.shape({
    params: PropTypes.object
  })
}