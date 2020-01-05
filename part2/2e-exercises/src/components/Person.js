import React from "react";

const Person = ({ person, deletePersonOf }) => (
  <tr key={person.id}>
    <td>{person.name}</td>
    <td>{person.number}</td>
    <td>
      <button
        onClick={() => {
          if (window.confirm(`Delete ${person.name} ?`)) {
            deletePersonOf(person.id);
          }
        }}
      >
        delete
      </button>
    </td>
  </tr>
);
export default Person;
