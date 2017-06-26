# Rephrase

A translation & chat application built with react, node, and socket.io

## Description

Rephrase offers two key features. The first is targeted at travelers who need to quickly translate a sentence into another language. Using the Google Chrome speech-to-text web API in conjunction with the Google translate API, rephrase records a spoken statement and then translates the statement into a target language identified by the user. Please note that this speech-to-text feature is currently only supported by Chrome, and therefore will not currently work on other browsers, such as Firefox, IE, or Safari.

![Speak and be translated with rephrase](https://github.com/pszujewski/rephrase-v2.0.0/blob/master/client/src/assets/home.png)

The second feature of Rephrase is a chat application that integrates the Google Translate API to offer users the ability to hold conversations in virtually any language. Want to hold a conversation with a Chinese-speaker? Simply type your messages in English and your interlocutor can choose to receive those languages in Chinese. 
The following situation sums up the use of rephrase's chat rooms: John Doe is from Ontario but currently lives in Mexico. He speaks Spanish well but would prefer to conduct business with his landlord in English if possible. Thanks to rephrase, instead of having to text his landlord in Spanish, John can open a chat room with his landlord and send his messages in English. His landlord receives them in Spanish and replies in Spanish, but John receives those replies in English. John can also view the original message in Spanish if he wishes.    

![A rephrase chat room can translate your messages into a dozen different languages](https://github.com/pszujewski/rephrase-v2.0.0/blob/master/client/src/assets/rooms.png)

* [View the deployed site](https://rephrase-it.herokuapp.com/)

**Target Audience: Travelers and people in a foreign country** 
* Users can quickly translate spoken statements into over a dozen languages. If the user wishes to edit the transcription, they can simply click an edit button, make their changes, and re-submit for a new translation. 
* Speech-to-text-to-translation is offered without the need for user authentication
* Users can sign up/ create a profile using their google account
* Users can open chat rooms with other users.
* Chat rooms are prvately available to each user. Up to 3 users can be included in a single chat room. 
* Users can type messages in the chat rooms in over a dozen supported languages.
* Users can translate a chat conversation into any of the supported languages.
* Users can switch between languages while viewing the conversation in the chat room
* Users receive new chat messages in real-time as they are sent.

# Socket.io, web sockets, and implementing the chat feature

Rephrase's chat rooms are built thanks to socket.io, which uses a technology called web sockets to enable ["... real-time bidirectional event-based communication."](https://socket.io/) 
In sum, web sockets are similar to http requests in that they are a networking protocol that enables communication between client and server. The difference lies in how they structure that communication. Whereas the http protocol transfers data based on the 'client-request and server-response' model, with web sockets, requests and responses serve different purposes. In the web socket model, a client first requests to open a communication channel with the server. The server responds by establishing the connection and notifying the client. Once the connection is open, the server can send data without being solicited by the client.
When a user enters a rephrase chat room, they connect to the server via a web socket connection provided by socket.io. Messages are sent and received over this connection, which enables the real-time chat feature.      

# Getting Started with the project

### Set up

* Move into your projects directory: `cd ~/YOUR_PROJECTS_DIRECTORY`
* Clone this repository: `https://github.com/pszujewski/rephrase-v2.0.0.git`
* Install the dependencies: `yarn install`
* Run it locally with `yarn run dev`

## Built With

* Google Chrome text-to-speech web API
* Google Translate API
* React/Redux
* React Materialize
* Node.js with Express.js
* Socket.io
* MongoDB
* Mongoose.js
* Passport.js
* Google OAuth 2.0
* HTML/ CSS

## Authors

Peter Szujewski, Franklin Carvajal, Ramon Reyes
