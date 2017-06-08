import React from 'react';

export default function LanguageChoice(props){
  return(
    <p>English to
      <select name="Language">
        <option>French</option>
        <option>German</option>
        <option>Spanish</option>
        <option>Mandarin</option>
      </select>
    </p>

  )
}