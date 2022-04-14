import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  Switch,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';

import { getAngularService } from 'services/angular-react-helper';
import { FlagContext } from 'shared/contexts';

const useStyles = makeStyles({
  deleteButton: {
    backgroundColor: '#c44f65',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#853544',
    },
  },
  gridStyle: {
    display: 'grid',
    gridTemplateRows: '1fr 1fr',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridRowGap: '8px',
    gridColumnGap: '8px',
  },
  firstRow: {
    gridColumn: '1 / -1',
  },
  fileName: {
    wordBreak: 'break-word',
  },
});

function ChplUploadListings() {
  const API = getAngularService('API');
  const Upload = getAngularService('Upload');
  const authService = getAngularService('authService');
  const { enqueueSnackbar } = useSnackbar();
  const { isOn } = useContext(FlagContext);
  const [file, setFile] = useState(undefined);
  const [ele, setEle] = useState(undefined);
  const [enhancedUploadIsOn, setEnhancedUploadIsOn] = useState(false);
  const [legacyUploadIsOn, setLegacyUploadIsOn] = useState(false);
  const [useLegacy, setUseLegacy] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setEnhancedUploadIsOn(isOn('enhanced-upload'));
    setLegacyUploadIsOn(isOn('legacy-upload'));
  }, [isOn]);

  useEffect(() => {
    setUseLegacy(!enhancedUploadIsOn);
  }, [enhancedUploadIsOn]);

  const clearFile = () => {
    setFile(undefined);
    ele.value = null;
  };

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
    setEle(event.target);
  };

  const uploadFile = () => {
    const item = {
      url: useLegacy ? `${API}/certified_products/upload` : `${API}/listings/upload`,
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
        'API-Key': authService.getApiKey(),
      },
      data: {
        file,
      },
    };
    Upload.upload(item)
      .then((response) => {
        if (response.status === 206) {
          const message = `Partial success: File "${response.config.data.file.name}" was uploaded successfully, however there ${response.data.errorMessages.length !== 1 ? 'were errors' : 'was an error'} in the file.<ul>${response.data.errorMessages.map((m) => (`<li>${m}</li>`)).join()}</ul>${response.data.successfulListingUploads.length} pending product${response.data.successfulListingUploads.length > 1 ? 's are' : ' is'} processing.`;
          enqueueSnackbar(message, {
            variant: 'warning',
          });
        } else {
          let message;
          if (useLegacy) {
            message = `Success: File "${response.config.data.file.name}" was uploaded successfully. ${response.data.pendingCertifiedProducts.length} pending product${response.data.pendingCertifiedProducts.length > 1 ? 's are' : ' is'} ready for confirmation.`;
          } else {
            message = `Success: File "${response.config.data.file.name}" was uploaded successfully. ${response.data.successfulListingUploads.length} pending product${response.data.successfulListingUploads.length > 1 ? 's are' : ' is'} processing.`;
          }
          enqueueSnackbar(message, {
            variant: 'success',
          });
        }
        if (response.headers.warning === '299 - "Deprecated upload template"') {
          const message = 'Warning: The version of the upload file you used is still valid, but has been deprecated. It will be removed as a valid format in the future. A newer version of the upload file is available.';
          enqueueSnackbar(message, {
            variant: 'warning',
          });
        }
      })
      .catch((error) => {
        let message = `Error: File "${file.name}" was not uploaded successfully.`;
        if (error?.data?.errorMessages) {
          if (error.data.errorMessages[0].startsWith('The header row in the uploaded file does not match')) {
            message += ' The CSV header row does not match any of the headers in the system.';
            // to do: get available templates
          } else {
            message += ` ${error.data.errorMessages.join(', ')}`;
          }
        }
        enqueueSnackbar(message, {
          variant: 'error',
        });
      })
      .finally(() => {
        clearFile();
      });
  };

  return (
    <Card>
      <CardHeader title="Upload Certified Products" />
      <CardContent>
        { enhancedUploadIsOn && legacyUploadIsOn
          && (
            <FormControlLabel
              control={(
                <Switch
                  id="use-legacy"
                  name="useLegacy"
                  color="primary"
                  checked={useLegacy}
                  onChange={() => setUseLegacy(!useLegacy)}
                />
              )}
              label={useLegacy ? 'Using Legacy Upload' : 'Using Modern Upload'}
            />
          )}
        <div className={classes.gridStyle}>
          <Typography variant="body1" className={classes.firstRow}>
            CSV files only
          </Typography>
          <div>
            <Button
              color="primary"
              variant={file ? 'outlined' : 'contained'}
              component="label"
            >
              Choose file to upload
              <input
                type="file"
                id="upload-listings"
                onChange={onFileChange}
                style={{ display: 'none' }}
              />
            </Button>
          </div>
          { file
            && (
              <div className={classes.fileName}>
                <strong>Filename:</strong>
                {' '}
                { file.name }
              </div>
            )}
          { file
            && (
              <div>
                <strong>File size:</strong>
                {' '}
                { file.size }
              </div>
            )}
          { file
            && (
              <div>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={uploadFile}
                >
                  <i className="fa fa-cloud-upload" />
                  {' '}
                  Upload
                </Button>
                <Button
                  className={classes.deleteButton}
                  variant="contained"
                  onClick={clearFile}
                >
                  <i className="fa fa-trash-o" />
                  {' '}
                  Remove
                </Button>
              </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
}

ChplUploadListings.propTypes = {};

export default ChplUploadListings;
