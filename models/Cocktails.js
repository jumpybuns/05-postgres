const pool = require('../utils/pool.js');

module.exports = class Cocktails {
    id;
    name;
    ingredients;
    flavor;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.ingredients = row.ingredients;
      this.flavor = row.flavor;
    }


    static async insert({ name, ingredients, flavor }) {
      const { rows } = await pool.query(
        'INSERT INTO cocktails (name, ingredients, flavor) VALUES ($1, $2, $3) RETURNING *',
        [name, ingredients, flavor]
      );

      return new Cocktails(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query('SELECT * FROM cocktails');

      return rows.map(row => new Cocktails(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM cocktails WHERE id=$1',
        [id]
      );

      if(!rows[0]) throw new Error(`No cocktails with that id ${id}`);
      return new Cocktails(rows[0]);
    }

    static async update(id, { name, ingredients, flavor }) {
      const { rows } = await pool.query(
        `UPDATE cocktails
        SET name = $1,
            ingredients = $2,
            flavor = $3
        WHERE id = $4
        RETURNING *
        `,
        [name, ingredients, flavor, id]
      );

      return new Cocktails(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM cocktails WHERE id=$1 RETURNING *',
        [id]
      );

      return new Cocktails(rows[0]);
    }
};
