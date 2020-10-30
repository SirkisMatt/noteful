import React, {Component} from 'react';
import ApiContext from '../ApiContext'
import config from '../config'
import PropTypes from 'prop-types';
import ValidationError from '../ValidationError'
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
            error: false,
            folder: {
                value: "",
                touched: false
            }
          }
      }

  handleChange = e => {
          this.setState({
            folder: {
                value: e.target.value,
                touched: true
            }
          })
      }

      validateForm = () => {
        const folder = this.state.folder.value.trim();
        if (folder.length === 0) {
          return 'Name is required';
        }
      }

    handleSubmit = e => {
        e.preventDefault()
        const newFolder = {name: e.target['folder-name'].value}
        fetch(`${config.API_ENDPOINT}/api/folders`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(newFolder),
          })
            .then(res => { 
              if (!res.ok)
              return res.json().then(e => Promise.reject(e))
              return res.json()
            })
            .then(response => {
              this.context.addFolder(response)
              this.props.history.push(`/folder/${response.id}`)
            })
            .catch(error => {
                this.setState({error: true})
            })
    }



    render(){
        const formError = this.validateForm();

        return(
            <section className='AddFolder'>
            <h2>Create a folder</h2>
            <form className="folder-form Noteful-form" onSubmit={e => this.handleSubmit(e)}>
              <div className='field'>
                <label htmlFor='folder-name-input'>
                  Name
                </label>
                <input type='text' id='folder-name-input' name='folder-name' onChange={(e) => this.handleChange(e)}/>
                {this.state.folder.touched && (<ValidationError message={formError} />)}
              </div>
              <div className='buttons'>
                <button type='submit' disabled={this.validateForm()} >
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