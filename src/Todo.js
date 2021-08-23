import React from 'react';

function Todo(props) {
  return (
    <div>
      <span>{ props.item.val().title }</span>
    </div>
  );
}

export default Todo;