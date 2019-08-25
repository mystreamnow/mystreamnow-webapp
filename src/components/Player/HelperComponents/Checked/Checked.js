import React from 'react';

import './assets/scss/Checked.scss';

const Checked = ({ children, checked }) => {
  console.log(checked);
  return (
    <div className='container_circle_loader'>
      {!checked
        ? <div className='circle-loader'>
          <div className='checkmark draw' />
        </div>
        : <div className='circle-loader load-complete'>
          <div className='checkmark draw' style={{ display: 'block' }} />
        </div>}

      {children}
    </div>
  );
};

export default Checked;
