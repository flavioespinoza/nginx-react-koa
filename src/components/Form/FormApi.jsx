import * as React from 'react';
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

const FormApi = ({ ...props }) => {
  const { ...prop } = props;
  const classes = useStyles();
  const [jsonProps, setJsonProps] = React.useState(null);
  const [name, setName] = React.useState('');
  const [greeting, setGreeting] = React.useState('');

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch(`/api/greeting?name=${encodeURIComponent(name)}`)
      .then((response) => response.json())
      .then((obj) => {
        console.log(`line ${43}: handleSubmit -> obj`, obj);
        setGreeting(obj.greeting);
      });
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      <div className={classes.root}>
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6}>
            <h2>Get Data Test</h2>
            <section>
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">Enter your name: </label>
                <input id="name" type="text" value={name} onChange={handleChange} />
                <button type="submit">Submit</button>
              </form>
              <p>Greeting: {greeting}</p>
            </section>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default FormApi;
