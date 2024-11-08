'use strict';

var connection = require('../koneksi');

// Menampilkan semua biodata
exports.showAllBiodata = function (req, res) {
    connection.query('SELECT * FROM biodata_diri', function (error, rows) {
        if (error) {
            console.error('Error fetching data:', error);
            return res.status(500).send({ error: 'Error fetching data' });
        }
        res.json(rows);  // Menampilkan semua biodata dalam format JSON
    });
};

// Menampilkan biodata berdasarkan ID
exports.showBiodataById = function (req, res) {
    let userId = req.params.id;
    connection.query('SELECT * FROM biodata_diri WHERE id = ?', [userId], function (error, row) {
        if (error) {
            console.error('Error fetching data by ID:', error);
            return res.status(500).send({ error: 'Error fetching data by ID' });
        }
        if (row.length > 0) {
            res.json(row[0]);  // Menampilkan biodata berdasarkan ID
        } else {
            res.status(404).send({ message: 'Biodata not found' });
        }
    });
};

// Menambahkan biodata baru
exports.addNewBiodata = function (req, res) {
    console.log('Data received for new biodata:', req.body);  // Log untuk debugging

    if (!req.body.nama || !req.body.email || !req.body.nim || !req.body.password) {
        return res.status(400).send({ error: 'Semua field harus diisi' });
    }

    let newBiodata = {
        nama: req.body.nama,
        email: req.body.email,
        nim: req.body.nim,
        password: req.body.password
    };

    connection.query('INSERT INTO biodata_diri SET ?', newBiodata, function (error, result) {
        if (error) {
            console.error('Error adding data:', error);
            return res.status(500).send({ error: 'Error adding data' });
        }
        res.status(201).send({ message: 'Biodata added successfully', id: result.insertId });
    });
};

// Mengubah biodata berdasarkan ID
exports.updateBiodataById = function (req, res) {
    let userId = req.params.id;
    console.log('Updating biodata with ID:', userId, 'Data:', req.body);  // Debug log

    let updatedBiodata = {
        nama: req.body.nama,
        email: req.body.email,
        nim: req.body.nim,
        password: req.body.password
    };

    connection.query('UPDATE biodata_diri SET ? WHERE id = ?', [updatedBiodata, userId], function (error, result) {
        if (error) {
            console.error('Error updating data:', error);
            return res.status(500).send({ error: 'Error updating data' });
        }
        if (result.affectedRows > 0) {
            res.send({ message: 'Biodata updated successfully' });
        } else {
            res.status(404).send({ message: 'Biodata not found' });
        }
    });
};

// Menghapus biodata berdasarkan ID
exports.deleteuser = function (req, res) {
    let userId = req.params.id;  // Ambil id dari parameter URL
    console.log('Deleting biodata with ID:', userId);  // Debug log

    connection.query('DELETE FROM biodata_diri WHERE id = ?', [userId], function (error, result) {
        if (error) {
            console.error('Error deleting data:', error);
            return res.status(500).send({ error: 'Error deleting data' });
        }
        if (result.affectedRows > 0) {
            res.send({ message: 'Biodata deleted successfully' });
        } else {
            res.status(404).send({ message: 'Biodata not found' });
        }
    });
};
