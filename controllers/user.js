// const connection = require('../config/conDb')
// const bcrypt = require('bcrypt');

// module.exports = {
//     login: (req, res) => {
//         const username = req.body.username
//         const password = req.body.username

//         const qstring = `SELECT * FROM user WHERE username = '${username}'`;
//         console.log(qstring);
//         connection.query(qstring, (err, data) => {
//             console.log(data);
//             if (err) {
//                 console.log("error: ", err);
//                 res.status(500).send({
//                     message: err.message || "Terjadi kesalahan saat get data"
//                 });
//             }
//             else if (data.length > 0 &&
//                 bcrypt.compareSync(password, data[0].password))
//             {
//                 req.session.isAuthenticated = true;
//                 res.send("Login Sukes")
//             }
//             else {
//                 res.send("Anda belum terdaftar")
//             }
//         });
//     },
//     logout: (req, res) => {
//         //menghapus session pengguna
//         req.session.destroy((err) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 res.send('Berhasi Logout');
//             }
//         });
//     },
//     register: (req, res) => {
//         const {username, password} = req.body;
//         const hashedPassword = bcrypt.hashSync(password, 10);

//         const query = 'INSERT INTO user (username, password) VALUES (?, ?)';
//         connection.query(query, [username, hashedPassword], (err) => {
//             if (err) {
//                 console.log("error: ", err);
//                 res.status(500).send({
//                     message: err.message || "Register gagal"
//                 });
//             } else 
//                 res.send({username, hashedPassword});
//         });
//     },
//     ubahPassword: () => {
//     },
//     //middleware untuk autentikasi
//     authenticate : (req, res, next) => {
//         //if (req.session && req.session.isAuthenticated){
//         if (req?.session.isAuthenticated) {
//             //pengguna sudah terautentikasi
//             next ();
//         } else {
//             //pengguna belum terautentikasi
//             res.status(401).send('Tidak Terautentikasi');
//         }
//     }
// }