const express = require('express');
const app = express();
const session = require('express-session');
const mysql = require('mysql2')

const port = 5000;

//untuk menerima req.body
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'kuliah'
  });
  connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
  });

//konfigurasi session
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //     maxAge: 1*60*1000 //waktu
    // }
}));

//middleware untuk autentikasi
const authenticate = (req, res, next) => {
    //if (req.session && req.session.isAuthenticated) {
    if (req?.session.isAuthenticated) {
        //pengguna sudah terautentikasi
        next();
    }  else {
        //pengguna belum terautentikasi
        res.status(401).send('Tidak Terautentikasi');
    }
};

//register
app.post('/register', (req,res) => {
    const {username, password} = req.body;
    connection.query(`INSERT INTO user VALUES ('${username}',PASSWORD('${password}'))`,
        (error, results) => {
            if (error) throw error;
            res.json({message: 'Data berhasil ditambahkan', id: results.insertId});
        });
});

//route login
app.post('/login', (req,res) => {
    //cek kredensial pengguna (contoh sederhana)
    const {username, password} = req.body;

    connection.promise().query(`SELECT * FROM user WHERE username = '${username}', AND password = PASSWORD('${password}')`)

    .then((result) => {
        if (result.lenght > 0) {
            //pengguna terautentikasi
            req.session.isAuthenticated = true;
            res.json({message: 'Berhasil login'});
        } else {
            //pengguna tidak terautentikasi
            res.status(401).send('Username atau password salah');
        }
    })
});

//route logout
app.get('/logout', (req, res) => {
    //menghapus session pengguna
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.send('Logout');
        }
    });
});


//route tanpa autentikasi
app.get ('/open', (req,res) => {
    res.send('Anda masuk pada route tidak terproteksi')
});

//route get yang membutuhkan autentikasi
app.get('/protected', authenticate, (req,res) => {
    res.send('Anda masuk pada route terproteksi (GET)');
});

//server berjalan pada port 5000
app.listen(port, () => {
    console.log(`Server berjalan pada localhost:${port}`);
});