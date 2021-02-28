import React from 'react';
import cx from 'classnames';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import './style.scss';

const Page = ({
  className,
  heading: { text: headingText, children: headingChildren },
  body,
  actions,
  actionsDivider = false,
}) => {
  return (
    <div className={cx('page-container', className)}>
      <div className="heading">
        <Typography variant="h6" gutterBottom>
          {headingText}
        </Typography>
        {headingChildren}
      </div>
      {body !== undefined && <div className="body">{body}</div>}
      {actions !== undefined && (
        <div className="actions">
          {actionsDivider && <Divider className="actions-divider" />}
          {actions}
        </div>
      )}
    </div>
  );
};

export default Page;
