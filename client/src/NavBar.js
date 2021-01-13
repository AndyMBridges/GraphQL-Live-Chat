import React from 'react';

const NavBar = props => {
  return (
    <nav className="nabar">
      <div className="navbar-end">
        <button className="button navbar-item"
          onClick={props.onLogout}>Logout</button>
      </div>
    </nav>
  )
}

export default NavBar
