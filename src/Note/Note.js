import React from 'react'
import {Link} from 'react-router-dom'
import ApiContext from '../ApiContext'
import config from '../config'
import './Note.css'
import PropTypes from 'prop-types';

export default class Note extends React.Component {
    static defaultProps ={
      onDeleteNote: () => {},
    }
    static contextType = ApiContext;
   
  
    handleClickDelete = e => {
      e.preventDefault()
      const noteId = this.props.id
  
      fetch(`${config.API_ENDPOINT}/api/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        },
      })
        .then(res => {
          if (res.status !== 204)
          {return res.json().then(e => Promise.reject(e))}
          return res
        })
        .then(() => {
          this.context.deleteNote(noteId)
          // allow parent to perform extra behaviour
          this.props.onDeleteNote(noteId)
        })
        .catch(error => {
          console.log({ error })
        })
    }
  
    render() {

      const { name, id, modified } = this.props
      return (
        <div className='Note'>
          <h2 className='Note__title'>
            <Link to={`/note/${id}`}>
              {name}
            </Link>
          </h2>
          <button
            className='Note__delete'
            type='button'
            onClick={this.handleClickDelete}
          >
            remove
          </button>
          <div className='Note__dates'>
            <div className='Note__dates-modified'>
              Modified
              {' '}
              <span className='Date'>
                {modified}
              </span>
            </div>
          </div>
        </div>
      )
    }
  }

  Note.propTypes = {
  onDeleteNote: PropTypes.func,
  name: PropTypes.string,
  id: PropTypes.number,
  modified: PropTypes.string
}