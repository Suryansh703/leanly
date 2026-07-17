import 'dotenv/config';
import cors from 'cors'; import express from 'express'; import generateRoutes from './routes/generateRoutes.js';
const app = express(); const port = process.env.PORT || 5001;
app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(',') || true })); app.use(express.json({ limit: '100kb' }));
app.get('/health', (_req, res) => res.json({ status: 'ok' })); app.use('/api', generateRoutes);
app.use((error, _req, res, _next) => { console.error(error); res.status(error.status || 500).json({ message: error.message || 'Unable to contact AI.' }); });
app.listen(port, () => console.log(`Study Assistant API listening on ${port}`));
