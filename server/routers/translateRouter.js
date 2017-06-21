const express = require('express');
const jsonParser = require('body-parser').json();
const googleTranslate = require('google-translate')(process.env.TRANSLATE_API_KEY);

const router = express.Router();

router.post('/', jsonParser, (req, res) => {
  // For posting a string to translate, will return the translated string
  // Google translate will identify the language for you as well. 
  return googleTranslate.translate(req.body.toTranslate, req.body.targetLanguage, function(err, translation) {
    if (err) {
      return res.status(500);
    }
    return res.status(200).json({ translation });
  });
});

const api = (toTranslate, targetLanguage) => {
  return new Promise((resolve, reject) => {
    return googleTranslate.translate(toTranslate, targetLanguage, function(err, translation) {
      if (err) {
        reject(err);
      }
      return resolve(translation);
    });
  });
}

router.post('/messages', jsonParser, (req, res) => {
  const { messages } = req.body;
  // Declare empty array
  let requestsToGoogle = [];
  // loop over req.body.messages
  // use the api function and req.body.defaultLanguage to send a request to 
  // google translate api and push this request to the empty array
  for(let i= 0; i< messages.length; i++) {
     requestsToGoogle.push(api(messages[i].body, req.body.defaultLanguage)); 
  }
  // return promise.all() with the array and then replace the body on each original
  Promise.all(requestsToGoogle)
    .then(translations => {
      console.log(messages);
      console.log('=============')
      console.log(translations);
      for (let i=0; i<translations.length; i++) {
        translations[i].translatedTo = req.body.defaultLanguage;
      }
      return res.status(200).json(translations);
    })
    .catch(err => console.error(err));
  // message before returning the new array of messages to the client requester.
    // return api('Hello', 'fr')
    //   .then(result => {
    //     console.log(result);
    //     return res.status(200).json({result});
    //   })
    //   .catch(err => console.error(err));
})


module.exports = { translateRouter: router };


