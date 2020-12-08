const pool = require('../utils/pool.js');

module.exports = class Absinthe {
    id;
    name;
    strength;
    country;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.strength = row.strength;
      this.country = row.country;
    }

    static async insert({ name, strength, country }) {
      const { rows } = await pool.query(
        'INSERT INTO absinthe (name, strength, country) VALUES ($1, $2, $3) RETURNING *',
        [name, strength, country]
      );
      return new Absinthe(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query('SELECT * FROM absinthe');

      return rows.map(row => new Absinthe(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM absinthe WHERE id=$1',
        [id]
      );
  
      if(!rows[0]) throw new Error(`No absinthe with that id ${id}`);
      return new Absinthe(rows[0]);
    }
  
    static async update(id, { name, strength, country }) {
      const { rows } = await pool.query(
        `UPDATE absinthe
          SET name = $1,
              strength = $2,
              country = $3
          WHERE id = $4
          RETURNING *
          `,
        [name, strength, country, id]
      );
  
      return new Absinthe(rows[0]);
    }
  
    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM absinthe WHERE id=$1 RETURNING *',
        [id]
      );
  
      return new Absinthe(rows[0]);
    }
};
