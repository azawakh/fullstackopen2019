import React from "react";
import Part from "./Part";

const Content = ({ course }) => {
  const { parts } = course;
  const partLists = parts.map(part => (
    <Part key={part.id} part={part.name} exercises={part.exercises} />
  ));

  return <>{partLists}</>;
};

export default Content;
