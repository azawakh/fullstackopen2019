import React from "react";
import Error from "./Error";

const PersonForm = ({
  onSubmit,
  onChangeName,
  newName,
  onChangeNumber,
  newNumber,
  errors
}) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input onChange={onChangeName} value={newName} />
    </div>
    <div>
      number: <input onChange={onChangeNumber} value={newNumber} />
    </div>
    <Error errors={errors} />
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
