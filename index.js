const express = require("express");
const app = express();
const port = 3100;
const path = require('path');
const connectDB = require('./config/db');
const Blog = require('./model/blog');
const mongoose = require("mongoose");
const {sendEmail} = require('./util/emailserivce');


connectDB();
// serving the static files
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));




// const seedBlogs = async () => {
//   try {
//     await Blog.deleteMany(); // clear existing docs

//     const blogs = [
//       {
//         title: "Helping Hands: Our Food Relief Drive",
//         image: "https://via.placeholder.com/600x400.png?text=Food+Relief",
//         content:
//           "Last week, Heart United reached over 500 families with food packs. Volunteers worked tirelessly to ensure everyone received essential supplies.",
//       },
//       {
//         title: "Education for Every Child",
//         image: "https://via.placeholder.com/600x400.png?text=Education",
//         content:
//           "We believe every child deserves the chance to learn. Our education initiative provides scholarships, school supplies, and mentorship programs.",
//       },
//       {
//         title: "Healthcare Outreach in Local Communities",
//         image: "https://via.placeholder.com/600x400.png?text=Healthcare",
//         content:
//           "Our medical team organized a free health checkup camp. Over 200 people benefited from free consultations and medicines.",
//       },
//     ];

//     await Blog.insertMany(blogs);
//     console.log("✅ Dummy blog data inserted!");
//     mongoose.connection.close();
//   } catch (err) {
//     console.error("❌ Error seeding data:", err);
//   }
// };

//seedBlogs();


app.get('/', async (req, res) => {

    try {
    const blogs = await Blog.find().sort({ timePosted: -1 }).limit(3); 
    res.render("index", { blogs }); 
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


app.get('/about',  (req, res) => {

    res.render("about"); 
  
});

app.get('/blog',  (req, res) => {

    res.render("blog"); 
  
});


app.get('/donate',  (req, res) => {

    res.render("donate"); 
  
});

app.get('/gallery',  (req, res) => {

    res.render("gallery"); 
  
});


app.get('/contact',  (req, res) => {

    res.render("contact"); 
  
});

app.get("/blog/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    const recentBlogs = await Blog.find().sort({ createdAt: -1 }).limit(3);
    res.render('blog-single', { blog , recentBlogs});
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


app.post('/send-email', (req, res) => {
    const { fullname, email, message } = req.body;
    console.log(fullname, email,  message);
   sendEmail(
    "heartsuinted@gmail.com",
  `New Contact Form Submission from ${fullname}`,
  `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Contact Form Submission</title>
  </head>
  <body style="margin:0; padding:0; font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8;">
    <!-- Banner -->
    <div style="background: linear-gradient(135deg, #d46c26ff, #fcaa11ff); padding: 20px; text-align:center; color: #ffffffff;">
      <h1 style="margin:0; font-size: 24px;">Hearts United</h1>
      <p style="margin:0; font-size: 14px;">New Contact Form Submission</p>
    </div>

    <!-- Content Container -->
    <div style="max-width:600px; margin:30px auto; background:#fff; padding:20px; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
      
      <h2 style="color:#0a3d62; border-bottom:2px solid #f1f1f1; padding-bottom:10px;">Submission Details</h2>
      
      <p style="margin:10px 0; font-size:16px;">
        <strong style="color:#3c6382;">Full Name:</strong> ${fullname}
      </p>
     
     
      <p style="margin:10px 0; font-size:16px;">
        <strong style="color:#3c6382;">Email:</strong> ${email}
      </p>

      <div style="margin-top:20px; padding:15px; background:#f9f9f9; border-left:4px solid #cc570aff;">
        <p style="margin:0; font-size:16px; color:#333;">
          <strong style="color:#0a3d62;">Message:</strong><br/>
          ${message}
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align:center; padding:15px; font-size:13px; color:#999;">
      &copy; ${new Date().getFullYear()} Royale Cleaners. All Rights Reserved.
    </div>
  </body>
  </html>
  `
).then(() => {
        console.log("Contact form email sent successfully!");
        res.redirect('/')
        //res.json({ success: true, message: "Contact form email sent successfully" });
    }).catch((error) => {
        console.error("Error sending email:", error);
    });
    
});


app.listen(port, () => {
    console.log(`server running at port: http://localhost:${port}`);
});
