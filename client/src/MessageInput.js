import React from 'react';


const MessageInput = props => {

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      props.onSend(e.target.value);
      e.target.value = '';
    }
  }
 
  return (
    <div className="box">
      <p className="control">
        <input className="input" type="text" placeholder="Say something..."
          onKeyPress={e => handleKeyPress(e)} />
      </p>
    </div>
  )

}

export default MessageInput;
