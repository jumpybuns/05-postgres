const pool = require('../utils/pool.js');

module.exports = class Vodka {
    id;
    name;
    flavor;
    distillary;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.flavor = row.flavor;
      this.distillary = row.distillary;
    }


    static async insert({ name, flavor, distillary }) {
      const { rows } = await pool.query(
        'INSERT INTO vodka (name, flavor, distillary) VALUES ($1, $2, $3) RETURNING *',
        [name, flavor, distillary]
      );

      return new Vodka(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query('SELECT * FROM vodka');

      return rows.map(row => new Vodka(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM vodka WHERE id=$1',
        [id]
      );

      if(!rows[0]) throw new Error(`No vodka with that id ${id}`);
      return new Vodka(rows[0]);
    }

    static async update(id, { name, flavor, distillary }) {
      const { rows } = await pool.query(
        `UPDATE vodka
        SET name = $1,
            flavor = $2,
            distillary = $3
        WHERE id = $4
        RETURNING *
        `,
        [name, flavor, distillary, id]
      );

      return new Vodka(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM vodka WHERE id=$1 RETURNING *',
        [id]
      );

      return new Vodka(rows[0]);
    }
};
