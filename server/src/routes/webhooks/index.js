import express from 'express';
import nodemailer from 'nodemailer';
import axios from 'axios';
import moment from 'moment';
// import Boom from 'boom';

import Hasura from '../../clients/hasura';
import { GET_MEETING_PARTICIPANTS } from './queries';

const router = express.Router();

const smtpConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
};

const transporter = nodemailer.createTransport(smtpConfig);

router.post('/meeting_created', async (req, res, next) => {
  const meeting = req.body.event.data.new;
  const { meetings_by_pk } = await Hasura.request(GET_MEETING_PARTICIPANTS, {
    id: meeting.id,
  });
  const title = meeting.title;
  const { name, surname } = meetings_by_pk.user;
  const participants = meetings_by_pk.participants.map((user) => user.email).toString();

  const schedule_event = {
    type: 'create_scheduled_event',
    args: {
      webhook: '{{ACTION_BASE_ENDPOINT}}/webhooks/meeting_reminder',
      schedule_at: moment(meetings_by_pk.meeting_date).subtract(2, 'minutes'),
      payload: {
        meeting_id: meeting.id,
      },
    },
  };

  const add_event = await ('http://localhost:8080/v1/query',
  {
    method: 'post',
    data: JSON.stringify(schedule_event),
    headers: {
      'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
    },
  });

  const event_data = add_event.data;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: participants,
    subject: `${name} ${surname} invited you to a meeting.`,
    text: `${name} ${surname} invited you to a meeting: ${title}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new Error(error);
    }
    return res.json({ info });
  });
});

router.post('/meeting_reminder', async (req, res, next) => {});

export default router;
