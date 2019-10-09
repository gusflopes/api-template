import React from 'react';

//Project icons
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import './styles.css';

export default function Header() {
  return (
    <header>
      <div className="menu-icon">
        <MenuIcon />
      </div>
      <div className="page-title">
        <h1>Page Title</h1>
      </div>
      <form>
        <div className="input-style">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search"
          />
        </div>
      </form>
    </header>
  )
}
