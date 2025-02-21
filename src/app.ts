import express from 'express';
import billsRoutes from './stacks/bills/routes.js';
import eventRoutes from './stacks/events/routes.js';
import fitnessRoutes from './stacks/fitness/routes.js';
import hobbiesRoutes from './stacks/hobbies/routes.js';
import jobLeadsRoutes from './stacks/jobLeads/routes.js';
import jobsRoutes from './stacks/jobs/routes.js';
import planningRoutes from './stacks/planning/routes.js';
import remindersRoutes from './stacks/reminders/routes.js';
import revenueRoutes from './stacks/revenue/routes.js';
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.LIFE_MANAGER_FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));

app.use('/api/bills', billsRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/fitness', fitnessRoutes);
app.use('/api/hobbies', hobbiesRoutes);
app.use('/api/jobLeads', jobLeadsRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/planning', planningRoutes);
app.use('/api/reminders', remindersRoutes);
app.use('/api/revenue', revenueRoutes);
// ...use other routes...

export default app;