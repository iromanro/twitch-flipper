import React from 'react';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import CopyIcon from '@material-ui/icons/FileCopy';
import SettingsIcon from '@material-ui/icons/Settings';

import Page from '../../containers/Page';

import './style.scss';
import { defaultTemplates, copyToClipboard } from '../../utils/templates';
import history from '../../utils/history';
import { EDIT_PAGE_ROUTE, SETTINGS_PAGE_ROUTE } from '../../utils/routes';

function handleTemplateClick(type) {
  copyToClipboard(type);
  window.close();
}

const Home = () => (
  <Page
    className="home-page"
    heading={{
      text: 'Templates',
      children: (
        <IconButton size="small" className="settings-button" onClick={() => history.push(SETTINGS_PAGE_ROUTE)}>
          <SettingsIcon fontSize="inherit" />
        </IconButton>
      ),
    }}
    body={
      <List>
        {defaultTemplates.map(template => {
          const { type, label } = template;

          return (
            <ListItem key={type} button onClick={() => handleTemplateClick(type)}>
              <ListItemIcon>
                <CopyIcon />
              </ListItemIcon>
              <ListItemText primary={label} />
              <ListItemSecondaryAction>
                <Button onClick={() => history.push(`${EDIT_PAGE_ROUTE}/${type}`)}>Edit</Button>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    }
  />
);

export default Home;
