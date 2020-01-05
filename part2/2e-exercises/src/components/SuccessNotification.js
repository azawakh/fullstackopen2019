import React from "react";

const SuccessNotification = ({ messages }) => {
  if (messages.length === 0) {
    return <></>;
  }
  return messages.map(message => (
    <div className="success-notification" key={message.type}>
      <span>{message.message}</span>
    </div>
  ));
};

export default SuccessNotification;
