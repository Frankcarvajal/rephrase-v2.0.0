export function getMessageTranslations(messages, props, accessToken) {
      return fetch(`/api/translate/messages`, {
        method: 'POST',
        headers: { 
			    'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          defaultLanguage: props.user.defaultLanguage, 
          messages 
        }) 
      })
      .then(responseStream => responseStream.json())
      .catch(err => console.error(err));
    }

  export function getChatRoomStateFromDb(props, accessToken) {
    return fetch(`/api/chat/chatRoom/${props.match.params.roomId}`, {
      method: 'GET',
      headers: { 
			'Authorization': `Bearer ${accessToken}` 
		  }
    })
    .then(responseStream => responseStream.json())
    .catch(err => console.error(err));
  }
