import React from "react";

const Error = ({ errors }) => {
  if (errors.length === 0) {
    return <></>;
  }
  return errors.map(error => (
    <div key={error.type}>
      <span style={{ color: "red" }}>{error.message}</span>
    </div>
  ));
};

export default Error;
