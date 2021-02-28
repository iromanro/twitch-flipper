import React, { Fragment, useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import BackIcon from '@material-ui/icons/ArrowLeft';

import Page from '../../containers/Page';

import history from '../../utils/history';
import './style.scss';
import { HOME_PAGE_ROUTE } from '../../utils/routes';

const SettingsPage = () => {
  const [commands, setCommands] = useState();
  useEffect(() => {
    window.chrome.commands.getAll(result => {
      setCommands(result);
    });
  }, []);

  return (
    <Page
      className="settings-page"
      heading={{ text: 'Settings' }}
      body={
        <Fragment>
          <List
            subheader={
              <ListSubheader>
                Shortcuts
                <a
                  href="/"
                  className="edit-shortcuts-button"
                  onClick={() => window.chrome.tabs.create({ url: 'chrome://extensions/shortcuts' })}
                >
                  Edit
                </a>
              </ListSubheader>
            }
          >
            {commands &&
              commands.map(command => {
                const { description, shortcut } = command;
                const shortcutText =
                  shortcut && shortcut.length && shortcut.length > 0 ? (
                    shortcut
                  ) : (
                    <span className="unset-shortcut">Not set, click Edit to configure</span>
                  );

                return (
                  <ListItem key={command.name}>
                    <ListItemText primary={description} secondary={shortcutText} />
                  </ListItem>
                );
              })}
          </List>
        </Fragment>
      }
      actionsDivider
      actions={
        <Fragment>
          <Button color="primary" onClick={() => history.push(HOME_PAGE_ROUTE)} startIcon={<BackIcon />}>
            Back
          </Button>
        </Fragment>
      }
    />
  );
};

export default SettingsPage;
