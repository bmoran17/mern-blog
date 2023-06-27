const fs = require('fs');
const multer  = require('multer');
const jwt = require('jsonwebtoken');

const secret = process.env.secret;
const uploadMiddleware = multer({ dest: 'uploads/' });
const Post = require('../models/Post')

module.exports = (app) => {

  app.post('/post', uploadMiddleware.single('file') , async (req, res) => {
    const {originalname, path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  
    const {token} = req.cookies;
    // verify token => get info => get id for author
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) throw err;
      const {title, summary, content} = req.body;
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: info.id
      });
    res.json(postDoc);
    });
  });

  app.put('/post',uploadMiddleware.single('file'), async(req, res) => {
    let newPath = null;
    if (req.file) {
      const {originalname, path} = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = path + "." + ext;
      fs.renameSync(path, newPath);
    }
  
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err,info) => {
      if (err) throw err;
      const {id, title, summary, content} = req.body;
      const postDoc = await Post.findById(id);
  
      const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        res.status(400).json('You are not the author');
        throw 'You are not the author'
      }
  
      await postDoc.updateOne({
        title,
        summary,
        content,
        cover: newPath ? newPath : postDoc.cover
      })
  
      res.json(postDoc);
    });
  
  });

  app.get('/post', async (req, res) => {
    // finds all posts
    res.json(await Post.find()
      .populate('author', ['username'])
      .sort({createdAt: -1})
      .limit(20)
    );
  });

  app.get('/post/:id', async(req, res) => {
    const {id} = req.params;
    // get all info about post
    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.json(postDoc);
  }); 
}