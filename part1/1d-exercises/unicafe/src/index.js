import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistic = ({ term, description }) => (
  <tr>
    <td>{term}</td>
    <td>{description}</td>
  </tr>
);

const Statistics = ({ goodCount, neutralCount, badCount }) => {
  const allCount = goodCount + neutralCount + badCount;

  if (allCount === 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    );
  }

  const goodWeight = 1;
  const neutralWeight = 0;
  const badWeight = -1;

  const goodScore = goodCount * goodWeight;
  const neutralScore = neutralCount * neutralWeight;
  const badScore = badCount * badWeight;

  const totalScore = goodScore + neutralScore + badScore;

  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <Statistic term="good" description={goodCount} />
          <Statistic term="neutral" description={neutralCount} />
          <Statistic term="bad" description={badCount} />
          <Statistic term="all" description={allCount} />
          {
            // guard is not necessary because the check if allCount is 0 has already  been done
          }
          <Statistic term="average" description={totalScore / allCount} />
          <Statistic
            term="positive"
            description={`${(goodCount / allCount) * 100} %`}
          />
        </tbody>
      </table>
    </div>
  );
};

const Button = ({ onClick, buttonText }) => {
  return <button onClick={onClick}>{buttonText}</button>;
};

const App = () => {
  // save clicks of each button to own state
  const [goodCount, setGoodCount] = useState(0);
  const [neutralCount, setNeutralCount] = useState(0);
  const [badCount, setBadCount] = useState(0);

  return (
    <>
      <div>
        <h2>give feedback</h2>
        <Button onClick={() => setGoodCount(goodCount + 1)} buttonText="good" />
        <Button
          onClick={() => setNeutralCount(neutralCount + 1)}
          buttonText="neutral"
        />
        <Button onClick={() => setBadCount(badCount + 1)} buttonText="bad" />
      </div>
      <Statistics
        goodCount={goodCount}
        neutralCount={neutralCount}
        badCount={badCount}
      />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
