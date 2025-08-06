const conn = require('../dbConn');

const pacientDB = {
    getAll: () => {
        return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Pacient', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
        });
    },

    getById: (id) => {
        return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Pacient WHERE pacient_id = ?', [id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
        });
    },

    create: (pacientData) => {
        const { ime, priimek, email, telefon, datum_roj, ZZZS } = pacientData;
        
        return new Promise((resolve, reject) => {
            conn.query(
                //autoincrament sem pozabila nastavit in je to moja lena resitev
                'SELECT MAX(pacient_id) AS max_id FROM Pacient',
                (err, res) => {
                    if (err) return reject(err);

                    const newId = res[0].max_id + 1;

                    conn.query(
                    'INSERT INTO Pacient (pacient_id, ime, priimek, email, telefon, datum_roj, ZZZS) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [newId, ime, priimek, email, telefon, datum_roj, ZZZS],
                    (err2, res2) => {
                        if (err2) return reject(err2);
                        return resolve(res2);
                    }
                    );
                }
            );
        });
    },

    // email bo username
    verification: (username) => {
        return new Promise((resolve, reject) => {
            conn.query(
                'SELECT * FROM Pacient WHERE email = ?', 
                [username], // wrap in array to avoid SQL injection risk
                (err, results) => {
                    if (err) return reject(err);
                    resolve(results[0]); // return only one user (if exists)
                }
            );
        });
    },

    update: (id, pacientData) => {
        const { ime, priimek, email, telefon, datum_rojstva, ZZZS } = pacientData;

        return new Promise((resolve, reject) => {
            conn.query(
            `UPDATE Pacient 
            SET ime = ?, priimek = ?, email = ?, telefon = ?, datum_rojstva = ?, ZZZS = ? 
            WHERE pacient_id = ?`,
            [ime, priimek, email, telefon, datum_rojstva, ZZZS, id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
            );
        });
    },


    delete: (id) => {
        return new Promise((resolve, reject) => {
            conn.query(
            'DELETE FROM Pacient WHERE pacient_id = ?',
            [id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
            );
        });
    },

};

module.exports = pacientDB;
