import express from 'express';

import { getTrack, getTracks } from '#db/queries/trackQueries';

const router = express.Router();

router.get('/', async (req, res) => {
  const tracks = await getTracks();

  return res.send(tracks);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!/^-?\d+(\.\d+)?$/.test(id)) return res.status(400).send('invalid id');

  const track = await getTrack(id);

  if (!track) return res.status(404).send('track not found');

  return res.send(track);
});

export default router;
