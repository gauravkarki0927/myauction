const path = require('path');
const express = require('express');

const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors');
app.use(cors());

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.json());
app.use(express.static(buildPath));

app.post('/sendMail', (req, res)=>{
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
        subject: req.body.subject,
        text: req.body.message,
        html: `
        <div className="p-10">
        <p>You have an email from the website</p>
        <h3>Delivery Details</h3>
        <p>
            Email: ${req.body.to}<br>
            User: ${req.body.subject}<br>
            Message: ${req.body.message}
        </p>
        </div>
        `
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          res.json({status: false, respMesg: "Invalid email or user not found!"})
        } else {
            res.json({status: true, respMesg: "Email sent successfully"})
        }
      });
});

app.listen(3000, ()=>{
    console.log('Server listening at port 3000');
})