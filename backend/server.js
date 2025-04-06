const express = require('express');
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require('bcrypt');
const path = require('path');
const multer = require('multer');

const nodemailer = require('nodemailer');
const app = express();
app.use(cors());
app.use(express.json());

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.json());
app.use(express.static(buildPath));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "my_auction"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: ", err.stack);
        return;
    }
    console.log("Connected to database.");
});

app.post('/sendMail', (req, res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'myproject.gk01@gmail.com',
            pass: 'mjcy okrc vidj amcj'
        }
    });

    var mailOptions = {
        from: 'myproject.gk01@gmail.com',
        to: 'cemonjungkarki121@gmail.com',
        subject: 'Users Concern',
        text: req.body.message,
        html: `
        <div className="p-10">
        <p>You have an email from the user</p>
        <h3>Message Details</h3>
        <p>
            Email: ${req.body.to}<br>
            User: ${req.body.subject}<br>
            Message: ${req.body.message}
        </p>
        </div>
        `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.json({ status: false, respMesg: "Invalid email or user not found!" })
        } else {
            res.json({ status: true, respMesg: "Email sent successfully" })
        }
    });
});

// signup route to handle data upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/signup', upload.single('profileImage'), async (req, res) => {
    const { name, email, password, phone, dob, country, state, district, street } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const imagePath = req.file ? req.file.filename : null;

    const sql = "INSERT INTO user_signup(`user_name`,`user_email`,`user_pass`,`user_phone`,`date_of_birth`, `user_profile`,`user_ctry`,`user_state`,`user_district`,`user_street`) VALUES(?)";
    const values = [name, email, hashedPassword, phone, dob, imagePath, country, state, district, street];

    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.status(500).json({ err: 'Database error' });
        }
        return res.status(201).json(data);
    });
});


// login route to handle user login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM user_signup WHERE `user_email` = ? AND `access` = 'User'";

    db.query(sql, [email], async (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Database error" });
        }
        if (data.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const user = data[0];
        const isMatch = await bcrypt.compare(password, user.user_pass);
        if (isMatch) {
            return res.status(200).json({ message: "Login successful", user });
        } else {
            return res.status(401).json({ error: "Invalid email or password" });
        }
    });
});

// route to fetch all users
app.get('/users', (req, res) => {
    const sql = "SELECT * FROM user_signup WHERE `access` ='User'";

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ error: 'Failed to fetch users' });
        }
        res.status(200).json(results);
    });
});


// delete route to detete user
app.delete('/delete/:id', (req, res) => {
    const userId = req.params.id;

    if (!Number.isInteger(parseInt(userId))) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    const sql = 'DELETE FROM user_signup WHERE User_id = ?';

    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ error: 'Failed to delete user' });
        }

        if (result.affectedRows > 0) {
            res.status(200).json({ message: `User deleted successfully` });
        } else {
            res.status(404).json({ message: `User not found` });
        }
    });
});

// const products = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

// const poducts = multer({ storage: storage });
// app.post('/additems', poducts.single('proImage'), async (req, res) => {
//     const { proName, otherName, price, type, days, description } = req.body;
//     const proPath = req.file ? req.file.filename : null;

//     const sql = "INSERT INTO products(`uid`,`productName`,`otherName`,`price`,`proImage`, `type`,`days`,`description`) VALUES(?)";
//     const values = [proName, otherName, price, proPath, type, days, description];

//     db.query(sql, [values], (err, data) => {
//         if (err) {
//             return res.status(500).json({ err: 'Database error' });
//         }
//         return res.status(201).json(data);
//     });
// });

// delete route to detete product
// app.delete('/deletepro/:id', (req, res) => {
//     const productId = req.params.id;

//     if (!Number.isInteger(parseInt(productId))) {
//         return res.status(400).json({ error: 'Invalid user ID' });
//     }

//     const sql = 'DELETE FROM products WHERE pid = ?';

//     db.query(sql, [productId], (err, result) => {
//         if (err) {
//             console.error('Error deleting product:', err);
//             return res.status(500).json({ error: 'Failed to delete product' });
//         }

//         if (result.affectedRows > 0) {
//             res.status(200).json({ message: `Product deleted successfully` });
//         } else {
//             res.status(404).json({ message: `Product not found` });
//         }
//     });
// });

app.listen(3000, () => {
    console.log('Server listening at port 3000');
});