import React from 'react';
import { Link } from 'react-router';
import './NotFoundView.scss';

class NotFoundView extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className=''>
        <h2>Not Found</h2>
      </div>
    );
  }

}

export default NotFoundView;
