import React from 'react';
import ReactDOM from 'react-dom';
import NotePageNav from './NotePageNav';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NotePageNav />, div);
  ReactDOM.unmountComponentAtNode(div);
});
