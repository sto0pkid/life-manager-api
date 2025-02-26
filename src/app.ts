import express from 'express';
import session from 'express-session'
import cors from 'cors'
import { CipherKey } from 'crypto'

import { RedisStore } from 'connect-redis'
import { createClient } from 'redis';

import Keycloak from 'keycloak-connect'

import 'dotenv/config'



import billsRoutes from './stacks/bills/routes.js';
import eventRoutes from './stacks/events/routes.js';
import fitnessRoutes from './stacks/fitness/routes.js';
import hobbiesRoutes from './stacks/hobbies/routes.js';
import jobLeadsRoutes from './stacks/jobLeads/routes.js';
import jobsRoutes from './stacks/jobs/routes.js';
import planningRoutes from './stacks/planning/routes.js';
import remindersRoutes from './stacks/reminders/routes.js';
import revenueRoutes from './stacks/revenue/routes.js';
import { NONAME } from 'dns';

/*
The URL format is: `redis://[username:password@]host:port`
If you are using a Redis server without authentication, you can simply use the host and port.
Example: `redis://localhost:6379`
If you are using a Redis server with authentication, make sure to include the username and password in the URL.
The URL format is: `redis://[username:password@]host:port`
*/
const redisClient = createClient({ url: process.env.REDIS_URL });
redisClient.connect().catch(console.error);
const sessionStore = new RedisStore({ client: redisClient })

const keycloakConfig = {
  realm: process.env.KEYCLOAK_REALM ?? 'master',
  'ssl-required': 'none',
  'bearer-only': true,
  'resource': process.env.KEYCLOAK_CLIENT_ID ?? 'api-client',
  'auth-server-url': process.env.KEYCLOAK_URL ?? 'http://localhost:8080/',
  'confidential-port': 0,
  /*
  credentials: {
    secret: process.env.KEYCLOAK_SECRET
  }
  */
}
const keycloak = new Keycloak(
  {
    store: sessionStore
  },
  keycloakConfig
);


const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.LIFE_MANAGER_FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET as CipherKey,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 } // 1 hour
  })
);

app.use(keycloak.middleware())
app.use(keycloak.protect('access-api'))


app.use('/api/bills', billsRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/fitness', fitnessRoutes);
app.use('/api/hobbies', hobbiesRoutes);
app.use('/api/jobLeads', jobLeadsRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/planning', planningRoutes);
app.use('/api/reminders', remindersRoutes);
app.use('/api/revenue', revenueRoutes);

export default app;