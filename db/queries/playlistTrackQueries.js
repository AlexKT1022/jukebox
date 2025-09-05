import db from '#db/client';

export const getTracksByPlaylist = async (playlistId) => {
  const sql = `
    SELECT
      tracks.*
    FROM
      tracks
      JOIN playlist_tracks ON playlist_tracks.track_id = tracks.id
      JOIN playlists ON playlists.id = playlist_tracks.playlist_id
    WHERE
      playlists.id = $1;
  `;
  const { rows } = await db.query(sql, [playlistId]);

  return rows;
};

export const createPlaylistTrackAssociation = async ({
  playlistId,
  trackId,
}) => {
  const sql = `
    INSERT INTO
      playlist_tracks (playlist_id, track_id)
    VALUES
      ($1, $2)
    RETURNING
      *
  `;
  const { rows } = await db.query(sql, [playlistId, trackId]);

  return rows[0];
};
