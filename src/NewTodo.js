import React, {useState} from 'react';

function NewTodo(props) {
  const [newTitle, setNewTitle] = useState('');

  function handleClick() {
    setNewTitle('');
  }

  function onInputChange(e) {
    setNewTitle(e.target.value);
  }

  return (
    <div>
      <input type="text" value={newTitle} onChange={onInputChange}/>
      <button onClick={handleClick}>Add</button>
    </div>
  );
}

export default NewTodo;