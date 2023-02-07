const express = require("express");
const flash = require("connect-flash");
const router = express.Router();
//const { ensureAuthenticated } = require("../config/auth");
const https = require("https");
const querystring = require("query-string");
const bodyParser = require("body-parser");
const ROLE = require("../roles");
const { ensureAuthenticated, authRole } = require("../config/auth");
const middlewares = [bodyParser.urlencoded({ extended: true })];
const Blog = require("../models/blogschema");
const { decode } = require("punycode");
const nodemailer = require("nodemailer");

// Add AddBlog Page
router.get('/AddBlog',(req,res)=> {
  console.log('Rendering AddBlog');
  res.render("AdditionalBlog", {
      user: req.user,
  });
});

router.post("/AddBlog", (req, res) => {
  const { blogName, date, description } = req.body;
  console.log(req.body);

  const newBlog = new Blog({
    blogName, date, description
  });

  console.log(newBlog);

  newBlog.save()
  .then((blog) => {
    console.log(blog)
    res.redirect("/UploadBlog/"+blog._id)
  })
  .catch((err) => console.log(err));

});

router.get("/delete/:targetId", (req, res) => {
  Blog.deleteOne({_id: req.params.targetId}).then( async (result) => {
    res.redirect('/BlogList')
  });
});


module.exports = router;
