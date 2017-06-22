export function getMessageTranslations(messages, defaultLanguage, accessToken) {
      return fetch(`/api/translate/messages`, {
        method: 'POST',
        headers: { 
			    'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          defaultLanguage, 
          messages 
        }) 
      })
      .then(responseStream => responseStream.json())
      .catch(err => console.error(err));
    }

  export function getChatRoomStateFromDb(roomId, accessToken) {
    return fetch(`/api/chat/chatRoom/${roomId}`, {
      method: 'GET',
      headers: { 
			'Authorization': `Bearer ${accessToken}` 
		  }
    })
    .then(responseStream => responseStream.json())
    .catch(err => console.error(err));
  }
