import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
} from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import SendIcon from '@material-ui/icons/Send';
import SendOutlined from '@material-ui/icons/SendOutlined';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { func } from 'prop-types';
import * as yup from 'yup';
import {
  useFetchDevelopersBySearch,
  usePostMessage,
  usePostMessagePreview,
} from 'api/developer';
import { useFilterContext } from 'components/filter';
import { ChplLink, ChplTextField } from 'components/util';
import { palette, theme, utilStyles } from 'themes';

const useStyles = makeStyles({
  ...utilStyles,
  pre: {
    wordBreak: 'break-all',
    whiteSpace: 'break-spaces',
  },
  pageHeader: {
    padding: '32px',
    backgroundColor: '#ffffff',
  },
  pageBody: {
    display: 'flex',
    flexDirection: 'row',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#f9f9f9',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  code: {
    textWrap: 'pretty',
  },
  cancelButton: {
    color: palette.error,
    border: `1px solid ${palette.error}`,
  },
  actionBarButton: {
    minWidth: '15vw',
  },
  actionBarButtons: {
    display: 'flex',
    justifyContent: 'center',
    padding: '16px 0',
  },
  stickyBox: {
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    gap: '32px',
    top: '110px',
    height: 'min-content',
    width: '70%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      position: 'relative',
      top: 'auto',
    },
  },
  rightColumn:{
    width: '30%,',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  rowHeader:{
    paddingTop: '8px',
    padddingBottom: '8px',
  },
});

const validationSchema = yup.object({
  subject: yup.string().required('Subject is required'),
  body: yup.string().required('Message body is required'),
});

function ChplMessaging({ dispatch }) {
  const { queryParams, queryString } = useFilterContext();
  const [recordCount, setRecordCount] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const postMessage = usePostMessage();
  const postMessagePreview = usePostMessagePreview();
  const classes = useStyles();

  let formik;

  const { data, isError, isLoading } = useFetchDevelopersBySearch({
    orderBy: 'developer',
    pageNumber: 0,
    pageSize: 25,
    sortDescending: false,
    query: queryString(),
  });

  useEffect(() => {
    if (isLoading) return;
    if (isError || !data.results) return;
    if (isLoading || !data.results) return;
    setRecordCount(data.recordCount);
  }, [data?.results, data?.recordCount, isError, isLoading]);

  const sendMessage = () => {
    postMessage.mutate(
      {
        subject: formik.values.subject,
        body: formik.values.body,
        query: queryParams(),
      },
      {
        onSuccess: () => {
          enqueueSnackbar('Message queued', { variant: 'success' });
          dispatch();
        },
        onError: (error) => {
          const body = `An error occurred: ${error.response?.data?.error}`;
          enqueueSnackbar(body, { variant: 'error' });
        },
      }
    );
  };

  const sendMessagePreview = () => {
    postMessagePreview.mutate(
      {
        subject: formik.values.subject,
        body: formik.values.body,
        query: queryParams(),
      },
      {
        onSuccess: () => {
          enqueueSnackbar(
            'Message preview has been queued. Please check your email to verify formatting',
            { variant: 'success' }
          );
        },
        onError: (error) => {
          const body = `An error occurred: ${error.response?.data?.error}`;
          enqueueSnackbar(body, { variant: 'error' });
        },
      }
    );
  };

  formik = useFormik({
    validationSchema,
    initialValues: {
      subject: '',
      body: '',
    },
    onSubmit: () => {
      sendMessage();
    },
  });

  const minRows = window.outerWidth >= 1200 ? 16 : 8;

  return (
    <div>
      <div className={classes.pageHeader}>
        <Typography variant="h1">Messaging</Typography>
      </div>
      <Container
        maxWidth={'xl'}
        className={classes.pageBody}
        id="main-content"
        tabIndex="-1"
      >
        <Box
          className={classes.stickyBox}
        >
          <Card>
            <CardContent className={classes.content}>
              <Typography variant="h3" component={'h2'}>
                <strong>
                  Messaging {recordCount} developers
                </strong>
              </Typography>
              <Divider />
              <ChplTextField
                id="subject"
                name="subject"
                label="Subject"
                required
                value={formik.values.subject}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.subject && !!formik.errors.subject}
                helperText={formik.touched.subject && formik.errors.subject}
              />
              <ChplTextField
                id="body"
                name="body"
                label="Message Body"
                margin="none"
                required
                multiline
                value={formik.values.body}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.body && !!formik.errors.body}
                helperText={formik.touched.body && formik.errors.body}
                minRows={minRows}
              />
            </CardContent>
          </Card>
          <Card bgcolor={'white'}>
            <Box
              padding={'16px'}
              display={'flex'}
              flexDirection={'row'}
              justifyContent={'space-between'}
            >
              <Box display={'flex'} flexDirection={'row'} gridGap={'16px'}>
                <Button
                  onClick={dispatch}
                  variant="outlined"
                  className={classes.cancelButton}
                  endIcon={<CloseOutlinedIcon />}
                >
                  Cancel
                </Button>
                <Button
                  onClick={sendMessagePreview}
                  disabled={!formik.isValid}
                  variant="outlined"
                  color="primary"
                  endIcon={<SendOutlined />}
                >
                  Send Message Preview
                </Button>
              </Box>
              <Button
                onClick={formik.handleSubmit}
                disabled={!formik.isValid}
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
              >
                Send Message
              </Button>
            </Box>
          </Card>
        </Box>
        <Box className={classes.rightColumn}>
          <Card>
            <CardContent className={classes.content}>
              <Typography sx={{ mt: 0.5 }} variant="h4" component={'h3'}>
                <strong>Markdown reference</strong>
              </Typography>
              <Divider />
              <Card>
                <Table size="small">
                  <TableHead sx={{ py: 4 }}>
                    <TableRow className={classes.rowHeader}>
                      <TableCell>Type ...</TableCell>
                      <TableCell>... to get</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <pre className={classes.code}>_Italic_</pre>
                      </TableCell>
                      <TableCell size="small">
                        <i>Italic</i>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <pre className={classes.code}>**Bold**</pre>
                      </TableCell>
                      <TableCell size="small">
                        <b>Bold</b>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <pre className={classes.code}># Heading 1</pre>
                      </TableCell>
                      <TableCell size="small">
                        <h1>Heading 1</h1>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <pre className={classes.code}>## Heading 2</pre>
                      </TableCell>
                      <TableCell size="small">
                        <h2>Heading 2</h2>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <pre className={classes.code}>
                          [Link](http://www.example.com)
                        </pre>
                      </TableCell>
                      <TableCell size="small">
                        <a href="http://www.example.com">Link</a>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <pre className={classes.code}>
                          * List
                          <br />* List
                          <br /> * Put four spaces before the "*" to make a
                          sub-bullet
                          <br />* List
                        </pre>
                      </TableCell>
                      <TableCell size="small">
                        <ul>
                          <li>List</li>
                          <li>List</li>
                          <ul>
                            <li>
                              Put four spaces before the "*" to make a
                              sub-bullet
                            </li>
                          </ul>
                          <li>List</li>
                        </ul>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <pre className={classes.code}>
                          1. One
                          <br />
                          2. Two
                          <br />
                          3. Three
                        </pre>
                      </TableCell>
                      <TableCell size="small">
                        <ol>
                          <li>One</li>
                          <li>Two</li>
                          <li>Three</li>
                        </ol>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <pre className={classes.code}>
                          A paragraph of text
                          <br />
                          <br />
                          Followed by a blank line
                          <br />
                          <br />
                          To get multiple paragraphs
                        </pre>
                      </TableCell>
                      <TableCell size="small">
                        A paragraph of text
                        <br />
                        <br />
                        Followed by a blank line
                        <br />
                        <br />
                        To get multiple paragraphs
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell width={'45%'}>
                        <pre className={classes.code}>
                          From: (with two spaces at the end of the line) <br />
                          To put a newline in a paragraph
                        </pre>
                      </TableCell>
                      <TableCell size="small">
                        From:
                        <br />
                        To put a newline in a paragraph
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Card>
              <Typography>
                For more information about formatting, please see:{' '}
                <ChplLink href="https://commonmark.org/help/" />
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </div>
  );
}

export default ChplMessaging;

ChplMessaging.propTypes = {
  dispatch: func.isRequired,
};