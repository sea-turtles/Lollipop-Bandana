import React from 'react';
import NavBar from '../../components/Nav';
import './CoreLayout.scss';
import '../../styles/core.scss';

export const CoreLayout = ({ children }) => {
  return (
    <div className='container text-center' style={{ width: '100%' }}>
      <div className='core-layout__viewport' style={{ width: '100%' }}>
      <NavBar />
        {children}
      </div>
    </div>
  );
};

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default CoreLayout;
