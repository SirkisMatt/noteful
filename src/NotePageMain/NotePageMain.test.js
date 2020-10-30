import React from 'react';
import ReactDOM from 'react-dom';
import NotePageMain from './NotePageMain';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NotePageMain />, div);
  ReactDOM.unmountComponentAtNode(div);
});
