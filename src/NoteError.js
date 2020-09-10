import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class NoteError extends Component {
    constructor(props) {
        super(props);
        this.state = {
          hasError: false
        };
      }

      static getDerivedStateFromError(error) {
        return { hasError: true };
      }
      render() {
        if (this.state.hasError) {      
          return (
            <h2>Oops, there was an issue displaying this content. Please try again later.</h2>
          );
        }
        return this.props.children;
      }  
}

NoteError.propTypes = {
    hasError: PropTypes.bool
}
