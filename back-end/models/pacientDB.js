const conn = require('../db/dbConn');

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
        const { ime, priimek, email, password, telefon} = pacientData;
        
        return new Promise((resolve, reject) => {
            conn.query(
                //autoincrament sem pozabila nastavit in je to moja lena resitev
                'SELECT MAX(pacient_id) AS max_id FROM Pacient',
                (err, res) => {
                    if (err) return reject(err);

                    const newId = res[0].max_id + 1;

                    conn.query(
                    'INSERT INTO Pacient (pacient_id, ime, priimek, email, password, telefon) VALUES (?, ?, ?, ?, ?, ?)',
                    [newId, ime, priimek, email, password, telefon],
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
                username, // wrap in array to avoid SQL injection risk
                (err,res, fields)=>{
                    if(err){return reject(err)}
                    return resolve(res)
                }
            )
        });
    },

    update: (id, pacientData) => {
        const { ime, priimek, email, password, telefon } = pacientData;

        return new Promise((resolve, reject) => {
            conn.query(
            `UPDATE Pacient 
            SET ime = ?, priimek = ?, email = ?, password = ?, telefon = ?
            WHERE pacient_id = ?`,
            [ime, priimek, email, password, telefon, id],
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
