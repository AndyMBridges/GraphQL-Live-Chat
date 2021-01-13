import React, { useRef, useEffect } from 'react';

const MessageList = props => {

  const boxRef = useRef(null);

  useEffect(() => {
    const box = boxRef.current
    box.scrollTo(0, box.scrollHeight)
  })


  const renderMessage = message => {
    const {user} = props
    let tag = 'tag';
    if (message.from === user) {
      tag += ' is-primary';
    }
    return (
      <tr key={message.id}>
        <td><span className={tag}>{message.from}</span></td>
        <td style={{paddingLeft: '0.75em'}}>{message.text}</td>
      </tr>
    )
  }

  return (
    <div ref={boxRef} className="box" style={{height: '50vh', overflowY: 'scroll'}}>
      <table>
        <tbody>
          {props.messages.map(message => renderMessage(message))}
        </tbody>
      </table>
    </div>
  )

}

export default MessageList
