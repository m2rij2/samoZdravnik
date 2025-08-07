const conn = require('../db/dbConn');

const mnenjeDB = {

    // READ
    getAll: () => {
        return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Mnenje', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
        });
    },

    getById: (id) => {
        return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Mnenje WHERE mnenje_id= ?', [id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
        });
    },

    //za ambulanto da se vidi
    getByAmbulanta: (ambulanta_id) => {
        return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Mnenje WHERE ambulanta_id= ?', [ambulanta_id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
        });
    },

    //pri pacientu za zgodovino mnenj
    getByPacient: (pacient_id) => {
        return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Mnenje WHERE pacient_id= ?', [pacient_id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
        });
    },

    // CREATE (by pacient)
    create: (mnenjeData) => {
        const { pacient_id, ambulanta_id, ocena, mnenje} = mnenjeData;
        
        return new Promise((resolve, reject) => {
            conn.query(
                //autoincrament sem pozabila nastavit in je to moja lena resitev
                'SELECT MAX(mnenje_id) AS max_id FROM Mnenje',
                (err, res) => {
                    if (err) return reject(err);

                    const newId = res[0].max_id + 1;

                    const dan_obj = new Date(Date.now());
                    const sqlDateTime = dan_obj.toISOString().slice(0, 19).replace('T', ' ');
                    
                    conn.query(
                    'INSERT INTO Mnenje (mnenje_id, pacient_id, ambulanta_id, ocena, mnenje, datum) VALUES (?, ?, ?, ?, ?, ?)',
                    [newId, pacient_id, ambulanta_id, ocena, mnenje, sqlDateTime],
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
    update: (id, mnenjeData) => {
        const { pacient_id, ambulanta_id, ocena, mnenje} = mnenjeData;

        return new Promise((resolve, reject) => {

            const dan_obj = new Date(Date.now());
            const sqlDateTime = dan_obj.toISOString().slice(0, 19).replace('T', ' ');

            conn.query(
            `UPDATE Mnenje
            SET pacient_id = ?, ambulanta_id = ?, ocena = ?, mnenje = ?, datum = ?
            WHERE mnenje_id = ?`,
            [pacient_id, ambulanta_id, ocena, mnenje, sqlDateTime, id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
            );
        });
    },

    // DELETE (by Pacient, Admin)
    delete: (id) => {
        return new Promise((resolve, reject) => {
            conn.query(
            'DELETE FROM Mnenje WHERE mnenje_id = ?',
            [id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
            );
        });
    },

};

module.exports = mnenjeDB;