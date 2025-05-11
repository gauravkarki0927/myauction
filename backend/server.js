const express = require('express');
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require('bcrypt');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');

const nodemailer = require('nodemailer');
const app = express();
app.use(cors());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/productImage', express.static(path.join(__dirname, 'productImage')));

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
const jwt = require('jsonwebtoken');
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM user_signup WHERE `user_email` = ?";

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
            const token = jwt.sign({ id: user.user_id }, process.env.JWT_KEY, { expiresIn: '3h' });
            return res.status(201).json({ token: token, role: user.access });
        } else {
            return res.status(401).json({ error: "Invalid email or password" });
        }
    });
});

function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ message: 'Access Denied: No token provided' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        req.user = decoded.id;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid Token' });
    }
}


// Protected route
app.get([
    '/admin',
    '/access/isearch',
    '/access/innerproduct',
    '/access/userdash',
    '/access/myitems',
    '/access/givereview',
    '/access/reviewbox',
    '/access/payments',
    '/access/checkout',
    '/access/finalview',
    '/access/success',
    '/access/failure',
    '/access/userprofile'
], authMiddleware, (req, res) => {
    res.status(200).json({
        message: 'Authorized access',
        path: req.path,
        userId: req.user,
    });
});



// route to fetch all users
app.get('/users', (req, res) => {
    const sql = "SELECT * FROM user_signup WHERE `access`='user'";

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
        }
        res.status(200).json(results);

    });
});

app.post('/userProfile', (req, res) => {
    const userId = parseInt(req.body.userId);

    if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }

    const sql = "SELECT * FROM user_signup WHERE `user_id`=?";
    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ error: 'Failed to fetch users' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "User not found" });
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


// Multer setup for handling file uploads
const products = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'productImage/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const productPath = multer({ storage: products });

// Route to handle form submission
app.post('/additems', productPath.array('proImage', 4), async (req, res) => {
    const { userId, proName, otherName, price, type, days, description, keypoints } = req.body;

    const imagePaths = req.files ? req.files.map(file => file.filename) : [];

    const sql = `INSERT INTO add_products (uid, productName, otherName, price, proImage, type, days, description, keyPoints) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [userId, proName, otherName, price, JSON.stringify(imagePaths), type, days, description, keypoints];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Insert error:', err);
            return res.status(500).json({ message: 'Error inserting product data' });
        }

        res.status(201).json({ message: 'Product added successfully', productId: result.insertId });
    });
});

// route to approve product before display
app.delete('/approvePro/:id', (req, res) => {
    const proId = req.params.id;

    if (!Number.isInteger(parseInt(userId))) {
        return res.status(400).json({ error: 'Invalid product ID' });
    }

    const sql = 'UPDATE user_signup SET `approve`=1 WHERE User_id = ?';

    db.query(sql, [proId], (err, result) => {
        if (err) {
            console.error('Error approving post:', err);
            return res.status(500).json({ error: 'Failed to approve post' });
        }

        if (result.affectedRows > 0) {
            res.status(200).json({ message: `The items has been approved` });
        } else {
            res.status(404).json({ message: `Approve failed` });
        }
    });
});

// route to fetch all products
app.get('/allitems', (req, res) => {
    const sql = "SELECT * FROM add_products";

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch result' });
        }
        res.status(200).json(results);

    });
});

// route to get product details
app.post('/productDetails/:id', (req, res) => {
    const productId = req.params.id;

    if (!Number.isInteger(parseInt(productId))) {
        return res.status(400).json({ error: 'Invalid product ID' });
    }

    const sql = 'SELECT * FROM add_products WHERE product_id = ?';

    db.query(sql, [productId], (err, result) => {
        if (err) {
            console.error('Error fetching product:', err);
            return res.status(500).json({ error: 'Failed to fetch product' });
        }

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: `Product not found` });
        }
    });
});

// search route to find single product by id
app.post('/searchItems', (req, res) => {
    const { searchItem } = req.body;

    if (!searchItem) {
        return res.status(400).json({ error: 'Missing search term' });
    }

    const sql = 'SELECT * FROM add_products WHERE CONCAT(productName, otherName, price, type) LIKE ?';

    db.query(sql, [`%${searchItem}%`], (err, result) => {
        if (err) {
            console.error('Error finding items:', err);
            return res.status(500).json({ error: 'Failed to fetch data' });
        }
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(200).json([]);
        }
        
    });
});

// search route to filter single product by option
app.post('/filterItems', (req, res) => {
    const { searchItem } = req.body;

    if (!searchItem) {
        return res.status(400).json({ error: 'Missing search term' });
    }

    let sql;
    let values = [];

    if (searchItem === 'allitems') {
        sql = 'SELECT * FROM add_products';
    } else if (searchItem === 'newitems') {
        sql = 'SELECT * FROM add_products ORDER BY product_id DESC';
    } else if (searchItem === 'upcoming') {
        sql = 'SELECT * FROM add_products WHERE listed = 0';
    } else {
        sql = 'SELECT * FROM add_products WHERE type LIKE ?';
        values = [`%${searchItem}%`];
    }

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error finding items:', err);
            return res.status(500).json({ error: 'Failed to fetch data' });
        }

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(200).json([]);
        }
    });
});

// route to update the user biddings
app.post('/submitBid', async (req, res) => {
    const { productId, userId, amount } = req.body;

    const sql = "INSERT INTO user_biddings(pid, uid, amount) VALUES (?,?,?)";
    const values = [productId, userId, amount];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error inserting biddings:', err);
            return res.status(500).json({ error: 'Failed to insert bids' });
        }
        res.status(200).json({ message: 'Bidding successful' });

    });
});

// route to get highest biddings
app.get('/highestBid/:pid', async (req, res) => {
    const productId = req.params.pid;

    const sql = `
        SELECT amount AS highBid, uid AS user
        FROM user_biddings
        WHERE pid = ?
          AND amount = (
              SELECT MAX(amount)
              FROM user_biddings
              WHERE pid = ?
          )
        LIMIT 1
    `;

    db.query(sql, [productId, productId], (err, results) => {
        if (err) {
            console.error('Error fetching value:', err);
            return res.status(500).json({ error: 'Failed to fetch value' });
        }

        if (results.length === 0) {
            return res.status(200).json({ highBid: null, user: null });
        }

        res.status(200).json(results[0]);
    });
});


// API Route to store checkout data
app.post('/checkout', (req, res) => {
    const {
        user,
        email,
        phone,
        state,
        district,
        street,
        postal
    } = req.body;

    const query = `
        INSERT INTO check_out (user_name, email, phone, state, district, street, postal_code)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [user, email, phone, state, district, street, postal], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'Failed to submit checkout data' });
        }
        res.status(200).json({ message: 'Checkout submitted successfully' });
    });
});

// route to fetch user profile
// app.get('/userPro:id', (req, res) => {
//     const [uid] = req.body;
//     const sql = "SELECT * FROM user_signup WHERE `access`='User' user_id=?";

//     db.query(sql, [uid], (err, results) => {
//         if (err) {
//             console.error('Error fetching user:', err);
//             return res.status(500).json({ error: 'Failed to fetch user' });
//         }
//         res.status(200).json(results);

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