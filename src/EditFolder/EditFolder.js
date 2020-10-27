import React, {Component} from 'react';
import ApiContext from '../ApiContext'
import config from '../config'
import PropTypes from 'prop-types';
import ValidationError from '../ValidationError'

export default class EditFolder extends Component {
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



    render() {
        return(
            <section className="EditFolder">

            </section>
        )
    }
}