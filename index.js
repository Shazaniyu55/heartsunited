const express = require("express");
const app = express();
const port = 3100;
const path = require('path');
const connectDB = require('./config/db');
const Blog = require('./model/blog');
const mongoose = require("mongoose");

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

app.get('/event',  (req, res) => {

    res.render("event"); 
  
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




app.listen(port, () => {
    console.log(`server running at port: http://localhost:${port}`);
});
