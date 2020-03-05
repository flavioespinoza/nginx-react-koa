import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Alert, AlertTitle } from '@material-ui/lab';

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
    height: 200,
  },
}));

const ContainerFluid = ({ ...props }) => {
  const classes = useStyles();
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
            <h3 className={'mb0 mt0 tal'}>Fetch data from API</h3>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <h5 className={'mt0'}>Test 1</h5>
  
            </Paper>
            <Paper className={classes.paper}>
              <h5 className="mt0">Test 2</h5>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <h5 className="mt0">Test 3</h5>
            </Paper>
            <Paper className={classes.paper}>
              <h5 className="mt0">Test 4</h5>
            </Paper>
          </Grid>
        </Grid>
      
      </div>
    </Container>
  );
};

export default ContainerFluid;
