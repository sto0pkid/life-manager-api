import express from 'express';
import billsRoutes from './stacks/bills/routes.js';
import eventRoutes from './stacks/events/routes.js'
// ...import other routes...

const app = express();

app.use(express.json());

app.use('/api/bills', billsRoutes);
app.use('/api/events', eventRoutes);
// ...use other routes...

export default app;