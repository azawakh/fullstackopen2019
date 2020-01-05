import React from "react";

const ErrorNotification = ({ errors }) => {
  if (errors.length === 0) {
    return <></>;
  }
  return errors.map(error => (
    <div className="error-notification" key={error.type}>
      <span>{error.message}</span>
    </div>
  ));
};

export default ErrorNotification;
