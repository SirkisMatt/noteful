import React, {Component} from 'react';
import ApiContext from '../ApiContext'
import config from '../config'
import PropTypes from 'prop-types';
import './AddFolder.css'

export default class AddFolder extends Component {
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
        const folder = {name: e.target['folder-name'].value}
        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(folder),
          })
            .then(res => {
              if (!res.ok)
                return res.json().then(e => Promise.reject(e))
              return res.json()
            })
            .then(response => {
                console.log(response)
              this.context.addFolder(response)
              this.props.history.push(`/folder/${response.id}`)
            })
            .catch(error => {
                console.log(error)
                this.setState({error: true})
            })
    }


    
    render(){
        return(
            <section className='AddFolder'>
            <h2>Create a folder</h2>
            <form className="folder-form Noteful-form" onSubmit={this.handleSubmit}>
              <div className='field'>
                <label htmlFor='folder-name-input'>
                  Name
                </label>
                <input type='text' id='folder-name-input' name='folder-name' required/>
              </div>
              <div className='buttons'>
                <button type='submit'>
                  Add folder
                </button>
                {(this.state.error) ? <p className="Error-message">There was an error, please try again later.</p> : null}
              </div>
            </form>
          </section>
        )
    }
}

AddFolder.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func
    })
}