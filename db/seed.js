import { faker } from '@faker-js/faker';

import db from '#db/client';
import {
  createPlaylist,
  getRandomPlaylist,
} from './queries/playlistQueries.js';
import { createPlaylistTrackAssociation } from './queries/playlistTrackQueries.js';
import { createTrack, getRandomTrack } from './queries/trackQueries.js';

const generatePlaylists = async (numPlaylists) => {
  for (let i = 0; i < numPlaylists; i++) {
    const playlistName = faker.commerce.productName();
    const playlistDescription = faker.commerce.productDescription();
    const playlistObj = {
      name: playlistName,
      description: playlistDescription,
    };

    await createPlaylist(playlistObj);
  }
};

const generateTracks = async (numTracks) => {
  for (let i = 0; i < numTracks; i++) {
    const trackName = faker.word.words({ min: 1, max: 5 });
    const trackDuration = faker.number.int({ min: 60000, max: 600000 });
    const trackObj = {
      name: trackName,
      durationMs: trackDuration,
    };

    await createTrack(trackObj);
  }
};

const generatePlaylistTrackAssociations = async (numAssociations) => {
  let rows = 0;

  while (rows < numAssociations) {
    try {
      const playlist = await getRandomPlaylist();
      const track = await getRandomTrack();
      const playlistTrackAssociationObj = {
        playlistId: playlist.id,
        trackId: track.id,
      };

      await createPlaylistTrackAssociation(playlistTrackAssociationObj);

      rows++;
    } catch (err) {
      continue;
    }
  }
};

const seed = async () => {
  const numPlaylists = 10;
  const numTracks = 20;
  const numAssociations = 15;

  await generatePlaylists(numPlaylists);
  await generateTracks(numTracks);
  await generatePlaylistTrackAssociations(numAssociations);
};

await db.connect();
await seed();
await db.end();

console.log('🌱 Database seeded.');
