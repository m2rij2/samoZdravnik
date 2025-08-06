const conn = require('../dbConn');

const sporociloDB = {

    // READ
    getAll: () => {
        return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Sporocilo', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
        });
    },

    getById: (id) => {
        return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Sporocilo WHERE sporocilo_id= ?', [id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
        });
    },

    //za zdravnika da se vidi
    getByZdravnik: (zdravnik_id) => {
        return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Sporocilo WHERE zdravnik_id= ?', [zdravnik_id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
        });
    },

    //pri pacientu za zgodovino sporocil
    getByPacient: (pacient_id) => {
        return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Sporocilo WHERE pacient_id= ?', [pacient_id], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
        });
    },

    // CREATE (by pacient, zdravnik)
    create: (sporociloData) => {
        const { pacient_id, zdravnik_id, vsebina, cas} = sporociloData;
        
        return new Promise((resolve, reject) => {
            conn.query(
                //autoincrament sem pozabila nastavit in je to moja lena resitev
                'SELECT MAX(sporocilo_id) AS max_id FROM Sporocilo',
                (err, res) => {
                    if (err) return reject(err);

                    const newId = res[0].max_id + 1;

                    const cas_obj = new Date(Date.now());
                    const sqlDateTime = cas_obj.toISOString().slice(0, 19).replace('T', ' ');
                    
                    conn.query(
                    'INSERT INTO Sporocilo (sporocilo_id, pacient_id, zdravnik_id, vsebina, cas) VALUES (?, ?, ?, ?, ?)',
                    [newId, pacient_id, zdravnik_id, vsebina, sqlDateTime],
                    (err2, res2) => {
                        if (err2) return reject(err2);
                        return resolve(res2);
                    }
                    );
                }
            );
        });
    },

    // DELETE (by Pacient, Admin)
    delete: (id) => {
        return new Promise((resolve, reject) => {
            conn.query(
            'DELETE FROM Sporocilo WHERE sporocilo_id = ?',
            [id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
            );
        });
    },

};

module.exports = sporociloDB;