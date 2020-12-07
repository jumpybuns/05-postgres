const pool = require('../utils/pool.js');

module.exports = class Beer {
    id;
    flavor;
    mouth_feel;
    brewery;

    constructor(row) {
        this.id = row.id;
        this.flavor = row.flavor;
        this.mouth_feel = row.mouth_feel;
        this.brewery = row.brewery;
    }


    static async insert({ flavor, mouth_feel, brewery }) {
        const { rows } = await pool.query(
            'INSERT INTO beer (flavor, mouth_feel, brewery) VALUES ($1, $2, $3) RETURNING *',
            [flavor, mouth_feel, brewery]
        );

        return new Beer(rows[0]);
    }

    static async find() {
        const { rows } = await pool.query('SELECT * FROM beer');

        return rows.map(row => new Beer(row));
    }

    static async findById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM beer WHERE id=$1',
            [id]
        );

        if (!rows[0]) throw new Error(`No beer with that id ${id}`);
        return new Beer(rows[0]);
    }

    static async update(id, { flavor, mouth_feel, brewery }) {
        const { rows } = await pool.query(
            `UPDATE beer
        SET flavor = $1,
            mouth_feel = $2,
            brewery = $3
        WHERE id = $4
        RETURNING *
        `,
            [flavor, mouth_feel, brewery, id]
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
