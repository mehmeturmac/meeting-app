import express from 'express';
import Boom from 'boom';
import dotenv from 'dotenv';

// Routes
import auth from './routes/auth';
import webhooks from './routes/webhooks';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/auth', auth);
app.use('/webhooks', webhooks);

app.use((req, res, next) => {
  return next(Boom.notFound('Not Found'));
});

app.use((err, req, res, next) => {
  if (err) {
    if (err.output) {
      return res.status(err.output.statusCode || 500).json(err.output.payload);
    }
  }
  return res.status(500).json(err);
});

const port = 4000;
app.listen(port, () => console.log(`Server is up and running on http://localhost:${port}/`));
