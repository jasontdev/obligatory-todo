import React from 'react';
import {Link} from "react-router-dom";

function Landing(props) {
  return (
    <div>
      <h2>Welcome to Obligatory Todo</h2>
      <p>What developer portfolio would be complete without a todo
      application?</p>
      <p>If you'd like to try Obligatory Todo, register <Link to="/register">here</Link>.
      </p>
    </div>
  );
}

export default Landing;