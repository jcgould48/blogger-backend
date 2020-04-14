const express = require('express');
const router = express.Router();
const Blog = require('./models/Blogs')

//See all blogs
router.get('/', function(req, res, next) {
  Blog.find({}).then(blogs => {
    res.json({ blogs });
  });
});

//Create New Blog
router.post('/createblog', (req, res) => {
  const { title,author, subject,article} = req.body;

  if (!title || !author || !subject || !article) {
    return res.status(500).json({ message: 'All Inputs must be filled' });
  }

  Blog.findOne({ title: req.body.title })
    .then(blog => {
      if (blog) {
        return res
          .status(500)
          .json({ message: 'Blog is already added' });
      }

      const newBlog = new Blog();
      newBlog.title = req.body.title;
      newBlog.author = req.body.author;
      newBlog.subject = req.body.subject;
      newBlog.article = req.body.article;

      newBlog
        .save()
        .then(blog => {
          return res.status(200).json({ message: 'Success', blog });
        })
        .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json({ message: 'Server Error' }, err));
});

//Find one blog
router.get('/:_id', (req, res) => {
  Blog.findOne({ _id: req.params._id }).then(blog => {
    if (blog) {
      return res.json(blog);
    } else {
      return res.json({ message: 'Blog not found' });
    }
  });
});

//Update blog
router.put('/:_id', (req, res) => {
  const {title, author, subject, article} = req.body
  Blog.findOne({ _id: req.params._id }).then(blog => {
    if(title)  blog.title = title;
    if(author)  blog.author = author;
    if(subject)  blog.subject = subject;
    if(article)  blog.article = article;
    return blog;
  }).then(blog=> 
    blog.save()
        .then(updated => {
          return res
            .status(200)
            .json({ message: 'Blog Updated', updated });
        }))
        .catch(err =>
          res.status(500).json({ message: 'Unable to update blog', err })
        );
});


//Delete blog
router.delete('/:_id', (req, res) => {
  Blog.findOneAndDelete({ _id: req.params._id })
    .then(blog => {
      return res.status(200).json({ message: 'Blog deleted', blog });
    })
    .catch(err => res.status(500).json({ message: 'Problem deleting', err }));
});

module.exports = router;
