import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import UploadView from './Upload';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const UploadFile = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Upload File"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <UploadView />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default UploadFile;
