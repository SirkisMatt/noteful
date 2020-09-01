import React from 'react'
import {Link} from 'react-router-dom'
import './Note.css'

export default function Note(props) {
    return (
        <div className='Note'>
            <h2 className='Note__title'>
                <Link to={`/note/${props.id}`}>
                    {props.name}
                </Link>
            </h2>
            <button className='Note__delete' type='button'>
                remove
            </button>
            <div className='Note__dates'>
                <div className='Note__dates-modified'>
                    Modified
                    {' '}
                    <span className='Date'>
                        {props.modified}
                    </span>
                </div>
            </div>
        </div>
    )
}