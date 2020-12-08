const pool = require('../utils/pool.js');

module.exports = class Wine {
    id;
    label;
    mouth_feel;
    winery;

    constructor(row) {
      this.id = row.id;
      this.label = row.label;
      this.mouth_feel = row.mouth_feel;
      this.winery = row.winery;
    }


    static async insert({ label, mouth_feel, winery }) {
      const { rows } = await pool.query(
        'INSERT INTO wine (label, mouth_feel, winery) VALUES ($1, $2, $3) RETURNING *',
        [label, mouth_feel, winery]
      );

      return new Wine(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query('SELECT * FROM wine');

      return rows.map(row => new Wine(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM wine WHERE id=$1',
        [id]
      );

      if(!rows[0]) throw new Error(`No Wine with that id ${id}`);
      return new Wine(rows[0]);
    }

    static async update(id, { label, mouth_feel, winery }) {
      const { rows } = await pool.query(
        `UPDATE wine
        SET label = $1,
            mouth_feel = $2,
            winery = $3
        WHERE id = $4
        RETURNING *
        `,
        [label, mouth_feel, winery, id]
      );

      return new Wine(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM wine WHERE id=$1 RETURNING *',
        [id]
      );

      return new Wine(rows[0]);
    }
};
