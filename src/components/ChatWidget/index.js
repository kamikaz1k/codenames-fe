import React, { useState } from 'react';

import './ChatWidget.css';

const ChatWidget = ({ chatMessages, handleNewChatMessage, groupMembers, you }) => {
  const [showChatModal, setShowChatModal] = useState(false);
  const players = groupMembers.reduce((acc, curr) =>
    ({
      ...acc,
      [curr.user_id]: curr.user_id === you ? "You" : curr.username
    })
  , {});

  console.log(groupMembers, players);

  return (
    <div className="chat-container">
      <div className="fab-chat">
        <i className="icon ion-icon ion-chatboxes p-1" onClick={() => setShowChatModal(!showChatModal)} />
      </div>
      {showChatModal &&
        <div className="chat-window">
          <div className="controls text-right">
            <i className="close-btn icon ion-icon ion-close" onClick={() => setShowChatModal(!showChatModal)} />
          </div>
          <div className="messages">
            {chatMessages.map((v, idx) => <div key={idx} className="message-entry">{`${players[v.user_id]}: ${v.message}`}</div>)}
          </div>
          <input
            autoFocus
            type="text"
            className="form-control"
            onKeyDown={e => {
              if (e.key === "Escape") {
                e.preventDefault();
                setShowChatModal(!showChatModal)
              }
            }}
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
