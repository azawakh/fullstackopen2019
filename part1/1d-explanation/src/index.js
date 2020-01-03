import React, { useState } from "react";
import ReactDOM from "react-dom";

// const History = ({ allClicks }) => {
//   if (allClicks.length === 0) {
//     return <div>the app is used by pressing the buttons</div>;
//   }

//   return <div>button press history: {allClicks.join(" ")}</div>;
// };

// const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

// const App = () => {
//   const [left, setLeft] = useState(0);
//   const [right, setRight] = useState(0);
//   const [allClicks, setAll] = useState([]);

//   const handleLeftClick = () => {
//     setAll(allClicks.concat("L"));
//     setLeft(left + 1);
//   };

//   const handleRightClick = () => {
//     setAll(allClicks.concat("R"));
//     setRight(right + 1);
//   };

//   return (
//     <>
//       <div>
//         {left}
//         <Button onClick={handleLeftClick} text="left" />
//         <Button onClick={handleRightClick} text="right" />
//         {right}
//         <History allClicks={allClicks} />
//       </div>
//     </>
//   );
// };

// const App = props => {
//   const [clicks, setClick] = useState({ left: 0, right: 0 });

//   const handleLeftClick = () =>
//     setClick({
//       ...clicks,
//       left: clicks.left + 1
//     });

//   const handleRightClick = () =>
//     setClick({
//       ...clicks,
//       right: clicks.right + 1
//     });

//   return (
//     <>
//       <div>
//         {clicks.left}
//         <button onClick={handleLeftClick}>left</button>
//         <button onClick={handleRightClick}>right</button>
//         {clicks.right}
//       </div>
//     </>
//   );
// };

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Display = props => <div>{props.value}</div>;

const App = props => {
  const [value, setValue] = useState(10);

  const setToValue = newValue => setValue(newValue);

  return (
    <div>
      <Display value={value} />
      <Button handleClick={() => setToValue(1000)} text="thousand" />
      <Button handleClick={() => setToValue(0)} text="reset" />
      <Button handleClick={() => setToValue(value + 1)} text="increment" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
