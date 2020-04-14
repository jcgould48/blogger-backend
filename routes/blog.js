const express = require('express');
const router = express.Router();
const Blog = require('./models/Blogs')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/createblog', (req, res) => {
  const { title,author, subject,article} = req.body;

  if (!word || !definition) {
    return res.status(500).json({ message: 'All Inputs must be filled' });
  }

  Word.findOne({ word: req.body.word })
    .then(word => {
      if (word) {
        return res
          .status(500)
          .json({ message: 'Word is already in dictionary' });
      }

      const newWord = new Word();
      newWord.word = req.body.word;
      newWord.definition = req.body.definition;

      newWord
        .save()
        .then(word => {
          return res.status(200).json({ message: 'Success', word });
        })
        .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json({ message: 'Server Error' }, err));
});

module.exports = router;
