import db from '#db/client';

export const getTracks = async () => {
  const sql = `
    SELECT
      *
    FROM
      tracks
  `;
  const { rows } = await db.query(sql);

  return rows;
};

export const getTrack = async (id) => {
  const sql = `
    SELECT
      *
    FROM
      tracks
    WHERE
      id = $1
  `;
  const { rows } = await db.query(sql, [id]);

  return rows[0];
};

export const getRandomTrack = async () => {
  const sql = `
    SELECT
      *
    FROM
      tracks
    ORDER BY
      RANDOM()
    LIMIT
      1
  `;
  const { rows } = await db.query(sql);

  return rows[0];
};

export const createTrack = async ({ name, durationMs }) => {
  const sql = `
    INSERT INTO
      tracks (name, duration_ms)
    VALUES
      ($1, $2)
    RETURNING
      *
  `;
  const { rows } = await db.query(sql, [name, durationMs]);

  return rows[0];
};
