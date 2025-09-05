import db from '#db/client';

export const getPlaylists = async () => {
  const sql = `
    SELECT
      *
    FROM
      playlists
  `;
  const { rows } = await db.query(sql);

  return rows;
};

export const getPlaylist = async (id) => {
  const sql = `
    SELECT
      *
    FROM
      playlists
    WHERE
      id = $1
  `;
  const { rows } = await db.query(sql, [id]);

  return rows[0];
};

export const getRandomPlaylist = async () => {
  const sql = `
    SELECT
      *
    FROM
      playlists
    ORDER BY
      RANDOM()
    LIMIT
      1
  `;
  const { rows } = await db.query(sql);

  return rows[0];
};

export const createPlaylist = async ({ name, description }) => {
  const sql = `
    INSERT INTO
      playlists (name, description)
    VALUES
      ($1, $2)
    RETURNING
      *
  `;
  const { rows } = await db.query(sql, [name, description]);

  return rows[0];
};
