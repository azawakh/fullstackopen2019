import React from "react";
import Person from "./Person";

const rows = (people, searchTerm, deletePersonOf) =>
  people
    .filter(person =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map(person => (
      <Person key={person.id} person={person} deletePersonOf={deletePersonOf} />
    ));

const People = ({ people, searchTerm, deletePersonOf }) => (
  <table>
    <tbody>{rows(people, searchTerm, deletePersonOf)}</tbody>
  </table>
);

export default People;
