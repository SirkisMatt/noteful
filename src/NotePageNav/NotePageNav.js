import React from 'react'
import ApiContext from '../ApiContext'
import { findNote, findFolder } from '../notes-helpers'
import PropTypes from 'prop-types';

import './NotePageNav.css'

export default class NotePageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }
  static contextType = ApiContext;

  render() {
    const { notes, folders, } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || {}
    const folder = findFolder(folders, note.folders_id)

    return (
      <div className='NotePageNav'>
        <button
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='NotePageNav__back-button NavCircleButton'
        >
          Back
        </button>
        {folder && (
          <h3 className='NotePageNav__folder-name'>
            {folder.name}
          </h3>
        )}
      </div>
    )
  }
}


NotePageNav.propTypes = { 
  match: PropTypes.shape({
    params: PropTypes.object
  }),
  history: PropTypes.shape({
    goBack: PropTypes.func
  })
}