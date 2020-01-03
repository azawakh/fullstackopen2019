import React, { useState } from "react";
import ReactDOM from "react-dom";

const Display = ({ counter }) => <div>{counter}</div>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = props => {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <Display counter={counter} />
      <Button onClick={() => setCounter(counter + 1)} text="plus" />
      <Button onClick={() => setCounter(counter - 1)} text="minus" />
      <Button onClick={() => setCounter(0)} text="zero" />
    </>
  );
};

const refresh = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

refresh();
