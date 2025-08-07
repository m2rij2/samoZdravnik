const conn = require('../db/dbConn');

const terminDB = {

    // READ
    getAll: () => {
        return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Termin', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
        });
    },

    getById: (id) => {
        return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Termin WHERE termin_id = ?', [id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
        });
    },


    // CREATE
    create: (terminData) => {
        const { pacient_id, storitev_id, zdravnik_id, datum, ura, opombe} = terminData;
        
        return new Promise((resolve, reject) => {
            conn.query(
                //autoincrament sem pozabila nastavit in je to moja lena resitev
                'SELECT MAX(termin_id) AS max_id FROM Termin',
                (err, res) => {
                    if (err) return reject(err);

                    const newId = res[0].max_id + 1;

                    const status = "zahtevano";

                    conn.query(
                    'INSERT INTO Termin (termin_id, pacient_id, storitev_id, zdravnik_id, datum, ura, status, opombe) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                    [newId, pacient_id, storitev_id, zdravnik_id, datum, ura, status, opombe],
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
    update: (id, terminData) => {
        const { pacient_id, storitev_id, zdravnik_id, datum, ura, status, opombe} = pacientData;

        return new Promise((resolve, reject) => {
            conn.query(
            `UPDATE Termin 
            SET pacient_id = ?, storitev_id = ?, zdravnik_id = ?, datum = ?, ura = ?, status = ?, opombe = ?
            WHERE termin_id = ?`,
            [pacient_id, storitev_id, zdravnik_id, datum, ura, status, opombe, id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
            );
        });
    },

    // DELETE (preklici) -> samo pacient
    delete: (id) => {
        return new Promise((resolve, reject) => {
            conn.query(
            'DELETE FROM Termin WHERE termin_id = ?',
            [id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
            );
        });
    },

};

module.exports = terminDB;