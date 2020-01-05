import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import People from "./components/People";

const App = () => {
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [errors, setErrors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/people").then(({ data }) => {
      setPeople(data);
    });
  }, []);

  const handleSubmit = event => {
    event.preventDefault();

    const newErrors = {
      errors: errors.concat()
    };

    if (newName.trim() === "") {
      if (newErrors.errors.some(error => error.type === "EMPTY_NAME")) {
      } else {
        newErrors.errors = newErrors.errors.concat({
          type: "EMPTY_NAME",
          message: "empty name, please input valid name"
        });
      }
    } else {
      newErrors.errors = newErrors.errors.filter(
        error => error.type !== "EMPTY_NAME"
      );
    }

    if (people.some(person => person.name === newName.trim())) {
      alert(`${newName.trim()} is already added to phonebook`);

      if (newErrors.errors.some(error => error.type === "DUPLICATE_NAME")) {
      } else {
        newErrors.errors = newErrors.errors.concat({
          type: "DUPLICATE_NAME",
          message: `${newName.trim()} is already added to phonebook`
        });
      }
    } else {
      newErrors.errors = newErrors.errors.filter(
        error => error.type !== "DUPLICATE_NAME"
      );
    }

    if (newNumber.trim() === "") {
      if (newErrors.errors.some(error => error.type === "EMPTY_NUMBER")) {
      } else {
        newErrors.errors = newErrors.errors.concat({
          type: "EMPTY_NUMBER",
          message: "empty number, please input valid name"
        });
      }
    } else {
      newErrors.errors = newErrors.errors.filter(
        error => error.type !== "EMPTY_NUMBER"
      );
    }

    if (people.some(person => person.number === newNumber.trim())) {
      alert(`${newNumber.trim()} is already added to phonebook`);

      if (newErrors.errors.some(error => error.type === "DUPLICATE_NUMBER")) {
      } else {
        newErrors.errors = newErrors.errors.concat({
          type: "DUPLICATE_NUMBER",
          message: "duplicate number, please input other name"
        });
      }
    } else {
      newErrors.errors = newErrors.errors.filter(
        error => error.type !== "DUPLICATE_NUMBER"
      );
    }

    if (newErrors.errors.length > 0) {
      setErrors(newErrors.errors.concat());
      return;
    }

    setErrors([]);
    const person = {
      id: people.length + 1,
      name: newName,
      number: newNumber
    };

    setPeople(people.concat(person));
    setNewName("");
    setNewNumber("");
  };

  const onChangeName = event => {
    setNewName(event.target.value);
  };

  const onChangeNumber = event => {
    setNewNumber(event.target.value);
  };

  const onChangeSearchTerm = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <section>
        <h2>Phonebook</h2>
        <Filter onChange={onChangeSearchTerm} value={searchTerm} />

        <section>
          <h3>Add a new</h3>

          <PersonForm
            onSubmit={handleSubmit}
            onChangeName={onChangeName}
            newName={newName}
            onChangeNumber={onChangeNumber}
            newNumber={newNumber}
            errors={errors}
          />
        </section>

        <section>
          <h3>Numbers</h3>
          <People people={people} searchTerm={searchTerm} />
        </section>
      </section>
    </>
  );
};

export default App;
