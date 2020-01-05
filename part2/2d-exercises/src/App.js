import React, { useState, useEffect } from "react";
import peopleService from "./services/people";
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
    peopleService.getAll().then(initialPeople => {
      setPeople(initialPeople);
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

    if (people.some(person => person.name === newName.trim())) {
      if (
        window.confirm(
          `${newName.trim()} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const changedPerson = {
          ...people.find(person => person.name === newName.trim()),
          number: newNumber
        };

        peopleService
          .update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setPeople(
              people.map(person =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            );
          });

        setNewName("");
        setNewNumber("");
      }
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber
    };

    peopleService.create(newPerson).then(returnedPerson => {
      setPeople(people.concat(returnedPerson));
    });

    setNewName("");
    setNewNumber("");
  };

  const deletePersonOf = id => {
    peopleService.delete(id).then(data => {
      setPeople(people.filter(person => person.id !== id));
    });
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
          <People
            people={people}
            searchTerm={searchTerm}
            deletePersonOf={deletePersonOf}
          />
        </section>
      </section>
    </>
  );
};

export default App;
