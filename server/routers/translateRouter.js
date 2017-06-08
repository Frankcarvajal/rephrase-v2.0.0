const express = require('express');
const jsonParser = require('body-parser').json();
const googleTranslate = require('google-translate')(process.env.TRANSLATE_API_KEY);

const router = express.Router();

router.post('/', jsonParser, (req, res) => {
  // For posting a string to translate, will return the translated string
  // Google translate will identify the language for you as well. 
  console.log(req.body);
  return googleTranslate.translate(req.body.toTranslate, req.body.targetLanguage, function(err, translation) {
    if (err) {
      return res.status(500);
    }
    return res.status(200).json({ translation });
  });
});

module.exports = { translateRouter: router };


