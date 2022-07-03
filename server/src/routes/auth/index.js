import express from 'express';
import Boom from 'boom';

const router = express.Router();

router.post('/register', (req, res, next) => {
  const input = req.body.input.data;

  if (!input.email || !input.password) {
    return next(Boom.badRequest('Email and password are required'));
  }

  res.json({
    accessToken: 'accessToken',
  });
});

export default router;
