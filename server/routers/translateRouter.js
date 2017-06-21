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

const apiCall = (messageData, targetLanguage) => {
  return new Promise((resolve, reject) => {
    return googleTranslate.translate(messageData.body, targetLanguage, function(err, translation) {
      if (err) {
        reject(err);
      }
      // Add data to messageData
      messageData.translatedText = translation.translatedText;
      messageData.translatedTo = targetLanguage;
      return resolve(messageData);
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
     requestsToGoogle.push(apiCall(messages[i], req.body.defaultLanguage)); 
  }
  // return promise.all() with the array and then replace the body on each original
  Promise.all(requestsToGoogle)
    .then(translatedMessages => {
      return res.status(200).json(translatedMessages);
    })
    .catch(err => console.error(err));
})


module.exports = { translateRouter: router };


