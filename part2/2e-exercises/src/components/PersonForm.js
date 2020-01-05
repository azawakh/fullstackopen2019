import React from "react";

const PersonForm = ({
  onSubmit,
  onChangeName,
  newName,
  onChangeNumber,
  newNumber
}) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input onChange={onChangeName} value={newName} />
    </div>
    <div>
      number: <input onChange={onChangeNumber} value={newNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
