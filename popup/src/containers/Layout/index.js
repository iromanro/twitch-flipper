import React from 'react';

import './style.scss';

export default ({ children }) => (
  <div className="popup container">
    <div className="popup--content">{children}</div>
  </div>
);
