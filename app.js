import express from 'express';
import morgan from 'morgan';

import playlistRouter from '#api/playlistRouter';
import trackRouter from '#api/trackRouter';

const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.use('/playlists', playlistRouter);
app.use('/tracks', trackRouter);

export default app;
