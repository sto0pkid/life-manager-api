import express from 'express';
import billsRoutes from './stacks/bills/routes.js';
// ...import other routes...

const app = express();

app.use(express.json());

app.use('/api/bills', billsRoutes);
// ...use other routes...

export default app;