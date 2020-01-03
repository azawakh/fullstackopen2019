import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const AnecdoteContent = ({ anecdote, vote, title }) => (
  <>
    <h2>{title}</h2>
    <p>{anecdote.content}</p>
    <p>has {vote.count} votes</p>
  </>
);

const AnecdoteOfTheDay = ({ anecdote, vote, onClickVote, onClickNext }) => (
  <div>
    <AnecdoteContent
      anecdote={anecdote}
      vote={vote}
      title="Anecdote of the day"
    />
    <Button onClick={onClickVote} text="vote" />
    <Button onClick={onClickNext} text="next anecdotes" />
  </div>
);

const AnecdoteWithMostVote = ({ anecdote, vote }) => (
  <div>
    <AnecdoteContent
      anecdote={anecdote}
      vote={vote}
      title="Anecdote with most votes"
    />
  </div>
);

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(Math.floor(Math.random() * 6));
  const [votes, setVotes] = useState([
    { id: 0, anecdoteId: 0, count: 0 },
    { id: 1, anecdoteId: 1, count: 0 },
    { id: 2, anecdoteId: 2, count: 0 },
    { id: 3, anecdoteId: 3, count: 0 },
    { id: 4, anecdoteId: 4, count: 0 },
    { id: 5, anecdoteId: 5, count: 0 }
  ]);

  const selectedAnecdote = anecdotes[selected];
  const selectedVote = (anecdote =>
    votes.find(vote => vote.anecdoteId === anecdote.id))(selectedAnecdote);
  const selectedVoteIndex = (targetVote =>
    votes.findIndex(vote => vote.id === targetVote.id))(selectedVote);

  const mostVote = votes.reduce((accumulator, currentValue) =>
    accumulator.count > currentValue.count ? accumulator : currentValue
  );
  const anecdoteWithMostVotes = (targetVote =>
    anecdotes.find(anecdote => anecdote.id === targetVote.anecdoteId))(
    mostVote
  );

  return (
    <div>
      <AnecdoteOfTheDay
        anecdote={selectedAnecdote}
        vote={selectedVote}
        onClickVote={() => {
          const newVotes = [...votes];
          newVotes[selectedVoteIndex].count += 1;
          setVotes(newVotes);
        }}
        onClickNext={() => setSelected(Math.floor(Math.random() * 6))}
      />
      <AnecdoteWithMostVote anecdote={anecdoteWithMostVotes} vote={mostVote} />
    </div>
  );
};

const anecdotes = [
  { id: 0, content: "If it hurts, do it more often" },
  {
    id: 1,
    content: "Adding manpower to a late software project makes it later!"
  },
  {
    id: 2,
    content:
      "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time."
  },
  {
    id: 3,
    content:
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand."
  },
  {
    id: 4,
    content: "Premature optimization is the root of all evil."
  },
  {
    id: 5,
    content:
      "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
  }
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
