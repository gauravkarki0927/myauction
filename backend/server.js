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

// route to handle user registration 
const tempUsers = {};
app.post('/pre-signup', upload.single('profileImage'), async (req, res) => {
    const { name, email, password, phone, dob, country, state, district, street } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const profileImage = req.file ? req.file.filename : null;

    tempUsers[email] = {
        name, email, password: hashedPassword, phone, dob,
        country, state, district, street, profileImage, otp,
        timestamp: Date.now()
    };

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'myproject.gk01@gmail.com',
            pass: 'mjcy okrc vidj amcj'
        }
    });

    const mailOptions = {
        from: 'myproject.gk01@gmail.com',
        to: email,
        subject: 'Verify Your Email',
        text: '',
        html: `
        <div className="p-4">
        <p>Your verification code for account registration is <strong>${otp}</strong><br>
        Please do not share this message with anyone<br>
        Thank you for your time<br>
        Online Auction System</p?
        </div>`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) return res.status(500).json({ error: 'Email sending failed' });
        res.status(200).json({ message: 'Verification code sent' });
    });
});

// Step 2: Handle OTP verification and final DB insert
app.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    const user = tempUsers[email];

    if (!user || user.otp !== otp) {
        return res.status(400).json({ error: 'Invalid or expired code' });
    }

    const sql = `
    INSERT INTO user_signup
    (user_name, user_email, user_pass, user_phone, date_of_birth, user_profile, user_ctry, user_state, user_district, user_street)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        user.name, user.email, user.password, user.phone, user.dob,
        user.profileImage, user.country, user.state, user.district, user.street
    ];

    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });

        delete tempUsers[email]; // Clean up
        res.status(201).json({ message: 'User registered successfully' });
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

// route to change password for forget password 
const otpStore = {};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'myproject.gk01@gmail.com',
        pass: 'mjcy okrc vidj amcj',
    }
});

// Utility function
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

// 👉 Send OTP API
app.post('/send_otp', (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required.' });

    const otp = generateOTP();
    otpStore[email] = otp;

    const mailOptions = {
        from: 'myproject.gk01@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP for password reset is: ${otp}. Do not share this with anyone.`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error('Error sending email:', err);
            return res.status(500).json({ message: 'Failed to send OTP.' });
        }
        console.log(`OTP sent to ${email}: ${otp}`);
        return res.status(200).json({ message: 'OTP sent successfully.' });
    });
});

// 👉 Resend OTP API
app.post('/resend_otp', (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required.' });

    const otp = generateOTP();
    otpStore[email] = otp;

    const mailOptions = {
        from: 'myproject.gk01@gmail.com',
        to: email,
        subject: 'Your OTP Code (Resent)',
        text: `Your new OTP is: ${otp}. Do not share this with anyone.`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error('Error resending OTP:', err);
            return res.status(500).json({ message: 'Failed to resend OTP.' });
        }
        return res.status(200).json({ message: 'OTP resent successfully.' });
    });
});

// Verify OTP API
app.post('/verify_otp', (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required.' });
    }

    const storedOtp = otpStore[email];
    if (storedOtp === otp) {
        delete otpStore[email];
        return res.status(200).json({ message: 'OTP verified successfully.' });
    } else {
        return res.status(401).json({ message: 'Invalid OTP.' });
    }
});

// route to reset password 
app.post('/reset_password', async (req, res) => {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ message: 'Email and new password are required.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const sql = 'UPDATE user_signup SET user_pass = ? WHERE user_email = ?';

        db.query(sql, [hashedPassword, email], (err, results) => {
            if (err) {
                console.error('Error updating password:', err);
                return res.status(500).json({ error: 'Failed to update password' });
            }

            if (results.affectedRows > 0) {
                res.status(200).json({ message: 'Password updated successfully' });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        });
    } catch (err) {
        console.error('Hashing error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});


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

// route to fetch user profile 
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


// route to update user profile 
app.post('/updateUser', upload.single('user_profile'), async (req, res) => {
    try {
        const {
            user_id,
            user_name,
            user_email,
            user_password,
            user_state,
            user_district,
            user_street,
            user_phone
        } = req.body;

        const user_profile = req.file ? req.file.filename : null;

        const fieldsToUpdate = [];
        const params = [];

        if (user_name) {
            fieldsToUpdate.push('user_name = ?');
            params.push(user_name);
        }

        if (user_email) {
            fieldsToUpdate.push('user_email = ?');
            params.push(user_email);
        }

        if (user_password) {
            const hashedPassword = await bcrypt.hash(user_password, 10);
            fieldsToUpdate.push('user_pass = ?');
            params.push(hashedPassword);
        }

        if (user_state) {
            fieldsToUpdate.push('user_state = ?');
            params.push(user_state);
        }

        if (user_district) {
            fieldsToUpdate.push('user_district = ?');
            params.push(user_district);
        }

        if (user_street) {
            fieldsToUpdate.push('user_street = ?');
            params.push(user_street);
        }

        if (user_phone) {
            fieldsToUpdate.push('user_phone = ?');
            params.push(user_phone);
        }

        if (user_profile) {
            fieldsToUpdate.push('user_profile = ?');
            params.push(user_profile);
        }

        if (!fieldsToUpdate.length) {
            return res.status(400).json({ error: 'No fields provided for update' });
        }

        const sql = `
      UPDATE user_signup
      SET ${fieldsToUpdate.join(', ')}
      WHERE user_id = ?
    `;

        params.push(user_id);

        db.query(sql, params, (err, result) => {
            if (err) {
                console.error("Update error:", err);
                return res.status(500).json({ error: 'Database update failed' });
            }

            res.json({ message: 'User updated successfully', result });
        });
    } catch (error) {
        console.error('Update processing error:', error);
        res.status(400).json({ error: 'Invalid user data' });
    }
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
        WHERE DATE_ADD(recorded, INTERVAL days DAY) > NOW() AND approve = ''
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

    const sql = 'UPDATE add_products SET `approve`=1, recorded= NOW() WHERE product_id = ?';

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
        WHERE DATE_ADD(recorded, INTERVAL days DAY) > NOW() AND update_id = 0 AND approve = 1
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to fetch results' });
        }
        res.status(200).json(results);
    });
});

// route to fetch all products for admin
app.get('/allitemsAdmin', (req, res) => {
    const sql = `
        SELECT *
        FROM add_products
        WHERE approve = 1 AND update_id=0
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
        WHERE DATE_ADD(recorded, INTERVAL days DAY) > NOW() AND update_id != ''
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

    const sql = 'SELECT * FROM add_products WHERE DATE_ADD(recorded, INTERVAL days DAY) > NOW() AND update_id = 0 AND approve = 1 AND CONCAT(productName, otherName, price, type) LIKE ?';

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
        sql = 'SELECT * FROM add_products WHERE DATE_ADD(recorded, INTERVAL days DAY) > NOW() AND update_id = 0 AND approve = 1';
    } else if (searchItem === 'newitems') {
        sql = 'SELECT * FROM add_products WHERE DATE_ADD(recorded, INTERVAL days DAY) > NOW() AND update_id = 0 AND approve = 1 ORDER BY product_id DESC';
    } else {
        sql = 'SELECT * FROM add_products WHERE approve = 1 AND DATE_ADD(recorded, INTERVAL days DAY) > NOW() AND update_id = 0 AND type LIKE ?';
        values = [`%${searchItem}%`];
    }

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error finding items:', err);
            return res.status(500).json({ error: 'Failed to fetch data' });
        }

        res.status(200).json(result);
    });
});


// route to update the user biddings
app.post('/submitBid', async (req, res) => {

    const { productId, userId, amount } = req.body;

    const productSql = "SELECT recorded, days FROM add_products WHERE product_id = ?";
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
                    return res.status(200).json({ message: 'Bid successful' });
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

// route to fetch all the products of a user
app.get('/userproducts/:uid', (req, res) => {
    const user_id = req.params.uid;

    const query = 'SELECT * FROM add_products WHERE DATE_ADD(recorded, INTERVAL days DAY) > NOW() AND update_id = 0 AND approve = 1 AND uid=?';
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
      AND NOW() >= ap.recorded
      AND NOW() <= DATE_ADD(ap.recorded, INTERVAL ap.days DAY)
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
      AND NOW() > DATE_ADD(ap.recorded, INTERVAL ap.days DAY)
  `;

    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// route to fetch all successful biddings 
app.get('/successfulBid/:uid', (req, res) => {
    const userId = req.params.uid;

    const query = `
    SELECT DISTINCT ap.*, b.amount AS user_bid
    FROM add_products ap
    JOIN user_biddings b ON ap.product_id = b.pid
    LEFT JOIN check_out co ON b.pid = co.pid
    WHERE b.uid = ?
      AND (co.payment_id IS NULL OR co.payment_id = '')
      AND NOW() > DATE_ADD(ap.recorded, INTERVAL days DAY)
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

// route to submit user reviews 
app.post('/reviews', (req, res) => {
    const { user_id, user_name, user_profile, review } = req.body;

    if (!user_id || !user_name || !review) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const sql = `
    INSERT INTO user_review (uid, user_name, profile, review)
    VALUES (?, ?, ?, ?)
  `;

    db.query(sql, [user_id, user_name, user_profile, review], (err, result) => {
        if (err) {
            console.error('Error inserting review:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.status(200).json({ message: 'Review submitted successfully' });
    });
});

// route to fetch all user reviews
app.get('/getReviews', (req, res) => {
    const sql = `
        SELECT *
        FROM user_review
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to fetch results' });
        }
        res.status(200).json(results);
    });
});

// route to update the user review 
app.put('/updateReview/:rid', (req, res) => {
    const { rid } = req.params;
    const { review } = req.body;

    const sql = 'UPDATE user_review SET review = ? WHERE rid = ?';
    db.query(sql, [review, rid], (err, result) => {
        if (err) return res.status(500).send('Error updating review');
        res.status(200).send('Review updated');
    });
});

// route to delete the user review 
app.delete('/deleteReview/:rid', (req, res) => {
    const { rid } = req.params;

    const sql = 'DELETE FROM user_review WHERE rid = ?';
    db.query(sql, [rid], (err, result) => {
        if (err) return res.status(500).send('Error deleting review');
        res.status(200).send('Review deleted');
    });
});

app.get('/winners', (req, res) => {
    const sql = `
       SELECT 
        us.user_id,
        us.user_name,
        us.user_email,
        us.user_profile,
        ap.proImage,
        ap.productName,
        ap.type,
        ap.price,
        ap.recorded
        FROM user_biddings ub
        JOIN (
            SELECT pid, MAX(amount) AS max_amount
            FROM user_biddings
            GROUP BY pid
        ) AS max_bids
            ON ub.pid = max_bids.pid AND ub.amount = max_bids.max_amount
        JOIN user_signup us ON ub.uid = us.user_id
        JOIN add_products ap ON ub.pid = ap.product_id;
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to fetch results' });
        }
        res.status(200).json(results);
    });
});

// total counted data of the website 
app.get('/dashboard', (req, res) => {
    const sql = `
        SELECT 
            (SELECT COUNT(user_id) FROM user_signup us) AS user_count,
            (SELECT COUNT(rid) FROM user_review ap) AS review_count,
            (SELECT COUNT(product_id) FROM add_products ur WHERE ur.product_id != ur.update_id) AS product_count;
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to fetch results' });
        }
        res.status(200).json(results);
    });
});

// route to count notifucation data for admin notification 
app.get('/getCounts', (req, res) => {
    const sql = `
        SELECT COUNT(product_id) AS datus
        FROM add_products 
        WHERE (approve = 0 OR update_id = 1) AND read_as=0;
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json({ datus: results[0].datus });
    });
});

// route to fetch data for admin notification 
app.get('/getApproves', (req, res) => {
    const sql = `
        SELECT add_products.*, user_signup.* 
        FROM add_products 
        JOIN user_signup ON user_signup.user_id = add_products.uid 
        WHERE add_products.approve = 0 OR add_products.update_id = 1
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json(results);
    });
});

// route to update read_as to admin notifucations 
app.post('/markAsRead', (req, res) => {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: 'No product IDs provided' });
    }

    const placeholders = ids.map(() => '?').join(',');
    const sql = `UPDATE add_products SET read_as = 1 WHERE product_id IN (${placeholders})`;

    db.query(sql, ids, (err, result) => {
        if (err) {
            console.error('Error updating read_as:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        return res.status(200).json({ message: 'Marked as read', affectedRows: result.affectedRows });
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