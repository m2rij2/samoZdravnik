const conn = require('../dbConn');

const zdravnikDB = {

    getAll: () => {
        return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Zdravnik', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
        });
    },

    getById: (id) => {
        return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Zdravnik WHERE zdravnik_id = ?', [id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
        });
    },

    create: (zdravnikData) => {
        const { ime, priimek, naziv, specializacija, ambulanta_id, opis} = zdravnikData;
        
        return new Promise((resolve, reject) => {
            conn.query(
                //autoincrament sem pozabila nastavit in je to moja lena resitev
                'SELECT MAX(zdravnik_id) AS max_id FROM Zdravnik',
                (err, res) => {
                    if (err) return reject(err);

                    const newId = res[0].max_id + 1;

                    conn.query(
                    'INSERT INTO Zdravnik (zdravnik_id, ime, priimek, naziv, specializacija, ambulanta_id, opis) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [newId, ime, priimek, naziv, specializacija, ambulanta_id, opis],
                    (err2, res2) => {
                        if (err2) return reject(err2);
                        return resolve(res2);
                    }
                    );
                }
            );
        });
    },

    // zdravnik_id bo username
    verification: (username) => {
        return new Promise((resolve, reject) => {
            conn.query(
                'SELECT * FROM Zdravnik WHERE zdravnik_id = ?', 
                [username], // wrap in array to avoid SQL injection risk
                (err, results) => {
                    if (err) return reject(err);
                    resolve(results[0]); // return only one user (if exists)
                }
            );
        });
    },

    update: (id, zdravnikData) => {
        const { ime, priimek, naziv, specializacija, ambulanta_id, opis } = zdravnikData;

        return new Promise((resolve, reject) => {
            conn.query(
            `UPDATE Ambulanta 
            SET ime = ?, priimek = ?, naziv = ?, specializacija = ?, ambulanta_id = ?, opis = ?
            WHERE zdravnik_id = ?`,
            [ime, priimek, naziv, specializacija, ambulanta_id, opis, id],
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
            'DELETE FROM Zdravnik WHERE zdravnik_id = ?',
            [id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
            );
        });
    },

};

module.exports = zdravnikDB;