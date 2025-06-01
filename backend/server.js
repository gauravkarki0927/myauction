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

// Multer setup for handling file uploads
const produpdateProducts = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'productImage/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const productImg = multer({ storage: produpdateProducts });

// Route to handle product update request 
app.post('/updateProduct', productImg.array('proImage', 4), (req, res) => {

    const {
        pid,
        proName,
        otherName,
        price,
        type,
        days,
        description,
        keypoints,
    } = req.body;

    const imageFilenames = req.files?.map(file => file.filename) || [];

    const sql = `INSERT INTO add_products (productName, otherName, price, proImage, type, days, description, keyPoints, update_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [proName, otherName, price, JSON.stringify(imageFilenames), type, days, description, keypoints, pid];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Insert error:', err);
            return res.status(500).json({ message: 'Error submitting product data' });
        }

        res.status(201).json({ message: 'Product submitted successfully', productId: result.insertId });
    });
});

// route to fetch all products to approve 
app.get('/approveProduct', (req, res) => {
    const sql = `
        SELECT *
        FROM add_products
        WHERE DATE_ADD(submitted, INTERVAL days DAY) > NOW() AND approve = ''
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to fetch results' });
        }
        res.status(200).json(results);
    });
});

// route to delete the approve request 
app.delete('/approveProduct/"id', (req, res) => {
    const proId = req.params.id;
    const sql = `
        DELETE
        FROM add_products
        WHERE product_id = ?
    `;

    db.query(sql, [proId], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to fetch results' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    });
});

// route to approve product before display
app.put('/approvePro/:id', (req, res) => {
    const proId = req.params.id;

    if (!Number.isInteger(parseInt(proId))) {
        return res.status(400).json({ error: 'Invalid product ID' });
    }

    const sql = 'UPDATE add_products SET `approve`=1 WHERE product_id = ?';

    db.query(sql, [proId], (err, result) => {
        if (err) {
            console.error('Error approving post:', err);
            return res.status(500).json({ error: 'Failed to approve post' });
        }

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'The item has been approved' });
        } else {
            res.status(404).json({ message: 'Approve failed: Product not found' });
        }
    });
});



// route to fetch all products
app.get('/allitems', (req, res) => {
    const sql = `
        SELECT *
        FROM add_products
        WHERE DATE_ADD(submitted, INTERVAL days DAY) > NOW() AND update_id = '' AND approve = 1
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to fetch results' });
        }
        res.status(200).json(results);
    });
});

// route to fetch all the update request 
app.get('/updateItems', (req, res) => {
    const sql = `
        SELECT *
        FROM add_products
        WHERE DATE_ADD(submitted, INTERVAL days DAY) > NOW() AND update_id != ''
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to fetch results' });
        }
        res.status(200).json(results);
    });
});

// route to update the product details by admin 
app.put('/approveUpdate/:id', (req, res) => {
    const update_id = parseInt(req.params.id);

    if (!Number.isInteger(update_id)) {
        return res.status(400).json({ error: 'Invalid product ID' });
    }

    const selectQuery = 'SELECT * FROM add_products WHERE update_id = ?';

    db.query(selectQuery, [update_id], (err, results) => {
        if (err) {
            console.error('Error fetching update:', err);
            return res.status(500).json({ error: 'Failed to fetch update' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'No update request found' });
        }

        const updateData = results[0];

        const {
            productName,
            otherName,
            price,
            proImage,
            type,
            days,
            description,
            keyPoints
        } = updateData;

        const imageFilenames = req.files?.map(file => file.filename) || JSON.parse(proImage);

        const updateOriginalQuery = `
            UPDATE add_products
            SET productName = ?, otherName = ?, price = ?, proImage = ?, type = ?, days = ?, description = ?, keyPoints = ?
            WHERE product_id = ?
        `;

        const values = [
            productName,
            otherName,
            price,
            JSON.stringify(imageFilenames),
            type,
            days,
            description,
            keyPoints,
            update_id
        ];

        db.query(updateOriginalQuery, values, (err, updateResult) => {
            if (err) {
                console.error('Error updating product:', err);
                return res.status(500).json({ error: 'Failed to update product' });
            }

            const deleteQuery = 'DELETE FROM add_products WHERE update_id = ?';

            db.query(deleteQuery, [update_id], (err, deleteResult) => {
                if (err) {
                    console.error('Error deleting update request:', err);
                    return res.status(500).json({ error: 'Update approved, but cleanup failed' });
                }

                res.status(200).json({ message: 'Update approved and applied successfully' });
            });
        });
    });
});

// route to delete the approve request 
app.delete('/deleteUpdate/"id', (req, res) => {
    const UID = req.params.id;
    const sql = `
        DELETE
        FROM add_products
        WHERE update_id = ?
    `;

    db.query(sql, [UID], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to fetch results' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    });
});

// route to get product details
app.get('/productDetails/:id', (req, res) => {
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
    }
    values = [`%${searchItem}%`];

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

    const productSql = "SELECT submitted, days FROM add_products WHERE product_id = ?";
    db.query(productSql, [productId], (err, results) => {
        if (err) {
            console.error('Error fetching product info:', err);
            return res.status(500).json({ error: 'Failed to check auction status' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const submittedDate = new Date(results[0].submitted);
        const days = results[0].days;
        const auctionEndDate = new Date(submittedDate);
        auctionEndDate.setDate(auctionEndDate.getDate() + days);

        const now = new Date();

        if (now > auctionEndDate) {
            return res.status(400).json({ message: 'Auction has ended. Bidding is closed.' });
        }

        const insertSql = "INSERT INTO user_biddings(pid, uid, amount) VALUES (?, ?, ?)";
        const insertValues = [productId, userId, amount];

        db.query(insertSql, insertValues, (err, results) => {
            if (err) {
                console.error('Error inserting bid:', err);
                return res.status(500).json({ error: 'Failed to insert bid' });
            }

            const fetchEmailsSql = `
            SELECT DISTINCT us.user_email
            FROM user_biddings ub
            JOIN user_signup us ON ub.uid = us.user_id
            WHERE ub.uid != ? AND ub.pid = ?
        `;

            db.query(fetchEmailsSql, [userId, productId], (err, bidderResults) => {
                if (err) {
                    console.error('Error fetching emails:', err);
                    return res.status(500).json({ error: 'Bid placed, but failed to fetch previous bidders' });
                }

                const emails = bidderResults.map(row => row.user_email);
                if (emails.length === 0) {
                    return res.status(200).json({ message: 'Bid successful, no previous bidders to notify' });
                }

                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'myproject.gk01@gmail.com',
                        pass: 'mjcy okrc vidj amcj'
                    }
                });

                const mailOptions = {
                    from: 'myproject.gk01@gmail.com',
                    to: emails,
                    subject: 'You have been outbid!',
                    html: `
                    <p>Hello user,</p>
                    <p>Someone has placed a higher bid on an item you were bidding on.</p>
                    <p><strong>New highest bid:</strong> Rs.${amount}</p>
                    <p>Visit the auction site to place a new bid if you're still interested.</p>
                    <p style="font-style: italic;">Online Auction System<br>Thank you</p>
                `
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error('Email error:', error);
                        return res.status(500).json({ message: 'Bid placed, but failed to send notifications' });
                    } else {
                        return res.status(200).json({ message: 'Bid successful and previous bidders notified' });
                    }
                });
            });
        });
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
        postal,
        pid,
        price,
        tuid
    } = req.body;

    const query = `
        INSERT INTO check_out (pid, price, user_name, email, phone, state, district, street, postal_code, tuid)
        VALUES (?, ?, ?, ?, ?, ?, ?,?,?,?)
    `;

    db.query(query, [pid, price, user, email, phone, state, district, street, postal, tuid], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to submit checkout data' });
        }
        res.status(200).json({ message: 'Checkout submitted successfully' });
    });
});

// get all checkout records 
app.get('/getcheckout', (req, res) => {

    const query = 'SELECT * FROM check_out';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'Database query error' });
        }

        res.json(results);
    });
});

app.get('/userproducts/:uid', (req, res) => {
    const user_id = req.params.uid;

    const query = 'SELECT * FROM add_products where uid=?';
    db.query(query, [user_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// delete route to detete product
app.delete('/deleteproduct/:id', (req, res) => {
    const productId = req.params.id;
    const query = 'DELETE FROM add_products WHERE product_id = ?';

    db.query(query, [productId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    });
});

// Route to get all products the user is currently bidding on
app.get('/user-bids/:uid', (req, res) => {
    const userId = req.params.uid;

    const query = `
    SELECT DISTINCT ap.*
    FROM add_products ap
    JOIN user_biddings b ON ap.product_id = b.pid
    WHERE b.uid = ?
      AND NOW() >= ap.submitted
      AND NOW() <= DATE_ADD(ap.submitted, INTERVAL ap.days DAY)
  `;

    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Route to get all products the user has participated in bidding
app.get('/user-participated-bids/:uid', (req, res) => {
    const userId = req.params.uid;

    const query = `
    SELECT DISTINCT ap.*
    FROM add_products ap
    INNER JOIN user_biddings b ON ap.product_id = b.pid
    WHERE b.uid = ?
      AND NOW() > DATE_ADD(ap.submitted, INTERVAL ap.days DAY)
  `;

    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});


app.get('/successfulBid/:uid', (req, res) => {
    const userId = req.params.uid;

    const query = `
    SELECT DISTINCT ap.*, b.amount AS user_bid
    FROM add_products ap
    JOIN user_biddings b ON ap.product_id = b.pid
    LEFT JOIN check_out co ON b.pid = co.pid
    WHERE b.uid = ?
      AND (co.payment_id IS NULL OR co.payment_id = '')
      AND NOW() > DATE_ADD(ap.submitted, INTERVAL days DAY)
      AND b.amount = (
        SELECT MAX(b2.amount)
        FROM user_biddings b2
        WHERE b2.pid = ap.product_id
      );
  `;

    db.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});


const transactions = [];

// POST endpoint to handle transaction submission
app.post('/submitTransaction', (req, res) => {
    const { payment_id, tuid } = req.body;

    const query = 'UPDATE check_out SET payment_id = ? WHERE tuid = ?';

    db.query(query, [payment_id, tuid], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'No matching record found for tuid' });
        }

        res.status(200).json({ message: 'Transaction updated successfully' });
    });
});



// admin sends mail to all user 
const mailsdata = require('multer');
const attach = multer({ storage: multer.memoryStorage() });

app.post('/sendAmail', attach.array('attachments'), async (req, res) => {
    try {
        const { to, subject, body } = req.body;
        const toRecipients = JSON.parse(to);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'myproject.gk01@gmail.com',
                pass: 'mjcy okrc vidj amcj'
            },
        });

        const attachments = req.files.map((file) => ({
            filename: file.originalname,
            content: file.buffer,
        }));

        const mailOptions = {
            from: 'your_email@gmail.com',
            to: toRecipients.join(', '),
            subject,
            text: body,
            attachments,
        };

        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to send email', error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server listening at port 3000');
});