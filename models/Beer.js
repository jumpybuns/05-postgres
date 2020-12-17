const pool = require('../utils/pool.js');

module.exports = class Beer {
    id;
    name;
    mouthFeel;
    brewery;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.mouthFeel = row.mouth_feel;
      this.brewery = row.brewery;
    }


    static async insert({ name, mouthFeel, brewery }) {
      const { rows } = await pool.query(
        'INSERT INTO beer (name, mouth_feel, brewery) VALUES ($1, $2, $3) RETURNING *',
        [name, mouthFeel, brewery]
      );

      return new Beer(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query('SELECT * FROM beer');

      return rows.map(row => new Beer(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(`
        SELECT * FROM beer WHERE id=$1`,
      [id]
      );

      if(!rows[0]) throw new Error(`No beer with that id ${id}`);
      return new Beer(rows[0]);
    }

    static async update(id, { name, mouth_feel, brewery }) {
      const { rows } = await pool.query(
        `UPDATE beer
        SET name = $1,
            mouth_feel = $2,
            brewery = $3
        WHERE id = $4
        RETURNING *
        `,
        [name, mouth_feel, brewery, id]
      );

      return new Beer(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM beer WHERE id=$1 RETURNING *',
        [id]
      );

      return new Beer(rows[0]);
    }
};
