import React, { useState } from 'react';

import './ChatWidget.css';

const ChatWidget = ({ chatMessages, handleNewChatMessage }) => {
  const [showChatModal, setShowChatModal] = useState(false);

  return (
    <div className="chat-container">
      <div className="fab-chat">
        <i className="icon ion-icon ion-chatboxes p-1" onClick={() => setShowChatModal(!showChatModal)} />
      </div>
      {showChatModal &&
        <div className="chat-window">
          <div className="messages">
            {chatMessages.map((v, idx) => <div key={idx} className="message-entry">{v}</div>)}
          </div>
          <input
            autoFocus
            type="text"
            className="form-control"
            onKeyPress={e => {
              if (e.key !== "Enter") return;

              const inputField = e.target;
              handleNewChatMessage(e.target.value, chatMessages, () => {
                const target = document.querySelector('.message-entry:last-child');
                if (target) {
                  target.parentNode.scrollTop = target.offsetTop;
                }

                if (inputField) inputField.value = "";
              });
            }}
          />
        </div>
      }
    </div>
  );
}

export default ChatWidget;
