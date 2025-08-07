const conn = require('../db/dbConn');

const ambulantaDB = {
    getAll: () => {
        return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Ambulanta', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
        });
    },

    getById: (id) => {
        return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Ambulanta WHERE ambulanta_id= ?', [id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
        });
    },

    create: (ambulantaData) => {
        const { password, ime, naslov, telefon, email, opis } = ambulantaData;
        
        return new Promise((resolve, reject) => {
            conn.query(
                //autoincrament sem pozabila nastavit in je to moja lena resitev
                'SELECT MAX(ambulanta_id) AS max_id FROM Ambulanta',
                (err, res) => {
                    if (err) return reject(err);

                    const newId = res[0].max_id + 1;
                    
                    const dan_reg = new Date(Date.now());
                    const sqlDate = dan_reg.toISOString().split('T')[0];

                    conn.query(
                    'INSERT INTO Ambulanta (ambulanta_id, password, ime, naslov, telefon, email, opis, datum_reg) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                    [newId, password, ime, naslov, telefon, email, opis, sqlDate],
                    (err2, res2) => {
                        if (err2) return reject(err2);
                        return resolve(res2);
                    }
                    );
                }
            );
        });
    },

    // ambulanta_id bo username
    verification: (username) => {
        return new Promise((resolve, reject) => {
            conn.query(
                'SELECT * FROM Ambulanta WHERE ambulanta_id = ?', 
                [username], // wrap in array to avoid SQL injection risk
                (err, results) => {
                    if (err) return reject(err);
                    resolve(results[0]); // return only one user (if exists)
                }
            );
        });
    },

    update: (id, ambulantaData) => {
        const { ime, naslov, telefon, email, opis } = ambulantaData;

        return new Promise((resolve, reject) => {
            conn.query(
            `UPDATE Ambulanta 
            SET password = ?, ime = ?, naslov = ?, telefon = ?, email = ?, opis = ? 
            WHERE ambulanta_id = ?`,
            [password, ime, naslov, telefon, email, opis, id],
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
            'DELETE FROM Ambulanta WHERE ambulanta_id = ?',
            [id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
            );
        });
    },

};

module.exports = ambulantaDB;