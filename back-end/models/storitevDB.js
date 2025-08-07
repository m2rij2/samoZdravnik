const conn = require('../db/dbConn');

const storitevDB = {

    // READ
    getAll: () => {
        return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Storitev', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
        });
    },

    getById: (id) => {
        return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Storitev WHERE storitev_id= ?', [id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
        });
    },

    //za ambulanto, katere vse ima
    getByAmbulanta: (ambulanta_id) => {
        return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Storitev WHERE ambulanta_id= ?', [ambulanta_id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
        });
    },


    // CREATE (by ambulanta)
    create: (storitevData) => {
        const { ambulanta_id, naziv, opis, cena, trajanje} = storitevData;
        
        return new Promise((resolve, reject) => {
            conn.query(
                //autoincrament sem pozabila nastavit in je to moja lena resitev
                'SELECT MAX(storitev_id) AS max_id FROM Storitev',
                (err, res) => {
                    if (err) return reject(err);

                    const newId = res[0].max_id + 1;

                    conn.query(
                    'INSERT INTO Storitev (storitev_id, ambulanta_id, naziv, opis, cena, trajanje) VALUES (?, ?, ?, ?, ?, ?)',
                    [newId, ambulanta_id, naziv, opis, cena, trajanje],
                    (err2, res2) => {
                        if (err2) return reject(err2);
                        return resolve(res2);
                    }
                    );
                }
            );
        });
    },

    // UPDATE
    update: (id, storitevData) => {
        const { ambulanta_id, naziv, opis, cena, trajanje} = storitevData;

        return new Promise((resolve, reject) => {
            conn.query(
            `UPDATE Storitev
            SET ambulanta_id = ?, naziv = ?, opis = ?, cena = ?, trajanje = ?
            WHERE storitev_id = ?`,
            [ambulanta_id, naziv, opis, cena, trajanje, id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
            );
        });
    },

    // DELETE (by Ambulanta, Admin)
    delete: (id) => {
        return new Promise((resolve, reject) => {
            conn.query(
            'DELETE FROM Storitev WHERE storitev_id = ?',
            [id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
            );
        });
    },

};

module.exports = storitevDB;