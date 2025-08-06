const conn = require('../dbConn');

const cakalna_dobaDB = {

    // READ
    getAll: () => {
        return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Cakalna_doba', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
        });
    },

    getById: (id) => {
        return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Cakalna_doba WHERE cakalna_id= ?', [id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
        });
    },

    getByZdravnik: (zdravnik_id) => {
        return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Cakalna_doba WHERE zdravnik_id= ?', [zdravnik_id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
        });
    },

    getByStoritev: (storitev_id) => {
        return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Cakalna_doba WHERE storitev_id= ?', [storitev_id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
        });
    },

    // CREATE
    create: (cakalnaData) => {
        const { zdravnik_id, storitev_id, cakanje} = cakalnaData;
        
        return new Promise((resolve, reject) => {
            conn.query(
                //autoincrament sem pozabila nastavit in je to moja lena resitev
                'SELECT MAX(cakalna_id) AS max_id FROM Cakalna_doba',
                (err, res) => {
                    if (err) return reject(err);

                    const newId = res[0].max_id + 1;
                    
                    conn.query(
                    'INSERT INTO Cakalna_doba (cakalna_id, zdravnik_id, storitev_id, cakanje) VALUES (?, ?, ?, ?)',
                    [newId, zdravnik_id, storitev_id, cakanje],
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
    update: (id, cakalnaData) => {
        const { zdravnik_id, storitev_id, cakanje } = cakalnaData;

        return new Promise((resolve, reject) => {
            conn.query(
            `UPDATE Cakalna_doba
            SET zdravnik_id = ?, storitev_id = ?, cakanje = ?
            WHERE cakalna_id = ?`,
            [zdravnik_id, storitev_id, cakanje, id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
            );
        });
    },

    // DELETE
    delete: (id) => {
        return new Promise((resolve, reject) => {
            conn.query(
            'DELETE FROM Cakalna_doba WHERE cakalna_id = ?',
            [id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
            );
        });
    },

};

module.exports = cakalna_dobaDB;