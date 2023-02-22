import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import 'colors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';

import allRoutes from './routes/index.js';
import errorHandler  from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* =============================
📦 App Settings
============================= */
const app = express();
const port = process.env.PORT || 5000;

/* =============================
📦 Middleware
============================= */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

/* =============================
📦 Routes
============================= */
app.use('/api', allRoutes);

/* =============================
📦 Production Configuration
============================= */
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'client', 'dist', 'index.html'),
    ),
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

/* =============================
📦 Error Handler Middleware
============================= */
app.use(errorHandler);

/* =============================
📦 Listen Port
============================= */
const dbConnect = async () => {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`📦 Mongoose Connected to: ${conn.connection.host.bold.green}`);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

app.listen(port, () => {
  dbConnect();
  console.log(`🚀 Listening on port: ${port.bold.green}`);
});
