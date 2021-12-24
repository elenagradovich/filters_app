import React from 'react';
import { NavLink } from 'react-router-dom';
import { SEARCH, SEARCH_HISTORY } from '../../constants/route-pathes';
import header from './header.module.scss';

function Header () {
  return (
    <header className={header.wrapper}>
      <div className="container">
        <nav className={header.nav_list}>
          <NavLink className={header.nav__item} to={ SEARCH } exact activeStyle={{fontWeight: 'bold'}}>Search</NavLink>
          <NavLink className={header.nav__item} to={ SEARCH_HISTORY } exact activeStyle={{fontWeight: 'bold'}}>Search history</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
