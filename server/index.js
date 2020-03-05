require('dotenv').config();
require('./_helpers/_globals');

const chalk = require('chalk');
const config = require('config');
const Koa = require('koa');
const logger = require('koa-pino-logger');
const cors = require('kcors');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');
const session = require('koa-session');

// @note : Used for koa-sessions which uses koa-passport
const app_secret_1 = config.get('app_secret_1');
const app_secret_2 = config.get('app_secret_2');

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  done(null, user)
})

const PORT_SERVER = process.env.PORT_SERVER;

const { router } = require('./routes/routes');

const app = new Koa();

app.proxy = true;
app.keys = [app_secret_1, app_secret_2];

app.use(session({}, app));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(logger());
app.use(bodyParser());
app.use(router());

app.listen(PORT_SERVER, () => console.log(chalk.blue(`Server listening on port ${PORT_SERVER}`)));
