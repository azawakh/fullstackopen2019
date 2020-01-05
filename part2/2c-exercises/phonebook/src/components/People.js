import React from "react";
import Person from "./Person";

const rows = (people, searchTerm) =>
  people
    .filter(person =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map(person => <Person key={person.id} person={person} />);

const People = ({ people, searchTerm }) => (
  <table>
    <tbody>{rows(people, searchTerm)}</tbody>
  </table>
);

export default People;
