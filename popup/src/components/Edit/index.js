import React, { Fragment, useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import ResetIcon from '@material-ui/icons/Replay';
import BackIcon from '@material-ui/icons/ArrowLeft';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import Page from '../../containers/Page';

import './style.scss';
import history from '../../utils/history';
import {
  defaultTemplates,
  copyToClipboard,
  formatTemplateString,
  getTemplateFromLocalStorage,
  saveTemplateToLocalStorage,
} from '../../utils/templates';
import { HOME_PAGE_ROUTE } from '../../utils/routes';

const Edit = props => {
  const [templateText, updateTemplateText] = useState();
  const [placeholder, updatePlaceholder] = useState();
  const [defaultTemplate, updateDefaultTemplate] = useState({});
  const { label } = defaultTemplate;

  useEffect(() => {
    const {
      match: {
        params: { type: typeParam },
      },
    } = props;
    const templateDefault = defaultTemplates.find(template => template.type === typeParam);
    const { type, placeholder: defaultPlaceholder } = templateDefault;
    const templateString = getTemplateFromLocalStorage(type) || defaultPlaceholder;

    updateTemplateText(formatTemplateString(templateString));
    updatePlaceholder(formatTemplateString(defaultPlaceholder));
    updateDefaultTemplate(templateDefault);
  }, []);

  const handleBackClick = () => {
    history.push(HOME_PAGE_ROUTE);
  };

  const handleResetClick = () => {
    updateTemplateText(placeholder);
  };

  const handleSaveClick = () => {
    const { type } = defaultTemplate;

    saveTemplateToLocalStorage(type, templateText);
    copyToClipboard(type);
    window.close();
  };

  return (
    <Page
      className="edit-page"
      heading={{
        text: `Editing ${label} template`,
        children: (
          <Tooltip title="Reset to default">
            <IconButton size="small" className="reset-button">
              <ResetIcon fontSize="inherit" onClick={handleResetClick} />
            </IconButton>
          </Tooltip>
        ),
      }}
      body={
        <TextField
          value={templateText}
          onChange={({ target: { value } }) => updateTemplateText(formatTemplateString(value))}
          multiline
          fullWidth
          placeholder={placeholder}
          rows="15"
          variant="outlined"
          margin="normal"
        />
      }
      actions={
        <Fragment>
          <Button color="primary" onClick={handleBackClick} startIcon={<BackIcon />}>
            Back
          </Button>
          <Button
            className="save-button"
            onClick={handleSaveClick}
            color="primary"
            startIcon={<SaveIcon />}
            variant="contained"
          >
            Save & Copy
          </Button>
        </Fragment>
      }
    />
  );
};

export default Edit;
