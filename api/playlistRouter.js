import express from 'express';

import {
  createPlaylist,
  getPlaylist,
  getPlaylists,
} from '#db/queries/playlistQueries';
import {
  createPlaylistTrackAssociation,
  getTracksByPlaylist,
} from '#db/queries/playlistTrackQueries';
import { createTrack } from '#db/queries/trackQueries';

const router = express.Router();

router.get('/', async (req, res) => {
  const tracks = await getPlaylists();

  return res.send(tracks);
});

router.post('/', async (req, res) => {
  if (!req.body) return res.status(400).send('no body provided');
  if (!req.body.name || !req.body.description)
    return res.status(400).send('required fields not provided');

  const playlistObj = {
    name: req.body.name,
    description: req.body.description,
  };
  const newPlaylist = await createPlaylist(playlistObj);

  return res.status(201).send(newPlaylist);
});

router.param('id', async (req, res, next, id) => {
  if (!/^-?\d+(\.\d+)?$/.test(id)) return res.status(400).send('invalid id');

  const playlist = await getPlaylist(id);

  if (!playlist) return res.status(404).send('playlist not found');

  req.playlist = playlist;

  next();
});

router.get('/:id', async (req, res) => {
  return res.send(req.playlist);
});

router.get('/:id/tracks', async (req, res) => {
  const tracks = await getTracksByPlaylist(req.playlist.id);

  return res.send(tracks);
});

router.post('/:id/tracks', async (req, res) => {
  if (!req.body) return res.status(400).send('no body provided');
  if (!req.body.name || !req.body.durationMs)
    return res.status(400).send('required fields not provided');

  const trackObj = {
    name: req.body.name,
    durationMs: req.body.durationMs,
  };
  const newTrack = await createTrack(trackObj);
  const playlistTrackObj = {
    playlistId: req.playlist.id,
    trackId: newTrack.id,
  };
  const newPlaylistTrack =
    await createPlaylistTrackAssociation(playlistTrackObj);

  return res.status(201).send(newPlaylistTrack);
});

export default router;
