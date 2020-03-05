import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// Forms
import FormApiGet from 'components/Form/FormApiGet';
import FormApiPost from 'components/Form/FormApiPost';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  gridContainer: {
    backgroundColor: '#E5E5E5',
    marginTop: 0,
    marginBottom: 4,
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
}));

const ContainerFluid = ({ ...props }) => {
  const classes = useStyles();
  const apiRoute = {
    get: {
      test: '/api/get/test',
      set_cookie_test: '/api/get/set-cookie-test',
    },
  };

  return (
    <Container maxWidth="lg" className={'pl0 pr0'}>
      <div className={classes.root}>
        {/* Columns */}
        <Grid container spacing={3} className={classes.gridContainer + ' bg-white'}>
          <Grid item xs={12} sm={6}>
            <h2>Column A</h2>
          </Grid>
          <Grid item xs={12} sm={6}>
            <h2>Column B</h2>
          </Grid>
        </Grid>

        {/* Data test from API */}
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} className={'pb0'}>
            <h3 className={'mb0 mt0 tal'}>GET from API Route</h3>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <FormApiGet
                {...{
                  title: 'Get: Test: /api/get/test',
                  apiRoute: '/api/get/test',
                }}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <FormApiGet
                {...{
                  title: 'Get: Set Cookie Test: /api/get/set-cookie-test',
                  apiRoute: '/api/get/set-cookie-test',
                }}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default ContainerFluid;
