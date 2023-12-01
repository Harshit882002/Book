var express = require('express');
var router = express.Router();
const Book = require("../models/bookModel");
const nodemailer = require("nodemailer");

const books = [
  {
    // id:1,
    name: "Son of Evil",
    author:"Harshit Chourasiya",
    link:"https://plus.unsplash.com/premium_photo-1673792686302-7555a74de717?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
    description:"book covering crime",
    page:"320",
    publication:"Yondu Publication",
    year:"2023",
    price:"1000"
  },
  {
    // id:2,
    name: "Swipe of Love",
    author:"Tarun Koshti",
    link:"https://plus.unsplash.com/premium_photo-1673792686442-5339992b933a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
    description:"book covering Cuple",
    page:"520",
    publication:"gondu Publication",
    year:"2021",
    price:"700"
  }
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register', async function(req, res, next) {

  try{
    const book = new Book(req.body);
    await book.save();
    res.redirect("/show");
  } catch(error){
    res.send(error);
  }

  // Code to Save req.body data in to the database

  // Book.create(req.body)
  // .then(() => res.redirect("/show"))
  // .catch((err) => res.send(err))

  // books.push(req.body)
  // console.log(req.body)
  // res.redirect('/show')
});

router.get('/show', async function(req, res, next) {
  try{
    const books = await Book.find();
    res.render('show', {array:books});
  }catch(error){
    req.send(error);
  }
});

router.get('/about', function(req, res, next) {
  res.render('about');
});

router.get('/details/:id/author/:auth', async function(req, res, next) {

  try{
    const book = await Book.findById(req.params.id);
    res.render('details',{book:book});
  }catch(error){
    req.send(error);
  }

  // res.render('details', {data: books[req.params.idx], idx:req.params.idx});
});

router.get('/delete/:id/author/:auth', async function(req, res, next) {
  try{
    await Book.findByIdAndDelete(req.params.id);
    // books.splice(req.params.idx,1)
    res.redirect('/show')
  }catch(error){
    res.send(error)
  }
});

router.get('/update/:id/author/:auth', async function(req, res, next) {
  // const dets = books[req.params.idx];
  try{
    const book = await Book.findById(req.params.id);
    res.render('update',{book:book});
  }catch(error){
    req.send(error);
  }
  // res.render('update', {data: dets, idx: req.params.idx})
});

router.post('/update/:id/author/:auth', async function(req, res, next) {

  try{
    await Book.findByIdAndUpdate(req.params.id,req.body);
    
    res.redirect(`/details/${req.params.id}/author/${req.params.auth}`)
  }catch(error){
    res.send(error)
  }
  // books[req.params.idx] = req.body;
  // res.redirect(`/details/${req.params.idx}/author/${req.params.auth}`)
});

router.get('/sendemail', function(req, res, next) {
  res.render('sendemail');
});

router.post('/sendemail', function(req,res,next){
  sendmail(req.body.email,res);
})

function sendmail(email, res) {
  const transport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      auth: {
          user: "chourasiyaitsharsh@gmail.com",
          pass: "gpwmjndspndgxgoi",
      },
  });

  const mailOptions = {
      from: "Harshit Pvt. Ltd.<chourasiyaitsharsh@gmail.com>",
      to: email,
      subject: "Password Reset Link",
      text: "Do not share this link to anyone.",
      html: `This is Test Mail`,
  };

  transport.sendMail(mailOptions, (err, info) => {
      if (err) return res.send(err);
      console.log(info);

      return res.send(
          "<h1 style='text-align:center;color: tomato; margin-top:10%'><span style='font-size:60px;'>✔</span> <br />Email Sent! Check your inbox , <br/>check spam in case not found in inbox.</h1>"
      );
    });
}

module.exports = router;
